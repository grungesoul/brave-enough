// Structural level data — redesigned "in crescendo" arc (social → academic):
//   1 El Primer Día (hallway, El Cotilleo)
//   2 El Trabajo en Grupo (classroom+library, El Foco)
//   3 La Presentación (stage, El Pánico Escénico)
//   4 El Examen Final (exam hall, La Pluma Roja — two phases)
//   5 Tu Interior (mindscape, La Ansiedad)
// All display text lives in translations.js and is looked up by level index —
// only numbers, ids and asset keys live here. Boss stats are the "easier
// difficulty" values. A boss with `phase2` swaps stats/attacks mid-fight
// instead of dying (see BattleCore.dealDamageToBoss).
'use strict';

const LEVELS = [
  {
    id: 1, // El Primer Día — hallway
    tilesetKey: 'school',
    accent: 0x3d3050, bossColor: '#7B2FBE',
    npcs: [
      { name: 'The Huddle', calmRestore: 0, cpRestore: 0, sprite: 'bob', tint: 0x666688 },
      { name: 'The Locker Friend', calmRestore: 0, cpRestore: 5, sprite: 'adam' },
      { name: 'The Window Reflection', calmRestore: 8, cpRestore: 0, sprite: 'npc-mirror' }
    ],
    boss: {
      spriteKey: 'boss-cotilleo', tint: 0xbb88ff,
      hp: 80, maxHp: 80, dread: 12, focus: 9,
      attacks: [
        { dmgMin: 8, dmgMax: 12, effect: 'rattled' },
        { dmgMin: 11, dmgMax: 15, effect: null },
        { dmgMin: 14, dmgMax: 18, effect: 'focusDown', hpThreshold: 40 }
      ]
    },
    newAbilities: ['groundYourself', 'reframe']
  },
  {
    id: 2, // El Trabajo en Grupo — classroom + library corner
    tilesetKey: 'school',
    accent: 0xb8cc60, bossColor: '#FFE9A0',
    npcs: [
      { name: 'The Quiet Groupmate', calmRestore: 0, cpRestore: 0, sprite: 'alex', tint: 0x9999bb },
      { name: 'The Idea Notebook', calmRestore: 0, cpRestore: 0, sprite: 'npc-notebook' },
      { name: 'The Returning Student', calmRestore: 10, cpRestore: 5, sprite: 'amelia' }
    ],
    boss: {
      spriteKey: 'boss-foco', tint: 0xffffff, static: true,
      hp: 96, maxHp: 96, dread: 15, focus: 12,
      attacks: [
        { dmgMin: 10, dmgMax: 14, effect: 'scrutinized' },
        { dmgMin: 13, dmgMax: 18, effect: null },
        { dmgMin: 17, dmgMax: 22, effect: 'overexposed', hpThreshold: 48 }
      ]
    },
    newAbilities: ['findYourPeople', 'powerPose']
  },
  {
    id: 3, // La Presentación — the stage
    tilesetKey: 'stage',
    accent: 0xc9a84c, bossColor: '#C8E6F5',
    npcs: [
      { name: 'The Actor in the Wings', calmRestore: 0, cpRestore: 0, sprite: 'alex', tint: 0xccccff },
      { name: 'The Empty Mic', calmRestore: 10, cpRestore: 15, sprite: 'npc-mic' },
      { name: 'The Director\'s Note', calmRestore: 12, cpRestore: 0, sprite: 'amelia' }
    ],
    boss: {
      spriteKey: 'boss-panico', tint: 0xaaddff,
      hp: 112, maxHp: 112, dread: 18, focus: 15,
      attacks: [
        { dmgMin: 12, dmgMax: 16, effect: 'frozen' },
        { dmgMin: 15, dmgMax: 21, effect: 'blankMind' },
        { dmgMin: 20, dmgMax: 26, effect: 'silenced', hpThreshold: 56 }
      ]
    },
    newAbilities: ['selfTalk', 'selfCompassion', 'believeInYourself']
  },
  {
    id: 4, // El Examen Final — exam hall, two-phase boss
    tilesetKey: 'school',
    accent: 0xcc3333, bossColor: '#CC2222',
    npcs: [
      // The Locker Friend from L1 returns — the seat the Blank Page will "erase"
      { name: 'The Seat Beside Yours', calmRestore: 0, cpRestore: 5, sprite: 'adam' },
      { name: 'The Practice Sheet', calmRestore: 0, cpRestore: 10, sprite: 'npc-sheet' },
      { name: 'The Kind Note', calmRestore: 12, cpRestore: 0, sprite: 'amelia' }
    ],
    boss: {
      spriteKey: 'boss-pluma-roja', tint: 0xff5555,
      hp: 72, maxHp: 72, dread: 21, focus: 16,
      attacks: [
        { dmgMin: 13, dmgMax: 17, effect: 'marked' },
        { dmgMin: 16, dmgMax: 22, effect: null },
        { dmgMin: 21, dmgMax: 27, effect: 'rattled', hpThreshold: 36 }
      ],
      // Phase 2 — "El Folio en Blanco": the pen runs dry, the page takes over.
      phase2: {
        tint: 0xf0f0ff,
        hp: 68, maxHp: 68, dread: 24, focus: 18,
        attacks: [
          { dmgMin: 14, dmgMax: 18, effect: 'blankMind' },
          { dmgMin: 17, dmgMax: 23, effect: 'frozen' },
          { dmgMin: 23, dmgMax: 29, effect: 'doubt', hpThreshold: 34 }
        ]
      }
    },
    newAbilities: ['breakFree']
  },
  {
    id: 5, // Tu Interior — the mindscape core
    tilesetKey: 'dungeon',
    accent: 0x00c2b5, bossColor: '#8800FF',
    npcs: [
      { name: 'The Memory', calmRestore: 15, cpRestore: 20, sprite: 'amelia', tint: 0x88ffee },
      { name: 'The Spark', calmRestore: 50, cpRestore: 100, fullRestore: true, sprite: 'adam', tint: 0xffd700 }
    ],
    boss: {
      spriteKey: 'boss-ansiedad', tint: 0xaa66ff,
      hp: 150, maxHp: 150, dread: 25, focus: 20,
      attacks: [
        { dmgMin: 15, dmgMax: 19, effect: 'whatIf' },
        { dmgMin: 18, dmgMax: 24, effect: 'doubt' },
        { dmgMin: 10, dmgMax: 13, hits: 4, effect: null, hpThreshold: 85 },
        { dmgMin: 26, dmgMax: 33, effect: 'mirrorBreak', hpThreshold: 32, selfWeaken: true }
      ]
    },
    newAbilities: []
  }
];
