// ============================================================
// BRAVE ENOUGH — game.js
// Complete standalone JRPG engine. No external dependencies.
// ============================================================

// ============================================================
// REGRESSION REPORT
// ============================================================
//
// BUGS FOUND AND FIXED:
//
// BUG 1 — updateLevelIntro: missing `transitioning` guard (PRIMARY KNOWN BUG)
//   Once levelIntroState.done became true, startFadeOut() was called EVERY FRAME
//   because there was no guard flag. Each call reset gs.fadeAlpha to 0, so the
//   fade-out never completed and the game was permanently stuck on level intro.
//   FIX: Added `transitioning: false` field to levelIntroState, initialized in
//   initLevelIntro(). In updateLevelIntro(), wrapped startFadeOut() call with
//   `if (!levelIntroState.transitioning)` and set it to true before the call.
//   ALSO: In handleKeyDown LEVEL_INTRO, added guard so Enter/Space no longer
//   manipulates lineTimer/lineFadeDir when levelIntroState.transitioning is true.
//
// BUG 2 — checkExplorationBattleTransition: never auto-called from updateExploration
//   After all NPC dialogues, the hero walks to x=400 and stops. The phase becomes
//   'battle_transition'. checkExplorationBattleTransition() was only called from
//   input handlers (keydown/click), so the game sat silently waiting for the player
//   to press Enter with no prompt, and no auto-advance.
//   FIX: Added call to checkExplorationBattleTransition() inside updateExploration()
//   so the transition fires automatically the moment the hero stops walking.
//   Also added a `transitioning` guard to explorationState and initExploration()
//   to prevent the transition being triggered twice.
//
// BUG 3 — advanceLevelClear: missing `transitioning` guard
//   advanceLevelClear() called startFadeOut() unconditionally. Pressing Enter
//   multiple times (or Enter + click together) would call startFadeOut() multiple
//   times, resetting fadeAlpha each time AND executing gs.currentLevel++ multiple
//   times, skipping levels or going out of bounds.
//   FIX: Added `transitioning: false` to levelClearState, initialized in
//   initLevelClear(). advanceLevelClear() now guards with transitioning check.
//
// BUG 4 — advanceFinalVictory: missing `transitioning` guard
//   Same pattern as BUG 3. Multiple Enter presses or Enter+click called
//   startFadeOut() repeatedly during the final victory screen.
//   FIX: Added `transitioning: false` to finalVictoryState, initialized in
//   initFinalVictory(). advanceFinalVictory() now guards with transitioning check.
//
// BUG 5 — transitionToNameEntry: missing guard on title screen
//   Both handleKeyDown and handleClick call transitionToNameEntry() when
//   titleState.logoVisible is true. If both fire in the same frame (touch devices,
//   or holding Enter while clicking), startFadeOut() was called twice.
//   FIX: Added `transitioning: false` to titleState, initialized in initTitle().
//   transitionToNameEntry() now checks and sets titleState.transitioning.
//
// BUG 6 — confirmGameOver: missing `transitioning` guard
//   Pressing Enter multiple times on the Game Over screen called startFadeOut()
//   multiple times, corrupting the fade state and potentially running the
//   reset logic multiple times.
//   FIX: Added `transitioning: false` to gameOverState, initialized in
//   initGameOver(). confirmGameOver() now guards with transitioning check.
//
// BUG 7 — applyBossAttackEffect: missing 'mirrorBreak' case
//   The level 5 boss (Anxiety) has an attack with effect: 'mirrorBreak'.
//   The applyBossAttackEffect() switch had no case for 'mirrorBreak', so the
//   effect silently did nothing. The attack was supposed to drain hero Calm.
//   FIX: Added 'mirrorBreak' case to applyBossAttackEffect() that drains
//   12 Calm from the hero (representing the psychological weight of the attack).
//
// BUG 8 — handleKeyDown LEVEL_INTRO: Enter/Space after done manipulates fade state
//   When levelIntroState.done was true (but transitioning not yet checked),
//   pressing Enter set lineTimer=0 and lineFadeDir=-1, which then caused
//   updateLevelIntro to attempt another startFadeOut call in the same/next frame.
//   FIX: handleKeyDown LEVEL_INTRO branch now checks transitioning before
//   manipulating lineTimer/lineFadeDir.
//
// STATE TRANSITION VERIFICATION:
//   TITLE → NAME_ENTRY:       guarded by titleState.transitioning ✓
//   NAME_ENTRY → LEVEL_INTRO: guarded by nameEntryState.transitioning ✓ (was already fixed)
//   LEVEL_INTRO → EXPLORATION: guarded by levelIntroState.transitioning ✓ (BUG 1 FIX)
//   EXPLORATION → BATTLE:     auto-triggered from updateExploration, guarded by
//                             explorationState.transitioning ✓ (BUG 2 FIX)
//   BATTLE (hero wins) → LEVEL_CLEAR: called once from setTimeout in triggerBossDefeat ✓
//   BATTLE (hero wins, L5) → FINAL_VICTORY: same, guarded by single setTimeout call ✓
//   BATTLE (hero loses) → GAME_OVER: called once from dialogue callback ✓
//   LEVEL_CLEAR → LEVEL_INTRO/FINAL_VICTORY: guarded by levelClearState.transitioning ✓ (BUG 3)
//   FINAL_VICTORY → CREDITS: guarded by finalVictoryState.transitioning ✓ (BUG 4)
//   CREDITS → TITLE: guarded by creditsState.done flag + setTimeout ✓
//   GAME_OVER → retry/title: guarded by gameOverState.transitioning ✓ (BUG 6)
//
// INPUT HANDLER VERIFICATION:
//   TITLE: Enter/Space/click → transitionToNameEntry (guarded) ✓
//   NAME_ENTRY: typing, Enter=confirm, Enter after confirm=skip wait (guarded) ✓
//   LEVEL_INTRO: Enter/Space speeds up line (guarded when transitioning) ✓
//   EXPLORATION: Enter/Space/Z advances dialogue; auto-triggers battle ✓
//   BATTLE dialogue: Enter/Space/Z advances dialogue ✓
//   BATTLE player_turn: Arrow keys navigate abilities, Enter/Space/Z confirms ✓
//   LEVEL_CLEAR: Enter/Space/click advances (guarded) ✓
//   GAME_OVER: ArrowUp/Down selects, Enter/Space/click confirms (guarded) ✓
//   FINAL_VICTORY: Enter/Space/click advances (guarded) ✓
//   CREDITS: Enter/Space/click skips ahead ✓
//
// BATTLE SYSTEM VERIFICATION:
//   All 6 abilities (breatheDeep, speakUp, reframe, findYourPeople,
//     believeInYourself, breakFree) execute correctly ✓
//   Calm cost deducted before ability fires ✓
//   findYourPeople cooldown set to 2 on use, decremented each battle init ✓
//   Boss HP reaches 0 → triggerBossDefeat() via setTimeout ✓
//   Boss attack selection handles hpThreshold attacks correctly ✓
//   mirrorBreak effect now properly drains Calm ✓ (BUG 7 FIX)
//   initBattle properly resets all battle state ✓
//
// LEVEL PROGRESSION VERIFICATION:
//   Levels 1-4 clear → LEVEL_CLEAR → gs.currentLevel++ → next LEVEL_INTRO ✓
//   Level 5 boss defeated → FINAL_VICTORY (not LEVEL_CLEAR) ✓
//   gs.currentLevel bounds checked: < LEVELS.length before incrementing ✓
//   Hero CP/Calm fully restored in initLevelClear() ✓
//   unlockedAbilities grows correctly: +1 per level clear ✓
//
// ============================================================

'use strict';

// ── Constants ──────────────────────────────────────────────
const CANVAS_W = 480;
const CANVAS_H = 320;
const TILE_SIZE = 16;

// ── State enum ─────────────────────────────────────────────
const State = {
  TITLE: 'TITLE',
  NAME_ENTRY: 'NAME_ENTRY',
  LEVEL_INTRO: 'LEVEL_INTRO',
  EXPLORATION: 'EXPLORATION',
  BATTLE: 'BATTLE',
  LEVEL_CLEAR: 'LEVEL_CLEAR',
  GAME_OVER: 'GAME_OVER',
  FINAL_VICTORY: 'FINAL_VICTORY',
  CREDITS: 'CREDITS'
};

// ── Language / Translation ──────────────────────────────────
let currentLang = 'es';

function t(key) {
  return TRANSLATIONS.t(currentLang, key);
}

function tFn(key, ...args) {
  // For keys that are functions (e.g. nameConfirmSpark)
  const fn = t(key);
  if (typeof fn === 'function') return fn(...args);
  return fn ?? key;
}

function tNPC(levelIdx, npcIdx, lineIdx) {
  return TRANSLATIONS.getNPCLine(currentLang, levelIdx, npcIdx, lineIdx);
}

// ── Game State ─────────────────────────────────────────────
const gs = {
  state: State.TITLE,
  playerName: '',
  currentLevel: 0,   // 0-based index
  hero: { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 },
  unlockedAbilities: ['breatheDeep', 'speakUp'],
  prevMostUsed: null,
  abilityUseCount: {},
  activeBuffs: [],    // { id, name, turnsLeft, value }
  activeDebuffs: [],
  findPeopleCooldown: 0,
  groundYourselfCooldown: 0,
  powerPoseCooldown: 0,
  limitBreakCharge: 0,
  // timing
  timestamp: 0,
  dt: 0,
  // fade
  fadeAlpha: 0,
  fadeDir: 0, // 1 = fade in (black→clear), -1 = fade out (clear→black)
  fadeSpeed: 0.04,
  fadeCallback: null,
};

// ── Particle System ────────────────────────────────────────
const particles = [];

function spawnParticle(x, y, color, vx, vy, life, size = 2) {
  particles.push({ x, y, color, vx, vy, life, maxLife: life, size });
}

function spawnBurst(x, y, color, count = 12, speed = 1.5) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const sp = speed * (0.5 + Math.random());
    spawnParticle(x, y, color, Math.cos(angle) * sp, Math.sin(angle) * sp, 40 + Math.random() * 20);
  }
}

function spawnSparkRain(count = 8) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * CANVAS_W;
    spawnParticle(x, -4, '#FFD700', (Math.random() - 0.5) * 0.5, 0.8 + Math.random() * 1.2, 80 + Math.random() * 40, 2);
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04; // gravity
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawParticles(ctx) {
  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

// ── Floating damage numbers ────────────────────────────────
const floaters = [];

function spawnFloater(x, y, text, color) {
  floaters.push({ x, y, text, color, life: 60, maxLife: 60, vy: -0.8 });
}

function updateFloaters() {
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.y += f.vy;
    f.vy *= 0.97;
    f.life--;
    if (f.life <= 0) floaters.splice(i, 1);
  }
}

function drawFloaters(ctx) {
  for (const f of floaters) {
    const alpha = Math.min(1, f.life / 20);
    ctx.globalAlpha = alpha;
    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, Math.round(f.x), Math.round(f.y));
  }
  ctx.globalAlpha = 1;
}

