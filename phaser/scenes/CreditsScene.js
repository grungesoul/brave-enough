'use strict';

class CreditsScene extends Phaser.Scene {
  constructor() { super('Credits'); }

  create() {
    const w = this.scale.width, h = this.scale.height;
    this.transitioning = false; // reset — scene instances persist across restarts
    this.cameras.main.fadeIn(600, 0, 0, 0);

    const credits = [
      T_(this.game, 'gameTitle'), '',
      T_(this.game, 'thanksForPlaying'), '', '',
      '— ART —', 'Ansimuz (TinyRPG, Explosions & Magic)', 'LimeZu (Modern Interiors)', '',
      '— MUSIC —', 'Juhani Junkala (CC0)', '',
      '— SFX —', 'Kenney.nl (CC0)', '',
      '— FONT —', 'Press Start 2P (OFL)', '',
      '— ENGINE —', 'Phaser 3', '', '',
      '♥'
    ].join('\n');

    this.text = this.add.text(w / 2, h + 20, credits, txtStyle(8, '#f0eee0', { align: 'center', lineSpacing: 8 })).setOrigin(0.5, 0);
    this.tweens.add({
      targets: this.text, y: -this.text.height - 40, duration: 24000, ease: 'linear',
      onComplete: () => this.done()
    });

    this.input.keyboard.on('keydown-ENTER', () => this.done());
    this.input.on('pointerdown', () => this.done());
  }

  done() {
    if (this.transitioning) return;
    this.transitioning = true;
    SaveSystem.clear();
    this.registry.set('currentLevel', 0);
    this.registry.set('unlockedAbilities', ['breatheDeep', 'speakUp']);
    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Title'));
  }
}
