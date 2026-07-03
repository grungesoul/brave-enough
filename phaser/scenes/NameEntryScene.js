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

    this.input.keyboard.on('keydown', ev => this.onKey(ev));
    this.input.on('pointerdown', () => { if (this.confirmed) this.proceed(); });
  }

  onKey(ev) {
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