// ── Pixel text helpers ─────────────────────────────────────
function pixelText(ctx, text, x, y, color = '#FFFFFF', size = 8) {
  ctx.font = `${size}px monospace`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function pixelTextCenter(ctx, text, y, color = '#FFFFFF', size = 8) {
  ctx.font = `${size}px monospace`;
  const w = ctx.measureText(text).width;
  ctx.fillStyle = color;
  ctx.fillText(text, Math.round((CANVAS_W - w) / 2), y);
}

function pixelTextShadow(ctx, text, x, y, color, shadowColor, size = 8) {
  ctx.font = `bold ${size}px monospace`;
  ctx.fillStyle = shadowColor;
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function pixelTextCenterShadow(ctx, text, y, color, shadowColor, size = 8) {
  ctx.font = `bold ${size}px monospace`;
  const w = ctx.measureText(text).width;
  const x = Math.round((CANVAS_W - w) / 2);
  ctx.fillStyle = shadowColor;
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

// ── HP/Calm bar helper ─────────────────────────────────────
function drawBar(ctx, x, y, w, h, val, max, fillColor, bgColor = '#1a1a2a') {
  ctx.fillStyle = bgColor;
  ctx.fillRect(x, y, w, h);
  const filled = Math.max(0, Math.round((val / max) * w));
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, filled, h);
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
}

// ── Fade helpers ───────────────────────────────────────────
function startFadeIn(cb) {
  gs.fadeAlpha = 1;
  gs.fadeDir = -1;
  gs.fadeCallback = cb || null;
}

function startFadeOut(cb) {
  gs.fadeAlpha = 0;
  gs.fadeDir = 1;
  gs.fadeCallback = cb || null;
}

function updateFade() {
  if (gs.fadeDir === 0) return;
  gs.fadeAlpha += gs.fadeDir * gs.fadeSpeed;
  if (gs.fadeDir === 1 && gs.fadeAlpha >= 1) {
    gs.fadeAlpha = 1;
    gs.fadeDir = 0;
    if (gs.fadeCallback) { const cb = gs.fadeCallback; gs.fadeCallback = null; cb(); }
  } else if (gs.fadeDir === -1 && gs.fadeAlpha <= 0) {
    gs.fadeAlpha = 0;
    gs.fadeDir = 0;
    if (gs.fadeCallback) { const cb = gs.fadeCallback; gs.fadeCallback = null; cb(); }
  }
}

function drawFade(ctx) {
  if (gs.fadeAlpha <= 0) return;
  ctx.globalAlpha = gs.fadeAlpha;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.globalAlpha = 1;
}


// ── LEVEL DATA ─────────────────────────────────────────────
const LEVELS = [
  {
    id: 1,
    name: 'The Exam Room',
    palette: { bg: '#1a1a2e', floor: '#2A2A35', wall: '#1E1E28', accent: '#B8CC60', text: '#F0EEE0', boss: '#CC2222' },
    tileset: 'exam',
    introLines: [
      'The smell of chalk and cold air.',
      'Every mistake you\'ve ever made lives here.',
      'Let\'s find out what they weigh.'
    ],
    sparkIntro: 'This room has been in your head a long time, hasn\'t it? Let\'s clear it out.',
    npcs: [
      {
        name: 'The Anxious Echo',
        lines: [
          '"If I get this wrong, they\'ll know I don\'t belong here."',
          '"They\'ll all see. They\'ll all know I\'ve been faking this whole time."',
          '...',
          '"...Is that what you think too?"'
        ],
        calmRestore: 0, cpRestore: 0
      },
      {
        name: 'The Hall Monitor of Mistakes',
        lines: [
          '"Infraction logged. Wrong answer on page three. Incorrect approach on question seven."',
          '"Your margin notes suggest confusion. Confusion has been noted."',
          '"I\'m still learning."',
          '...The Monitor pauses. Writes something. Steps aside.'
        ],
        calmRestore: 0, cpRestore: 0
      },
      {
        name: 'The Encouraging Scrawl',
        lines: [
          '"Hey. I\'ve seen you in here before. You always make it out."',
          '"— Someone who\'s rooting for you"'
        ],
        calmRestore: 10, cpRestore: 0
      }
    ],
    boss: {
      name: 'The Red Pen',
      fullName: 'The Red Pen, Arbiter of Errors',
      spriteKey: 'redPen',
      hp: 84, maxHp: 84,
      dread: 13, focus: 10,
      attacks: [
        { name: 'Red Mark', flavor: '"Wrong."', dmgMin: 9, dmgMax: 13, effect: null },
        { name: 'Corrections Due', flavor: '"Let me show you all the ways you fell short."', dmgMin: 6, dmgMax: 6, effect: 'marked' },
        { name: 'Final Exam', flavor: '"Time\'s up. You weren\'t ready. You were never ready."', dmgMin: 15, dmgMax: 19, effect: null, hpThreshold: 40 }
      ],
      taunts: [
        '"Every wrong answer you\'ve ever given lives in this room. I counted them."',
        '"You studied, didn\'t you? And you still don\'t know enough. You never know enough."',
        '"What will they think when they see your score? What will that say about you?"'
      ],
      defeatLines: [
        '"I... I just wanted you to be prepared. I didn\'t want you to be embarrassed. I only ever..."',
        '"...I only ever wanted you to get it right."',
        '"Maybe right doesn\'t have to mean perfect."'
      ]
    },
    clearLines: ['The Red Pen is quiet now.', 'One room cleared. You are still here.'],
    sparkClear: 'One room down. And look — you\'re still here.',
    newAbility: 'reframe',
    newAbilities: ['reframe', 'groundYourself'],
    transitionLines: [
      'The Exam Room dissolves behind you.',
      'The walls rearrange themselves into something else — something louder, more crowded, more watching.',
      'The Hallway.'
    ]
  },
  {
    id: 2,
    name: 'The Hallway',
    palette: { bg: '#1a1020', floor: '#D4C4A0', wall: '#6B8FAB', accent: '#3D3050', text: '#FFFFFF', boss: '#7B2FBE' },
    tileset: 'hallway',
    introLines: [
      'Thirty-seven steps. Feels like three hundred.',
      'Every eye a judgment, every whisper a verdict.',
      'But you\'ve been through exam rooms before.',
      'Keep walking.'
    ],
    sparkIntro: 'I know this one. This is the one where everything feels like it\'s about you. Keep walking.',
    npcs: [
      {
        name: 'The Gossiping Silhouettes',
        lines: [
          'SHADOW A: "Oh — "',
          'SHADOW B: "— yeah, I saw —"',
          'SHADOW A: "— do you think they —"',
          'SHADOW B: "— probably."',
          'They were probably not talking about you at all. Probably.'
        ],
        calmRestore: 0, cpRestore: 0
      },
      {
        name: 'The Friend at a Locker',
        lines: [
          '"Hey. You look like you\'re having one of those days."',
          '"I have them too. Like everything is just... a lot."',
          '"Walk with me for a second. It\'s easier when you don\'t feel like the only one."',
          '"I gotta go in here. But hey — you\'ve got this."'
        ],
        calmRestore: 0, cpRestore: 5
      },
      {
        name: 'The Mirror Locker',
        lines: [
          'Your reflection looks back at you.',
          'It looks scared.',
          'You realize: the scared one is also you. The brave one walking forward is also you.',
          'They are the same person.'
        ],
        calmRestore: 8, cpRestore: 0
      }
    ],
    boss: {
      name: 'The Whisper',
      fullName: 'The Whisper, Crowd-Voice Incarnate',
      spriteKey: 'whisper',
      hp: 98, maxHp: 98,
      dread: 16, focus: 12,
      attacks: [
        { name: 'What Did They Say', flavor: '"Heard the one about you? It\'s not good."', dmgMin: 11, dmgMax: 15, effect: 'rattled' },
        { name: 'Eyes On You', flavor: '"Everyone. Is. Watching."', dmgMin: 15, dmgMax: 21, effect: null },
        { name: 'The Rumor Mill', flavor: '"You can\'t outrun what everyone already knows."', dmgMin: 18, dmgMax: 24, effect: 'focusDown', hpThreshold: 50 }
      ],
      taunts: [
        '"They looked at you in the hallway today. Did you notice? They all looked. Right at you."',
        '"What are you going to do — speak up? Perfect. Give them more material."',
        '"Even if you win here, they\'ll still be watching. They\'ll always be watching."'
      ],
      defeatLines: [
        '"I\'m not... I\'m not separate from you, you know."',
        '"I was just every time you felt unseen and then suddenly seen, and it hurt. I\'m what that feels like."',
        '"I wasn\'t trying to ruin you. I was trying to warn you. I just... didn\'t know how to stop."'
      ]
    },
    clearLines: ['The Whisper has no voice left.', 'The hallway is just a hallway.'],
    sparkClear: 'You hear that? Silence. Real silence. You did that.',
    newAbility: 'findYourPeople',
    newAbilities: ['selfTalk', 'findYourPeople'],
    transitionLines: [
      'The crowd thins. The lockers give way to open air — too much open air.',
      'Grass under your feet. Bleachers rising.',
      'The Sports Field.'
    ]
  },
  {
    id: 3,
    name: 'The Sports Field',
    palette: { bg: '#0D1B2A', floor: '#3A7D44', wall: '#8A8A9A', accent: '#FFD166', text: '#FFFFFF', boss: '#FF8C42' },
    tileset: 'field',
    introLines: [
      'The lights are too bright here.',
      'They find every stumble, every slip, every moment you\'re not quite good enough.',
      'Good thing you\'re not here to be perfect.'
    ],
    sparkIntro: 'They\'re all here. Every face you\'ve ever tried not to disappoint. But look — the ground under your feet. You can still stand on it.',
    npcs: [
      {
        name: 'The Teammate on the Bench',
        lines: [
          '"I threw up before the last game. Actual vomit. Coach saw."',
          '"I still had to go on. So I did."',
          '"I didn\'t play great. We still won, actually, but I didn\'t do much."',
          '"Still counts, right? Showing up still counts?"'
        ],
        calmRestore: 0, cpRestore: 0
      },
      {
        name: 'The Whistle',
        lines: [
          '"Clock\'s running."',
          '"You\'re being evaluated."',
          '"Every second is being recorded. Every stumble. Every hesitation."',
          '"...Performance noted."'
        ],
        calmRestore: 0, cpRestore: 0
      },
      {
        name: 'The Left-Behind Trophy',
        lines: [
          'The engraving reads: "For trying when it was terrifying."',
          'There\'s no name on it.',
          'Maybe it was meant for someone like you.'
        ],
        calmRestore: 10, cpRestore: 0
      }
    ],
    boss: {
      name: 'The Spotlight',
      fullName: 'The Spotlight, Exposer of Imperfections',
      spriteKey: 'spotlight',
      hp: 108, maxHp: 108,
      dread: 18, focus: 14,
      attacks: [
        { name: 'Exposed', flavor: '"Everyone can see you now. Everything."', dmgMin: 13, dmgMax: 18, effect: 'scrutinized' },
        { name: 'Magnified Flaw', flavor: '"That. Right there. Did you think nobody would notice that?"', dmgMin: 16, dmgMax: 22, effect: null },
        { name: 'Total Illumination', flavor: '"There is no hiding. I see all of it."', dmgMin: 21, dmgMax: 27, effect: 'overexposed', hpThreshold: 55 }
      ],
      taunts: [
        '"Look at them watching you. You can\'t perform when you\'re being watched, can you?"',
        '"Your form is wrong. Your timing is off. They\'re all noticing. They\'re all keeping score."',
        '"What if you fall? Right here? In front of all of them? What then?"'
      ],
      defeatLines: [
        '"I only wanted to help you improve. If you can see every flaw, you can fix every flaw."',
        '"But you weren\'t a project. You were a person."',
        '"I\'m sorry I forgot that."'
      ]
    },
    clearLines: ['The Spotlight has dimmed.', 'You didn\'t need to be perfect. You just needed to show up.'],
    sparkClear: 'Three down. Look how far you\'ve come from that first room.',
    newAbility: 'believeInYourself',
    newAbilities: ['selfCompassion', 'believeInYourself', 'powerPose'],
    transitionLines: [
      'The field folds away. The ground becomes wooden boards — a stage floor, old and resonant.',
      'Curtains ahead. A light beyond them. The low murmur of an audience.',
      'The Stage.'
    ]
  },
  {
    id: 4,
    name: 'The Stage',
    palette: { bg: '#0A0A12', floor: '#8B6914', wall: '#4A1535', accent: '#C9A84C', text: '#F5EFDF', boss: '#C8E6F5' },
    tileset: 'stage',
    introLines: [
      'The curtain is about to rise.',
      'They\'re all waiting. The audience of everything you\'ve ever feared.',
      'On a night like this, just walking out is the performance.'
    ],
    sparkIntro: 'I know this is the hardest one. Both things at once — the doing and the watching. But the stage is yours. They can\'t take that.',
    npcs: [
      {
        name: 'The Actor in the Wings',
        lines: [
          '"Every single night. Every single night I feel like I\'m going to forget my lines."',
          '"And every night I walk out there and say them anyway."',
          '"The trick is — you don\'t wait for the fear to leave. You walk out while it\'s still there."'
        ],
        calmRestore: 0, cpRestore: 0
      },
      {
        name: 'The Empty Microphone',
        lines: [
          `You step up to the microphone.`,
          'You don\'t have to say anything perfect.',
          'Sometimes just showing up at the mic is the whole point.'
        ],
        calmRestore: 10, cpRestore: 15
      },
      {
        name: 'The Director\'s Note',
        lines: [
          '"To whoever finds this:"',
          '"A performance is not a test. It is not a verdict. It is a gift — imperfect, present, given."',
          '"Go give yours."',
          '"— The Director (who has never, not once, been unafraid)"'
        ],
        calmRestore: 12, cpRestore: 0
      }
    ],
    boss: {
      name: 'Stage Fright',
      fullName: 'Stage Fright, the Freezing Specter',
      spriteKey: 'stageFright',
      hp: 119, maxHp: 119,
      dread: 21, focus: 16,
      attacks: [
        { name: 'Stage Freeze', flavor: '"Your legs aren\'t working. They\'re all watching you stand there."', dmgMin: 12, dmgMax: 16, effect: 'frozen' },
        { name: 'The Blank Mind', flavor: '"Line forgotten. Everything forgotten. Just you and a thousand waiting eyes."', dmgMin: 16, dmgMax: 22, effect: 'blankMind' },
        { name: 'Curtain Call', flavor: '"Your performance is over. It never really began."', dmgMin: 22, dmgMax: 28, effect: 'silenced', hpThreshold: 60 }
      ],
      taunts: [
        '"Everyone came to see you. Look at them, waiting. What are you going to give them? This?"',
        '"Forget the next line. Forget what you were going to say. That feeling — that\'s me. I live there."',
        '"You\'ll never be ready. There is no ready. There is only the terror, forever."'
      ],
      defeatLines: [
        '"The stage was mine. This was my stage first."',
        '"I\'m the one who made you rehearse. And rehearse. Because if you rehearsed enough, maybe it would be okay."',
        '"All this time. I was just scared too."'
      ]
    },
    clearLines: ['Stage Fright has fallen.', 'The curtain is yours now. All of it is yours.'],
    sparkClear: 'One more. The last one. When we get there — you don\'t have to destroy it. You just have to understand it.',
    newAbility: 'breakFree',
    newAbilities: ['breakFree'],
    transitionLines: [
      'The stage becomes unreal. The wood softens, the light bends, the architecture stops making sense.',
      'You are going somewhere that has never had walls — and has always had them.',
      'The Mindscape Core.'
    ]
  },
  {
    id: 5,
    name: 'The Mindscape Core',
    palette: { bg: '#050508', floor: '#1A0030', wall: '#0A0A12', accent: '#00C2B5', text: '#FFFFFF', boss: '#8800FF' },
    tileset: 'mind',
    introLines: [
      'No more rooms. No more crowds.',
      'Just you, and the shape of every fear you\'ve ever had, waiting at the center of everything.',
      'This is where it started.',
      'This is where it ends.'
    ],
    sparkIntro: 'You built this place. Every room we walked through — you built them. Not because you wanted to. Because you were surviving. But you\'re not just surviving anymore.',
    npcs: [
      {
        name: 'The Memory',
        lines: [
          '"You were never as alone as it felt."',
          '"Every person who ever helped you — they were part of you too. You let them in."',
          '"That\'s brave."'
        ],
        calmRestore: 15, cpRestore: 20
      },
      {
        name: 'The Spark\'s Full Form',
        lines: [
          '"I\'ve been with you the whole time. Do you know what I am?"',
          '"I\'m the part of you that wanted to keep going. That\'s all."',
          '"Every time you got up after something knocked you down — that was me. That was YOU."',
          '"I\'m not separate. I never was."',
          '"Whatever that mirror shows — remember what I am. Remember what YOU are."'
        ],
        calmRestore: 50, cpRestore: 100, fullRestore: true
      }
    ],
    boss: {
      name: 'Anxiety',
      fullName: 'Anxiety — The Dark Mirror, the Final Form',
      spriteKey: 'anxiety',
      hp: 140, maxHp: 140,
      dread: 24, focus: 20,
      attacks: [
        { name: 'What If', flavor: '"What if you\'ve already used your best moves? What if you don\'t have enough left?"', dmgMin: 15, dmgMax: 19, effect: 'whatIf' },
        { name: 'You Should Have Known Better', flavor: '"You knew this was coming. You should have been ready. You\'re never ready enough."', dmgMin: 18, dmgMax: 24, effect: 'doubt' },
        { name: 'The Spiral', flavor: '"Remember the exam? Remember the hallway? Remember the field? Remember the stage? You\'ll never stop remembering."', dmgMin: 10, dmgMax: 13, hits: 4, effect: null, hpThreshold: 80 },
        { name: 'Mirror Break', flavor: '"If I go — what are you without me? I\'ve been with you your whole life."', dmgMin: 26, dmgMax: 33, effect: 'mirrorBreak', hpThreshold: 30, selfWeaken: true }
      ],
      taunts: [
        '"I know every move you\'re going to make. I AM you."',
        '"All this bravery — it\'s just another performance, isn\'t it? Another thing to fail at."',
        '"I\'m the reason you survived this long. Without me, who keeps you safe?"'
      ],
      defeatLines: [
        '"You know I\'m not going away. You know that, right?"',
        '"...Good. You know. You\'ve always known."',
        '"I\'ll still be there. Before big things. Before the things that matter. I\'ll be there."',
        '"But maybe... maybe you\'ll remember this. That you kept walking anyway."',
        '"Maybe next time, when you feel me coming, you\'ll recognize me. And you\'ll breathe."',
        '"...You were brave enough."'
      ]
    },
    clearLines: [],
    sparkClear: '',
    newAbility: null,
    transitionLines: []
  }
];

// ── Ability definitions ────────────────────────────────────
const ABILITIES = {
  breatheDeep: {
    id: 'breatheDeep', name: 'Breathe Deep', cost: 5,
    flavor: '"Slow the breath. Slow the spiral. The fear is there — but so are you."',
    color: '#88CCFF', type: 'heal'
  },
  speakUp: {
    id: 'speakUp', name: 'Speak Up', cost: 5,
    flavor: '"Say the thing. Say it out loud. A voice, even shaking, is still a voice."',
    color: '#FFD166', type: 'attack'
  },
  reframe: {
    id: 'reframe', name: 'Reframe', cost: 8,
    flavor: '"A bad grade is not a bad life. A wrong answer is not a wrong person. Look again."',
    color: '#B8CC60', type: 'attack'
  },
  findYourPeople: {
    id: 'findYourPeople', name: 'Find Your People', cost: 10,
    flavor: '"You were never supposed to do this alone. Nobody is."',
    color: '#FF9966', type: 'summon'
  },
  believeInYourself: {
    id: 'believeInYourself', name: 'Believe In Yourself', cost: 15,
    flavor: '"Not because you\'re certain. Not because it\'s easy. Because you choose to."',
    color: '#FFD700', type: 'heavy'
  },
  breakFree: {
    id: 'breakFree', name: 'Break Free', cost: 20,
    flavor: '"All of it — the fear, the shame, the weight of every \'what if\' — gone."',
    color: '#FF44AA', type: 'ultimate'
  },
  groundYourself: {
    id: 'groundYourself', name: 'Ground Yourself', cost: 0, cooldown: 3,
    flavor: '"5 things you see. 4 you touch. 3 you hear. 2 you smell. 1 you taste. Still here."',
    color: '#88CCFF', type: 'heal'
  },
  selfTalk: {
    id: 'selfTalk', name: 'Self-Talk', cost: 8,
    flavor: '"That thought isn\'t a fact. Challenge it."',
    color: '#B8CC60', type: 'attack'
  },
  selfCompassion: {
    id: 'selfCompassion', name: 'Self-Compassion', cost: 15,
    flavor: '"You would not speak to a friend this way. Speak to yourself kindly."',
    color: '#FF9966', type: 'heal'
  },
  powerPose: {
    id: 'powerPose', name: 'Power Pose', cost: 8, cooldown: 3,
    flavor: '"Stand tall. Chest open. Two minutes. Your body believes it before your mind does."',
    color: '#FFD700', type: 'attack'
  },
  limitBreak: {
    id: 'limitBreak', name: 'Sin Miedo', cost: 0,
    flavor: '"El miedo no desaparece. Lo superas igualmente."',
    color: '#FFD700', type: 'limit'
  }
};


// ── TITLE STATE ────────────────────────────────────────────
const titleState = {
  stars: [],
  sparkAngle: 0,
  transitioning: false,
  narrationIndex: -1,
  narrationTimer: 0,
  narrationAlpha: 0,
  narrationFadeDir: 1,
  logoVisible: false,
  logoAlpha: 0,
  promptBlink: 0,
  ready: false,
  // narrationLines are read from TRANSLATIONS at draw-time via t('titleNarration')
};

function initTitle() {
  titleState.stars = [];
  for (let i = 0; i < 80; i++) {
    titleState.stars.push({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      speed: 0.2 + Math.random() * 0.5,
      size: Math.random() < 0.3 ? 2 : 1,
      color: Math.random() < 0.2 ? '#00C2B5' : (Math.random() < 0.3 ? '#FFD166' : '#FFFFFF'),
      alpha: 0.3 + Math.random() * 0.7
    });
  }
  titleState.narrationIndex = 0;
  titleState.narrationTimer = 60;
  titleState.narrationAlpha = 0;
  titleState.narrationFadeDir = 1;
  titleState.logoVisible = false;
  titleState.logoAlpha = 0;
  titleState.promptBlink = 0;
  titleState.ready = false;
  titleState.sparkAngle = 0;
  titleState.transitioning = false;
}

function updateTitle(ts) {
  // Stars drift upward
  for (const s of titleState.stars) {
    s.y -= s.speed;
    if (s.y < -2) s.y = CANVAS_H + 2;
  }

  // Golden spark rain
  if (Math.random() < 0.15) {
    spawnParticle(
      Math.random() * CANVAS_W, CANVAS_H + 2,
      Math.random() < 0.5 ? '#FFD700' : '#00C2B5',
      (Math.random() - 0.5) * 0.6, -(0.5 + Math.random() * 1.0),
      100, 2
    );
  }

  // Spark orbit angle
  titleState.sparkAngle += 0.02;

  const narrationLines = t('titleNarration');

  // Narration sequence
  if (!titleState.logoVisible) {
    titleState.narrationTimer--;
    if (titleState.narrationTimer <= 0) {
      if (titleState.narrationFadeDir === 1) {
        titleState.narrationAlpha = Math.min(1, titleState.narrationAlpha + 0.03);
        if (titleState.narrationAlpha >= 1) {
          titleState.narrationFadeDir = 0;
          titleState.narrationTimer = 120; // hold
        }
      } else if (titleState.narrationFadeDir === 0) {
        titleState.narrationFadeDir = -1;
        titleState.narrationTimer = 0;
      } else {
        titleState.narrationAlpha = Math.max(0, titleState.narrationAlpha - 0.03);
        if (titleState.narrationAlpha <= 0) {
          titleState.narrationIndex++;
          if (titleState.narrationIndex >= narrationLines.length) {
            titleState.logoVisible = true;
          }
          titleState.narrationFadeDir = 1;
          titleState.narrationTimer = 20;
        }
      }
    }
  } else {
    titleState.logoAlpha = Math.min(1, titleState.logoAlpha + 0.02);
    titleState.promptBlink++;
  }
}

function drawTitle(ctx) {
  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  grad.addColorStop(0, '#050508');
  grad.addColorStop(1, '#0D0820');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Stars
  for (const s of titleState.stars) {
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
  }
  ctx.globalAlpha = 1;

  // Particles
  drawParticles(ctx);

  const narrationLines = t('titleNarration');

  if (!titleState.logoVisible) {
    // Narration lines
    if (titleState.narrationIndex < narrationLines.length) {
      const line = narrationLines[titleState.narrationIndex];
      ctx.globalAlpha = titleState.narrationAlpha;
      ctx.font = 'italic 9px monospace';
      const w = ctx.measureText(line).width;
      ctx.fillStyle = '#C0C8E0';
      ctx.fillText(line, Math.round((CANVAS_W - w) / 2), 175);
      ctx.globalAlpha = 1;
    }
  } else {
    ctx.globalAlpha = titleState.logoAlpha;

    // Title (use gameTitle from translations)
    const gameTitle = t('gameTitle');
    ctx.font = 'bold 22px monospace';
    const titleW = ctx.measureText(gameTitle).width;
    const titleX = Math.round((CANVAS_W - titleW) / 2);
    ctx.fillStyle = '#003322';
    ctx.fillText(gameTitle, titleX + 2, 102);
    ctx.fillStyle = '#00C2B5';
    ctx.fillText(gameTitle, titleX + 1, 101);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(gameTitle, titleX, 100);

    // Subtitle
    ctx.font = 'italic 8px monospace';
    const sub = t('subtitle');
    const subW = ctx.measureText(sub).width;
    ctx.fillStyle = '#88AABB';
    ctx.fillText(sub, Math.round((CANVAS_W - subW) / 2), 116);

    // Tagline
    ctx.font = '7px monospace';
    const tag = t('tagline');
    const tagW = ctx.measureText(tag).width;
    ctx.fillStyle = '#667788';
    ctx.fillText(tag, Math.round((CANVAS_W - tagW) / 2), 130);

    ctx.globalAlpha = 1;

    // Spark in corner orbiting
    const sx = 60 + Math.cos(titleState.sparkAngle) * 18;
    const sy = 70 + Math.sin(titleState.sparkAngle * 0.7) * 12;
    Sprites.spark.idle(ctx, Math.round(sx), Math.round(sy), 2);

    // Prompt blink
    if (Math.floor(titleState.promptBlink / 30) % 2 === 0) {
      const prompt = t('pressStart');
      ctx.font = '7px monospace';
      const pw = ctx.measureText(prompt).width;
      ctx.fillStyle = '#FFD166';
      ctx.fillText(prompt, Math.round((CANVAS_W - pw) / 2), 160);
    }

    // Language toggle — EN | ES — bottom right corner
    ctx.font = 'bold 7px monospace';
    const enLabel = 'EN';
    const esLabel = 'ES';
    const sepLabel = ' | ';
    const enW = ctx.measureText(enLabel).width;
    const sepW = ctx.measureText(sepLabel).width;
    const esW = ctx.measureText(esLabel).width;
    const toggleX = CANVAS_W - enW - sepW - esW - 8;
    const toggleY = CANVAS_H - 8;

    ctx.fillStyle = currentLang === 'en' ? '#FFD700' : '#445566';
    ctx.fillText(enLabel, toggleX, toggleY);
    ctx.fillStyle = '#334455';
    ctx.fillText(sepLabel, toggleX + enW, toggleY);
    ctx.fillStyle = currentLang === 'es' ? '#FFD700' : '#445566';
    ctx.fillText(esLabel, toggleX + enW + sepW, toggleY);
  }
}

// ── NAME ENTRY STATE ───────────────────────────────────────
const nameEntryState = {
  input: '',
  cursorBlink: 0,
  confirmed: false,
  sparkLine: '',
  sparkTimer: 0,
  sparkAlpha: 0,
  transitioning: false
};

function initNameEntry() {
  nameEntryState.input = '';
  nameEntryState.cursorBlink = 0;
  nameEntryState.confirmed = false;
  nameEntryState.sparkLine = '';
  nameEntryState.sparkTimer = 0;
  nameEntryState.sparkAlpha = 0;
  nameEntryState.transitioning = false;
}

function updateNameEntry() {
  nameEntryState.cursorBlink++;
  if (nameEntryState.confirmed) {
    nameEntryState.sparkTimer--;
    nameEntryState.sparkAlpha = Math.min(1, nameEntryState.sparkAlpha + 0.04);
    if (nameEntryState.sparkTimer <= 0 && !nameEntryState.transitioning) {
      nameEntryState.transitioning = true;
      startFadeOut(() => {
        gs.currentLevel = 0;
        initLevelIntro();
        gs.state = State.LEVEL_INTRO;
        startFadeIn(null);
      });
    }
  }
}

function drawNameEntry(ctx) {
  // Background
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Subtle stars
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 30; i++) {
    const x = ((i * 137 + 17) % CANVAS_W);
    const y = ((i * 97 + 41) % CANVAS_H);
    ctx.fillRect(x, y, 1, 1);
  }

  // Spark idle
  Sprites.spark.idle(ctx, CANVAS_W / 2 - 12, 60, 2);

  // Prompt
  pixelTextCenterShadow(ctx, t('namePrompt'), 115, '#FFFFFF', '#002233', 9);

  // Input box
  const boxW = 160, boxH = 18;
  const boxX = Math.round((CANVAS_W - boxW) / 2);
  const boxY = 126;
  ctx.fillStyle = '#0D0D20';
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = '#00C2B5';
  ctx.lineWidth = 1;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Input text + cursor
  const display = nameEntryState.input + (Math.floor(nameEntryState.cursorBlink / 20) % 2 === 0 ? '|' : ' ');
  ctx.font = '9px monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(display, boxX + 6, boxY + 13);

  // Instructions
  ctx.font = '7px monospace';
  ctx.fillStyle = '#556677';
  const inst = t('nameHint');
  const instW = ctx.measureText(inst).width;
  ctx.fillText(inst, Math.round((CANVAS_W - instW) / 2), 155);

  // Spark response after confirm
  if (nameEntryState.confirmed && nameEntryState.sparkLine) {
    ctx.globalAlpha = nameEntryState.sparkAlpha;
    ctx.font = 'italic 9px monospace';
    const resp = nameEntryState.sparkLine;
    const rw = ctx.measureText(resp).width;
    ctx.fillStyle = '#FFD166';
    ctx.fillText(resp, Math.round((CANVAS_W - rw) / 2), 180);
    ctx.globalAlpha = 1;
  }
}

function confirmName() {
  const name = nameEntryState.input.trim();
  if (name.length === 0) return;
  gs.playerName = name;
  nameEntryState.confirmed = true;
  nameEntryState.sparkLine = tFn('nameConfirmSpark', name);
  nameEntryState.sparkTimer = 140;
  SFX.sparkAppear();
}


// ── LEVEL INTRO STATE ──────────────────────────────────────
const levelIntroState = {
  lineIndex: 0,
  lineTimer: 0,
  lineAlpha: 0,
  lineFadeDir: 1,
  done: false,
  bgOffset: 0,
  transitioning: false
};

function initLevelIntro() {
  levelIntroState.lineIndex = 0;
  levelIntroState.lineTimer = 30;
  levelIntroState.lineAlpha = 0;
  levelIntroState.lineFadeDir = 1;
  levelIntroState.done = false;
  levelIntroState.bgOffset = 0;
  levelIntroState.transitioning = false;
  setTimeout(() => SFX.levelIntroAppear(), 300);
}

function updateLevelIntro() {
  const level = LEVELS[gs.currentLevel];
  levelIntroState.bgOffset += 0.3;
  levelIntroState.lineTimer--;

  if (levelIntroState.lineFadeDir === 1) {
    levelIntroState.lineAlpha = Math.min(1, levelIntroState.lineAlpha + 0.04);
    if (levelIntroState.lineAlpha >= 1) {
      levelIntroState.lineFadeDir = 0;
      levelIntroState.lineTimer = 100;
    }
  } else if (levelIntroState.lineFadeDir === 0) {
    if (levelIntroState.lineTimer <= 0) {
      levelIntroState.lineFadeDir = -1;
    }
  } else {
    levelIntroState.lineAlpha = Math.max(0, levelIntroState.lineAlpha - 0.04);
    if (levelIntroState.lineAlpha <= 0) {
      levelIntroState.lineIndex++;
      if (levelIntroState.lineIndex >= level.introLines.length) {
        levelIntroState.done = true;
        if (!levelIntroState.transitioning) {
          levelIntroState.transitioning = true;
          startFadeOut(() => {
            initExploration();
            gs.state = State.EXPLORATION;
            startFadeIn(null);
          });
        }
      } else {
        levelIntroState.lineFadeDir = 1;
        levelIntroState.lineTimer = 20;
      }
    }
  }
}

function drawLevelIntro(ctx) {
  const level = LEVELS[gs.currentLevel];
  const p = level.palette;

  // Background
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Draw some tiles for atmosphere
  drawLevelBackground(ctx, level, 0.4);

  // Dark overlay
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Level name (translated)
  const levelNames = t('levelNames');
  const displayName = (levelNames && levelNames[gs.currentLevel]) ? levelNames[gs.currentLevel] : level.name;
  ctx.font = 'bold 14px monospace';
  const lnw = ctx.measureText('— ' + displayName + ' —').width;
  ctx.fillStyle = p.accent;
  ctx.fillText('— ' + displayName + ' —', Math.round((CANVAS_W - lnw) / 2), 80);

  // Current intro line (use LEVELS array — the updateLevelIntro uses level.introLines.length)
  if (levelIntroState.lineIndex < level.introLines.length) {
    // Try translated line first, fall back to hardcoded
    const introLinesTrans = t('introLines.' + gs.currentLevel);
    let line;
    if (Array.isArray(introLinesTrans) && introLinesTrans[levelIntroState.lineIndex] !== undefined) {
      line = introLinesTrans[levelIntroState.lineIndex];
    } else {
      line = level.introLines[levelIntroState.lineIndex];
    }
    ctx.globalAlpha = levelIntroState.lineAlpha;
    ctx.font = 'italic 9px monospace';
    const lw = ctx.measureText(line).width;
    ctx.fillStyle = p.text;
    ctx.fillText(line, Math.round((CANVAS_W - lw) / 2), 160);
    ctx.globalAlpha = 1;
  }

  // Level number indicator
  ctx.font = '7px monospace';
  ctx.fillStyle = '#445566';
  ctx.fillText(`LEVEL ${level.id} / 5`, 10, CANVAS_H - 8);
}

// ── EXPLORATION STATE ──────────────────────────────────────
const explorationState = {
  heroX: 20,
  heroY: 190,
  heroTargetX: 20,
  heroWalking: false,
  npcIndex: 0,
  dialogueActive: false,
  dialogueLines: [],
  dialogueLineIndex: 0,
  dialogueText: '',
  dialogueTyped: 0,
  dialogueTimer: 0,
  dialogueSpeaker: '',
  dialogueDone: false,
  phase: 'walk', // 'walk', 'dialogue', 'battle_transition', 'done'
  waitingForInput: false,
  sparkVisible: false,
  sparkX: 0, sparkY: 0,
  walkTimer: 0,
  transitioning: false
};

const NPC_POSITIONS = [80, 190, 340]; // x positions for NPC encounters

function initExploration() {
  const level = LEVELS[gs.currentLevel];
  explorationState.heroX = 20;
  explorationState.heroY = 200;
  explorationState.heroTargetX = NPC_POSITIONS[0];
  explorationState.heroWalking = true;
  explorationState.npcIndex = 0;
  explorationState.dialogueActive = false;
  explorationState.dialogueLines = [];
  explorationState.dialogueLineIndex = 0;
  explorationState.dialogueText = '';
  explorationState.dialogueTyped = 0;
  explorationState.dialogueTimer = 0;
  explorationState.dialogueSpeaker = '';
  explorationState.dialogueDone = false;
  explorationState.phase = 'walk';
  explorationState.waitingForInput = false;
  explorationState.sparkVisible = true;
  explorationState.sparkX = 30;
  explorationState.sparkY = 195;
  explorationState.walkTimer = 0;
  explorationState.transitioning = false;
}

function startNPCDialogue(npc) {
  explorationState.dialogueActive = true;
  SFX.sparkAppear();
  // Build translated lines: try tNPC for each line, fall back to npc.lines
  const npcIdx = explorationState.npcIndex;
  const levelIdx = gs.currentLevel;
  const translatedLines = npc.lines.map((fallback, lineIdx) => {
    const trans = tNPC(levelIdx, npcIdx, lineIdx);
    return (trans && trans !== '') ? trans : fallback;
  });
  explorationState.dialogueLines = translatedLines;
  explorationState.dialogueLineIndex = 0;
  explorationState.dialogueTyped = 0;
  explorationState.dialogueText = '';
  explorationState.dialogueSpeaker = npc.name;
  explorationState.dialogueDone = false;
  explorationState.waitingForInput = false;
  explorationState.heroWalking = false;
}

function updateExploration() {
  const level = LEVELS[gs.currentLevel];
  explorationState.walkTimer++;

  // Hero walking
  if (explorationState.heroWalking) {
    const dx = explorationState.heroTargetX - explorationState.heroX;
    if (Math.abs(dx) < 2) {
      explorationState.heroX = explorationState.heroTargetX;
      explorationState.heroWalking = false;
      // Arrived at NPC
      if (explorationState.phase === 'walk' && explorationState.npcIndex < level.npcs.length) {
        startNPCDialogue(level.npcs[explorationState.npcIndex]);
      }
    } else {
      explorationState.heroX += dx > 0 ? 1.5 : -1.5;
    }
    // Spark follows hero
    explorationState.sparkX = explorationState.heroX - 14;
    explorationState.sparkY = explorationState.heroY - 8 + Math.sin(explorationState.walkTimer * 0.1) * 3;
  }

  // Dialogue typewriter
  if (explorationState.dialogueActive && !explorationState.waitingForInput) {
    const line = explorationState.dialogueLines[explorationState.dialogueLineIndex];
    if (explorationState.dialogueTyped < line.length) {
      explorationState.dialogueTimer++;
      if (explorationState.dialogueTimer % 2 === 0) {
        explorationState.dialogueTyped++;
        explorationState.dialogueText = line.slice(0, explorationState.dialogueTyped);
        SFX.typeChar();
      }
    } else {
      explorationState.waitingForInput = true;
    }
  }

  // Spark float
  explorationState.sparkY += Math.sin(explorationState.walkTimer * 0.08) * 0.15;

  // Auto-trigger battle transition when hero arrives at battle trigger point
  checkExplorationBattleTransition();
}

function advanceExplorationDialogue() {
  if (!explorationState.dialogueActive) return;
  const level = LEVELS[gs.currentLevel];

  // If still typing, complete immediately
  if (!explorationState.waitingForInput) {
    const line = explorationState.dialogueLines[explorationState.dialogueLineIndex];
    explorationState.dialogueTyped = line.length;
    explorationState.dialogueText = line;
    explorationState.waitingForInput = true;
    return;
  }

  explorationState.dialogueLineIndex++;
  if (explorationState.dialogueLineIndex >= explorationState.dialogueLines.length) {
    // Dialogue done
    explorationState.dialogueActive = false;
    explorationState.waitingForInput = false;

    // Apply NPC restore
    const npc = level.npcs[explorationState.npcIndex];
    if (npc.cpRestore) gs.hero.cp = Math.min(gs.hero.maxCp, gs.hero.cp + npc.cpRestore);
    if (npc.calmRestore) gs.hero.calm = Math.min(gs.hero.maxCalm, gs.hero.calm + npc.calmRestore);
    if (npc.fullRestore) { gs.hero.cp = gs.hero.maxCp; gs.hero.calm = gs.hero.maxCalm; }

    explorationState.npcIndex++;
    if (explorationState.npcIndex < level.npcs.length) {
      // Walk to next NPC
      explorationState.heroTargetX = NPC_POSITIONS[explorationState.npcIndex];
      explorationState.heroWalking = true;
    } else {
      // All NPCs done — walk to battle trigger point
      explorationState.heroTargetX = 400;
      explorationState.heroWalking = true;
      explorationState.phase = 'battle_transition';
    }
  } else {
    // Next line
    explorationState.dialogueTyped = 0;
    explorationState.dialogueText = '';
    explorationState.waitingForInput = false;
  }
}

function checkExplorationBattleTransition() {
  if (explorationState.phase === 'battle_transition' && !explorationState.heroWalking
      && !explorationState.transitioning) {
    explorationState.transitioning = true;
    explorationState.phase = 'done';
    SFX.fadeTransition();
    startFadeOut(() => {
      initBattle();
      gs.state = State.BATTLE;
      startFadeIn(null);
    });
  }
}

function drawExploration(ctx) {
  const level = LEVELS[gs.currentLevel];
  drawLevelBackground(ctx, level, 1.0);

  // Hero sprite (walking animation — alternate idle/attack frames)
  const walkFrame = Math.floor(explorationState.walkTimer / 8) % 2;
  if (explorationState.heroWalking && walkFrame === 1) {
    Sprites.hero.attack(ctx, Math.round(explorationState.heroX), Math.round(explorationState.heroY), 2);
  } else {
    Sprites.hero.idle(ctx, Math.round(explorationState.heroX), Math.round(explorationState.heroY), 2);
  }

  // Spark
  if (explorationState.sparkVisible) {
    const sa = explorationState.dialogueActive ?
      Sprites.spark.speak : Sprites.spark.idle;
    sa(ctx, Math.round(explorationState.sparkX), Math.round(explorationState.sparkY), 1);
  }

  // NPC indicators (glowing dots)
  const npcs = level.npcs;
  for (let i = explorationState.npcIndex; i < npcs.length; i++) {
    const nx = NPC_POSITIONS[i];
    const pulse = 0.6 + Math.sin(explorationState.walkTimer * 0.1 + i) * 0.4;
    ctx.globalAlpha = pulse;
    ctx.fillStyle = level.palette.accent;
    ctx.fillRect(nx + 8, 192, 4, 4);
    ctx.globalAlpha = 1;
    // NPC label
    ctx.font = '6px monospace';
    ctx.fillStyle = level.palette.accent;
    const nw = ctx.measureText(npcs[i].name).width;
    ctx.fillText(npcs[i].name, Math.round(nx + 8 - nw / 2 + 2), 188);
  }

  // Dialogue box
  if (explorationState.dialogueActive) {
    drawDialogueBox(ctx, explorationState.dialogueSpeaker,
      explorationState.dialogueText, explorationState.waitingForInput,
      level.palette.accent);
  }

  // Mini HP/Calm display
  drawMiniStats(ctx);
}


// ── BACKGROUND RENDERER ────────────────────────────────────
function drawLevelBackground(ctx, level, dimFactor) {
  const p = level.palette;
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Draw tiled background based on tileset
  switch (level.tileset) {
    case 'exam':    drawExamBackground(ctx, dimFactor); break;
    case 'hallway': drawHallwayBackground(ctx, dimFactor); break;
    case 'field':   drawFieldBackground(ctx, dimFactor); break;
    case 'stage':   drawStageBackground(ctx, dimFactor); break;
    case 'mind':    drawMindBackground(ctx, dimFactor); break;
  }
}

function drawExamBackground(ctx, dim) {
  ctx.globalAlpha = dim;
  // Wall tiles top
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.examWall(ctx, x, 0, 2);
  }
  // Floor tiles bottom
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.examFloor(ctx, x, 160, 2);
    Sprites.tiles.examFloor(ctx, x, 192, 2);
    Sprites.tiles.examFloor(ctx, x, 224, 2);
  }
  // Desk rows
  for (let x = 0; x < CANVAS_W; x += 64) {
    Sprites.tiles.examDesk(ctx, x, 140, 2);
    Sprites.tiles.examDesk(ctx, x + 32, 176, 2);
  }
  ctx.globalAlpha = 1;
  // Fluorescent flicker effect (subtle)
  if (Math.random() < 0.003) {
    ctx.fillStyle = 'rgba(184,204,96,0.06)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }
}

