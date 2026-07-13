'use strict';

class NameEntryScene extends Phaser.Scene {
  constructor() { super('NameEntry'); }

  create() {
    const w = this.scale.width, h = this.scale.height;
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.add.text(w / 2, 70, T_(this.game, 'namePrompt'), txtStyle(10, '#ffd700', { align: 'center', wordWrap: { width: 420 } })).setOrigin(0.5);
    this.add.text(w / 2, 100, T_(this.game, 'nameHint'), txtStyle(7, '#8899bb', { align: 'center', wordWrap: { width: 420 } })).setOrigin(0.5);

    this.name = this.registry.get('playerName') || '';
    this.nameText = this.add.text(w / 2, 150, '', txtStyle(16, '#ffffff')).setOrigin(0.5);
    this.cursor = this.add.text(0, 150, '_', txtStyle(16, '#ffd700')).setOrigin(0, 0.5);
    this.tweens.add({ targets: this.cursor, alpha: 0, duration: 400, yoyo: true, repeat: -1 });
    this.confirmed = false;
    this.proceeding = false; // reset — scene instances persist across restarts
    this.confirmText = this.add.text(w / 2, 220, '', txtStyle(8, '#ffd700', { align: 'center', wordWrap: { width: 420 } })).setOrigin(0.5);
    this.refresh();

    // Typing listens to the DOM directly: Phaser's keyboard queue re-processes
    // buffered events when the game loop is starved (low FPS / throttled tab),
    // which replayed keystrokes and scrambled the name. One DOM event = one
    // handler call, always.
    this._nativeKey = ev => this.onKey(ev);
    window.addEventListener('keydown', this._nativeKey);
    this.events.once('shutdown', () => window.removeEventListener('keydown', this._nativeKey));
    this.input.on('pointerdown', () => { if (this.confirmed) this.proceed(); });

    // Mobile: an invisible input band over the name row opens the native
    // keyboard; while it's active the desktop key handler stays out of the way.
    this.touchTyping = false;
    if (TouchControls.enabled && !this.confirmed) {
      this.touchTyping = true;
      TouchControls.showNameInput({
        value: this.name,
        maxLength: 12,
        onInput: v => {
          if (this.confirmed) return;
          this.name = v;
          AudioSystem.sfx(this, 'sfx-blip', 0.4);
          this.refresh();
        },
        onEnter: () => {
          if (this.confirmed || this.name.trim().length === 0) return;
          this.touchTyping = false;
          TouchControls.hideNameInput();
          this.confirm();
        }
      });
      this.events.once('shutdown', () => TouchControls.hideNameInput());
    }
  }

  onKey(ev) {
    if (this.touchTyping) { // the hidden mobile field owns the input
      // …except the on-screen A button, which confirms like the keyboard's Done
      if (ev.key === 'Enter' && this.name.trim().length > 0) {
        this.touchTyping = false;
        TouchControls.hideNameInput();
        this.confirm();
      }
      return;
    }
    if (this.confirmed) {
      if (ev.key === 'Enter' || ev.key === ' ') this.proceed();
      return;
    }
    if (ev.key === 'Enter') {
      if (this.name.length > 0) this.confirm();
      return;
    }
    if (ev.key === 'Backspace') {
      this.name = this.name.slice(0, -1);
      AudioSystem.sfx(this, 'sfx-blip', 0.4);
    } else if (ev.key.length === 1 && this.name.length < 12 && /[\p{L}\p{N} '-]/u.test(ev.key)) {
      this.name += ev.key;
      AudioSystem.sfx(this, 'sfx-blip', 0.4);
    }
    this.refresh();
  }

  refresh() {
    this.nameText.setText(this.name);
    this.cursor.x = this.nameText.x + this.nameText.width / 2 + 4;
  }

  confirm() {
    this.confirmed = true;
    this.cursor.setVisible(false);
    this.registry.set('playerName', this.name.trim());
    SaveSystem.save(this.game);
    AudioSystem.sfx(this, 'sfx-menu-select');
    this.confirmText.setText(TFn_(this.game, 'nameConfirmSpark', this.name.trim()) + '\n\n' + T_(this.game, 'pressEnterContinue'));
  }

  proceed() {
    if (this.proceeding) return;
    this.proceeding = true;
    this.cameras.main.fadeOut(400, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('LevelIntro', { levelIndex: this.registry.get('currentLevel') }));
  }
}
