// Game entry: config + scene registration + global registry init.
'use strict';

const GAME_W = 480;
const GAME_H = 320;

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_W,
  height: GAME_H,
  pixelArt: true,
  backgroundColor: '#0a0a12',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_W,
    height: GAME_H,
    max: { width: GAME_W * 3, height: GAME_H * 3 }
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [
    BootScene, PreloadScene, TitleScene, NameEntryScene, LevelIntroScene,
    WorldScene, UIScene, BattleScene, LevelClearScene, GameOverScene,
    VictoryScene, CreditsScene
  ]
});

// Global state (mirrors the original gs object)
const saved = SaveSystem.load();
game.registry.set('lang', (saved && saved.lang) || 'es');
game.registry.set('playerName', (saved && saved.playerName) || '');
game.registry.set('currentLevel', (saved && saved.currentLevel) || 0);
game.registry.set('unlockedAbilities', (saved && saved.unlockedAbilities) || ['breatheDeep', 'speakUp']);
game.registry.set('muted', (saved && saved.muted) || false);
game.registry.set('hasSave', !!(saved && saved.playerName));

// Shared text helpers (same shape as the original t()/tFn())
function T_(game_, key) {
  return TRANSLATIONS.t(game_.registry.get('lang'), key);
}
function TFn_(game_, key, ...args) {
  const v = T_(game_, key);
  return typeof v === 'function' ? v(...args) : v;
}

// Fresh hero for a new battle/level (original: full restore between levels)
function freshHero(game_) {
  return {
    cp: 100, maxCp: 100, calm: 80, maxCalm: 80,
    unlockedAbilities: game_.registry.get('unlockedAbilities'),
    abilityUseCount: {},
    activeBuffs: [], activeDebuffs: [],
    findPeopleCooldown: 0, groundYourselfCooldown: 0, powerPoseCooldown: 0,
    limitBreakCharge: 0
  };
}