function drawHallwayBackground(ctx, dim) {
  ctx.globalAlpha = dim;
  // Floor
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.hallwayFloor(ctx, x, 180, 2);
    Sprites.tiles.hallwayFloor(ctx, x, 212, 2);
    Sprites.tiles.hallwayFloor(ctx, x, 244, 2);
  }
  // Wall lockers on sides
  for (let y = 0; y < 180; y += 32) {
    Sprites.tiles.hallwayWall(ctx, 0, y, 2);
    Sprites.tiles.hallwayWall(ctx, CANVAS_W - 32, y, 2);
  }
  ctx.globalAlpha = 1;
  // Crowd silhouettes
  ctx.fillStyle = 'rgba(61,48,80,0.5)';
  for (let i = 0; i < 8; i++) {
    const x = 40 + i * 55;
    const h = 50 + (i % 3) * 10;
    ctx.fillRect(x, 120 - h, 14, h);
  }
  // Eyes on crowd
  ctx.fillStyle = 'rgba(255,255,200,0.7)';
  for (let i = 0; i < 8; i++) {
    const x = 40 + i * 55;
    const ey = 120 - (50 + (i % 3) * 10) + 8;
    ctx.fillRect(x + 2, ey, 3, 2);
    ctx.fillRect(x + 8, ey, 3, 2);
  }
}

