'use strict';

// Data-driven exploration scene: one scene instance handles all 5 levels via
// MAPS[levelIndex] + LEVELS[levelIndex]. NPC dialogue → boss trigger → Battle.
class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  init(data) {
    this.levelIndex = data.levelIndex || 0;
  }

  create() {
    const mapDef = MAPS[this.levelIndex] || MAPS[0];
    const level = LEVELS[this.levelIndex];
    this.mapDef = mapDef;
    this.cameras.main.fadeIn(400, 0, 0, 0);

    // ── Tile layers ──
    const groundMap = this.make.tilemap({ data: mapDef.ground, tileWidth: T, tileHeight: T });
    const groundTiles = groundMap.addTilesetImage('tiles-' + mapDef.groundTileset);
    this.groundLayer = groundMap.createLayer(0, groundTiles, 0, 0);
    this.groundLayer.setCollision(mapDef.collideGround);

    const propsMap = this.make.tilemap({ data: mapDef.props, tileWidth: T, tileHeight: T });
    const propsTiles = propsMap.addTilesetImage('tiles-' + mapDef.propsTileset);
    this.propsLayer = propsMap.createLayer(0, propsTiles, 0, 0);
    this.propsLayer.setCollisionByExclusion([-1]);

    // decorative layer (rugs, wall boards) — never collides
    if (mapDef.deco) {
      const decoMap = this.make.tilemap({ data: mapDef.deco, tileWidth: T, tileHeight: T });
      const decoTiles = decoMap.addTilesetImage('tiles-' + mapDef.propsTileset);
      decoMap.createLayer(0, decoTiles, 0, 0).setDepth(1);
    }

    // ── Mood: ambient tint + stage spotlight ──
    if (mapDef.ambient) {
      this.add.rectangle(0, 0, mapDef.width * T, mapDef.height * T, mapDef.ambient.color, mapDef.ambient.alpha)
        .setOrigin(0).setDepth(20);
    }
    if (mapDef.spotlight) {
      const bt0 = mapDef.bossTrigger;
      const sx = bt0.x * T + (bt0.w * T) / 2, sy = bt0.y * T + bt0.h * T;
      const spot = this.add.ellipse(sx, sy + 10, 120, 70, 0xffe9a0, 0.22).setDepth(21).setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({ targets: spot, scaleX: 1.08, scaleY: 1.05, alpha: 0.3, duration: 1500, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }

    // ── Player ──
    const spawn = mapDef.playerSpawn;
    this.player = this.physics.add.sprite(spawn.x * T + T / 2, spawn.y * T + T / 2, 'hero', 0);
    this.player.body.setSize(14, 12).setOffset(9, 18); // feet-only collision box
    this.player.setDepth(10);
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.propsLayer);

    const mapW = mapDef.width * T, mapH = mapDef.height * T;
    this.physics.world.setBounds(0, 0, mapW, mapH);
    this.player.setCollideWorldBounds(true);
    this.cameras.main.setBounds(0, 0, mapW, mapH);
    this.cameras.main.startFollow(this.player, true);

    // ── NPCs ──
    this.npcs = [];
    mapDef.npcs.forEach((pos, i) => {
      const def = level.npcs[i];
      if (!def) return;
      const key = def.sprite || 'npc-guy';
      const npc = this.physics.add.staticSprite(pos.x * T + T / 2, pos.y * T + T / 2, key, 0);
      if (def.tint) npc.setTint(def.tint);
      npc.setDepth(5);
      if (this.anims.exists(key + '-idle')) {
        npc.play(key + '-idle');
        npc.setOrigin(0.5, 0.72); // 16x32 modern sprites: feet on the tile
      }
      npc.npcIndex = i;
      npc.talked = false;
      // subtle idle bob so NPCs read as alive
      this.tweens.add({ targets: npc, y: npc.y - 1, duration: 900 + i * 130, yoyo: true, repeat: -1 });
      this.physics.add.collider(this.player, npc);
      this.npcs.push(npc);
      npc.setInteractive({ useHandCursor: true });
      npc.on('pointerdown', () => this.tryTalk(npc, true));
    });

    // ── Calm gems (pickup = +5 Calm) ──
    this.anims.exists('gem-spin') || this.anims.create({ key: 'gem-spin', frames: this.anims.generateFrameNumbers('gems', { start: 0, end: 5 }), frameRate: 8, repeat: -1 });
    const gemSpots = (mapDef.gems || this.defaultGemSpots(mapDef));
    this.gems = gemSpots.map(([gx, gy]) => {
      const g = this.physics.add.staticSprite(gx * T + T / 2, gy * T + T / 2, 'gems', 0).play('gem-spin');
      g.setDepth(4);
      this.physics.add.overlap(this.player, g, () => {
        if (!g.active) return;
        g.destroy();
        AudioSystem.sfx(this, 'sfx-heal', 0.5);
        const hero2 = this.registry.get('worldHero') || { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 };
        hero2.calm = Math.min(hero2.maxCalm, hero2.calm + 5);
        this.registry.set('worldHero', { ...hero2 });
        const ft = this.add.text(g.x, g.y - 10, '+5', txtStyle(7, '#88ffee', { stroke: '#000', strokeThickness: 3 })).setOrigin(0.5).setDepth(50);
        this.tweens.add({ targets: ft, y: ft.y - 16, alpha: 0, duration: 900, onComplete: () => ft.destroy() });
      });
      return g;
    });

    // ── Boss trigger ──
    const bt = mapDef.bossTrigger;
    this.bossZone = this.add.zone(bt.x * T, bt.y * T, bt.w * T, bt.h * T).setOrigin(0);
    this.physics.add.existing(this.bossZone, true);
    // pulsing marker so the player knows where the boss waits
    this.bossMarker = this.add.text(bt.x * T + (bt.w * T) / 2, bt.y * T + bt.h * T - 4, '!', txtStyle(12, '#ff5555')).setOrigin(0.5, 1).setDepth(6);
    this.tweens.add({ targets: this.bossMarker, y: this.bossMarker.y - 4, duration: 500, yoyo: true, repeat: -1 });
    this.bossTriggered = false;
    this.physics.add.overlap(this.player, this.bossZone, () => this.startBattle());

    // ── Input ──
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.input.keyboard.on('keydown-ENTER', () => this.onAction());
    this.input.keyboard.on('keydown-SPACE', () => this.onAction());
    this.input.keyboard.on('keydown-Z', () => this.onAction());
    this.input.keyboard.on('keydown-M', () => AudioSystem.toggleMute(this.game));
    this.input.on('pointerdown', () => { if (this.dialogueActive) this.advanceDialogue(); });

    // tap-to-move: hold pointer to walk toward it (mouse support like original)
    this.pointerTarget = null;
    this.input.on('pointerdown', p => { if (!this.dialogueActive) this.pointerTarget = { x: p.worldX, y: p.worldY }; });
    this.input.on('pointerup', () => { this.pointerTarget = null; });

    // ── Dialogue box ──
    this.createDialogueBox();
    this.dialogueActive = false;

    // ── HUD ──
    this.scene.launch('UI', { levelIndex: this.levelIndex });

    AudioSystem.playMusic(this, 'music-world');
    this.lastDir = 'down';
    this.stepTimer = 0;
  }

  // Pick three walkable-ish gem spots away from spawn/NPCs
  defaultGemSpots(mapDef) {
    const spots = [];
    const candidates = [
      [3, mapDef.height - 4], [mapDef.width - 4, mapDef.height - 4], [mapDef.width - 5, 4],
      [4, 5], [Math.floor(mapDef.width / 2) - 4, Math.floor(mapDef.height / 2)]
    ];
    for (const [cx, cy] of candidates) {
      if (spots.length >= 3) break;
      if (cx <= 1 || cy <= 2 || cx >= mapDef.width - 1 || cy >= mapDef.height - 1) continue;
      if (mapDef.props[cy] && mapDef.props[cy][cx] === -1) spots.push([cx, cy]);
    }
    return spots;
  }

  // ── Dialogue ──
  createDialogueBox() {
    const w = this.scale.width;
    this.dlg = this.add.container(0, 0).setScrollFactor(0).setDepth(100).setVisible(false);
    const box = this.add.rectangle(w / 2, 270, w - 20, 84, 0x101024, 0.94).setStrokeStyle(2, 0xffd700);
    this.dlgSpeaker = this.add.text(20, 234, '', txtStyle(7, '#ffd700'));
    this.dlgText = this.add.text(20, 250, '', txtStyle(7, '#f0eee0', { wordWrap: { width: w - 44 }, lineSpacing: 5 }));
    this.dlgHint = this.add.text(w - 16, 302, '▼', txtStyle(7, '#8899bb')).setOrigin(1);
    this.dlg.add([box, this.dlgSpeaker, this.dlgText, this.dlgHint]);
  }

  tryTalk(npc, fromClick = false) {
    if (this.dialogueActive || this.bossTriggered) return;
    if (!fromClick) {
      // find nearest NPC in range
      npc = this.npcs.find(n => Phaser.Math.Distance.Between(this.player.x, this.player.y, n.x, n.y) < 28);
    } else if (Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y) > 40) {
      return; // clicked from too far away
    }
    if (!npc) return;

    const lang = this.registry.get('lang');
    const lines = (TRANSLATIONS[lang] && TRANSLATIONS[lang].npcs && TRANSLATIONS[lang].npcs[`l${this.levelIndex + 1}n${npc.npcIndex + 1}`])
      || TRANSLATIONS.en.npcs[`l${this.levelIndex + 1}n${npc.npcIndex + 1}`] || [];
    if (!lines.length) return;

    const def = LEVELS[this.levelIndex].npcs[npc.npcIndex];
    this.activeNpc = npc;
    this.dialogueLines = lines;
    this.dialogueIdx = 0;
    this.dialogueActive = true;
    this.dlg.setVisible(true);
    this.dlgSpeaker.setText(def.name || '???');
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
      delay: 22, repeat: line.length - 1,
      callback: () => {
        i++;
        this.dlgText.setText(line.slice(0, i));
        if (i % 3 === 1) AudioSystem.sfx(this, 'sfx-blip', 0.15);
        if (i >= line.length) { this.typing = false; this.dlgHint.setVisible(true); }
      }
    });
  }

  advanceDialogue() {
    if (this.typing) {
      // skip typewriter
      this.typeEvent.remove();
      this.typing = false;
      this.dlgText.setText(this.dialogueLines[this.dialogueIdx]);
      this.dlgHint.setVisible(true);
      return;
    }
    this.dialogueIdx++;
    if (this.dialogueIdx >= this.dialogueLines.length) {
      this.endDialogue();
    } else {
      this.typeLine();
    }
  }

  endDialogue() {
    this.dlg.setVisible(false);
    this.dialogueActive = false;
    const npc = this.activeNpc;
    if (npc && !npc.talked) {
      npc.talked = true;
      const def = LEVELS[this.levelIndex].npcs[npc.npcIndex];
      // restore rewards (UIScene listens on the registry)
      const hero = this.registry.get('worldHero') || { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 };
      if (def.fullRestore) { hero.cp = hero.maxCp; hero.calm = hero.maxCalm; }
      else {
        hero.calm = Math.min(hero.maxCalm, hero.calm + (def.calmRestore || 0));
        hero.cp = Math.min(hero.maxCp, hero.cp + (def.cpRestore || 0));
      }
      this.registry.set('worldHero', { ...hero });
      if ((def.calmRestore || def.cpRestore || def.fullRestore)) AudioSystem.sfx(this, 'sfx-heal', 0.6);
    }
  }

  onAction() {
    if (this.dialogueActive) { this.advanceDialogue(); return; }
    this.tryTalk(null);
  }

  // ── Battle handoff ──
  startBattle() {
    if (this.bossTriggered || this.dialogueActive) return;
    this.bossTriggered = true;
    AudioSystem.sfx(this, 'sfx-boss-hit', 0.7);
    this.cameras.main.shake(300, 0.01);
    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.stop('UI');
      this.scene.start('Battle', { levelIndex: this.levelIndex });
    });
  }

  update(time, dt) {
    if (this.dialogueActive || this.bossTriggered) {
      this.player.setVelocity(0);
      this.player.anims.play('hero-idle', true);
      return;
    }

    const speed = 90;
    let vx = 0, vy = 0;
    if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -speed;
    else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;
    if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
    else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;

    // pointer steering when no keys held
    if (vx === 0 && vy === 0 && this.pointerTarget) {
      const dx = this.pointerTarget.x - this.player.x, dy = this.pointerTarget.y - this.player.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) {
        const len = Math.hypot(dx, dy);
        vx = (dx / len) * speed; vy = (dy / len) * speed;
      }
      if (this.input.activePointer.isDown) {
        this.pointerTarget = { x: this.input.activePointer.worldX, y: this.input.activePointer.worldY };
      }
    }

    this.player.setVelocity(vx, vy);

    if (vx !== 0 || vy !== 0) {
      if (Math.abs(vx) >= Math.abs(vy)) {
        this.player.anims.play('hero-side', true);
        this.player.setFlipX(vx < 0);
        this.lastDir = 'side';
      } else if (vy < 0) {
        this.player.anims.play('hero-up', true); this.lastDir = 'up'; this.player.setFlipX(false);
      } else {
        this.player.anims.play('hero-down', true); this.lastDir = 'down'; this.player.setFlipX(false);
      }
      this.stepTimer -= dt;
      if (this.stepTimer <= 0) { AudioSystem.sfx(this, 'sfx-footstep', 0.12); this.stepTimer = 320; }
    } else {
      this.player.anims.stop();
    }
  }
}
