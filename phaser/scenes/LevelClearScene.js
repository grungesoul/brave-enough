'use strict';

// P3 will add the full unlock fanfare; minimal version keeps the flow working.
class LevelClearScene extends Phaser.Scene {
  constructor() { super('LevelClear'); }
  init(data) { this.levelIndex = data.levelIndex || 0; }

  create() {
    const w = this.scale.width;
    this.cameras.main.fadeIn(400, 0, 0, 0);
    this.add.text(w / 2, 90, T_(this.game, 'levelClearTitle'), txtStyle(16, '#ffd700')).setOrigin(0.5);
    const clears = T_(this.game, 'levelClearTexts') || [];
    this.add.text(w / 2, 140, clears[this.levelIndex] || '', txtStyle(8, '#f0eee0', { align: 'center', wordWrap: { width: 420 } })).setOrigin(0.5);
    // Unlock fanfare: reveal each new ability with a chime
    const abilityNames = T_(this.game, 'abilities') || {};
    const newAbs = LEVELS[this.levelIndex].newAbilities || [];
    newAbs.forEach((id, i) => {
      const label = '✦ ' + ((abilityNames[id] && abilityNames[id].name) || ABILITIES[id].name);
      const t = this.add.text(w / 2, 180 + i * 18, label, txtStyle(8, '#88ffcc')).setOrigin(0.5).setAlpha(0).setScale(1.6);
      this.tweens.add({ targets: t, alpha: 1, scale: 1, duration: 350, delay: 500 + i * 500, ease: 'back.out' });
      this.time.delayedCall(500 + i * 500, () => AudioSystem.sfx(this, 'sfx-unlock', 0.7));
    });

    this.add.text(w / 2, 280, T_(this.game, 'levelClearContinue'), txtStyle(7, '#8899bb')).setOrigin(0.5);
    AudioSystem.sfx(this, 'sfx-buff');

    this.advanced = false;
    const next = () => {
      if (this.advanced) return; // guard against double-fire (Enter + click)
      this.advanced = true;
      const nextLevel = this.levelIndex + 1;
      this.registry.set('currentLevel', nextLevel);
      const unlocked = [...this.registry.get('unlockedAbilities'), ...LEVELS[this.levelIndex].newAbilities];
      this.registry.set('unlockedAbilities', [...new Set(unlocked)]);
      SaveSystem.save(this.game);
      this.scene.start('LevelIntro', { levelIndex: nextLevel });
    };
    this.input.keyboard.on('keydown-ENTER', next);
    this.input.on('pointerdown', next);
  }
}