function drawFieldBackground(ctx, dim) {
  ctx.globalAlpha = dim;
  // Sky
  ctx.fillStyle = '#0D1B2A';
  ctx.fillRect(0, 0, CANVAS_W, 140);
  // Bleachers
  ctx.fillStyle = '#1a2a3a';
  ctx.fillRect(0, 60, CANVAS_W, 80);
  for (let y = 60; y < 140; y += 10) {
    ctx.fillStyle = y % 20 === 0 ? '#2a3a4a' : '#1f2f3f';
    ctx.fillRect(0, y, CANVAS_W, 10);
  }
  // Crowd silhouettes in bleachers
  ctx.fillStyle = 'rgba(40,50,70,0.8)';
  for (let i = 0; i < 25; i++) {
    ctx.fillRect(i * 20 + 5, 70 + (i % 4) * 10, 8, 14);
  }
  // Track
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.trackTile(ctx, x, 148, 2);
  }
  // Grass
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.grassTile(ctx, x, 180, 2);
    Sprites.tiles.grassTile(ctx, x, 212, 2);
    Sprites.tiles.grassTile(ctx, x, 244, 2);
  }
  ctx.globalAlpha = 1;
  // Stadium lights
  ctx.fillStyle = 'rgba(255,245,200,0.12)';
  ctx.beginPath();
  ctx.moveTo(20, 0); ctx.lineTo(60, 148); ctx.lineTo(-20, 148);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(CANVAS_W - 20, 0); ctx.lineTo(CANVAS_W + 20, 148); ctx.lineTo(CANVAS_W - 60, 148);
  ctx.fill();
}

function drawStageBackground(ctx, dim) {
  ctx.globalAlpha = dim;
  // Backdrop
  ctx.fillStyle = '#0A0A12';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  // Curtains sides
  for (let y = 0; y < 200; y += 32) {
    Sprites.tiles.curtain(ctx, 0, y, 2);
    Sprites.tiles.curtain(ctx, CANVAS_W - 32, y, 2);
  }
  // Stage floor
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.stageFloor(ctx, x, 160, 2);
    Sprites.tiles.stageFloor(ctx, x, 192, 2);
    Sprites.tiles.stageFloor(ctx, x, 224, 2);
  }
  ctx.globalAlpha = 1;
  // Footlights glow
  for (let x = 30; x < CANVAS_W - 20; x += 28) {
    ctx.fillStyle = '#C9A84C';
    ctx.fillRect(x, 157, 4, 4);
    ctx.fillStyle = 'rgba(201,168,76,0.15)';
    ctx.fillRect(x - 6, 130, 16, 30);
  }
  // Audience darkness
  ctx.fillStyle = 'rgba(5,5,15,0.85)';
  ctx.fillRect(30, 0, CANVAS_W - 60, 150);
  // Audience silhouettes
  ctx.fillStyle = 'rgba(20,15,30,0.9)';
  for (let i = 0; i < 15; i++) {
    ctx.fillRect(35 + i * 27, 100 + (i % 3) * 10, 12, 40);
  }
}

function drawMindBackground(ctx, dim) {
  ctx.globalAlpha = dim;
  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  // Mind floor tiles
  for (let x = 0; x < CANVAS_W; x += 32) {
    Sprites.tiles.mindFloor(ctx, x, 160, 2);
    Sprites.tiles.mindFloor(ctx, x, 192, 2);
    Sprites.tiles.mindFloor(ctx, x, 224, 2);
  }
  // Mind wall columns
  for (let x = 0; x < CANVAS_W; x += 64) {
    Sprites.tiles.mindWall(ctx, x, 80, 2);
  }
  ctx.globalAlpha = 1;
  // Teal neuron stars
  for (let i = 0; i < 20; i++) {
    const x = (i * 23 + 11) % CANVAS_W;
    const y = (i * 31 + 7) % 120;
    const pulse = 0.3 + Math.sin(Date.now() * 0.001 + i) * 0.3;
    ctx.globalAlpha = pulse * dim;
    ctx.fillStyle = '#00C2B5';
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;
}

// ── DIALOGUE BOX ───────────────────────────────────────────
function drawDialogueBox(ctx, speaker, text, waiting, accentColor) {
  const bx = 4, by = 248, bw = CANVAS_W - 8, bh = 68;

  // Background
  ctx.fillStyle = 'rgba(8,8,20,0.92)';
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = accentColor || '#00C2B5';
  ctx.lineWidth = 1;
  ctx.strokeRect(bx, by, bw, bh);

  // Speaker name
  if (speaker) {
    ctx.font = 'bold 7px monospace';
    ctx.fillStyle = accentColor || '#FFD166';
    ctx.fillText(speaker, bx + 6, by + 11);
    // Underline
    const sw = ctx.measureText(speaker).width;
    ctx.fillStyle = accentColor || '#FFD166';
    ctx.fillRect(bx + 6, by + 13, sw, 1);
  }

  // Dialogue text (word wrap)
  const lines = wrapText(ctx, text, bw - 16, '8px monospace');
  ctx.font = '8px monospace';
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < Math.min(lines.length, 3); i++) {
    ctx.fillText(lines[i], bx + 6, by + 25 + i * 13);
  }

  // Advance prompt
  if (waiting) {
    const blink = Math.floor(Date.now() / 300) % 2 === 0;
    if (blink) {
      ctx.fillStyle = accentColor || '#FFD166';
      ctx.fillText('▼', bx + bw - 14, by + bh - 6);
    }
  }
}

function wrapText(ctx, text, maxWidth, font) {
  ctx.font = font || '8px monospace';
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawMiniStats(ctx) {
  const h = gs.hero;
  const cpLabel = t('battleCp');
  const clmLabel = t('battleCalm');

  // Dark panel background — drawn first so tiles don't bleed through
  ctx.fillStyle = 'rgba(0,0,0,0.72)';
  ctx.fillRect(0, 0, 145, 30);

  ctx.font = '6px monospace';

  // CP bar (row 1)
  ctx.fillStyle = '#AAAAAA';
  ctx.fillText(cpLabel, 4, 10);
  drawBar(ctx, 20, 3, 70, 7, h.cp, h.maxCp, '#00C2B5');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${h.cp}/${h.maxCp}`, 94, 10);

  // Calm bar (row 2)
  ctx.fillStyle = '#AAAAAA';
  ctx.fillText(clmLabel, 4, 23);
  drawBar(ctx, 24, 16, 66, 7, h.calm, h.maxCalm, '#FFD166');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${h.calm}/${h.maxCalm}`, 94, 23);
}


// ── BATTLE STATE ───────────────────────────────────────────
const battleState = {
  boss: null,
  phase: 'player_turn', // player_turn, ability_anim, boss_turn, boss_anim, dialogue, victory, defeat
  menuIndex: 0,
  abilityMenuOpen: false,
  abilityMenuIndex: 0,
  turnCount: 0,
  tauntIndex: 0,
  // animations
  heroShake: 0,
  bossShake: 0,
  heroFlash: 0, heroFlashColor: '#FF0000',
  bossFlash: 0, bossFlashColor: '#FFFFFF',
  screenTint: 0, screenTintColor: '#FFFFFF',
  heroAttacking: false, heroAttackTimer: 0,
  bossAttacking: false, bossAttackTimer: 0,
  friendAllyVisible: false, friendAllyTimer: 0,
  // dialogue
  dialogueLines: [],
  dialogueIndex: 0,
  dialogueText: '',
  dialogueTyped: 0,
  dialogueTimer: 0,
  dialogueWaiting: false,
  dialogueSpeaker: '',
  dialogueAccent: '#FFFFFF',
  dialogueCallback: null,
  // Mirror Adaptation (boss 5)
  mirrorAdaptTurn: 0,
  mirrorAdaptAbility: null,
  // pending action
  pendingDmg: 0,
  pendingEffect: null,
  // ui scroll for long ability list
  abilityScroll: 0,
  // boss ability cooldown tracking
  bossLastAttack: -1
};

function initBattle() {
  const level = LEVELS[gs.currentLevel];
  const bossData = level.boss;

  // Pull translated taunts and defeat lines if available
  const bossTauntsTrans = t('bossTaunts');
  const bossDefeatTrans = t('bossDefeatLines');
  const translatedTaunts = (Array.isArray(bossTauntsTrans) && bossTauntsTrans[gs.currentLevel])
    ? bossTauntsTrans[gs.currentLevel]
    : bossData.taunts;
  const translatedDefeat = (Array.isArray(bossDefeatTrans) && bossDefeatTrans[gs.currentLevel])
    ? bossDefeatTrans[gs.currentLevel]
    : bossData.defeatLines;

  // Use translated boss name if available
  const bossNamesTrans = t('bossNames');
  const translatedBossName = (Array.isArray(bossNamesTrans) && bossNamesTrans[gs.currentLevel])
    ? bossNamesTrans[gs.currentLevel]
    : bossData.name;

  battleState.boss = {
    name: translatedBossName,
    hp: bossData.hp,
    maxHp: bossData.maxHp,
    dread: bossData.dread,
    focus: bossData.focus,
    dreadMod: 0, focusMod: 0,
    spriteKey: bossData.spriteKey,
    attacks: bossData.attacks,
    taunts: translatedTaunts,
    defeatLines: translatedDefeat,
    statusEffects: [], // { id, name, turnsLeft, value }
    shattered: false
  };

  battleState.phase = 'player_turn';
  battleState.menuIndex = 0;
  battleState.abilityMenuOpen = false;
  battleState.abilityMenuIndex = 0;
  battleState.turnCount = 0;
  battleState.tauntIndex = 0;
  battleState.heroShake = 0; battleState.bossShake = 0;
  battleState.heroFlash = 0; battleState.bossFlash = 0;
  battleState.screenTint = 0;
  battleState.heroAttacking = false; battleState.heroAttackTimer = 0;
  battleState.bossAttacking = false; battleState.bossAttackTimer = 0;
  battleState.friendAllyVisible = false; battleState.friendAllyTimer = 0;
  battleState.dialogueLines = [];
  battleState.dialogueIndex = 0;
  battleState.dialogueDone = false;
  battleState.mirrorAdaptTurn = 0;
  battleState.mirrorAdaptAbility = null;
  battleState.abilityScroll = 0;
  battleState.bossLastAttack = -1;

  // Restore 10 Calm at battle start
  gs.hero.calm = Math.min(gs.hero.maxCalm, gs.hero.calm + 10);

  // Clear battle debuffs
  gs.activeBuffs = gs.activeBuffs.filter(b => b.persistent);
  gs.activeDebuffs = [];
  gs.findPeopleCooldown = Math.max(0, gs.findPeopleCooldown - 1);
  gs.groundYourselfCooldown = Math.max(0, gs.groundYourselfCooldown - 1);
  gs.powerPoseCooldown = Math.max(0, gs.powerPoseCooldown - 1);
  gs.limitBreakCharge = 0;

  // Show boss intro taunt (use translated taunts stored in battleState.boss)
  showBattleDialogue(
    bossData.name,
    battleState.boss.taunts[0],
    level.palette.boss,
    () => { battleState.phase = 'player_turn'; }
  );
  battleState.phase = 'dialogue';
}

// Show a dialogue sequence in battle
function showBattleDialogue(speaker, text, accentColor, callback) {
  if (Array.isArray(text)) {
    battleState.dialogueLines = text.slice();
  } else {
    battleState.dialogueLines = [text];
  }
  battleState.dialogueIndex = 0;
  battleState.dialogueTyped = 0;
  battleState.dialogueText = '';
  battleState.dialogueTimer = 0;
  battleState.dialogueWaiting = false;
  battleState.dialogueSpeaker = speaker;
  battleState.dialogueAccent = accentColor || '#FFFFFF';
  battleState.dialogueCallback = callback || null;
  battleState.phase = 'dialogue';
}

function advanceBattleDialogue() {
  if (!battleState.dialogueWaiting) {
    // Complete current line
    const line = battleState.dialogueLines[battleState.dialogueIndex];
    battleState.dialogueTyped = line.length;
    battleState.dialogueText = line;
    battleState.dialogueWaiting = true;
    return;
  }
  battleState.dialogueIndex++;
  if (battleState.dialogueIndex >= battleState.dialogueLines.length) {
    // Done
    battleState.dialogueLines = [];
    if (battleState.dialogueCallback) {
      const cb = battleState.dialogueCallback;
      battleState.dialogueCallback = null;
      cb();
    }
  } else {
    battleState.dialogueTyped = 0;
    battleState.dialogueText = '';
    battleState.dialogueWaiting = false;
  }
}

// ── ABILITY EXECUTION ──────────────────────────────────────
function getAvailableAbilities() {
  const regular = gs.unlockedAbilities.map(id => ABILITIES[id]).filter(Boolean);
  return [ABILITIES.limitBreak, ...regular];
}

function getEffectiveCost(abilityId) {
  let cost = ABILITIES[abilityId].cost;
  // Radiant buff reduces cost by 5
  if (gs.activeBuffs.find(b => b.id === 'radiant')) cost = Math.max(0, cost - 5);
  // Inspired reduces next cost to 0
  if (gs.activeBuffs.find(b => b.id === 'inspired')) cost = 0;
  // Silenced debuff raises speakUp by 5
  if (abilityId === 'speakUp' && gs.activeDebuffs.find(d => d.id === 'silenced')) cost += 5;
  // Doubt debuff raises believeInYourself by 5
  if (abilityId === 'believeInYourself' && gs.activeDebuffs.find(d => d.id === 'doubt')) cost += 5;
  return cost;
}

function canUseAbility(abilityId) {
  if (abilityId === 'limitBreak') return gs.limitBreakCharge >= 4;
  if (abilityId === 'findYourPeople' && gs.findPeopleCooldown > 0) return false;
  if (abilityId === 'groundYourself' && gs.groundYourselfCooldown > 0) return false;
  if (abilityId === 'powerPose' && gs.powerPoseCooldown > 0) return false;
  // Stage freeze prevents breatheDeep
  if (abilityId === 'breatheDeep' && gs.activeDebuffs.find(d => d.id === 'frozen')) return false;
  return gs.hero.calm >= getEffectiveCost(abilityId);
}

