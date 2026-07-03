'use strict';

class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    // Load the pixel font before any scene renders text
    const font = new FontFace('Press Start 2P', 'url(assets/fonts/PressStart2P-Regular.ttf)');
    font.load().then(f => {
      document.fonts.add(f);
      this.scene.start('Preload');
    }).catch(() => {
      // Font failed — monospace fallback still playable
      this.scene.start('Preload');
    });
  }
}

// Shared text style helpers
const FONT = '"Press Start 2P", monospace';
function txtStyle(size, color, extra = {}) {
  return Object.assign({ fontFamily: FONT, fontSize: size + 'px', color }, extra);
}
