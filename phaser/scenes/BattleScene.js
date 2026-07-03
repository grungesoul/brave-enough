'use strict';

// Turn-based battle: BattleCore (systems/battle.js) owns the math ported from
// the original game; this scene owns presentation — FX spritesheets, camera
// shake, tint flashes, tweened bars, damage floaters, typewriter dialogue.
class BattleScene extends Phaser.Scene {
  constructor() { super('Battle'); }

  init(data) { this.levelIndex = data.levelIndex || 0; }

  create() {
    const w = this.scale.width, h = this.scale.height;
    this.cameras.main.fadeIn(400, 0, 0, 0);
    this.level = LEVELS[this.levelIndex];

    // hero state: carry exploration CP/Calm into battle (as the original did)
    const wh = this.registry.get('worldHero') || { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 };
    this.hero = Object.assign(freshHero(this.game), { cp: wh.cp, calm: wh.calm });
    this.core = new BattleCore(this.hero, this.levelIndex);

    // ── Backdrop ──
    this.cameras.main.setBackgroundColor('#0d0a16');
    const glow = this.add.ellipse(w / 2, 110, 300, 130, Phaser.Display.Color.HexStringToColor(this.level.bossColor).color, 0.10);
    this.tweens.add({ targets: glow, scaleX: 1.15, scaleY: 1.1, duration: 1600, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    this.add.rectangle(0, 200, w, 2, 0x333355).setOrigin(0);

    // ── Boss ──
    const b = this.level.boss;
    this.bossSprite = b.static
      ? this.add.image(w / 2 + 60, 120, b.spriteKey)
      : this.add.sprite(w / 2 + 60, 120, b.spriteKey).play(b.spriteKey + '-idle');
    if (b.tint) this.bossSprite.setTint(b.tint);
    this.bossSprite.setScale(this.levelIndex === 4 ? 1.15 : 1);
    this.bossBob = this.tweens.add({ targets: this.bossSprite, y: 114, duration: 1300, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    this.bossHome = { x: w / 2 + 60, y: 120 };

    // ── Hero (back turned, bottom-left) ──
    this.heroSprite = this.add.sprite(90, 175, 'hero', 8).setScale(2.2); // up-facing row
    this.heroHome = { x: 90, y: 175 };

    // friend ally (Find Your People)
    this.friendSprite = this.add.sprite(45, 182, 'adam', 18).setScale(1.8).setVisible(false);
    this.friendSprite.play('adam-idle');

    // ── Bars & panels ──
    this.buildHud();

    // ── Ability menu ──
    this.menuOpen = true;
    this.menuIndex = 0;
    this.menuScroll = 0;
    this.buildMenu();

    // ── Dialogue box ──
    this.buildDialogue();

    // ── Input ──
    this.input.keyboard.on('keydown-UP', () => this.menuMove(-1));
    this.input.keyboard.on('keydown-DOWN', () => this.menuMove(1));
    this.input.keyboard.on('keydown-ENTER', () => this.onConfirm());
    this.input.keyboard.on('keydown-SPACE', () => this.onConfirm());
    this.input.keyboard.on('keydown-Z', () => this.onConfirm());
    this.input.keyboard.on('keydown-M', () => AudioSystem.toggleMute(this.game));
    this.input.on('pointerdown', () => { if (this.phase === 'dialogue') this.advanceDialogue(); });

    AudioSystem.playMusic(this, this.levelIndex === 4 ? 'music-boss-final' : 'music-battle');

    // Boss intro: name banner slides in, then the opening taunt.
    // phase 'anim' during the banner so Enter-mashing can't touch dialogue state.
    this.phase = 'anim';
    this.dialogueLines = null;
    this.dialogueIdx = 0;
    this.typing = false;
    const bossName = this.bossName();
    const banner = this.add.container(0, 0).setDepth(90);
    const bband = this.add.rectangle(w / 2, 100, w, 40, 0x000000, 0.75);
    const btext = this.add.text(w + 200, 100, bossName.toUpperCase(), txtStyle(14, this.level.bossColor, { stroke: '#000', strokeThickness: 4 })).setOrigin(0.5);
    banner.add([bband, btext]);
    AudioSystem.sfx(this, 'sfx-debuff', 0.7);
    this.tweens.add({ targets: btext, x: w / 2, duration: 500, ease: 'cubic.out' });
    this.tweens.add({ targets: banner, alpha: 0, delay: 1600, duration: 400, onComplete: () => banner.destroy() });
    this.time.delayedCall(2100, () => {
      this.showDialogue(bossName, [this.taunts()[0]], () => this.setPlayerTurn());
    });
    this.refreshHud();
    this.refreshMenu();
  }

  // ── Text lookups ──
  bossName() { return (T_(this.game, 'bossNames') || [])[this.levelIndex] || '???'; }
  taunts() { return (T_(this.game, 'bossTaunts') || [])[this.levelIndex] || ['...']; }
  defeatLines() { return (T_(this.game, 'bossDefeatLines') || [])[this.levelIndex] || ['...']; }
  attackFlavor(i) {
    const f = (T_(this.game, 'bossAttackFlavors') || [])[this.levelIndex] || [];
    return f[i] || '';
  }
  abilityName(id) {
    const ab = T_(this.game, 'abilities') || {};
    return (ab[id] && ab[id].name) || ABILITIES[id].name;
  }
  abilityDesc(id) {
    const ab = T_(this.game, 'abilities') || {};
    return (ab[id] && ab[id].desc) || '';
  }

  // ── HUD ──
  buildHud() {
    const w = this.scale.width;
    // boss bar (top)
    this.add.text(14, 10, this.bossName(), txtStyle(8, this.level.bossColor));
    this.bossBarBg = this.add.rectangle(14, 26, 200, 8, 0x222233).setOrigin(0);
    this.bossBarGhost = this.add.rectangle(15, 27, 198, 6, 0xffffff).setOrigin(0);
    this.bossBar = this.add.rectangle(15, 27, 198, 6, 0xcc3344).setOrigin(0);
    this.bossHpText = this.add.text(220, 24, '', txtStyle(7, '#ccaaaa'));

    // hero panel (bottom-left, above menu)
    const py = 205;
    this.add.text(14, py, this.registry.get('playerName') || 'YOU', txtStyle(7, '#ffd700'));
    this.add.text(14, py + 14, T_(this.game, 'battleCp'), txtStyle(7, '#ff8888'));
    this.cpBarBg = this.add.rectangle(50, py + 13, 100, 8, 0x222233).setOrigin(0);
    this.cpBarGhost = this.add.rectangle(51, py + 14, 98, 6, 0xffffff).setOrigin(0);
    this.cpBar = this.add.rectangle(51, py + 14, 98, 6, 0xcc4455).setOrigin(0);
    this.cpText = this.add.text(155, py + 12, '', txtStyle(7, '#ffaaaa'));

    this.add.text(14, py + 28, T_(this.game, 'battleCalm'), txtStyle(7, '#88ccff'));
    this.calmBarBg = this.add.rectangle(50, py + 27, 100, 8, 0x222233).setOrigin(0);
    this.calmBar = this.add.rectangle(51, py + 28, 98, 6, 0x4488cc).setOrigin(0);
    this.calmText = this.add.text(155, py + 26, '', txtStyle(7, '#aaddff'));

    // limit gauge pips
    this.limitPips = [];
    this.add.text(240, py + 12, 'SIN MIEDO', txtStyle(6, '#ffd700'));
    for (let i = 0; i < 4; i++) {
      this.limitPips.push(this.add.rectangle(240 + i * 14, py + 28, 10, 8, 0x333322).setOrigin(0));
    }

    this.turnText = this.add.text(w - 14, 10, '', txtStyle(7, '#8899bb')).setOrigin(1, 0);

    // status badges (buffs green / debuffs red, boss statuses by the boss bar)
    this.heroStatusText = this.add.text(240, py, '', txtStyle(6, '#88ff88'));
    this.bossStatusText = this.add.text(14, 38, '', txtStyle(6, '#ffaa88'));
  }

  statusLabel(id) {
    const st = T_(this.game, 'statuses') || {};
    return st[id] || id;
  }

  refreshHud() {
    const boss = this.core.boss, h = this.hero;
    const bossFrac = boss.hp / boss.maxHp;
    this.tweens.add({ targets: this.bossBar, width: 198 * bossFrac, duration: 350, ease: 'cubic.out' });
    this.tweens.add({ targets: this.bossBarGhost, width: 198 * bossFrac, duration: 900, delay: 250, ease: 'cubic.out' });
    this.bossHpText.setText(boss.hp + '/' + boss.maxHp);

    this.tweens.add({ targets: this.cpBar, width: 98 * (h.cp / h.maxCp), duration: 350, ease: 'cubic.out' });
    this.tweens.add({ targets: this.cpBarGhost, width: 98 * (h.cp / h.maxCp), duration: 900, delay: 250, ease: 'cubic.out' });
    this.cpText.setText(h.cp + '/' + h.maxCp);
    this.tweens.add({ targets: this.calmBar, width: 98 * (h.calm / h.maxCalm), duration: 350, ease: 'cubic.out' });
    this.calmText.setText(h.calm + '/' + h.maxCalm);

    const buffs = h.activeBuffs.map(b2 => '▲' + this.statusLabel(b2.id)).join(' ');
    const debuffs = h.activeDebuffs.map(d => '▼' + this.statusLabel(d.id)).join(' ');
    this.heroStatusText.setText((buffs + ' ' + debuffs).trim())
      .setColor(debuffs ? '#ffaa88' : '#88ff88');
    this.bossStatusText.setText(boss.statusEffects.map(s => '▼' + this.statusLabel(s.id)).join(' '));

    this.limitPips.forEach((p, i) => {
      p.fillColor = i < h.limitBreakCharge ? 0xffd700 : 0x333322;
      if (h.limitBreakCharge >= 4) {
        this.tweens.add({ targets: p, alpha: 0.4, duration: 300, yoyo: true, repeat: 1 });
      }
    });
  }

  // ── Ability menu ──
  buildMenu() {
    const w = this.scale.width;
    this.menuPanel = this.add.container(0, 0);
    const bg = this.add.rectangle(w / 2, 285, w - 12, 62, 0x101024, 0.94).setStrokeStyle(2, this.level.accent);
    this.menuPanel.add(bg);
    this.menuRows = [];
    for (let i = 0; i < 3; i++) {
      const y = 264 + i * 17;
      const row = {
        sel: this.add.text(12, y, '▶', txtStyle(7, '#ffd700')).setVisible(false),
        name: this.add.text(26, y, '', txtStyle(7, '#f0eee0')).setInteractive({ useHandCursor: true }),
        cost: this.add.text(300, y, '', txtStyle(7, '#88ccff')),
        note: this.add.text(360, y, '', txtStyle(7, '#997755')),
      };
      row.name.on('pointerover', () => { if (this.phase === 'player') { this.menuIndex = this.menuScroll + i; this.refreshMenu(); } });
      row.name.on('pointerdown', () => { if (this.phase === 'player') { this.menuIndex = this.menuScroll + i; this.onConfirm(); } });
      this.menuPanel.add([row.sel, row.name, row.cost, row.note]);
      this.menuRows.push(row);
    }
    this.descText = this.add.text(w / 2, 250, '', txtStyle(6, '#8899bb')).setOrigin(0.5, 1);
    this.menuPanel.add(this.descText);
  }

  menuList() { return this.core.availableAbilities(); }

  menuMove(dir) {
    if (this.phase !== 'player') return;
    const list = this.menuList();
    this.menuIndex = Phaser.Math.Wrap(this.menuIndex + dir, 0, list.length);
    if (this.menuIndex < this.menuScroll) this.menuScroll = this.menuIndex;
    if (this.menuIndex >= this.menuScroll + 3) this.menuScroll = this.menuIndex - 2;
    AudioSystem.sfx(this, 'sfx-menu-move', 0.4);
    this.refreshMenu();
  }

  refreshMenu() {
    const list = this.menuList();
    for (let i = 0; i < 3; i++) {
      const idx = this.menuScroll + i;
      const row = this.menuRows[i];
      if (idx >= list.length) {
        row.name.setText(''); row.cost.setText(''); row.note.setText(''); row.sel.setVisible(false);
        continue;
      }
      const ab = list[idx];
      const usable = this.core.canUse(ab.id);
      const cd = this.core.cooldownFor(ab.id);
      row.name.setText(this.abilityName(ab.id)).setColor(usable ? (idx === this.menuIndex ? '#ffd700' : '#f0eee0') : '#555566');
      if (ab.id === 'limitBreak') {
        row.cost.setText(this.hero.limitBreakCharge >= 4 ? '★READY' : this.hero.limitBreakCharge + '/4');
        row.cost.setColor('#ffd700');
      } else {
        row.cost.setText(this.core.effectiveCost(ab.id) + ' ' + T_(this.game, 'battleCalm'));
        row.cost.setColor(usable ? '#88ccff' : '#555566');
      }
      row.note.setText(cd > 0 ? 'CD ' + cd : '');
      row.sel.setVisible(idx === this.menuIndex);
      row.sel.y = row.name.y;
    }
    const cur = list[this.menuIndex];
    let desc = cur ? this.abilityDesc(cur.id) : '';
    if (desc.length > 72) desc = desc.slice(0, 69) + '...';
    this.descText.setText(desc);
  }

  setPlayerTurn() {
    this.phase = 'player';
    this.turnText.setText(T_(this.game, 'battleYourTurn'));
    this.menuPanel.setVisible(true);
    this.descText.setVisible(true);
    this.refreshMenu();
    this.refreshHud();
  }

  // ── Player action ──
  onConfirm() {
    if (this.phase === 'dialogue') { this.advanceDialogue(); return; }
    if (this.phase !== 'player') return;
    const list = this.menuList();
    const ab = list[this.menuIndex];
    if (!ab) return;
    if (!this.core.canUse(ab.id)) {
      AudioSystem.sfx(this, 'sfx-menu-error', 0.5);
      this.floater(this.scale.width / 2, 240, T_(this.game, 'notEnoughCalm'), '#ff6666');
      return;
    }
    this.phase = 'anim';
    this.turnText.setText('');
    this.menuPanel.setVisible(false);
    this.descText.setVisible(false);

    const result = this.core.useAbility(ab.id);
    this.playAbilityPresentation(ab.id, result);
  }

  playAbilityPresentation(abilityId, result) {
    const fxDef = ABILITY_FX[abilityId] || { fx: 'fx-hit', sfx: 'hit' };
    const target = fxDef.onSelf ? this.heroSprite : this.bossSprite;

    // hero lunge
    this.tweens.add({ targets: this.heroSprite, x: this.heroHome.x + 18, duration: 120, yoyo: true, ease: 'quad.out' });
    AudioSystem.sfx(this, 'sfx-' + fxDef.sfx, 0.7);

    // screen effects for the big ones
    if (abilityId === 'limitBreak' || abilityId === 'breakFree') {
      this.cameras.main.flash(300, 255, 255, 255);
      this.cameras.main.zoomTo(1.12, 150, Phaser.Math.Easing.Quadratic.Out, false, (cam, p) => { if (p === 1) this.cameras.main.zoomTo(1, 260); });
    }

    // FX anim on target
    const fx = this.add.sprite(target.x, target.y, fxDef.fx).setScale(fxDef.onSelf ? 1.6 : 1.4).setDepth(50);
    fx.play(fxDef.fx + '-play');
    fx.once('animationcomplete', () => fx.destroy());

    // damage events
    const dmgEvents = result.events.filter(e => e.type === 'bossDamage');
    let delay = 160;
    for (const ev of dmgEvents) {
      this.time.delayedCall(delay, () => {
        this.hitBoss(ev.amount);
      });
      delay += 220;
    }
    if (result.events.find(e => e.type === 'friendAlly')) {
      this.friendSprite.setVisible(true).setAlpha(0);
      this.tweens.add({ targets: this.friendSprite, alpha: 1, duration: 200, yoyo: true, hold: 1200, onComplete: () => this.friendSprite.setVisible(false) });
      this.floater(60, 160, T_(this.game, 'gotYourBack'), '#ff9966');
    }

    // result message floater
    const msg = TFn_(this.game, result.resultKey, ...result.resultArgs);
    this.time.delayedCall(340, () => {
      this.floater(this.scale.width / 2, 218, msg, ABILITIES[abilityId].color, 8);
      this.refreshHud();
    });

    // outcome
    this.time.delayedCall(Math.max(900, delay + 300), () => {
      if (result.victory) { this.onVictory(); return; }
      if (result.mirrorAdapted) {
        this.showDialogue(T_(this.game, 'speakerAnxiety'), [TFn_(this.game, 'mirrorAdapts', this.abilityName(result.mirrorAdapted))], () => this.bossAct());
        return;
      }
      this.bossAct();
    });
  }

  hitBoss(amount) {
    this.bossSprite.setTintFill(0xffffff);
    this.time.delayedCall(90, () => {
      this.bossSprite.clearTint();
      if (this.level.boss.tint) this.bossSprite.setTint(this.level.boss.tint);
    });
    const kx = 14;
    this.tweens.add({ targets: this.bossSprite, x: this.bossHome.x + kx, duration: 70, yoyo: true, ease: 'quad.out' });
    this.cameras.main.shake(110, Math.min(0.012, 0.003 + amount * 0.00018));
    AudioSystem.sfx(this, 'sfx-boss-hit', 0.5);
    this.floater(this.bossSprite.x + Phaser.Math.Between(-20, 20), 70, '-' + amount, '#ffd700', 10);
    this.refreshHud();
  }

  // ── Boss turn ──
  bossAct() {
    if (this.core.boss.hp <= 0) { this.onVictory(); return; }
    this.phase = 'anim';
    const r = this.core.bossTurn();
    this.pendingBossResult = r;

    // boss lunge + hero hit
    this.tweens.add({ targets: this.bossSprite, x: this.bossHome.x - 26, duration: 160, yoyo: true, ease: 'quad.in' });
    this.time.delayedCall(200, () => {
      this.cameras.main.shake(140, 0.008);
      this.cameras.main.flash(120, 120, 20, 20);
      this.heroSprite.setTintFill(0xff5555);
      this.time.delayedCall(110, () => this.heroSprite.clearTint());
      this.tweens.add({ targets: this.heroSprite, x: this.heroHome.x - 10, duration: 70, yoyo: true, repeat: 2 });
      AudioSystem.sfx(this, 'sfx-hit', 0.7);
      const hitsLabel = r.hits > 1 ? ' x' + r.hits : '';
      this.floater(this.heroSprite.x, 150, '-' + r.totalDmg + ' ' + T_(this.game, 'battleCp') + hitsLabel, '#ff4444', 9);
      this.refreshHud();
    });

    this.time.delayedCall(700, () => {
      const lines = [this.attackFlavor(r.attackIndex)];
      if (r.tauntIdx >= 0) lines.push(this.taunts()[r.tauntIdx % this.taunts().length]);
      this.showDialogue(this.bossName(), lines, () => {
        this.core.afterBossTurn(r);
        if (r.defeat) this.onDefeat();
        else this.setPlayerTurn();
      });
    });
  }

  // ── Outcomes ──
  onVictory() {
    this.phase = 'anim';
    AudioSystem.sfx(this, 'sfx-limit-break', 0.8);
    // death FX chain on boss
    for (let i = 0; i < 4; i++) {
      this.time.delayedCall(i * 180, () => {
        const fx = this.add.sprite(this.bossSprite.x + Phaser.Math.Between(-30, 30), this.bossSprite.y + Phaser.Math.Between(-30, 30), 'fx-explosion').setScale(1.5).setDepth(60);
        fx.play('fx-explosion-play');
        fx.once('animationcomplete', () => fx.destroy());
        this.cameras.main.shake(100, 0.006);
      });
    }
    this.time.delayedCall(800, () => {
      const fx = this.add.sprite(this.bossSprite.x, this.bossSprite.y, 'fx-death').setScale(2).setDepth(60);
      fx.play('fx-death-play');
      fx.once('animationcomplete', () => fx.destroy());
      this.tweens.add({ targets: this.bossSprite, alpha: 0, duration: 600 });
      this.bossBob.stop();
    });
    this.time.delayedCall(1500, () => {
      this.showDialogue(this.bossName(), this.defeatLines(), () => {
        AudioSystem.stopMusic(this);
        // full restore between levels, as the original did
        this.registry.set('worldHero', { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 });
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          if (this.levelIndex === 4) this.scene.start('Victory');
          else this.scene.start('LevelClear', { levelIndex: this.levelIndex });
        });
      });
    });
  }

  onDefeat() {
    this.phase = 'anim';
    const sparkLines = T_(this.game, 'gameOverSpark');
    this.showDialogue(T_(this.game, 'speakerSpark'), Array.isArray(sparkLines) ? sparkLines : [sparkLines], () => {
      AudioSystem.stopMusic(this);
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('GameOver', { levelIndex: this.levelIndex }));
    });
  }

  // ── Dialogue (typewriter) ──
  buildDialogue() {
    const w = this.scale.width;
    this.dlg = this.add.container(0, 0).setDepth(100).setVisible(false);
    const box = this.add.rectangle(w / 2, 285, w - 12, 62, 0x101024, 0.96).setStrokeStyle(2, 0xffd700);
    this.dlgSpeaker = this.add.text(16, 258, '', txtStyle(7, '#ffd700'));
    this.dlgText = this.add.text(16, 272, '', txtStyle(7, '#f0eee0', { wordWrap: { width: w - 40 }, lineSpacing: 4 }));
    this.dlgHint = this.add.text(w - 14, 306, '▼', txtStyle(7, '#8899bb')).setOrigin(1);
    this.dlg.add([box, this.dlgSpeaker, this.dlgText, this.dlgHint]);
  }

  showDialogue(speaker, lines, cb) {
    this.phase = 'dialogue';
    this.menuPanel.setVisible(false);
    this.descText.setVisible(false);
    this.dlg.setVisible(true);
    this.dlgSpeaker.setText(speaker);
    this.dialogueLines = lines.filter(Boolean);
    if (!this.dialogueLines.length) this.dialogueLines = ['...'];
    this.dialogueIdx = 0;
    this.dialogueCb = cb;
    this.typeLine();
  }

  typeLine() {
    const line = this.dialogueLines[this.dialogueIdx];
    this.dlgText.setText('');
    this.dlgHint.setVisible(false);
    this.typing = true;
    let i = 0;
    if (this.typeEvent) this.typeEvent.remove();
    this.typeEvent = this.time.addEvent({
      delay: 20, repeat: line.length - 1,
      callback: () => {
        i++;
        this.dlgText.setText(line.slice(0, i));
        if (i % 3 === 1) AudioSystem.sfx(this, 'sfx-blip', 0.12);
        if (i >= line.length) { this.typing = false; this.dlgHint.setVisible(true); }
      }
    });
  }

  advanceDialogue() {
    if (this.phase !== 'dialogue' || !this.dialogueLines) return;
    if (this.typing) {
      this.typeEvent.remove();
      this.typing = false;
      this.dlgText.setText(this.dialogueLines[this.dialogueIdx]);
      this.dlgHint.setVisible(true);
      return;
    }
    this.dialogueIdx++;
    if (this.dialogueIdx >= this.dialogueLines.length) {
      this.dlg.setVisible(false);
      const cb = this.dialogueCb;
      this.dialogueCb = null;
      if (cb) cb();
    } else {
      this.typeLine();
    }
  }

  // ── Floating text ──
  floater(x, y, text, color, size = 7) {
    const t = this.add.text(x, y, text, txtStyle(size, color, { stroke: '#000', strokeThickness: 3, align: 'center', wordWrap: { width: 300 } })).setOrigin(0.5).setDepth(80);
    this.tweens.add({ targets: t, y: y - 22, alpha: 0, duration: 1400, ease: 'cubic.out', onComplete: () => t.destroy() });
  }
}
