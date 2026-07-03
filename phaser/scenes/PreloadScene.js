'use strict';

// Frame sizes verified in assets/CREDITS.md — measured, not guessed.
const SPRITESHEETS = [
  ['hero', 'assets/sprites/hero.png', 32, 32],
  ['npc-guy', 'assets/sprites/npc-guy.png', 32, 32],
  ['npc-girl', 'assets/sprites/npc-girl.png', 32, 32],
  ['npc-robot', 'assets/sprites/npc-robot.png', 16, 16],
  // LimeZu modern characters (16x32, 24 frames: 6 per dir — right, up, left, down)
  ['adam', 'assets/sprites/modern/adam-idle.png', 16, 32],
  ['alex', 'assets/sprites/modern/alex-idle.png', 16, 32],
  ['amelia', 'assets/sprites/modern/amelia-idle.png', 16, 32],
  ['bob', 'assets/sprites/modern/bob-idle.png', 16, 32],
  ['boss-pluma-roja', 'assets/sprites/boss-pluma-roja.png', 55, 93],
  ['boss-cotilleo', 'assets/sprites/boss-cotilleo.png', 112, 128],
  ['boss-panico', 'assets/sprites/boss-panico.png', 101, 98],
  ['boss-ansiedad', 'assets/sprites/boss-ansiedad.png', 112, 153],
  ['gems', 'assets/sprites/gems.png', 16, 16],
  ['fx-hit', 'assets/fx/hit.png', 31, 32],
  ['fx-death', 'assets/fx/enemy-death.png', 48, 48],
  ['fx-explosion', 'assets/fx/explosion.png', 32, 32],
  ['fx-shield', 'assets/fx/energy-shield.png', 51, 47],
  ['fx-electro', 'assets/fx/electro-shock.png', 128, 96],
  ['fx-fireball', 'assets/fx/fire-ball.png', 52, 29],
  ['fx-smack', 'assets/fx/energy-smack.png', 128, 96],
  ['fx-slash', 'assets/fx/slash-circular.png', 52, 48],
];

const IMAGES = [
  ['boss-foco', 'assets/sprites/boss-foco.png'],
  ['tiles-overworld', 'assets/tiles/overworld.png'],
  ['tiles-town', 'assets/tiles/town.png'],
  ['tiles-dungeon', 'assets/tiles/dungeon.png'],
  ['tiles-stage', 'assets/tiles/stage.png'],
  ['tiles-interiors', 'assets/tiles/interiors.png'],
  ['tiles-room-builder', 'assets/tiles/room-builder.png'],
  ['parallax-back', 'assets/ui/parallax-back.png'],
  ['parallax-middle', 'assets/ui/parallax-middle.png'],
  ['parallax-front', 'assets/ui/parallax-front.png'],
];

const MUSIC_KEYS = ['title', 'world', 'battle', 'boss-final'];
const SFX_KEYS = ['menu-move', 'menu-select', 'menu-cancel', 'menu-error', 'blip', 'hit', 'zap',
  'heal', 'buff', 'debuff', 'limit-break', 'boss-hit', 'unlock', 'footstep', 'door'];

class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }

  preload() {
    const w = this.scale.width, h = this.scale.height;
    const barBg = this.add.rectangle(w / 2, h / 2, 202, 14, 0x222244).setOrigin(0.5);
    const bar = this.add.rectangle(w / 2 - 100, h / 2, 0, 10, 0xffd700).setOrigin(0, 0.5);
    this.add.text(w / 2, h / 2 - 24, 'CARGANDO...', txtStyle(8, '#f0eee0')).setOrigin(0.5);
    this.load.on('progress', p => { bar.width = 200 * p; });

    SPRITESHEETS.forEach(([key, url, fw, fh]) =>
      this.load.spritesheet(key, url, { frameWidth: fw, frameHeight: fh }));
    IMAGES.forEach(([key, url]) => this.load.image(key, url));
    MUSIC_KEYS.forEach(k =>
      this.load.audio('music-' + k, ['assets/audio/music/' + k + '.ogg', 'assets/audio/music/' + k + '.m4a']));
    SFX_KEYS.forEach(k => this.load.audio('sfx-' + k, ['assets/audio/sfx/' + k + '.ogg']));
  }

  create() {
    // Walk anims for 32x32 4x3 character sheets: row0=down, row1=side, row2=up
    for (const key of ['hero', 'npc-guy', 'npc-girl']) {
      this.anims.create({ key: key + '-down', frames: this.anims.generateFrameNumbers(key, { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
      this.anims.create({ key: key + '-side', frames: this.anims.generateFrameNumbers(key, { start: 4, end: 7 }), frameRate: 8, repeat: -1 });
      this.anims.create({ key: key + '-up', frames: this.anims.generateFrameNumbers(key, { start: 8, end: 11 }), frameRate: 8, repeat: -1 });
      this.anims.create({ key: key + '-idle', frames: [{ key, frame: 0 }], frameRate: 1 });
    }
    this.anims.create({ key: 'npc-robot-walk', frames: this.anims.generateFrameNumbers('npc-robot', { start: 0, end: 4 }), frameRate: 6, repeat: -1 });

    // Modern NPC idle anims (facing down = frames 18-23)
    for (const key of ['adam', 'alex', 'amelia', 'bob']) {
      this.anims.create({ key: key + '-idle', frames: this.anims.generateFrameNumbers(key, { start: 18, end: 23 }), frameRate: 5, repeat: -1 });
    }

    // Boss idle anims
    const bossAnims = [
      ['boss-pluma-roja', 4], ['boss-cotilleo', 4], ['boss-panico', 5], ['boss-ansiedad', 4]
    ];
    for (const [key, end] of bossAnims) {
      this.anims.create({ key: key + '-idle', frames: this.anims.generateFrameNumbers(key, { start: 0, end }), frameRate: 6, repeat: -1 });
    }

    // FX one-shot anims
    const fx = [
      ['fx-hit', 2, 14], ['fx-death', 7, 12], ['fx-explosion', 7, 14], ['fx-shield', 7, 12],
      ['fx-electro', 8, 14], ['fx-fireball', 2, 12], ['fx-smack', 7, 14], ['fx-slash', 5, 14]
    ];
    for (const [key, end, rate] of fx) {
      this.anims.create({ key: key + '-play', frames: this.anims.generateFrameNumbers(key, { start: 0, end }), frameRate: rate, repeat: 0 });
    }

    this.sound.mute = this.registry.get('muted');
    this.scene.start('Title');
  }
}