function executePlayerAbility(abilityId) {
  const ability = ABILITIES[abilityId];
  if (!ability) return;
  if (!canUseAbility(abilityId)) return;

  const cost = getEffectiveCost(abilityId);
  gs.hero.calm -= cost;

  // Track usage for Mirror Adaptation
  gs.abilityUseCount[abilityId] = (gs.abilityUseCount[abilityId] || 0) + 1;

  // Remove Inspired if it absorbed cost
  if (gs.activeBuffs.find(b => b.id === 'inspired')) {
    gs.activeBuffs = gs.activeBuffs.filter(b => b.id !== 'inspired');
  }

  // Set cooldowns
  if (abilityId === 'findYourPeople') gs.findPeopleCooldown = 2;
  if (abilityId === 'groundYourself') gs.groundYourselfCooldown = 3;
  if (abilityId === 'powerPose') gs.powerPoseCooldown = 3;

  let dmg = 0;
  let resultMsg = '';

  // Screen tint
  battleState.screenTintColor = ability.color;
  battleState.screenTint = 15;

  switch (abilityId) {
    case 'breatheDeep': {
      // Check Rattled debuff (halves calm restore)
      let restore = 15;
      if (gs.activeDebuffs.find(d => d.id === 'rattled')) restore = Math.floor(restore / 2);
      gs.hero.calm = Math.min(gs.hero.maxCalm, gs.hero.calm + restore);
      // Grounded buff
      addHeroBuff('grounded', 'Grounded', 2, 5);
      spawnBurst(60, 200, '#88CCFF', 10, 1.2);
      SFX.playerHeal();
      resultMsg = tFn('resultBreatheDeep', restore);
      break;
    }
    case 'speakUp': {
      dmg = rollDmg(20, 28);
      dmg = applyDmgModifiers(dmg, abilityId);
      dealDamageToBoss(dmg);
      SFX.playerAttack();
      // 15% chance Heard debuff on boss
      if (Math.random() < 0.15) {
        addBossStatus('heard', 'Heard', 2, -5, 'dread');
        resultMsg = tFn('resultSpeakUpHeard', dmg);
      } else {
        resultMsg = tFn('resultSpeakUp', dmg);
      }
      break;
    }
    case 'reframe': {
      dmg = rollDmg(18, 25);
      dmg = applyDmgModifiers(dmg, abilityId);
      const existingReframe = battleState.boss.statusEffects.find(s => s.id === 'reframed');
      if (existingReframe) {
        existingReframe.turnsLeft += 2;
        resultMsg = t('resultReframeLonger');
        dealDamageToBoss(Math.floor(dmg * 0.5));
      } else {
        dealDamageToBoss(dmg);
        addBossStatus('reframed', 'Reframed', 3, -10, 'dread');
        resultMsg = tFn('resultReframe', dmg);
      }
      SFX.playerAttack();
      SFX.statusEffect();
      spawnBurst(battleState.boss ? 340 : 300, 80, '#B8CC60', 8, 1.0);
      break;
    }
    case 'findYourPeople': {
      const friendDmg = rollDmg(25, 35);
      dealDamageToBoss(friendDmg);
      gs.hero.cp = Math.min(gs.hero.maxCp, gs.hero.cp + 10);
      battleState.friendAllyVisible = true;
      battleState.friendAllyTimer = 90;
      SFX.playerAttack();
      SFX.sparkAppear();
      spawnBurst(120, 210, '#FF9966', 12, 1.5);
      resultMsg = tFn('resultFindPeople', friendDmg);
      break;
    }
    case 'believeInYourself': {
      dmg = rollDmg(35, 45);
      dmg = applyDmgModifiers(dmg, abilityId);
      dealDamageToBoss(dmg);
      gs.hero.cp = Math.min(gs.hero.maxCp, gs.hero.cp + 20);
      SFX.bigAttack();
      SFX.playerHeal();
      // 20% chance Inspired
      if (Math.random() < 0.20) {
        addHeroBuff('inspired', 'Inspired', 1, 0);
        resultMsg = tFn('resultBelieveInspired', dmg);
      } else {
        resultMsg = tFn('resultBelieve', dmg);
      }
      battleState.screenTintColor = '#FFD700';
      battleState.screenTint = 25;
      spawnBurst(60, 200, '#FFD700', 20, 2.0);
      break;
    }
    case 'breakFree': {
      let minDmg = 50, maxDmg = 65;
      const desperation = gs.hero.cp < 30;
      if (desperation) { minDmg = 65; maxDmg = 80; }
      dmg = rollDmg(minDmg, maxDmg);
      dmg = applyDmgModifiers(dmg, abilityId);
      dealDamageToBoss(dmg);
      // Shattered: boss dread and focus -15
      addBossStatus('shattered', 'Shattered', 999, -15, 'both');
      battleState.boss.shattered = true;
      // Radiant buff for hero
      addHeroBuff('radiant', 'Radiant', 2, -5);
      SFX.bigAttack();
      resultMsg = desperation ? tFn('resultDesperateCourage', dmg) : tFn('resultBreakFree', dmg);
      battleState.screenTintColor = '#FF44AA';
      battleState.screenTint = 35;
      spawnBurst(240, 160, '#FF44AA', 30, 3.0);
      spawnBurst(240, 160, '#FFFFFF', 20, 2.5);
      break;
    }
    case 'groundYourself': {
      // Restore 20 Calm (capped at maxCalm)
      gs.hero.calm = Math.min(gs.hero.maxCalm, gs.hero.calm + 20);
      // Restore 10 CP (capped at maxCp)
      gs.hero.cp = Math.min(gs.hero.maxCp, gs.hero.cp + 10);
      // Apply 'Grounded' buff for 3 turns
      addHeroBuff('grounded', 'Grounded', 3, 5);
      spawnBurst(60, 200, '#88CCFF', 10, 1.2);
      SFX.playerHeal();
      resultMsg = tFn('resultGroundYourself');
      break;
    }
    case 'selfTalk': {
      // Deal medium damage
      dmg = Math.floor(Math.random() * 18) + 12;
      dmg = applyDmgModifiers(dmg, abilityId);
      dealDamageToBoss(dmg);
      // Reduce boss dreadMod by 4
      battleState.boss.dreadMod -= 4;
      // Apply 'Reframed' status to hero for 2 turns
      addHeroBuff('reframed', 'Reframed', 2, 0);
      SFX.playerAttack();
      SFX.statusEffect();
      spawnBurst(battleState.boss ? 340 : 300, 80, '#B8CC60', 8, 1.0);
      resultMsg = tFn('resultSelfTalk', dmg);
      break;
    }
    case 'selfCompassion': {
      // Restore 35 CP (capped at maxCp)
      gs.hero.cp = Math.min(gs.hero.maxCp, gs.hero.cp + 35);
      // Deal small damage
      dmg = Math.floor(Math.random() * 10) + 8;
      dmg = applyDmgModifiers(dmg, abilityId);
      dealDamageToBoss(dmg);
      SFX.playerHeal();
      spawnBurst(60, 200, '#FF9966', 10, 1.2);
      spawnFloater(CANVAS_W / 2 - 60, 170, 'Be gentle with yourself.', '#FF9966');
      resultMsg = tFn('resultSelfCompassion', dmg);
      break;
    }
    case 'powerPose': {
      // Deal damage
      dmg = Math.floor(Math.random() * 20) + 15;
      dmg = applyDmgModifiers(dmg, abilityId);
      dealDamageToBoss(dmg);
      // Apply 'Inspired' buff for 3 turns (+5 to all attacks)
      addHeroBuff('inspired', 'Inspired', 3, 5);
      SFX.bigAttack();
      spawnBurst(60, 200, '#FFD700', 15, 1.8);
      battleState.screenTintColor = '#FFD700';
      battleState.screenTint = 20;
      resultMsg = tFn('resultPowerPose', dmg);
      break;
    }
    case 'limitBreak': {
      dmg = 50 + Math.floor(Math.random() * 16); // 50-65
      dealDamageToBoss(dmg);
      gs.activeDebuffs = [];                       // clear all debuffs
      gs.hero.calm = Math.min(gs.hero.maxCalm, gs.hero.calm + 10);
      gs.limitBreakCharge = 0;                     // reset charge
      SFX.limitBreak();
      spawnBurst(50, 205, '#FFD700', 20, 3.0);
      battleState.screenTintColor = '#FFD700';
      battleState.screenTint = 30;
      resultMsg = tFn('resultLimitBreak', dmg);
      break;
    }
  }

  // Hero attack animation
  battleState.heroAttacking = true;
  battleState.heroAttackTimer = 30;

  // Floating result
  spawnFloater(30, 230, resultMsg, ability.color);

  // Tick buffs/debuffs
  tickBuffsDebuffs();
  battleState.turnCount++;

  // Charge limit break (all abilities except limitBreak itself)
  if (abilityId !== 'limitBreak') {
    gs.limitBreakCharge = Math.min(4, gs.limitBreakCharge + 1);
  }

  // Check victory
  if (battleState.boss.hp <= 0) {
    battleState.boss.hp = 0;
    setTimeout(() => triggerBossDefeat(), 500);
    battleState.phase = 'boss_anim';
    return;
  }

  // Mirror Adaptation every 3 turns (boss 5)
  if (gs.currentLevel === 4 && battleState.turnCount % 3 === 0) {
    triggerMirrorAdaptation();
  }

  // Boss turn after short delay
  battleState.phase = 'boss_anim';
  setTimeout(() => executeBossTurn(), 800);
}

