'use strict';

class LevelIntroScene extends Phaser.Scene {
  constructor() { super('LevelIntro'); }

  init(data) { this.levelIndex = data.levelIndex || 0; }

  create() {
    const w = this.scale.width, h = this.scale.height;
    this.transitioning = false; // reset — scene instances persist across restarts
    this.cameras.main.fadeIn(400, 0, 0, 0);

    const names = T_(this.game, 'levelNames') || [];
    this.add.text(w / 2, 60, (this.levelIndex + 1) + '. ' + (names[this.levelIndex] || ''), txtStyle(12, '#ffd700')).setOrigin(0.5);

    const intro = (T_(this.game, 'introLines') || {})[this.levelIndex] || [];
    const spark = (T_(this.game, 'sparkIntros') || [])[this.levelIndex] || '';
    this.lines = [...intro, spark ? '✦ ' + spark : null].filter(Boolean);
    this.lineIdx = 0;

    this.lineText = this.add.text(w / 2, 150, '', txtStyle(8, '#f0eee0', { align: 'center', wordWrap: { width: 420 }, lineSpacing: 6 })).setOrigin(0.5);
    this.hint = this.add.text(w / 2, 280, T_(this.game, 'pressEnterContinue'), txtStyle(7, '#8899bb')).setOrigin(0.5);
    this.tweens.add({ targets: this.hint, alpha: 0.3, duration: 700, yoyo: true, repeat: -1 });

    this.showLine();
    this.input.keyboard.on('keydown-ENTER', () => this.next());
    this.input.keyboard.on('keydown-SPACE', () => this.next());
    this.input.keyboard.on('keydown-Z', () => this.next());
    this.input.on('pointerdown', () => this.next());
  }

  showLine() {
    this.lineText.setAlpha(0).setText(this.lines[this.lineIdx]);
    this.tweens.add({ targets: this.lineText, alpha: 1, duration: 400 });
    AudioSystem.sfx(this, 'sfx-blip', 0.3);
  }

  next() {
    if (this.transitioning) return;
    this.lineIdx++;
    if (this.lineIdx >= this.lines.length) {
      this.transitioning = true;
      this.cameras.main.fadeOut(400, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('World', { levelIndex: this.levelIndex }));
    } else {
      this.showLine();
    }
  }
}
