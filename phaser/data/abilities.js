// Ported verbatim from the original game.js ABILITIES (names/flavor come from
// TRANSLATIONS at render time; these hold ids, costs, cooldowns, colors, types).
'use strict';

const ABILITIES = {
  breatheDeep: { id: 'breatheDeep', name: 'Breathe Deep', cost: 5, color: '#88CCFF', type: 'heal' },
  speakUp: { id: 'speakUp', name: 'Speak Up', cost: 5, color: '#FFD166', type: 'attack' },
  reframe: { id: 'reframe', name: 'Reframe', cost: 8, color: '#B8CC60', type: 'attack' },
  findYourPeople: { id: 'findYourPeople', name: 'Find Your People', cost: 10, cooldown: 2, color: '#FF9966', type: 'summon' },
  believeInYourself: { id: 'believeInYourself', name: 'Believe In Yourself', cost: 15, color: '#FFD700', type: 'heavy' },
  breakFree: { id: 'breakFree', name: 'Break Free', cost: 20, color: '#FF44AA', type: 'ultimate' },
  groundYourself: { id: 'groundYourself', name: 'Ground Yourself', cost: 0, cooldown: 3, color: '#88CCFF', type: 'heal' },
  selfTalk: { id: 'selfTalk', name: 'Self-Talk', cost: 8, color: '#B8CC60', type: 'attack' },
  selfCompassion: { id: 'selfCompassion', name: 'Self-Compassion', cost: 15, color: '#FF9966', type: 'heal' },
  powerPose: { id: 'powerPose', name: 'Power Pose', cost: 8, cooldown: 3, color: '#FFD700', type: 'attack' },
  limitBreak: { id: 'limitBreak', name: 'Sin Miedo', cost: 0, color: '#FFD700', type: 'limit' }
};

// FX spritesheet + sound per ability (battle presentation layer)
const ABILITY_FX = {
  breatheDeep: { fx: 'fx-shield', sfx: 'heal', onSelf: true },
  speakUp: { fx: 'fx-hit', sfx: 'zap' },
  reframe: { fx: 'fx-fireball', sfx: 'zap' },
  findYourPeople: { fx: 'fx-slash', sfx: 'buff' },
  believeInYourself: { fx: 'fx-smack', sfx: 'limit-break' },
  breakFree: { fx: 'fx-explosion', sfx: 'limit-break' },
  groundYourself: { fx: 'fx-shield', sfx: 'heal', onSelf: true },
  selfTalk: { fx: 'fx-electro', sfx: 'zap' },
  selfCompassion: { fx: 'fx-shield', sfx: 'heal', onSelf: true },
  powerPose: { fx: 'fx-smack', sfx: 'buff' },
  limitBreak: { fx: 'fx-explosion', sfx: 'limit-break' }
};