function rollDmg(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applyDmgModifiers(dmg, abilityId) {
  // Marked debuff on hero (-30%)
  if (gs.activeDebuffs.find(d => d.id === 'marked')) {
    dmg = Math.floor(dmg * 0.7);
    gs.activeDebuffs = gs.activeDebuffs.filter(d => d.id !== 'marked');
  }
  // Inspired buff (+5 attack on hero) -- already handled by free cost
  // Mirror adaptation: if boss adapted against this ability
  if (battleState.mirrorAdaptAbility === abilityId) {
    dmg = Math.floor(dmg * 0.7);
  }
  return Math.max(1, dmg);
}

function dealDamageToBoss(dmg) {
  // Apply boss focus reduction
  const focusDef = Math.max(0, battleState.boss.focus + battleState.boss.focusMod) / 4;
  const reduced = Math.max(1, Math.round(dmg - focusDef));
  battleState.boss.hp = Math.max(0, battleState.boss.hp - reduced);
  spawnFloater(300 + Math.random() * 40, 60 + Math.random() * 30, `-${reduced}`, '#FFD700');
  battleState.bossFlash = 12;
  battleState.bossShake = 8;
  battleState.bossFlashColor = '#FFFFFF';
  SFX.bossHurt();
  // Shatter particles
  if (battleState.boss.hp < battleState.boss.maxHp * 0.3) {
    spawnBurst(320, 100, '#FF8888', 6, 0.8);
  }
}

// ── BOSS AI ────────────────────────────────────────────────
function executeBossTurn() {
  if (battleState.phase !== 'boss_anim') return;
  if (!battleState.boss || battleState.boss.hp <= 0) return;

  const boss = battleState.boss;
  const attacks = boss.attacks;

  // Select attack: prefer heavy attack when below threshold
  let available = attacks.filter(a => !a.hpThreshold || boss.hp <= a.hpThreshold);
  if (available.length === 0) available = attacks;

  // Don't repeat same attack twice in a row
  let chosen;
  if (available.length > 1) {
    const filtered = available.filter((_, i) => i !== battleState.bossLastAttack % available.length);
    chosen = filtered[Math.floor(Math.random() * filtered.length)];
  } else {
    chosen = available[0];
  }
  battleState.bossLastAttack = attacks.indexOf(chosen);

  // Multi-hit for The Spiral
  const hits = chosen.hits || 1;
  let totalDmg = 0;

  for (let h = 0; h < hits; h++) {
    let dmg = rollDmg(chosen.dmgMin, chosen.dmgMax);
    // Grounded reduces incoming by 30%
    if (gs.activeBuffs.find(b => b.id === 'grounded')) dmg = Math.floor(dmg * 0.7);
    // Overexposed reduces hero focus
    const focusMod = gs.activeDebuffs.find(d => d.id === 'overexposed');
    if (focusMod) dmg += 3;
    totalDmg += dmg;
  }

  totalDmg = Math.max(1, totalDmg);
  gs.hero.cp = Math.max(0, gs.hero.cp - totalDmg);

  // Apply boss attack effects
  if (chosen.effect) {
    applyBossAttackEffect(chosen.effect);
    SFX.statusEffect();
  }

  // Boss attack and hero hurt sounds
  SFX.bossAttack();
  SFX.playerHurt();

  // Hero hurt animation
  battleState.heroFlash = 12;
  battleState.heroShake = 10;
  battleState.heroFlashColor = '#FF4444';

  // Damage floater on hero
  spawnFloater(40 + Math.random() * 20, 195, `-${totalDmg} CP`, '#FF4444');

  // Show attack dialogue
  const level = LEVELS[gs.currentLevel];
  const tauntEvery3 = battleState.turnCount % 3 === 2;
  const tauntLine = tauntEvery3 ? boss.taunts[battleState.tauntIndex % boss.taunts.length] : null;
  if (tauntEvery3) battleState.tauntIndex++;

  // Use translated attack flavor if available
  const attackFlavorsTrans = t('bossAttackFlavors');
  const attackIdx = attacks.indexOf(chosen);
  let flavorText = chosen.flavor;
  if (Array.isArray(attackFlavorsTrans) && attackFlavorsTrans[gs.currentLevel]) {
    const levelFlavors = attackFlavorsTrans[gs.currentLevel];
    if (levelFlavors[attackIdx] !== undefined) {
      flavorText = levelFlavors[attackIdx];
    }
  }

  const lines = tauntLine
    ? [flavorText, tauntLine]
    : [flavorText];

  showBattleDialogue(boss.name, lines, level.palette.boss, () => {
    // Mirror Break self-weakens
    if (chosen.effect === 'mirrorBreak' && chosen.selfWeaken) {
      boss.dread = Math.max(0, boss.dread - 20);
    }
    // Check defeat
    if (gs.hero.cp <= 0) {
      gs.hero.cp = 0;
      triggerGameOver();
    } else {
      battleState.phase = 'player_turn';
      tickHeroBuffDebuffs();
    }
  });
}

function applyBossAttackEffect(effect) {
  switch (effect) {
    case 'marked':
      addHeroDebuff('marked', 'Marked', 1, -0.3);
      break;
    case 'rattled':
      addHeroDebuff('rattled', 'Rattled', 2, 0);
      break;
    case 'scrutinized':
      addHeroDebuff('scrutinized', 'Scrutinized', 1, 0);
      break;
    case 'overexposed':
      addHeroDebuff('overexposed', 'Overexposed', 2, -10);
      break;
    case 'focusDown':
      addHeroDebuff('focusDown', 'Focus-', 2, -8);
      break;
    case 'frozen':
      addHeroDebuff('frozen', 'Frozen', 2, 0);
      break;
    case 'blankMind':
      // Remove Grounded
      gs.activeBuffs = gs.activeBuffs.filter(b => b.id !== 'grounded');
      break;
    case 'silenced':
      addHeroDebuff('silenced', 'Silenced', 2, 5);
      break;
    case 'whatIf':
      gs.hero.calm = Math.max(0, gs.hero.calm - 8);
      break;
    case 'doubt':
      addHeroDebuff('doubt', 'Doubt', 2, 5);
      break;
    case 'mirrorBreak':
      // The mirror shatters inward — drains Calm significantly
      gs.hero.calm = Math.max(0, gs.hero.calm - 12);
      addHeroDebuff('mirrorBreak', 'Shattered', 2, 0);
      break;
  }
}

function addHeroBuff(id, name, turns, value) {
  gs.activeBuffs = gs.activeBuffs.filter(b => b.id !== id);
  gs.activeBuffs.push({ id, name, turnsLeft: turns, value });
}

function addHeroDebuff(id, name, turns, value) {
  gs.activeDebuffs = gs.activeDebuffs.filter(d => d.id !== id);
  gs.activeDebuffs.push({ id, name, turnsLeft: turns, value });
}

function addBossStatus(id, name, turns, value, stat) {
  battleState.boss.statusEffects = battleState.boss.statusEffects.filter(s => s.id !== id);
  battleState.boss.statusEffects.push({ id, name, turnsLeft: turns, value, stat });
  // Apply immediately
  if (stat === 'dread') battleState.boss.dreadMod += value;
  else if (stat === 'focus') battleState.boss.focusMod += value;
  else if (stat === 'both') { battleState.boss.dreadMod += value; battleState.boss.focusMod += value; }
}

function tickBuffsDebuffs() {
  // Tick boss statuses
  if (battleState.boss) {
    for (const s of battleState.boss.statusEffects) {
      s.turnsLeft--;
    }
    // Remove expired and reverse their modifiers
    battleState.boss.statusEffects = battleState.boss.statusEffects.filter(s => {
      if (s.turnsLeft <= 0) {
        if (s.stat === 'dread') battleState.boss.dreadMod -= s.value;
        else if (s.stat === 'focus') battleState.boss.focusMod -= s.value;
        else if (s.stat === 'both') { battleState.boss.dreadMod -= s.value; battleState.boss.focusMod -= s.value; }
        return false;
      }
      return true;
    });
  }
}

function tickHeroBuffDebuffs() {
  for (const b of gs.activeBuffs) b.turnsLeft--;
  gs.activeBuffs = gs.activeBuffs.filter(b => b.turnsLeft > 0);
  for (const d of gs.activeDebuffs) d.turnsLeft--;
  gs.activeDebuffs = gs.activeDebuffs.filter(d => d.turnsLeft > 0);
}

function triggerMirrorAdaptation() {
  // Find most used ability
  let maxCount = 0, topAbility = null;
  for (const [id, count] of Object.entries(gs.abilityUseCount)) {
    if (count > maxCount) { maxCount = count; topAbility = id; }
  }
  if (topAbility && topAbility !== battleState.mirrorAdaptAbility) {
    battleState.mirrorAdaptAbility = topAbility;
    const abTrans = t(`abilities.${topAbility}`);
    const abName = (abTrans && abTrans.name) ? abTrans.name : (ABILITIES[topAbility]?.name || topAbility);
    showBattleDialogue(
      t('speakerAnxiety'),
      tFn('mirrorAdapts', abName),
      '#8800FF',
      () => { battleState.phase = 'player_turn'; }
    );
  }
}


// ── BATTLE VICTORY / DEFEAT ────────────────────────────────
function triggerBossDefeat() {
  const level = LEVELS[gs.currentLevel];
  SFX.bossDefeated();
  spawnBurst(320, 100, level.palette.boss, 30, 2.5);
  spawnBurst(320, 100, '#FFFFFF', 15, 2.0);
  showBattleDialogue(
    level.boss.name,
    battleState.boss.defeatLines,
    level.palette.boss,
    () => {
      if (gs.currentLevel === 4) {
        // Level 5 final victory
        startFadeOut(() => {
          initFinalVictory();
          gs.state = State.FINAL_VICTORY;
          startFadeIn(null);
        });
      } else {
        startFadeOut(() => {
          initLevelClear();
          gs.state = State.LEVEL_CLEAR;
          startFadeIn(null);
        });
      }
    }
  );
}

function triggerGameOver() {
  SFX.gameOver();
  SFX.sparkSpeak();
  showBattleDialogue(
    t('speakerSpark'),
    t('gameOverSpark'),
    '#FFD700',
    () => {
      startFadeOut(() => {
        gs.state = State.GAME_OVER;
        initGameOver();
        startFadeIn(null);
      });
    }
  );
}

// ── BATTLE UPDATE & RENDER ─────────────────────────────────
function updateBattle(ts) {
  if (battleState.heroAttackTimer > 0) battleState.heroAttackTimer--;
  else battleState.heroAttacking = false;
  if (battleState.bossAttackTimer > 0) battleState.bossAttackTimer--;
  else battleState.bossAttacking = false;
  if (battleState.heroShake > 0) battleState.heroShake--;
  if (battleState.bossShake > 0) battleState.bossShake--;
  if (battleState.heroFlash > 0) battleState.heroFlash--;
  if (battleState.bossFlash > 0) battleState.bossFlash--;
  if (battleState.screenTint > 0) battleState.screenTint--;
  if (battleState.friendAllyTimer > 0) battleState.friendAllyTimer--;
  else battleState.friendAllyVisible = false;

  // Typewriter for dialogue
  if (battleState.phase === 'dialogue' && battleState.dialogueLines.length > 0) {
    if (!battleState.dialogueWaiting) {
      battleState.dialogueTimer++;
      if (battleState.dialogueTimer % 2 === 0) {
        const line = battleState.dialogueLines[battleState.dialogueIndex];
        if (battleState.dialogueTyped < line.length) {
          battleState.dialogueTyped++;
          battleState.dialogueText = line.slice(0, battleState.dialogueTyped);
          SFX.typeChar();
        } else {
          battleState.dialogueWaiting = true;
        }
      }
    }
  }

  // Occasional spark rain during battle
  if (Math.random() < 0.04) {
    spawnParticle(
      Math.random() * CANVAS_W, -2,
      LEVELS[gs.currentLevel].palette.accent,
      (Math.random() - 0.5) * 0.3, 0.4 + Math.random() * 0.8,
      60, 1
    );
  }
}

function drawBattle(ctx) {
  const level = LEVELS[gs.currentLevel];
  const p = level.palette;

  // Darkened background
  drawLevelBackground(ctx, level, 0.35);

  // Screen tint
  if (battleState.screenTint > 0) {
    const ta = battleState.screenTint / 35 * 0.35;
    ctx.globalAlpha = ta;
    ctx.fillStyle = battleState.screenTintColor;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.globalAlpha = 1;
  }

  // Draw boss sprite (top right area)
  const bossX = 290;
  const bossY = 30;
  const bossOX = battleState.bossShake > 0 ? (Math.random() - 0.5) * 4 : 0;
  const bossOY = battleState.bossShake > 0 ? (Math.random() - 0.5) * 2 : 0;

  if (battleState.boss && battleState.boss.hp > 0) {
    ctx.save();
    if (battleState.bossFlash > 0 && Math.floor(battleState.bossFlash / 2) % 2 === 0) {
      ctx.filter = 'brightness(3)';
    }
    const drawFn = Sprites.bosses[battleState.boss.spriteKey];
    if (drawFn) drawFn(ctx, Math.round(bossX + bossOX), Math.round(bossY + bossOY), 2);
    ctx.filter = 'none';
    ctx.restore();
  }

  // Friend ally
  if (battleState.friendAllyVisible) {
    const fa = Math.min(1, battleState.friendAllyTimer / 20);
    ctx.globalAlpha = fa;
    ctx.fillStyle = '#E8A44A';
    // Simple silhouette ally
    ctx.fillRect(110, 188, 14, 32);
    ctx.fillRect(107, 183, 20, 12);
    ctx.globalAlpha = 1;
    // Fist bump if close to end
    if (battleState.friendAllyTimer < 20) {
      ctx.globalAlpha = battleState.friendAllyTimer / 20;
      ctx.font = '7px monospace';
      ctx.fillStyle = '#FF9966';
      ctx.fillText(t('gotYourBack'), 95, 180);
      ctx.globalAlpha = 1;
    }
  }

  // Draw hero sprite (bottom left)
  const heroX = 30;
  const heroY = 188;
  const heroOX = battleState.heroShake > 0 ? (Math.random() - 0.5) * 3 : 0;
  const heroAttackOffset = battleState.heroAttacking ? 15 : 0;

  ctx.save();
  if (battleState.heroFlash > 0 && Math.floor(battleState.heroFlash / 2) % 2 === 0) {
    ctx.filter = `brightness(3) sepia(1) saturate(5) hue-rotate(${battleState.heroFlashColor === '#FF4444' ? 0 : 180}deg)`;
  }
  if (battleState.heroAttacking) {
    Sprites.hero.attack(ctx, Math.round(heroX + heroOX + heroAttackOffset), heroY, 2);
  } else if (battleState.heroFlash > 0) {
    Sprites.hero.hurt(ctx, Math.round(heroX + heroOX), heroY, 2);
  } else {
    Sprites.hero.idle(ctx, Math.round(heroX + heroOX), heroY, 2);
  }
  ctx.filter = 'none';
  ctx.restore();

  // Active buff/debuff icons
  let bx2 = 30;
  for (const b of gs.activeBuffs) {
    ctx.fillStyle = '#00AAFF';
    ctx.fillRect(bx2, 183, 8, 4);
    ctx.font = '5px monospace';
    ctx.fillStyle = '#88CCFF';
    ctx.fillText(b.name[0], bx2 + 1, 183);
    bx2 += 10;
  }
  let dx2 = 30;
  for (const d of gs.activeDebuffs) {
    ctx.fillStyle = '#AA2200';
    ctx.fillRect(dx2, 178, 8, 4);
    ctx.font = '5px monospace';
    ctx.fillStyle = '#FF8866';
    ctx.fillText(d.name[0], dx2 + 1, 178);
    dx2 += 10;
  }

  // Particles
  drawParticles(ctx);
  drawFloaters(ctx);

  // ── UI PANEL ─────────────────────────────────────────────
  const uiY = 232;
  const uiH = CANVAS_H - uiY;
  ctx.fillStyle = 'rgba(5,5,15,0.95)';
  ctx.fillRect(0, uiY, CANVAS_W, uiH);
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, uiY); ctx.lineTo(CANVAS_W, uiY);
  ctx.stroke();

  // Hero stats row
  const cpLabel = t('battleCp');
  const clmLabel = t('battleCalm');
  const hpLabel = t('battleHp');
  const drdLabel = t('battleDread');
  ctx.font = 'bold 7px monospace';
  ctx.fillStyle = '#AACCFF';
  const heroName = gs.playerName || 'Hero';
  ctx.fillText(heroName.toUpperCase(), 4, uiY + 11);
  ctx.fillStyle = '#667788';
  ctx.fillText(cpLabel, 70, uiY + 11);
  drawBar(ctx, 82, uiY + 4, 80, 6, gs.hero.cp, gs.hero.maxCp, '#00C2B5');
  ctx.font = '6px monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${gs.hero.cp}/${gs.hero.maxCp}`, 166, uiY + 11);
  ctx.fillStyle = '#667788';
  ctx.fillText(clmLabel, 220, uiY + 11);
  drawBar(ctx, 238, uiY + 4, 50, 6, gs.hero.calm, gs.hero.maxCalm, '#FFD166');
  ctx.font = '6px monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${gs.hero.calm}`, 292, uiY + 11);

  // Limit Break charge indicator
  if (gs.limitBreakCharge >= 4) {
    ctx.fillStyle = (Date.now() % 600) < 300 ? '#FFD700' : '#FF8800';
    ctx.font = 'bold 6px monospace';
    ctx.fillText('\u2605LISTO!', 315, uiY + 11);
  } else {
    ctx.font = '6px monospace';
    ctx.fillStyle = '#665500';
    ctx.fillText('LB', 315, uiY + 11);
    for (let p = 0; p < 4; p++) {
      ctx.fillStyle = p < gs.limitBreakCharge ? '#FFD700' : '#333340';
      ctx.fillRect(327 + p * 7, uiY + 4, 5, 5);
    }
  }

  // Boss stats row
  if (battleState.boss) {
    const b = battleState.boss;
    ctx.font = 'bold 7px monospace';
    ctx.fillStyle = p.boss;
    ctx.fillText(b.name.toUpperCase(), 4, uiY + 23);
    ctx.fillStyle = '#667788';
    ctx.fillText(hpLabel, 100, uiY + 23);
    drawBar(ctx, 112, uiY + 16, 120, 6, b.hp, b.maxHp, p.boss);
    ctx.font = '6px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`${b.hp}/${b.maxHp}`, 236, uiY + 23);
    ctx.fillStyle = '#667788';
    ctx.fillText(`${drdLabel}:${Math.max(0, b.dread + b.dreadMod)}`, 306, uiY + 23);
  }

  // Ability menu or dialogue
  if (battleState.phase === 'dialogue' && battleState.dialogueLines.length > 0) {
    drawDialogueBox(ctx, battleState.dialogueSpeaker, battleState.dialogueText,
      battleState.dialogueWaiting, battleState.dialogueAccent);
  } else if (battleState.phase === 'player_turn') {
    drawAbilityMenu(ctx, uiY + 28, p);
  } else {
    // Show "..." waiting indicator
    ctx.font = '8px monospace';
    ctx.fillStyle = '#556677';
    ctx.fillText('...', CANVAS_W / 2 - 6, uiY + 48);
  }
}

function drawAbilityMenu(ctx, y, palette) {
  const abilities = getAvailableAbilities();
  const cols = 2;
  const itemW = 230;
  const itemH = 14;
  const maxVisibleRows = 4;
  const maxVisible = maxVisibleRows * cols; // 8

  // Clamp scroll offset
  const totalRows = Math.ceil(abilities.length / cols);
  const maxScroll = Math.max(0, totalRows - maxVisibleRows);
  battleState.abilityScroll = Math.max(0, Math.min(battleState.abilityScroll, maxScroll));

  const scrollOffset = battleState.abilityScroll; // in rows
  const firstVisibleIdx = scrollOffset * cols;
  const lastVisibleIdx = Math.min(firstVisibleIdx + maxVisible, abilities.length);

  ctx.font = '6px monospace';

  // Up arrow if scrolled down
  if (scrollOffset > 0) {
    ctx.fillStyle = '#00C2B5';
    ctx.fillText('▲', CANVAS_W / 2 - 4, y);
  }

  for (let i = firstVisibleIdx; i < lastVisibleIdx; i++) {
    const ab = abilities[i];
    const col = i % cols;
    const row = Math.floor(i / cols) - scrollOffset;
    const ax = 6 + col * itemW;
    const ay = y + 4 + row * itemH;

    const canUse = canUseAbility(ab.id);
    const cost = getEffectiveCost(ab.id);
    const isSelected = battleState.abilityMenuIndex === i;

    // Highlight selected
    if (isSelected) {
      ctx.fillStyle = 'rgba(0,194,181,0.2)';
      ctx.fillRect(ax - 2, ay - 1, itemW - 6, itemH);
    }

    // Cursor arrow
    if (isSelected) {
      Sprites.ui.menuCursor(ctx, ax - 2, ay + 3, 1);
    }

    // Name (translated)
    const abTrans = t(`abilities.${ab.id}`);
    const rawName = (abTrans && abTrans.name) ? abTrans.name : ab.name;
    const abName = ab.id === 'limitBreak' ? `\u2605 ${rawName}` : rawName;
    const nameColor = ab.id === 'limitBreak'
      ? (canUse ? (isSelected ? '#FFFFFF' : '#FFD700') : '#665500')
      : (canUse ? (isSelected ? '#FFFFFF' : '#CCCCCC') : '#444455');
    ctx.fillStyle = nameColor;
    ctx.fillText('  ' + abName, ax + 6, ay + 8);

    if (ab.id === 'limitBreak') {
      // Gold glow background when ready
      if (gs.limitBreakCharge >= 4) {
        ctx.fillStyle = 'rgba(255,215,0,0.12)';
        ctx.fillRect(ax - 2, ay - 1, itemW - 6, itemH);
      }
      // 4 charge pips instead of cost string
      for (let p = 0; p < 4; p++) {
        ctx.fillStyle = p < gs.limitBreakCharge ? '#FFD700' : '#333340';
        ctx.fillRect(ax + 155 + p * 6, ay + 2, 4, 5);
      }
      if (gs.limitBreakCharge >= 4) {
        ctx.fillStyle = (Date.now() % 600) < 300 ? '#FFD700' : '#FF8800';
        ctx.fillText('\u2605', ax + 178, ay + 8);
      }
    } else {
      // Cost
      const costStr = ab.cost === 0 ? 'FREE' : `${cost}CLM`;
      ctx.fillStyle = canUse ? '#FFD166' : '#443322';
      ctx.fillText(costStr, ax + 155, ay + 8);

      // Cooldown indicator
      if (ab.id === 'findYourPeople' && gs.findPeopleCooldown > 0) {
        const waitLabel = currentLang === 'es' ? `(esperar ${gs.findPeopleCooldown})` : `(wait ${gs.findPeopleCooldown})`;
        ctx.fillStyle = '#884422';
        ctx.fillText(waitLabel, ax + 155, ay + 8);
      }
      if (ab.id === 'groundYourself' && gs.groundYourselfCooldown > 0) {
        const waitLabel = currentLang === 'es' ? `(esperar ${gs.groundYourselfCooldown})` : `(wait ${gs.groundYourselfCooldown})`;
        ctx.fillStyle = '#884422';
        ctx.fillText(waitLabel, ax + 155, ay + 8);
      }
      if (ab.id === 'powerPose' && gs.powerPoseCooldown > 0) {
        const waitLabel = currentLang === 'es' ? `(esperar ${gs.powerPoseCooldown})` : `(wait ${gs.powerPoseCooldown})`;
        ctx.fillStyle = '#884422';
        ctx.fillText(waitLabel, ax + 155, ay + 8);
      }
      if (ab.id === 'breatheDeep' && gs.activeDebuffs.find(d => d.id === 'frozen')) {
        const frozenLabel = currentLang === 'es' ? '(paralizado)' : '(frozen)';
        ctx.fillStyle = '#4488AA';
        ctx.fillText(frozenLabel, ax + 155, ay + 8);
      }
    }
  }

  // Down arrow if more items below
  if (scrollOffset < maxScroll) {
    ctx.fillStyle = '#00C2B5';
    ctx.fillText('▼', CANVAS_W / 2 - 4, y + 4 + maxVisibleRows * itemH + 2);
  }
}


// ── LEVEL CLEAR STATE ──────────────────────────────────────
const levelClearState = {
  timer: 0,
  phase: 'fanfare', // fanfare, spark_speech, ability_unlock, continue
  textAlpha: 0,
  sparkX: 240, sparkY: 160,
  sparkAngle: 0,
  continuePrompt: false,
  transitioning: false
};

function initLevelClear() {
  levelClearState.timer = 0;
  levelClearState.phase = 'fanfare';
  levelClearState.textAlpha = 0;
  levelClearState.sparkX = 240;
  levelClearState.sparkY = 160;
  levelClearState.sparkAngle = 0;
  levelClearState.continuePrompt = false;
  levelClearState.transitioning = false;

  SFX.levelClear();
  setTimeout(() => SFX.sparkSpeak(), 900);

  // Unlock new abilities
  const level = LEVELS[gs.currentLevel];
  const abilitiesToUnlock = level.newAbilities || (level.newAbility ? [level.newAbility] : []);
  let anyUnlocked = false;
  for (const ab of abilitiesToUnlock) {
    if (ab && !gs.unlockedAbilities.includes(ab)) {
      gs.unlockedAbilities.push(ab);
      anyUnlocked = true;
    }
  }
  if (anyUnlocked) {
    setTimeout(() => SFX.abilityUnlock(), 1200);
  }

  // Restore HP/Calm fully
  gs.hero.cp = gs.hero.maxCp;
  gs.hero.calm = gs.hero.maxCalm;
  gs.activeBuffs = [];
  gs.activeDebuffs = [];
  gs.abilityUseCount = {};

  // Burst of particles
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      spawnBurst(
        80 + Math.random() * 320,
        60 + Math.random() * 120,
        ['#FFD700', '#00C2B5', '#FF9966', '#FFFFFF'][Math.floor(Math.random() * 4)],
        16, 2.5
      );
    }, i * 200);
  }
}

