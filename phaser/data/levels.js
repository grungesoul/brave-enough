// Structural level data ported from the original game.js LEVELS.
// All display text (intros, NPC lines, taunts, defeat lines, flavors) lives in
// translations.js and is looked up by level index — only numbers, ids and
// asset keys live here. Boss stats are the "easier difficulty" values.
'use strict';

const LEVELS = [
  {
    id: 1,
    tilesetKey: 'interiors', // classroom
    accent: 0xb8cc60, bossColor: '#CC2222',
    npcs: [
      { name: 'The Anxious Echo', calmRestore: 0, cpRestore: 0, sprite: 'alex', tint: 0x9999bb },
      { name: 'The Hall Monitor of Mistakes', calmRestore: 0, cpRestore: 0, sprite: 'npc-robot' },
      { name: 'The Encouraging Scrawl', calmRestore: 10, cpRestore: 0, sprite: 'amelia' }
    ],
    boss: {
      spriteKey: 'boss-pluma-roja', tint: 0xff5555,
      hp: 84, maxHp: 84, dread: 13, focus: 10,
      attacks: [
        { dmgMin: 9, dmgMax: 13, effect: null },
        { dmgMin: 6, dmgMax: 6, effect: 'marked' },
        { dmgMin: 15, dmgMax: 19, effect: null, hpThreshold: 40 }
      ]
    },
    newAbilities: ['reframe', 'groundYourself']
  },
  {
    id: 2,
    tilesetKey: 'interiors', // hallway
    accent: 0x3d3050, bossColor: '#7B2FBE',
    npcs: [
      { name: 'The Gossiping Silhouettes', calmRestore: 0, cpRestore: 0, sprite: 'bob', tint: 0x666688 },
      { name: 'The Friend at a Locker', calmRestore: 0, cpRestore: 5, sprite: 'adam' },
      { name: 'The Mirror Locker', calmRestore: 8, cpRestore: 0, sprite: 'amelia', tint: 0xaaddff }
    ],
    boss: {
      spriteKey: 'boss-cotilleo', tint: 0xbb88ff,
      hp: 98, maxHp: 98, dread: 16, focus: 12,
      attacks: [
        { dmgMin: 11, dmgMax: 15, effect: 'rattled' },
        { dmgMin: 15, dmgMax: 21, effect: null },
        { dmgMin: 18, dmgMax: 24, effect: 'focusDown', hpThreshold: 50 }
      ]
    },
    newAbilities: ['selfTalk', 'findYourPeople']
  },
  {
    id: 3,
    tilesetKey: 'overworld', // sports field
    accent: 0xffd166, bossColor: '#FF8C42',
    npcs: [
      { name: 'The Teammate on the Bench', calmRestore: 0, cpRestore: 0, sprite: 'bob' },
      { name: 'The Whistle', calmRestore: 0, cpRestore: 0, sprite: 'npc-robot' },
      { name: 'The Left-Behind Trophy', calmRestore: 10, cpRestore: 0, sprite: 'amelia', tint: 0xffdd88 }
    ],
    boss: {
      spriteKey: 'boss-foco', tint: 0xffffff, static: true,
      hp: 108, maxHp: 108, dread: 18, focus: 14,
      attacks: [
        { dmgMin: 13, dmgMax: 18, effect: 'scrutinized' },
        { dmgMin: 16, dmgMax: 22, effect: null },
        { dmgMin: 21, dmgMax: 27, effect: 'overexposed', hpThreshold: 55 }
      ]
    },
    newAbilities: ['selfCompassion', 'believeInYourself', 'powerPose']
  },
  {
    id: 4,
    tilesetKey: 'stage', // the stage
    accent: 0xc9a84c, bossColor: '#C8E6F5',
    npcs: [
      { name: 'The Actor in the Wings', calmRestore: 0, cpRestore: 0, sprite: 'alex', tint: 0xccccff },
      { name: 'The Empty Microphone', calmRestore: 10, cpRestore: 15, sprite: 'npc-robot' },
      { name: 'The Director\'s Note', calmRestore: 12, cpRestore: 0, sprite: 'amelia' }
    ],
    boss: {
      spriteKey: 'boss-panico', tint: 0xaaddff,
      hp: 119, maxHp: 119, dread: 21, focus: 16,
      attacks: [
        { dmgMin: 12, dmgMax: 16, effect: 'frozen' },
        { dmgMin: 16, dmgMax: 22, effect: 'blankMind' },
        { dmgMin: 22, dmgMax: 28, effect: 'silenced', hpThreshold: 60 }
      ]
    },
    newAbilities: ['breakFree']
  },
  {
    id: 5,
    tilesetKey: 'dungeon', // the mindscape core
    accent: 0x00c2b5, bossColor: '#8800FF',
    npcs: [
      { name: 'The Memory', calmRestore: 15, cpRestore: 20, sprite: 'amelia', tint: 0x88ffee },
      { name: 'The Spark\'s Full Form', calmRestore: 50, cpRestore: 100, fullRestore: true, sprite: 'adam', tint: 0xffd700 }
    ],
    boss: {
      spriteKey: 'boss-ansiedad', tint: 0xaa66ff,
      hp: 140, maxHp: 140, dread: 24, focus: 20,
      attacks: [
        { dmgMin: 15, dmgMax: 19, effect: 'whatIf' },
        { dmgMin: 18, dmgMax: 24, effect: 'doubt' },
        { dmgMin: 10, dmgMax: 13, hits: 4, effect: null, hpThreshold: 80 },
        { dmgMin: 26, dmgMax: 33, effect: 'mirrorBreak', hpThreshold: 30, selfWeaken: true }
      ]
    },
    newAbilities: []
  }
];
