'use strict';

class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }

  create() {
    const w = this.scale.width, h = this.scale.height;

    // Scrolling parallax forest (272x160 layers scaled to cover)
    this.layers = [];
    for (const [key, speed] of [['parallax-back', 0.1], ['parallax-middle', 0.3], ['parallax-front', 0.6]]) {
      const ts = this.add.tileSprite(w / 2, h / 2, w / 2, 160, key).setScale(2);
      ts.scrollSpeed = speed;
      this.layers.push(ts);
    }
    this.add.rectangle(w / 2, h / 2, w, h, 0x0a0a12, 0.45);

    this.titleText = this.add.text(w / 2, 70, T_(this.game, 'gameTitle'), txtStyle(24, '#ffd700', { stroke: '#000', strokeThickness: 6 })).setOrigin(0.5);
    this.subText = this.add.text(w / 2, 100, T_(this.game, 'subtitle'), txtStyle(8, '#f0eee0')).setOrigin(0.5);

    // HD-2D dressing: cinematic grade + soft bloom on the title
    HD2D.grade(this, { contrast: 0.12, saturate: 0.15, vignette: [0.5, 0.5, 0.85, 0.32], tiltshift: [0.35, 0.5, 0.1, 0.5, 0.5, 0.5] });
    if (HD2D.isWebGL(this)) {
      this.titleText.preFX.setPadding(8);
      this.titleText.preFX.addGlow(0xffd700, 2, 0);
    }

    // Cycling narration lines
    this.narrIdx = 0;
    this.narrText = this.add.text(w / 2, 160, '', txtStyle(7, '#aabbee', { align: 'center', wordWrap: { width: 400 } })).setOrigin(0.5);
    this.time.addEvent({ delay: 3200, loop: true, callback: () => this.nextNarration() });
    this.nextNarration();

    this.startText = this.add.text(w / 2, 240, T_(this.game, 'pressStart'), txtStyle(8, '#ffffff')).setOrigin(0.5);
    this.tweens.add({ targets: this.startText, alpha: 0.25, duration: 700, yoyo: true, repeat: -1 });

    // Language toggle button
    this.langBtn = this.add.text(w - 10, 10, this.langLabel(), txtStyle(8, '#88ccff'))
      .setOrigin(1, 0).setInteractive({ useHandCursor: true });
    this.langBtn.on('pointerdown', (p, x, y, ev) => { ev.stopPropagation(); this.toggleLang(); });
    this.input.keyboard.on('keydown-L', () => this.toggleLang());
    this.input.keyboard.on('keydown-M', () => AudioSystem.toggleMute(this.game));

    // Start: any key / click — also unlocks audio (first user gesture)
    this.started = false; // reset each create — scene instances persist across restarts
    this.input.keyboard.on('keydown-ENTER', () => this.startGame());
    this.input.keyboard.on('keydown-SPACE', () => this.startGame());
    this.input.on('pointerdown', () => this.startGame());
  }

  langLabel() {
    return this.registry.get('lang') === 'es' ? 'ES→EN [L]' : 'EN→ES [L]';
  }

  toggleLang() {
    const next = this.registry.get('lang') === 'es' ? 'en' : 'es';
    this.registry.set('lang', next);
    SaveSystem.save(this.game);
    this.titleText.setText(T_(this.game, 'gameTitle'));
    this.subText.setText(T_(this.game, 'subtitle'));
    this.startText.setText(T_(this.game, 'pressStart'));
    this.langBtn.setText(this.langLabel());
    this.narrIdx = 0;
    this.nextNarration();
  }

  nextNarration() {
    const lines = T_(this.game, 'titleNarration') || [];
    if (!lines.length) return;
    this.narrText.setAlpha(0);
    this.narrText.setText(lines[this.narrIdx % lines.length]);
    this.tweens.add({ targets: this.narrText, alpha: 1, duration: 500 });
    this.narrIdx++;
  }

  startGame() {
    if (this.started) return;
    this.started = true;
    // Never let audio-unlock quirks kill the transition: the scene change is
    // the one thing that MUST happen on this gesture.
    try {
      AudioSystem.playMusic(this, 'music-title');
      AudioSystem.sfx(this, 'sfx-menu-select');
    } catch (e) { /* audio can fail silently; the game must still start */ }
    this.cameras.main.fadeOut(400, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('NameEntry'));
    // belt & braces: if the fade event never fires, jump anyway
    this.time.delayedCall(800, () => {
      if (this.scene.isActive('Title')) this.scene.start('NameEntry');
    });
  }

  update() {
    for (const l of this.layers) l.tilePositionX += l.scrollSpeed;
  }
}