function updateLevelClear() {
  levelClearState.timer++;
  levelClearState.sparkAngle += 0.04;
  levelClearState.sparkX = 240 + Math.cos(levelClearState.sparkAngle) * 30;
  levelClearState.sparkY = 120 + Math.sin(levelClearState.sparkAngle * 0.7) * 12;
  levelClearState.textAlpha = Math.min(1, levelClearState.textAlpha + 0.02);

  if (levelClearState.timer > 120 && !levelClearState.continuePrompt) {
    levelClearState.continuePrompt = true;
  }

  // Particle rain
  if (Math.random() < 0.25) spawnSparkRain(2);
}

function drawLevelClear(ctx) {
  const level = LEVELS[gs.currentLevel];
  const p = level.palette;

  // Brightened background
  drawLevelBackground(ctx, level, 0.6);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  drawParticles(ctx);

  // Spark orbiting
  Sprites.spark.speak(ctx, Math.round(levelClearState.sparkX), Math.round(levelClearState.sparkY), 2);

  // Hero victory pose
  Sprites.hero.victory(ctx, 80, 170, 2);

  ctx.globalAlpha = levelClearState.textAlpha;

  // LEVEL CLEAR title
  const lcTitle = t('levelClearTitle');
  ctx.font = 'bold 16px monospace';
  const lcW = ctx.measureText(lcTitle).width;
  ctx.fillStyle = '#111100';
  ctx.fillText(lcTitle, Math.round((CANVAS_W - lcW) / 2) + 2, 52);
  ctx.fillStyle = '#FFD700';
  ctx.fillText(lcTitle, Math.round((CANVAS_W - lcW) / 2), 50);

  // Level clear lines (translated)
  const clearLinesArr = t('levelClearTexts');
  const clearLine2Arr = t('levelClearTexts2');
  const clearLines = [
    clearLinesArr[gs.currentLevel],
    clearLine2Arr[gs.currentLevel]
  ].filter(l => l && l.length > 0);
  for (let i = 0; i < clearLines.length; i++) {
    ctx.font = '8px monospace';
    const clw = ctx.measureText(clearLines[i]).width;
    ctx.fillStyle = p.text;
    ctx.fillText(clearLines[i], Math.round((CANVAS_W - clw) / 2), 70 + i * 14);
  }

  // Spark speech (translated)
  const sparkLines = t('sparkClearLines');
  const sparkLine = sparkLines[gs.currentLevel] || level.sparkClear;
  ctx.font = 'italic 8px monospace';
  const slw = ctx.measureText(sparkLine).width;
  ctx.fillStyle = '#FFD166';
  ctx.fillText(`"${sparkLine}"`, Math.round((CANVAS_W - slw) / 2 - 8), 108);

  // New ability unlocks
  const newAbList = level.newAbilities || (level.newAbility ? [level.newAbility] : []);
  let unlockY = 128;
  for (const newAb of newAbList) {
    if (newAb && ABILITIES[newAb]) {
      const abTrans = t(`abilities.${newAb}`);
      const abDisplayName = (abTrans && abTrans.name) ? abTrans.name : ABILITIES[newAb].name;
      const abLabel = tFn('newAbilityUnlocked', abDisplayName.toUpperCase());
      ctx.font = 'bold 7px monospace';
      const abW = ctx.measureText(abLabel).width;
      ctx.fillStyle = ABILITIES[newAb].color;
      ctx.fillText(abLabel, Math.round((CANVAS_W - abW) / 2), unlockY);
      unlockY += 12;
    }
  }

  // Continue prompt
  if (levelClearState.continuePrompt && Math.floor(levelClearState.timer / 25) % 2 === 0) {
    const cpText = t('levelClearContinue');
    ctx.font = '7px monospace';
    const cpW = ctx.measureText(cpText).width;
    ctx.fillStyle = '#00C2B5';
    ctx.fillText(cpText, Math.round((CANVAS_W - cpW) / 2), 280);
  }

  ctx.globalAlpha = 1;
}

function advanceLevelClear() {
  if (!levelClearState.continuePrompt) return;
  if (levelClearState.transitioning) return;
  levelClearState.transitioning = true;
  startFadeOut(() => {
    gs.currentLevel++;
    if (gs.currentLevel < LEVELS.length) {
      initLevelIntro();
      gs.state = State.LEVEL_INTRO;
    } else {
      initFinalVictory();
      gs.state = State.FINAL_VICTORY;
    }
    startFadeIn(null);
  });
}

// ── GAME OVER STATE ────────────────────────────────────────
const gameOverState = {
  timer: 0,
  menuIndex: 0, // 0 = try again, 1 = title
  textAlpha: 0,
  transitioning: false
};

function initGameOver() {
  gameOverState.timer = 0;
  gameOverState.menuIndex = 0;
  gameOverState.textAlpha = 0;
  gameOverState.transitioning = false;
}

function updateGameOver() {
  gameOverState.timer++;
  gameOverState.textAlpha = Math.min(1, gameOverState.timer / 80);
}

function drawGameOver(ctx) {
  // Fade to dark purple
  ctx.fillStyle = '#0A0010';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Subtle purple particles
  drawParticles(ctx);

  ctx.globalAlpha = gameOverState.textAlpha;

  // Spark
  Sprites.spark.speak(ctx, CANVAS_W / 2 - 12, 80, 2);

  // Spark line
  ctx.font = 'italic 9px monospace';
  const goLines = t('gameOverSpark');
  for (let i = 0; i < goLines.length; i++) {
    const lw = ctx.measureText(goLines[i]).width;
    ctx.fillStyle = '#FFD166';
    ctx.fillText(goLines[i], Math.round((CANVAS_W - lw) / 2), 130 + i * 16);
  }

  // Menu options
  const options = t('gameOverOptions');
  for (let i = 0; i < options.length; i++) {
    const ow = ctx.measureText(options[i]).width;
    ctx.fillStyle = gameOverState.menuIndex === i ? '#FFFFFF' : '#556677';
    if (gameOverState.menuIndex === i) {
      Sprites.ui.menuCursor(ctx, Math.round((CANVAS_W - ow) / 2) - 12, 174 + i * 20 - 2, 1);
    }
    ctx.font = '9px monospace';
    ctx.fillText(options[i], Math.round((CANVAS_W - ow) / 2), 174 + i * 20);
  }

  ctx.globalAlpha = 1;
}

function confirmGameOver() {
  if (gameOverState.transitioning) return;
  gameOverState.transitioning = true;
  if (gameOverState.menuIndex === 0) {
    // Try again — restart current level
    startFadeOut(() => {
      gs.hero.cp = gs.hero.maxCp;
      gs.hero.calm = gs.hero.maxCalm;
      gs.activeBuffs = [];
      gs.activeDebuffs = [];
      gs.abilityUseCount = {};
      gs.findPeopleCooldown = 0;
      gs.groundYourselfCooldown = 0;
      gs.powerPoseCooldown = 0;
      initLevelIntro();
      gs.state = State.LEVEL_INTRO;
      startFadeIn(null);
    });
  } else {
    startFadeOut(() => {
      gs.currentLevel = 0;
      gs.hero.cp = gs.hero.maxCp;
      gs.hero.calm = gs.hero.maxCalm;
      gs.unlockedAbilities = ['breatheDeep', 'speakUp'];
      gs.activeBuffs = [];
      gs.activeDebuffs = [];
      gs.abilityUseCount = {};
      gs.findPeopleCooldown = 0;
      gs.groundYourselfCooldown = 0;
      gs.powerPoseCooldown = 0;
      initTitle();
      gs.state = State.TITLE;
      startFadeIn(null);
    });
  }
}


// ── FINAL VICTORY STATE ────────────────────────────────────
const finalVictoryState = {
  timer: 0,
  lineIndex: 0,
  lineAlpha: 0,
  lineTimer: 0,
  lineFadeDir: 1,
  allLinesShown: false,
  bigTextPulse: 0,
  creditsPromptVisible: false,
  heroY: 170,
  sparkAngle: 0,
  bossGhostsAlpha: 0,
  transitioning: false
};

const VICTORY_LINES = [
  // Filled in with playerName at display time
  '', // placeholder for "[NAME]."
  'You walked through five rooms that most people spend their whole lives walking around.',
  'Every boss, every taunt, every moment you thought you didn\'t have enough left — and you kept going.',
  'Anxiety is not a monster you destroyed tonight. It\'ll come back.',
  'Big tests, crowded rooms, stages and spotlights — it\'ll come back.',
  'But you know something now: you have walked through it. Once.',
  'And once is enough to know you can again.',
  'There is no finish line for brave.',
  'There is just today, and the next step, and the next breath.',
  'You were brave enough.'
];

function initFinalVictory() {
  finalVictoryState.timer = 0;
  finalVictoryState.lineIndex = 0;
  finalVictoryState.lineAlpha = 0;
  finalVictoryState.lineTimer = 20;
  finalVictoryState.lineFadeDir = 1;
  finalVictoryState.allLinesShown = false;
  finalVictoryState.bigTextPulse = 0;
  finalVictoryState.creditsPromptVisible = false;
  finalVictoryState.heroY = 200;
  finalVictoryState.sparkAngle = 0;
  finalVictoryState.bossGhostsAlpha = 0;
  finalVictoryState.transitioning = false;
  SFX.finalVictory();

  // Replace first line with player name (in VICTORY_LINES for English fallback)
  VICTORY_LINES[0] = `${gs.playerName || 'Hero'}.`;

  // Restore everything
  gs.hero.cp = gs.hero.maxCp;
  gs.hero.calm = gs.hero.maxCalm;

  // Launch initial particle storm
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      for (let j = 0; j < 6; j++) {
        spawnParticle(
          Math.random() * CANVAS_W, CANVAS_H,
          ['#FFD700', '#00C2B5', '#FF9966', '#FF44AA', '#FFFFFF'][Math.floor(Math.random() * 5)],
          (Math.random() - 0.5) * 1.5, -(1 + Math.random() * 2),
          120 + Math.random() * 60, 2
        );
      }
    }, i * 300);
  }
}

function updateFinalVictory() {
  finalVictoryState.timer++;
  finalVictoryState.sparkAngle += 0.035;

  // Hero Y animate up to final position
  if (finalVictoryState.heroY > 155) finalVictoryState.heroY -= 0.3;

  // Boss ghost alpha
  if (finalVictoryState.allLinesShown) {
    finalVictoryState.bossGhostsAlpha = Math.min(0.15, finalVictoryState.bossGhostsAlpha + 0.001);
  }

  // Particle rain
  if (Math.random() < 0.3) {
    spawnParticle(
      Math.random() * CANVAS_W, -4,
      ['#FFD700', '#00C2B5', '#FFFFFF', '#FF9966', '#FF44AA'][Math.floor(Math.random() * 5)],
      (Math.random() - 0.5) * 0.8, 0.6 + Math.random() * 1.0,
      100 + Math.random() * 50, 2
    );
  }

  // Line fade sequence
  const victoryLinesTrans = t('victoryLines');
  const victoryLinesAll = Array.isArray(victoryLinesTrans) ? victoryLinesTrans : VICTORY_LINES;
  if (!finalVictoryState.allLinesShown) {
    finalVictoryState.lineTimer--;
    if (finalVictoryState.lineFadeDir === 1) {
      finalVictoryState.lineAlpha = Math.min(1, finalVictoryState.lineAlpha + 0.025);
      if (finalVictoryState.lineAlpha >= 1) {
        finalVictoryState.lineFadeDir = 0;
        finalVictoryState.lineTimer = 140;
      }
    } else if (finalVictoryState.lineFadeDir === 0) {
      if (finalVictoryState.lineTimer <= 0) finalVictoryState.lineFadeDir = -1;
    } else {
      finalVictoryState.lineAlpha = Math.max(0, finalVictoryState.lineAlpha - 0.025);
      if (finalVictoryState.lineAlpha <= 0) {
        finalVictoryState.lineIndex++;
        if (finalVictoryState.lineIndex >= victoryLinesAll.length) {
          finalVictoryState.allLinesShown = true;
        } else {
          finalVictoryState.lineFadeDir = 1;
          finalVictoryState.lineTimer = 15;
          // Every other line gets a subtle Spark chime
          if (finalVictoryState.lineIndex % 2 === 0) SFX.sparkSpeak();
        }
      }
    }
  }

  // Big text pulse after all lines
  if (finalVictoryState.allLinesShown) {
    finalVictoryState.bigTextPulse++;
    if (finalVictoryState.bigTextPulse > 300 && !finalVictoryState.creditsPromptVisible) {
      finalVictoryState.creditsPromptVisible = true;
    }
  }
}

