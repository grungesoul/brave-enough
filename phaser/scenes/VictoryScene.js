'use strict';

class VictoryScene extends Phaser.Scene {
  constructor() { super('Victory'); }

  create() {
    const w = this.scale.width;
    this.cameras.main.fadeIn(600, 0, 0, 0);
    const lines = (T_(this.game, 'victoryLines') || []).slice();
    if (lines.length) lines[0] = this.registry.get('playerName') + '.';
    this.lines = lines;
    this.idx = 0;
    this.transitioning = false; // reset — scene instances persist across restarts

    this.lineText = this.add.text(w / 2, 140, '', txtStyle(8, '#f0eee0', { align: 'center', wordWrap: { width: 420 }, lineSpacing: 6 })).setOrigin(0.5);
    this.bigText = this.add.text(w / 2, 150, T_(this.game, 'victoryBigText'), txtStyle(14, '#ffd700', { align: 'center', wordWrap: { width: 440 } })).setOrigin(0.5).setVisible(false);
    this.show();

    const next = () => this.next();
    this.input.keyboard.on('keydown-ENTER', next);
    this.input.keyboard.on('keydown-SPACE', next);
    this.input.on('pointerdown', next);
  }

  show() {
    this.lineText.setAlpha(0).setText(this.lines[this.idx]);
    this.tweens.add({ targets: this.lineText, alpha: 1, duration: 500 });
  }

  next() {
    if (this.transitioning) return;
    this.idx++;
    if (this.idx === this.lines.length) {
      this.lineText.setVisible(false);
      this.bigText.setVisible(true).setAlpha(0);
      this.tweens.add({ targets: this.bigText, alpha: 1, duration: 800 });
      AudioSystem.sfx(this, 'sfx-unlock');
    } else if (this.idx > this.lines.length) {
      this.transitioning = true;
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Credits'));
    } else {
      this.show();
    }
  }
}
