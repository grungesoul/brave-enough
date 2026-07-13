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

    // ── Backdrop: vivid per-level dreamscape (palette from LEVELS.battleBg) ──
    const bb = this.level.battleBg || { sky: '#181230', back: 0x9a88d8, middle: 0x6a55aa, front: 0x3c3070 };
    this.cameras.main.setBackgroundColor(bb.sky);
    const bossCol = Phaser.Display.Color.HexStringToColor(this.level.bossColor).color;
    const horizonCol = bb.horizon == null ? bossCol : bb.horizon;
    this.bgLayers = [];
    for (const [key, speed, tint] of [
      ['parallax-back', 0.10, bb.back], ['parallax-middle', 0.25, bb.middle], ['parallax-front', 0.45, bb.front]
    ]) {
      const ts = this.add.tileSprite(w / 2, h / 2, w / 2, 160, key).setScale(2).setTint(tint);
      ts.scrollSpeed = speed;
      this.bgLayers.push(ts);
    }
    this.add.rectangle(0, 0, w, h, 0x120c24, 0.16).setOrigin(0); // gentle depth push only
    // warm horizon glow + boss aura keep the scene breathing
    const horizon = this.add.ellipse(w / 2, 205, w * 1.3, 110, horizonCol, 0.10).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({ targets: horizon, alpha: 0.7, duration: 2200, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    this.bgFog = this.add.tileSprite(w / 2, 150, w, 180, 'fx-fog')
      .setAlpha(bb.fogHeavy ? 0.2 : 0.12).setTint(horizonCol).setBlendMode(Phaser.BlendModes.ADD);
    const glow = this.add.ellipse(130, 120, 260, 150, bossCol, 0.16);
    this.tweens.add({ targets: glow, scaleX: 1.15, scaleY: 1.1, duration: 1600, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    this.add.rectangle(0, 206, w, 2, 0x555588, 0.7).setOrigin(0); // stage floor line
    if (HD2D.isWebGL(this)) glow.postFX.addBloom(0xffffff, 1, 1, 1, 1.2, 4);
    // level dressing: window god rays (school levels) / stage spotlight cone
    if (bb.rays) { HD2D.ray(this, 320, -6, { scale: 0.7, alpha: 0.12, color: 0xfff2c0 }); HD2D.ray(this, 430, -10, { scale: 0.55, alpha: 0.1, color: 0xfff2c0 }); }
    if (bb.spot) {
      const spot = this.add.ellipse(this.levelIndex === 1 ? 128 : 128, 140, 150, 240, 0xfff6d8, 0.10).setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({ targets: spot, alpha: 0.75, duration: 1800, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }
    HD2D.motes(this, w, h, { color: 0xfff6d8, frequency: 300 });
    // cinematic camera grade + diorama blur (tuned for 480x320)
    HD2D.grade(this, {
      contrast: 0.12, saturate: 0.18, brightness: 1.3,
      vignette: [0.5, 0.45, 0.78, 0.36],
      tiltshift: [0.4, 0.6, 0.1, 0.6, 0.6, 0.6]
    });

    // ── Boss (LEFT side, Octopath composition) ──
    const b = this.level.boss;
    this.bossHome = { x: 128, y: 130 };
    this.bossSprite = b.static
      ? this.add.image(this.bossHome.x, this.bossHome.y, b.spriteKey)
      : this.add.sprite(this.bossHome.x, this.bossHome.y, b.spriteKey).play(b.spriteKey + '-idle');
    this.bossTint = b.tint || null; // current tint (phase 2 may repaint it)
    if (b.tint) this.bossSprite.setTint(b.tint);
    this.bossSprite.setScale(this.levelIndex === 4 ? 1.15 : 1);
    this.bossSprite.setFlipX(true); // face right, toward the heroes
    this.bossBob = this.tweens.add({ targets: this.bossSprite, y: this.bossHome.y - 6, duration: 1300, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    if (b.static) {
      // static bosses (El Foco) breathe via a light pulse instead of frames
      this.tweens.add({ targets: this.bossSprite, alpha: 0.72, scaleX: 1.06, scaleY: 1.06, duration: 900, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }
    // grounding shadow + rim glow (HD-2D presence)
    this.add.ellipse(this.bossHome.x, this.bossHome.y + this.bossSprite.displayHeight * 0.42,
      this.bossSprite.displayWidth * 0.6, 10, 0x000000, 0.3);
    this.bossSprite.setDepth(1);
    if (HD2D.isWebGL(this)) {
      this.bossSprite.preFX.setPadding(10);
      this.bossGlowFX = this.bossSprite.preFX.addGlow(bossCol, 2.5, 0);
    }

    // ── Hero (RIGHT side, side view, facing the enemy) ──
    this.heroHome = { x: 392, y: 172 };
    this.add.ellipse(this.heroHome.x, 206, 26, 8, 0x000000, 0.3);
    this.heroSprite = this.add.sprite(this.heroHome.x, this.heroHome.y, 'hero', 12).setScale(2.2);
    this.heroSprite.play('hero-idle-side'); // left-facing breathing idle
    HD2D.rim(this, this.heroSprite, 0xdfe8ff, 1.2);

    // friend ally (Find Your People) — steps in behind the hero
    this.friendSprite = this.add.sprite(438, 186, 'adam', 12).setScale(1.8).setVisible(false);
    this.friendSprite.play('adam-idle-side');
    HD2D.rim(this, this.friendSprite, 0xffe0b0, 1.1);

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

    // climax levels (exam + final) get the heavy boss track
    AudioSystem.playMusic(this, this.levelIndex >= 3 ? 'music-boss-final' : 'music-battle');

    // Boss intro: name banner slides in, then the opening taunt.
    // phase 'anim' during the banner so Enter-mashing can't touch dialogue state.
    this.phase = 'anim';
    this.dialogueLines = null;
    this.dialogueIdx = 0;
    this.typing = false;
    const bossName = this.bossName();
    const lbox = HD2D.letterbox(this);
    const banner = this.add.container(0, 0).setDepth(90);
    const bband = this.add.rectangle(w / 2, 100, w, 40, 0x000000, 0.75);
    const btext = this.add.text(w + 200, 100, bossName.toUpperCase(), txtStyle(14, this.level.bossColor, { stroke: '#000', strokeThickness: 4 })).setOrigin(0.5);
    banner.add([bband, btext]);
    AudioSystem.sfx(this, 'sfx-debuff', 0.7);
    this.tweens.add({ targets: btext, x: w / 2, duration: 500, ease: 'cubic.out' });
    this.tweens.add({ targets: banner, alpha: 0, delay: 1600, duration: 400, onComplete: () => banner.destroy() });
    this.time.delayedCall(2100, () => {
      this.showDialogue(bossName, [this.taunts()[0]], () => { lbox.hide(); this.setPlayerTurn(); });
    });
    this.refreshHud();
    this.refreshMenu();
  }

  // ── Text lookups ──
  bossName() {
    if (this.core && this.core.boss.phase === 2) {
      const n2 = (T_(this.game, 'bossPhase2Names') || [])[this.levelIndex];
      if (n2) return n2;
    }
    return (T_(this.game, 'bossNames') || [])[this.levelIndex] || '???';
  }
  taunts() { return (T_(this.game, 'bossTaunts') || [])[this.levelIndex] || ['...']; }
  defeatLines() { return (T_(this.game, 'bossDefeatLines') || [])[this.levelIndex] || ['...']; }
  attackFlavor(i) {
    const key = this.core.boss.phase === 2 ? 'bossPhase2AttackFlavors' : 'bossAttackFlavors';
    const f = (T_(this.game, key) || [])[this.levelIndex] || [];
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

  // ── HUD (Octopath layout: boss top-left, hero panel right, break row) ──
  buildHud() {
    const w = this.scale.width;
    // boss bar (top-left)
    this.add.text(14, 10, this.bossName(), txtStyle(8, this.level.bossColor));
    this.bossBarBg = this.add.rectangle(14, 26, 200, 8, 0x222233).setOrigin(0);
    this.bossBarGhost = this.add.rectangle(15, 27, 198, 6, 0xffffff).setOrigin(0);
    this.bossBar = this.add.rectangle(15, 27, 198, 6, 0xcc3344).setOrigin(0);
    this.bossHpText = this.add.text(220, 24, '', txtStyle(7, '#ccaaaa'));

    // hero panel (right column, Octopath party-list style)
    const px = 342, py = 8;
    this.add.nineslice(px + 66, py + 36, 'ui-panel', 0, 132, 72, 5, 5, 5, 5).setAlpha(0.88);
    this.add.rectangle(px + 66, py + 36, 132, 72).setStrokeStyle(1, 0xffd700, 0.35);
    this.add.text(px + 8, py + 5, this.registry.get('playerName') || 'YOU', txtStyle(7, '#ffd700'));
    this.add.text(px + 8, py + 21, T_(this.game, 'battleCp'), txtStyle(6, '#ff8888'));
    this.cpBarBg = this.add.rectangle(px + 36, py + 20, 62, 7, 0x222233).setOrigin(0);
    this.cpBarGhost = this.add.rectangle(px + 37, py + 21, 60, 5, 0xffffff).setOrigin(0);
    this.cpBar = this.add.rectangle(px + 37, py + 21, 60, 5, 0xcc4455).setOrigin(0);
    this.cpText = this.add.text(px + 126, py + 21, '', txtStyle(5, '#ffaaaa')).setOrigin(1, 0);

    this.add.text(px + 8, py + 36, T_(this.game, 'battleCalm'), txtStyle(6, '#88ccff'));
    this.calmBarBg = this.add.rectangle(px + 36, py + 35, 62, 7, 0x222233).setOrigin(0);
    this.calmBar = this.add.rectangle(px + 37, py + 36, 60, 5, 0x4488cc).setOrigin(0);
    this.calmText = this.add.text(px + 126, py + 36, '', txtStyle(5, '#aaddff')).setOrigin(1, 0);

    // limit gauge as BP-style diamonds
    this.add.text(px + 8, py + 52, 'SIN MIEDO', txtStyle(6, '#ffd700'));
    this.limitPips = [];
    for (let i = 0; i < 4; i++) {
      const p = this.add.rectangle(px + 78 + i * 13, py + 56, 8, 8, 0x333322).setAngle(45);
      this.limitPips.push(p);
    }

    // turn-order diamonds (top-center): you / the boss
    const bossCol = Phaser.Display.Color.HexStringToColor(this.level.bossColor).color;
    this.turnDiamondHero = this.add.rectangle(w / 2 - 12, 16, 12, 12, 0xffd700).setAngle(45);
    this.turnDiamondBoss = this.add.rectangle(w / 2 + 12, 16, 12, 12, bossCol).setAngle(45);
    this.turnText = this.add.text(w / 2, 30, '', txtStyle(6, '#8899bb')).setOrigin(0.5, 0);

    // break system row under the boss: shield badge + weakness slots
    this.buildBreakRow();

    // status badges (buffs green / debuffs red, boss statuses by the boss bar)
    this.heroStatusText = this.add.text(px + 8, py + 66, '', txtStyle(6, '#88ff88'));
    this.bossStatusText = this.add.text(14, 38, '', txtStyle(6, '#ffaa88'));
  }

  buildBreakRow() {
    const boss = this.core.boss;
    if (!boss.maxShield) { this.breakRow = null; return; }
    const cx = this.bossHome.x;
    const y = Math.min(212, Math.round(this.bossHome.y + this.bossSprite.displayHeight * 0.42) + 14);
    const n = boss.weaknesses.length;
    const totalW = 18 + n * 16;
    const x0 = cx - totalW / 2;
    this.breakRow = this.add.container(0, 0).setDepth(3);
    // shield badge: blue diamond + hit-count
    this.shieldDiamond = this.add.rectangle(x0 + 7, y, 11, 11, 0x3366cc).setStrokeStyle(1, 0xaaccff, 1).setAngle(45);
    this.shieldText = this.add.text(x0 + 7, y, '', txtStyle(6, '#ffffff')).setOrigin(0.5);
    this.breakRow.add([this.shieldDiamond, this.shieldText]);
    // weakness slots: '?' until the matching technique is used
    this.weakSlots = [];
    for (let i = 0; i < n; i++) {
      const sx = x0 + 22 + i * 16;
      const box = this.add.rectangle(sx, y, 13, 13, 0x111122, 0.85).setStrokeStyle(1, 0x555577, 1);
      const label = this.add.text(sx, y, '?', txtStyle(6, '#777799')).setOrigin(0.5);
      this.breakRow.add([box, label]);
      this.weakSlots.push({ box, label });
    }
    // VULNERABLE banner (hidden until a break)
    this.vulnText = this.add.text(cx, y + 14, T_(this.game, 'battleVulnerable'), txtStyle(7, '#ffdd44', { stroke: '#000', strokeThickness: 3 }))
      .setOrigin(0.5).setVisible(false).setDepth(3);
  }

  refreshBreakRow() {
    if (!this.breakRow) return;
    const boss = this.core.boss;
    this.shieldText.setText(String(boss.shield));
    this.shieldDiamond.fillColor = boss.broken ? 0x884422 : 0x3366cc;
    boss.weaknesses.forEach((id, i) => {
      const slot = this.weakSlots[i];
      if (!slot) return;
      if (boss.revealed.includes(id)) {
        const ab = ABILITIES[id];
        slot.label.setText(this.abilityName(id).slice(0, 1).toUpperCase()).setColor(ab && ab.color ? ab.color : '#ffd700');
        slot.box.setStrokeStyle(1, 0xffd700, 0.9);
      } else {
        slot.label.setText('?').setColor('#777799');
        slot.box.setStrokeStyle(1, 0x555577, 1);
      }
    });
    if (this.vulnText) this.vulnText.setVisible(boss.broken);
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

    this.tweens.add({ targets: this.cpBar, width: 60 * (h.cp / h.maxCp), duration: 350, ease: 'cubic.out' });
    this.tweens.add({ targets: this.cpBarGhost, width: 60 * (h.cp / h.maxCp), duration: 900, delay: 250, ease: 'cubic.out' });
    this.cpText.setText(h.cp + '/' + h.maxCp);
    this.tweens.add({ targets: this.calmBar, width: 60 * (h.calm / h.maxCalm), duration: 350, ease: 'cubic.out' });
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
    this.refreshBreakRow();
  }

  // ── Ability menu (Octopath command box: bottom-right stack) ──
  buildMenu() {
    const w = this.scale.width;
    // floating command box beside the acting hero (Octopath style)
    const mx = 196, my = 210, mw = 196, rows = 4;
    this.menuPanel = this.add.container(0, 0).setDepth(10);
    const bg = this.add.nineslice(mx + mw / 2, my + 40, 'ui-panel', 0, mw, 80, 5, 5, 5, 5).setAlpha(0.95);
    const bgEdge = this.add.rectangle(mx + mw / 2, my + 40, mw, 80).setStrokeStyle(1, this.level.accent, 0.9);
    this.menuPanel.add([bg, bgEdge]);
    this.menuRows = [];
    this.menuVisibleRows = rows;
    for (let i = 0; i < rows; i++) {
      const y = my + 8 + i * 17;
      const row = {
        sel: this.add.text(mx + 6, y, '▶', txtStyle(7, '#ffd700')).setVisible(false),
        name: this.add.text(mx + 20, y, '', txtStyle(7, '#f0eee0')).setInteractive({ useHandCursor: true }),
        cost: this.add.text(mx + mw - 8, y, '', txtStyle(6, '#88ccff')).setOrigin(1, 0),
        note: this.add.text(mx + mw - 8, y + 8, '', txtStyle(5, '#997755')).setOrigin(1, 0),
      };
      row.name.on('pointerover', () => { if (this.phase === 'player') { this.menuIndex = this.menuScroll + i; this.refreshMenu(); } });
      row.name.on('pointerdown', () => { if (this.phase === 'player') { this.menuIndex = this.menuScroll + i; this.onConfirm(); } });
      this.menuPanel.add([row.sel, row.name, row.cost, row.note]);
      this.menuRows.push(row);
    }
    // description tooltip strip (bottom-left, like Octopath's hint bar)
    this.descText = this.add.text(12, 296, '', txtStyle(6, '#8899bb', { wordWrap: { width: 300 }, lineSpacing: 3 })).setDepth(10);
    this.menuPanel.add(this.descText);
  }

  menuList() { return this.core.availableAbilities(); }

  menuMove(dir) {
    if (this.phase !== 'player') return;
    const list = this.menuList();
    const vis = this.menuVisibleRows;
    this.menuIndex = Phaser.Math.Wrap(this.menuIndex + dir, 0, list.length);
    if (this.menuIndex < this.menuScroll) this.menuScroll = this.menuIndex;
    if (this.menuIndex >= this.menuScroll + vis) this.menuScroll = this.menuIndex - (vis - 1);
    AudioSystem.sfx(this, 'sfx-menu-move', 0.4);
    this.refreshMenu();
  }

  refreshMenu() {
    const list = this.menuList();
    for (let i = 0; i < this.menuVisibleRows; i++) {
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
    this.turnDiamondHero.setScale(1.25).setAlpha(1);
    this.turnDiamondBoss.setScale(0.85).setAlpha(0.45);
    this.menuPanel.setVisible(true).setAlpha(0).setX(10);
    this.tweens.add({ targets: this.menuPanel, alpha: 1, x: 0, duration: 160, ease: 'quad.out' }); // float in beside the hero
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

    // hero lunge (toward the enemy on the left)
    this.tweens.add({ targets: this.heroSprite, x: this.heroHome.x - 22, duration: 120, yoyo: true, ease: 'quad.out' });
    AudioSystem.sfx(this, 'sfx-' + fxDef.sfx, 0.7);

    // screen effects for the big ones
    if (abilityId === 'limitBreak' || abilityId === 'breakFree') {
      this.cameras.main.flash(300, 255, 255, 255);
      // yoyo tween: always returns to zoom 1 even if the battle ends mid-punch
      this.tweens.add({
        targets: this.cameras.main, zoom: 1.12, duration: 150, yoyo: true,
        ease: 'quad.out', onComplete: () => this.cameras.main.setZoom(1)
      });
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
    // break-system feedback
    if (result.events.find(e => e.type === 'weakHit')) {
      this.time.delayedCall(300, () => {
        AudioSystem.sfx(this, 'sfx-zap', 0.5);
        this.floater(this.bossHome.x, 190, T_(this.game, 'battleWeakHit'), '#ffdd44', 8);
        if (this.shieldDiamond) {
          this.tweens.add({ targets: [this.shieldDiamond, this.shieldText], scale: 1.6, duration: 120, yoyo: true });
        }
      });
    }
    if (result.events.find(e => e.type === 'break')) {
      this.time.delayedCall(560, () => this.playBreak());
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
      if (result.events.find(e => e.type === 'phaseChange')) { this.onPhaseChange(); return; }
      if (result.mirrorAdapted) {
        this.showDialogue(T_(this.game, 'speakerAnxiety'), [TFn_(this.game, 'mirrorAdapts', this.abilityName(result.mirrorAdapted))], () => this.bossAct());
        return;
      }
      this.bossAct();
    });
  }

  // Octopath BREAK: banner, shatter FX, boss slumps pale until its lost turn
  playBreak() {
    const w = this.scale.width;
    AudioSystem.sfx(this, 'sfx-limit-break', 0.9);
    this.cameras.main.shake(300, 0.01);
    this.cameras.main.flash(200, 255, 240, 160);
    const fx = this.add.sprite(this.bossSprite.x, this.bossSprite.y, 'fx-shield').setScale(2.2).setDepth(55);
    fx.play('fx-shield-play');
    fx.once('animationcomplete', () => fx.destroy());
    const t = this.add.text(this.bossHome.x, 78, T_(this.game, 'battleBreak'),
      txtStyle(16, '#ffdd44', { stroke: '#000', strokeThickness: 5 })).setOrigin(0.5).setDepth(80).setScale(0.3);
    this.tweens.add({ targets: t, scale: 1, duration: 220, ease: 'back.out' });
    this.tweens.add({ targets: t, alpha: 0, delay: 1100, duration: 300, onComplete: () => t.destroy() });
    // pale, slumped boss while broken
    this.bossSprite.setTint(0x8888aa);
    this.tweens.add({ targets: this.bossSprite, angle: 6, y: this.bossHome.y + 8, duration: 250, ease: 'quad.out' });
    if (this.bossGlowFX) this.bossGlowFX.outerStrength = 0.5;
    this.refreshBreakRow();
  }

  // boss recovers its posture when the broken turn ends
  clearBreakPose() {
    this.bossSprite.setTint(this.bossTint || 0xffffff);
    if (!this.bossTint) this.bossSprite.clearTint();
    this.tweens.add({ targets: this.bossSprite, angle: 0, y: this.bossHome.y, duration: 250 });
    if (this.bossGlowFX) this.bossGlowFX.outerStrength = 2.5;
    this.refreshBreakRow();
  }

  hitBoss(amount) {
    this.bossSprite.setTintFill(0xffffff);
    this.time.delayedCall(90, () => {
      this.bossSprite.clearTint();
      if (this.core.boss.broken) this.bossSprite.setTint(0x8888aa);
      else if (this.bossTint) this.bossSprite.setTint(this.bossTint);
    });
    const kx = -14; // knocked back to the left
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
    this.turnDiamondHero.setScale(0.85).setAlpha(0.45);
    this.turnDiamondBoss.setScale(1.25).setAlpha(1);
    const r = this.core.bossTurn();
    this.pendingBossResult = r;

    // broken boss loses this turn entirely
    if (r.stunned) {
      this.floater(this.bossHome.x, 140, T_(this.game, 'battleBossStunned'), '#aaccff', 7);
      AudioSystem.sfx(this, 'sfx-debuff', 0.5);
      this.time.delayedCall(1300, () => {
        this.clearBreakPose();
        this.core.afterBossTurn(r);
        this.refreshHud();
        this.setPlayerTurn();
      });
      return;
    }

    // boss lunge (toward the heroes on the right) + hero hit
    this.tweens.add({ targets: this.bossSprite, x: this.bossHome.x + 26, duration: 160, yoyo: true, ease: 'quad.in' });
    this.time.delayedCall(200, () => {
      this.cameras.main.shake(140, 0.008);
      this.cameras.main.flash(120, 120, 20, 20);
      this.heroSprite.setTintFill(0xff5555);
      this.time.delayedCall(110, () => this.heroSprite.clearTint());
      this.tweens.add({ targets: this.heroSprite, x: this.heroHome.x + 10, duration: 70, yoyo: true, repeat: 2 });
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

  // ── Phase change (two-phase bosses, e.g. the exam's Red Pen) ──
  onPhaseChange() {
    this.phase = 'anim';
    const w = this.scale.width, h = this.scale.height;
    AudioSystem.sfx(this, 'sfx-limit-break', 0.8);
    this.cameras.main.shake(450, 0.012);
    this.cameras.main.flash(500, 255, 255, 255);

    // the boss pales into its second form; a washed-out veil drains the scene
    const p2 = this.level.boss.phase2 || {};
    this.bossTint = p2.tint || 0xffffff;
    this.bossSprite.setTint(this.bossTint).setAngle(0).setY(this.bossHome.y);
    if (this.bossGlowFX) { this.bossGlowFX.color = this.bossTint; this.bossGlowFX.outerStrength = 2.5; }
    // phase 2 has its own weaknesses/shield — rebuild the break row
    if (this.breakRow) { this.breakRow.destroy(); if (this.vulnText) this.vulnText.destroy(); }
    this.buildBreakRow();
    this.refreshBreakRow();
    const lbox2 = HD2D.letterbox(this);
    const veil = this.add.rectangle(0, 0, w, h, 0xe8e8f4, 0).setOrigin(0).setDepth(5);
    this.tweens.add({ targets: veil, fillAlpha: 0.15, duration: 900 });

    // second name banner, like the battle intro
    const name2 = (T_(this.game, 'bossPhase2Names') || [])[this.levelIndex] || this.bossName();
    const banner = this.add.container(0, 0).setDepth(90);
    const bband = this.add.rectangle(w / 2, 100, w, 40, 0x000000, 0.75);
    const btext = this.add.text(w + 200, 100, name2.toUpperCase(), txtStyle(14, '#f0f0ff', { stroke: '#000', strokeThickness: 4 })).setOrigin(0.5);
    banner.add([bband, btext]);
    this.tweens.add({ targets: btext, x: w / 2, duration: 500, ease: 'cubic.out' });
    this.tweens.add({ targets: banner, alpha: 0, delay: 1600, duration: 400, onComplete: () => banner.destroy() });

    this.time.delayedCall(2100, () => {
      const lines = (T_(this.game, 'bossPhase2Lines') || [])[this.levelIndex] || ['...'];
      this.refreshHud();
      this.showDialogue(name2, lines, () => { lbox2.hide(); this.bossAct(); });
    });
  }

  // ── Outcomes ──
  onVictory() {
    this.phase = 'anim';
    this.cameras.main.setZoom(1); // safety: never end a battle zoomed in
    if (this.breakRow) this.breakRow.setVisible(false);
    if (this.vulnText) this.vulnText.setVisible(false);
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
    this.cameras.main.setZoom(1);
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
    const box = this.add.nineslice(w / 2, 285, 'ui-panel', 0, w - 12, 62, 5, 5, 5, 5).setAlpha(0.97);
    const edge = this.add.rectangle(w / 2, 285, w - 12, 62).setStrokeStyle(1, 0xffd700, 0.85);
    // portrait slot floats half-out of the box, Octopath style
    this.dlgPortrait = null;
    this.dlgSpeaker = this.add.text(64, 258, '', txtStyle(7, '#ffd700'));
    this.dlgText = this.add.text(64, 272, '', txtStyle(7, '#f0eee0', { wordWrap: { width: w - 90 }, lineSpacing: 4 }));
    this.dlgHint = this.add.text(w - 14, 306, '▼', txtStyle(7, '#8899bb')).setOrigin(1);
    this.dlg.add([box, edge, this.dlgSpeaker, this.dlgText, this.dlgHint]);
  }

  // speaker → portrait spec. Bosses show their (tinted) battle sprite; the
  // Spark speaks through the hero's own face, lit gold.
  portraitFor(speaker) {
    if (speaker === T_(this.game, 'speakerSpark')) return { key: 'hero', mode: 'head', tint: 0xffe9a0, edge: 0xffd700 };
    return { key: this.level.boss.spriteKey, mode: 'fit', tint: this.bossTint || undefined, edge: Phaser.Display.Color.HexStringToColor(this.level.bossColor).color };
  }

  setDialoguePortrait(spec) {
    if (this.dlgPortrait) { this.dlgPortrait.destroy(); this.dlgPortrait = null; }
    if (!spec) return;
    this.dlgPortrait = HD2D.portrait(this, 34, 278, spec.key, spec);
    this.dlg.add(this.dlgPortrait);
  }

  showDialogue(speaker, lines, cb) {
    this.setDialoguePortrait(this.portraitFor(speaker));
    this.phase = 'dialogue';
    this.menuPanel.setVisible(false);
    this.descText.setVisible(false);
    this.dlg.setVisible(true);
    this.dlgSpeaker.setText(speaker);
    // taunt arrays may hold functions of the player name (L5 knows you)
    const pname = this.registry.get('playerName') || '...';
    this.dialogueLines = lines.filter(Boolean).map(l => typeof l === 'function' ? l(pname) : l);
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

  update(time, dt) {
    for (const l of this.bgLayers) l.tilePositionX += l.scrollSpeed * dt * 0.02;
    if (this.bgFog) this.bgFog.tilePositionX += dt * 0.006;
  }

  // ── Floating text ──
  floater(x, y, text, color, size = 7) {
    const t = this.add.text(x, y, text, txtStyle(size, color, { stroke: '#000', strokeThickness: 3, align: 'center', wordWrap: { width: 300 } })).setOrigin(0.5).setDepth(80);
    this.tweens.add({ targets: t, y: y - 22, alpha: 0, duration: 1400, ease: 'cubic.out', onComplete: () => t.destroy() });
  }
}