function drawFinalVictory(ctx) {
  // Warm teal-gold background
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  grad.addColorStop(0, '#020C10');
  grad.addColorStop(0.5, '#041820');
  grad.addColorStop(1, '#061A12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Neuron stars
  for (let i = 0; i < 30; i++) {
    const x = (i * 157 + 23) % CANVAS_W;
    const y = (i * 113 + 17) % (CANVAS_H - 20);
    const pulse = 0.2 + Math.abs(Math.sin(finalVictoryState.timer * 0.02 + i * 0.5)) * 0.6;
    ctx.globalAlpha = pulse;
    ctx.fillStyle = i % 3 === 0 ? '#00C2B5' : (i % 3 === 1 ? '#FFD700' : '#FFFFFF');
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;

  // Boss ghost silhouettes (faded)
  if (finalVictoryState.bossGhostsAlpha > 0) {
    const bossKeys = ['redPen', 'whisper', 'spotlight', 'stageFright', 'anxiety'];
    const bossX = [20, 90, 180, 280, 370];
    ctx.globalAlpha = finalVictoryState.bossGhostsAlpha;
    for (let i = 0; i < bossKeys.length; i++) {
      const drawFn = Sprites.bosses[bossKeys[i]];
      if (drawFn) drawFn(ctx, bossX[i], 50, 1);
    }
    ctx.globalAlpha = 1;
  }

  // Particles
  drawParticles(ctx);

  // Hero victory pose (centered, large)
  Sprites.hero.victory(ctx, Math.round(CANVAS_W / 2 - 16), Math.round(finalVictoryState.heroY), 3);

  // Spark orbiting hero
  const sa = finalVictoryState.sparkAngle;
  const sparkX = CANVAS_W / 2 + Math.cos(sa) * 45;
  const sparkY = finalVictoryState.heroY + 20 + Math.sin(sa * 0.7) * 18;
  Sprites.spark.speak(ctx, Math.round(sparkX), Math.round(sparkY), 2);

  // Scrolling narration line (translated)
  const victLines = t('victoryLines');
  const victLinesArr = Array.isArray(victLines) ? victLines : VICTORY_LINES;
  // Patch first line with player name at draw time
  const victDisplay = victLinesArr.slice();
  if (victDisplay.length > 0) victDisplay[0] = `${gs.playerName || 'Hero'}.`;

  if (!finalVictoryState.allLinesShown && finalVictoryState.lineIndex < victDisplay.length) {
    const line = victDisplay[finalVictoryState.lineIndex];
    ctx.globalAlpha = finalVictoryState.lineAlpha;
    const isName = finalVictoryState.lineIndex === 0;
    ctx.font = isName ? 'bold 14px monospace' : 'italic 8px monospace';
    const lw = ctx.measureText(line).width;
    ctx.fillStyle = isName ? '#FFD700' : '#E0F0FF';
    ctx.fillText(line, Math.round((CANVAS_W - lw) / 2), isName ? 50 : 260);
    ctx.globalAlpha = 1;
  }

  // Big pulsing text (translated)
  if (finalVictoryState.allLinesShown) {
    const pulse = 0.7 + Math.sin(finalVictoryState.bigTextPulse * 0.05) * 0.3;
    ctx.globalAlpha = pulse;
    ctx.font = 'bold 14px monospace';
    const bt = t('victoryBigText');
    const btW = ctx.measureText(bt).width;
    ctx.fillStyle = '#FFD700';
    ctx.fillText(bt, Math.round((CANVAS_W - btW) / 2) + 2, 52);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(bt, Math.round((CANVAS_W - btW) / 2), 50);
    ctx.globalAlpha = 1;
  }

  // Credits prompt
  if (finalVictoryState.creditsPromptVisible && Math.floor(finalVictoryState.bigTextPulse / 30) % 2 === 0) {
    const cpText = t('continueToCredits');
    ctx.font = '7px monospace';
    const cpW = ctx.measureText(cpText).width;
    ctx.fillStyle = '#00C2B5';
    ctx.fillText(cpText, Math.round((CANVAS_W - cpW) / 2), CANVAS_H - 10);
  }
}

function advanceFinalVictory() {
  if (!finalVictoryState.creditsPromptVisible) return;
  if (finalVictoryState.transitioning) return;
  finalVictoryState.transitioning = true;
  startFadeOut(() => {
    initCredits();
    gs.state = State.CREDITS;
    startFadeIn(null);
  });
}

// ── CREDITS STATE ──────────────────────────────────────────
const creditsState = {
  scrollY: 0,
  timer: 0,
  done: false
};

const CREDITS_LINES = [
  { text: 'BRAVE ENOUGH', style: 'title', color: '#FFD700' },
  { text: '', style: 'blank' },
  { text: 'A journey through the Mindscape', style: 'sub', color: '#00C2B5' },
  { text: '', style: 'blank' },
  { text: '— — —', style: 'sep', color: '#334455' },
  { text: '', style: 'blank' },
  { text: 'Anxiety is real. What you feel is real.', style: 'narration', color: '#AACCDD' },
  { text: "You don't have to beat it.", style: 'narration', color: '#AACCDD' },
  { text: 'You just have to take the next step.', style: 'narration', color: '#AACCDD' },
  { text: '', style: 'blank' },
  { text: 'If the things in this game felt familiar —', style: 'narration', color: '#889999' },
  { text: "that's because they are.", style: 'narration', color: '#889999' },
  { text: "You're not alone in them.", style: 'narration', color: '#889999' },
  { text: '', style: 'blank' },
  { text: '— — —', style: 'sep', color: '#334455' },
  { text: '', style: 'blank' },
  { text: 'CREDITS', style: 'header', color: '#FFD166' },
  { text: '', style: 'blank' },
  { text: 'Game Design & Story', style: 'role', color: '#667788' },
  { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
  { text: '', style: 'blank' },
  { text: 'Pixel Art & Sprites', style: 'role', color: '#667788' },
  { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
  { text: '', style: 'blank' },
  { text: 'Engine & Programming', style: 'role', color: '#667788' },
  { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
  { text: '', style: 'blank' },
  { text: '— — —', style: 'sep', color: '#334455' },
  { text: '', style: 'blank' },
  { text: 'Made for anyone who has ever been afraid', style: 'dedic', color: '#8899AA' },
  { text: 'and kept going anyway.', style: 'dedic', color: '#8899AA' },
  { text: '', style: 'blank' },
  { text: '', style: 'blank' },
  { text: '', style: 'blank' },
  { text: 'You were brave enough.', style: 'final', color: '#FFD700' },
  { text: 'You still are.', style: 'final', color: '#00C2B5' },
  { text: '', style: 'blank' },
  { text: '', style: 'blank' },
  { text: '', style: 'blank' }
];

function initCredits() {
  creditsState.scrollY = CANVAS_H + 10;
  creditsState.timer = 0;
  creditsState.done = false;
}

function updateCredits() {
  creditsState.timer++;
  creditsState.scrollY -= 0.5;

  const credLinesCount = (() => {
    const arr = t('creditsLines');
    return Array.isArray(arr) ? arr.length : CREDITS_LINES.length;
  })();
  const totalH = credLinesCount * 18 + CANVAS_H;
  if (creditsState.scrollY < -totalH) {
    if (!creditsState.done) {
      creditsState.done = true;
      setTimeout(() => {
        startFadeOut(() => {
          // Loop to title
          gs.unlockedAbilities = ['breatheDeep', 'speakUp'];
          gs.currentLevel = 0;
          gs.hero.cp = gs.hero.maxCp;
          gs.hero.calm = gs.hero.maxCalm;
          gs.findPeopleCooldown = 0;
          gs.groundYourselfCooldown = 0;
          gs.powerPoseCooldown = 0;
          initTitle();
          gs.state = State.TITLE;
          startFadeIn(null);
        });
      }, 2000);
    }
  }

  // Spark rain in credits
  if (Math.random() < 0.1) {
    spawnParticle(
      Math.random() * CANVAS_W, -2,
      Math.random() < 0.5 ? '#FFD700' : '#00C2B5',
      (Math.random() - 0.5) * 0.3, 0.4 + Math.random() * 0.6,
      80, 1
    );
  }
}

function drawCredits(ctx) {
  ctx.fillStyle = '#020408';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Stars
  for (let i = 0; i < 40; i++) {
    const x = (i * 113 + 7) % CANVAS_W;
    const y = (i * 79 + 11) % CANVAS_H;
    const alpha = 0.2 + Math.abs(Math.sin(creditsState.timer * 0.01 + i)) * 0.5;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = i % 5 === 0 ? '#00C2B5' : '#FFFFFF';
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.globalAlpha = 1;

  drawParticles(ctx);

  // Spark idle at bottom
  Sprites.spark.idle(ctx, CANVAS_W / 2 - 12, CANVAS_H - 40, 2);

  // "Thank you for playing." (translated)
  ctx.font = 'italic 7px monospace';
  const ty = t('thanksForPlaying');
  const tyw = ctx.measureText(ty).width;
  ctx.fillStyle = '#445566';
  ctx.fillText(ty, Math.round((CANVAS_W - tyw) / 2), CANVAS_H - 10);

  // Scrolling credits (use translated credits lines if available, else fallback)
  const credLinesArr = t('creditsLines');
  const creditsToRender = Array.isArray(credLinesArr) ? credLinesArr : CREDITS_LINES;
  let y = creditsState.scrollY;
  for (const line of creditsToRender) {
    if (y > -20 && y < CANVAS_H + 20) {
      switch (line.style) {
        case 'title':
          ctx.font = 'bold 16px monospace';
          break;
        case 'sub':
          ctx.font = 'italic 9px monospace';
          break;
        case 'header':
          ctx.font = 'bold 11px monospace';
          break;
        case 'role':
          ctx.font = '7px monospace';
          break;
        case 'name':
          ctx.font = 'bold 9px monospace';
          break;
        case 'narration':
        case 'dedic':
          ctx.font = 'italic 7px monospace';
          break;
        case 'final':
          ctx.font = 'bold 11px monospace';
          break;
        case 'sep':
          ctx.font = '8px monospace';
          break;
        default:
          ctx.font = '8px monospace';
      }
      if (line.text) {
        const lw = ctx.measureText(line.text).width;
        ctx.fillStyle = line.color || '#FFFFFF';
        ctx.fillText(line.text, Math.round((CANVAS_W - lw) / 2), y);
      }
    }
    y += line.style === 'blank' ? 10 : 18;
  }
}


// ── INPUT HANDLING ─────────────────────────────────────────
function handleKeyDown(e) {
  const key = e.key;

  // Resume AudioContext on first user interaction (browser requirement)
  SFX.resume();

  // Global mute toggle — 'M' key, but NOT while the player is typing their name
  if (key === 'm' || key === 'M') {
    if (gs.state !== State.NAME_ENTRY || nameEntryState.confirmed) {
      const nowMuted = SFX.toggleMute();
      spawnFloater(CANVAS_W / 2 - 20, 20, nowMuted ? '♪ MUTED' : '♪ SOUND ON', '#00C2B5');
      return;
    }
    // Otherwise fall through so 'M' can be typed into the name field
  }

  switch (gs.state) {
    case State.TITLE:
      if (key === 'Enter' || key === ' ') {
        if (titleState.logoVisible) transitionToNameEntry();
      }
      break;

    case State.NAME_ENTRY:
      if (!nameEntryState.confirmed) {
        if (key === 'Enter') {
          confirmName();
        } else if (key === 'Backspace') {
          nameEntryState.input = nameEntryState.input.slice(0, -1);
        } else if (key.length === 1 && nameEntryState.input.length < 12) {
          // Allow letters, numbers, hyphens, apostrophes, spaces
          if (/^[a-zA-Z0-9\-' ]$/.test(key)) {
            nameEntryState.input += key;
          }
        }
      } else if ((key === 'Enter' || key === ' ') && !nameEntryState.transitioning) {
        // Skip the spark wait and advance immediately
        nameEntryState.sparkTimer = 0;
      }
      break;

    case State.LEVEL_INTRO:
      // Intro advances automatically, but click/enter can speed up
      if (key === 'Enter' || key === ' ') {
        if (!levelIntroState.done && !levelIntroState.transitioning) {
          SFX.menuConfirm();
          levelIntroState.lineTimer = 0;
          levelIntroState.lineFadeDir = -1;
        }
      }
      break;

    case State.EXPLORATION:
      if (key === 'Enter' || key === ' ' || key === 'z' || key === 'Z') {
        if (explorationState.dialogueActive) {
          SFX.dialogueAdvance();
          advanceExplorationDialogue();
        }
        checkExplorationBattleTransition();
      }
      break;

    case State.BATTLE:
      if (battleState.phase === 'dialogue') {
        if (key === 'Enter' || key === ' ' || key === 'z' || key === 'Z') {
          SFX.dialogueAdvance();
          advanceBattleDialogue();
        }
      } else if (battleState.phase === 'player_turn') {
        const abilities = getAvailableAbilities();
        const cols = 2;
        const maxVisibleRows = 4;
        const maxVisible = maxVisibleRows * cols;
        const totalRows = Math.ceil(abilities.length / cols);
        const maxScroll = Math.max(0, totalRows - maxVisibleRows);

        if (key === 'ArrowRight') {
          SFX.menuMove();
          // Move right within the same row (switch column), wrap to next row if at right edge
          const curRow = Math.floor(battleState.abilityMenuIndex / cols);
          const curCol = battleState.abilityMenuIndex % cols;
          if (curCol < cols - 1) {
            const nextIdx = battleState.abilityMenuIndex + 1;
            if (nextIdx < abilities.length) {
              battleState.abilityMenuIndex = nextIdx;
            }
          } else {
            // Already at rightmost col — wrap to next row left col
            const nextIdx = (curRow + 1) * cols;
            if (nextIdx < abilities.length) {
              battleState.abilityMenuIndex = nextIdx;
            }
          }
          e.preventDefault();
        } else if (key === 'ArrowLeft') {
          SFX.menuMove();
          const curRow = Math.floor(battleState.abilityMenuIndex / cols);
          const curCol = battleState.abilityMenuIndex % cols;
          if (curCol > 0) {
            battleState.abilityMenuIndex = battleState.abilityMenuIndex - 1;
          } else {
            // Already at leftmost col — wrap to previous row right col
            if (curRow > 0) {
              const prevRowRight = curRow * cols - 1;
              if (prevRowRight < abilities.length) {
                battleState.abilityMenuIndex = prevRowRight;
              } else {
                battleState.abilityMenuIndex = abilities.length - 1;
              }
            }
          }
          e.preventDefault();
        } else if (key === 'ArrowDown') {
          SFX.menuMove();
          const curRow = Math.floor(battleState.abilityMenuIndex / cols);
          const curCol = battleState.abilityMenuIndex % cols;
          const nextRowIdx = (curRow + 1) * cols + curCol;
          const visibleLastRow = battleState.abilityScroll + maxVisibleRows - 1;
          if (nextRowIdx < abilities.length) {
            battleState.abilityMenuIndex = nextRowIdx;
            // Scroll down if cursor moved below visible area
            if (Math.floor(battleState.abilityMenuIndex / cols) > visibleLastRow) {
              battleState.abilityScroll = Math.min(maxScroll, battleState.abilityScroll + 1);
            }
          }
          e.preventDefault();
        } else if (key === 'ArrowUp') {
          SFX.menuMove();
          const curRow = Math.floor(battleState.abilityMenuIndex / cols);
          const curCol = battleState.abilityMenuIndex % cols;
          const prevRowIdx = (curRow - 1) * cols + curCol;
          if (prevRowIdx >= 0) {
            battleState.abilityMenuIndex = prevRowIdx;
            // Scroll up if cursor moved above visible area
            if (Math.floor(battleState.abilityMenuIndex / cols) < battleState.abilityScroll) {
              battleState.abilityScroll = Math.max(0, battleState.abilityScroll - 1);
            }
          }
          e.preventDefault();
        } else if (key === 'Enter' || key === ' ' || key === 'z' || key === 'Z') {
          const ability = abilities[battleState.abilityMenuIndex];
          if (ability && canUseAbility(ability.id)) {
            SFX.menuConfirm();
            executePlayerAbility(ability.id);
          } else if (ability) {
            spawnFloater(30, 240, t('notEnoughCalm'), '#FF6644');
          }
        }
      }
      break;

    case State.LEVEL_CLEAR:
      if (key === 'Enter' || key === ' ') {
        SFX.menuConfirm();
        advanceLevelClear();
      }
      break;

    case State.GAME_OVER:
      if (key === 'ArrowUp') {
        SFX.menuMove();
        gameOverState.menuIndex = 0;
      } else if (key === 'ArrowDown') {
        SFX.menuMove();
        gameOverState.menuIndex = 1;
      } else if (key === 'Enter' || key === ' ') {
        SFX.menuConfirm();
        confirmGameOver();
      }
      break;

    case State.FINAL_VICTORY:
      if (key === 'Enter' || key === ' ') {
        SFX.menuConfirm();
        advanceFinalVictory();
      }
      break;

    case State.CREDITS:
      if (key === 'Enter' || key === ' ') {
        // Skip to end
        creditsState.scrollY -= 200;
      }
      break;
  }
}

function handleClick(e) {
  // Resume AudioContext on first user interaction (browser requirement)
  SFX.resume();

  const canvas = document.getElementById('gameCanvas');
  const rect = canvas.getBoundingClientRect();
  const scaleX = CANVAS_W / rect.width;
  const scaleY = CANVAS_H / rect.height;
  const cx = (e.clientX - rect.left) * scaleX;
  const cy = (e.clientY - rect.top) * scaleY;

  switch (gs.state) {
    case State.TITLE: {
      if (titleState.logoVisible) {
        // Check if click is on the language toggle (bottom-right corner)
        // Approximate bounding box: x from ~390 to ~472, y from ~305 to ~320
        if (cx >= 430 && cx <= 480 && cy >= 305 && cy <= 320) {
          // Determine which side was clicked — EN is on the left, ES on the right
          // The toggle renders near x=436. Midpoint between EN and ES is ~453.
          const midToggle = 453;
          currentLang = cx < midToggle ? 'en' : 'es';
          SFX.menuMove();
          // Reset narration if we haven't started yet (or just let it continue)
        } else {
          transitionToNameEntry();
        }
      }
      break;
    }

    case State.NAME_ENTRY:
      if (!nameEntryState.confirmed && nameEntryState.input.trim().length > 0) {
        confirmName();
      } else if (nameEntryState.confirmed && !nameEntryState.transitioning) {
        nameEntryState.sparkTimer = 0;
      }
      break;

    case State.EXPLORATION:
      if (explorationState.dialogueActive) {
        SFX.dialogueAdvance();
        advanceExplorationDialogue();
      }
      checkExplorationBattleTransition();
      break;

    case State.BATTLE:
      if (battleState.phase === 'dialogue') {
        SFX.dialogueAdvance();
        advanceBattleDialogue();
      } else if (battleState.phase === 'player_turn') {
        // Click on ability menu items (accounting for scroll offset)
        const abilities = getAvailableAbilities();
        const uiY = 232;
        const itemH = 14;
        const itemW = 230;
        const cols = 2;
        const maxVisibleRows = 4;
        const scrollOffset = battleState.abilityScroll;
        const firstVisibleIdx = scrollOffset * cols;
        const lastVisibleIdx = Math.min(firstVisibleIdx + maxVisibleRows * cols, abilities.length);

        for (let i = firstVisibleIdx; i < lastVisibleIdx; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols) - scrollOffset;
          const ax = 6 + col * itemW;
          const ay = uiY + 28 + 4 + row * itemH;

          if (cx >= ax - 2 && cx <= ax + itemW - 6 && cy >= ay - 1 && cy <= ay + itemH) {
            battleState.abilityMenuIndex = i;
            const ability = abilities[i];
            if (ability && canUseAbility(ability.id)) {
              SFX.menuConfirm();
              executePlayerAbility(ability.id);
            } else {
              spawnFloater(cx, cy, t('notEnoughCalm'), '#FF6644');
            }
            break;
          }
        }
      }
      break;

    case State.LEVEL_CLEAR:
      SFX.menuConfirm();
      advanceLevelClear();
      break;

    case State.GAME_OVER: {
      // Check which option was clicked
      const opt0Y = 174, opt1Y = 194;
      if (cy >= opt0Y - 5 && cy <= opt0Y + 10) {
        SFX.menuMove();
        gameOverState.menuIndex = 0;
        SFX.menuConfirm();
        confirmGameOver();
      } else if (cy >= opt1Y - 5 && cy <= opt1Y + 10) {
        SFX.menuMove();
        gameOverState.menuIndex = 1;
        SFX.menuConfirm();
        confirmGameOver();
      }
      break;
    }

    case State.FINAL_VICTORY:
      SFX.menuConfirm();
      advanceFinalVictory();
      break;

    case State.CREDITS:
      creditsState.scrollY -= 100;
      break;
  }
}

// Touch = click
function handleTouch(e) {
  e.preventDefault();
  if (e.touches && e.touches.length > 0) {
    const touch = e.touches[0];
    handleClick({ clientX: touch.clientX, clientY: touch.clientY });
  }
}

function transitionToNameEntry() {
  if (titleState.transitioning) return;
  titleState.transitioning = true;
  SFX.menuConfirm();
  startFadeOut(() => {
    initNameEntry();
    gs.state = State.NAME_ENTRY;
    startFadeIn(null);
  });
}

// ── MAIN UPDATE & RENDER ───────────────────────────────────
function update(ts) {
  gs.dt = ts - gs.timestamp;
  gs.timestamp = ts;

  updateFade();
  updateParticles();
  updateFloaters();

  switch (gs.state) {
    case State.TITLE:      updateTitle(ts); break;
    case State.NAME_ENTRY: updateNameEntry(); break;
    case State.LEVEL_INTRO:    updateLevelIntro(); break;
    case State.EXPLORATION:    updateExploration(); break;
    case State.BATTLE:         updateBattle(ts); break;
    case State.LEVEL_CLEAR:    updateLevelClear(); break;
    case State.GAME_OVER:      updateGameOver(); break;
    case State.FINAL_VICTORY:  updateFinalVictory(); break;
    case State.CREDITS:        updateCredits(); break;
  }
}

function render(ctx) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  switch (gs.state) {
    case State.TITLE:         drawTitle(ctx); break;
    case State.NAME_ENTRY:    drawNameEntry(ctx); break;
    case State.LEVEL_INTRO:   drawLevelIntro(ctx); break;
    case State.EXPLORATION:   drawExploration(ctx); break;
    case State.BATTLE:        drawBattle(ctx); break;
    case State.LEVEL_CLEAR:   drawLevelClear(ctx); break;
    case State.GAME_OVER:     drawGameOver(ctx); break;
    case State.FINAL_VICTORY: drawFinalVictory(ctx); break;
    case State.CREDITS:       drawCredits(ctx); break;
  }

  drawFade(ctx);
}

// ── GAME LOOP ──────────────────────────────────────────────
let ctx;

function gameLoop(ts) {
  update(ts);
  render(ctx);
  requestAnimationFrame(gameLoop);
}

// ── INIT ───────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // Input listeners
  window.addEventListener('keydown', handleKeyDown);
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('touchstart', handleTouch, { passive: false });

  // Start game
  initTitle();
  gs.state = State.TITLE;
  startFadeIn(null);

  requestAnimationFrame(gameLoop);
});

