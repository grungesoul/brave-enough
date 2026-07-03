'use strict';

class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }
  init(data) { this.levelIndex = data.levelIndex || 0; }

  create() {
    const w = this.scale.width;
    this.cameras.main.fadeIn(400, 0, 0, 0);
    const sparkLines = T_(this.game, 'gameOverSpark');
    const text = Array.isArray(sparkLines) ? sparkLines.join('\n') : sparkLines;
    this.add.text(w / 2, 90, text, txtStyle(10, '#ffd700', { align: 'center', lineSpacing: 8 })).setOrigin(0.5);

    const options = T_(this.game, 'gameOverOptions') || ['[ Try Again ]', '[ Return to Title ]'];
    this.sel = 0;
    this.chosen = false;
    this.optTexts = options.map((o, i) =>
      this.add.text(w / 2, 180 + i * 28, o, txtStyle(9, '#f0eee0')).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => { this.sel = i; this.refresh(); })
        .on('pointerdown', () => this.choose(i))
    );
    this.refresh();

    this.input.keyboard.on('keydown-UP', () => { this.sel = (this.sel + 1) % 2; this.refresh(); });
    this.input.keyboard.on('keydown-DOWN', () => { this.sel = (this.sel + 1) % 2; this.refresh(); });
    this.input.keyboard.on('keydown-ENTER', () => this.choose(this.sel));
    this.input.keyboard.on('keydown-SPACE', () => this.choose(this.sel));
  }

  refresh() {
    this.optTexts.forEach((t, i) => t.setColor(i === this.sel ? '#ffd700' : '#f0eee0'));
    AudioSystem.sfx(this, 'sfx-menu-move', 0.4);
  }

  choose(i) {
    if (this.chosen) return;
    this.chosen = true;
    AudioSystem.sfx(this, 'sfx-menu-select');
    if (i === 0) {
      // Try again = full restore + restart the level (matches the original)
      this.registry.set('worldHero', { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 });
      this.scene.start('LevelIntro', { levelIndex: this.levelIndex });
    } else {
      this.scene.start('Title');
    }
  }
}
