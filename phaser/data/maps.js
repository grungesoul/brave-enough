// Code-generated tilemaps (no Tiled): each map is built from 2-D index arrays.
// School levels use tiles/school.png (project-original tileset, 16 cols);
// the mindscape uses the Ansimuz dungeon tileset.
//
// Level order (redesigned arc): 1 hallway → 2 classroom+library → 3 stage →
// 4 exam hall (biggest map, camera scroll) → 5 mindscape.
// Calm gems get scarcer as tension rises: explicit `gems` arrays per map.
'use strict';

const T = 16; // tile size

// school.png — original tileset generated for this project (see
// scratch script make_school_tiles.py); 16 columns, 16x16 tiles.
const SC = (r, c) => r * 16 + c;

// ── base tiles (row 0) ─────────────────────────────────────
const FLOOR_GREY = SC(0, 0);
const FLOOR_CREAM = SC(0, 1);
const FLOOR_WOOD = SC(0, 2);     // stage boards
const EDGE_DARK = SC(0, 3);
const WALL_TOP = SC(0, 4);
const WALL_FACE = SC(0, 5);
const WINDOW = { sc: 6, sr: 0, w: 1, h: 1 };
const CORKBOARD = { sc: 7, sr: 0, w: 2, h: 1 };

// ── furniture stamps (rows 1-3) ────────────────────────────
const DESK_PEN = { sc: 0, sr: 1, w: 1, h: 2 };     // desk w/ paper + red pen
const DESK_NOTE = { sc: 1, sr: 1, w: 1, h: 2 };    // desk w/ pencil + notebook
const DESK_TEACHER = { sc: 2, sr: 1, w: 2, h: 2 }; // teacher desk w/ open book
const CHALKBOARD = { sc: 4, sr: 1, w: 2, h: 3 };
const LOCKER = { sc: 6, sr: 1, w: 2, h: 3 };
const BENCH = { sc: 8, sr: 1, w: 2, h: 2 };
const SHELF = { sc: 10, sr: 1, w: 2, h: 3 };       // library bookcase
const RUG = { sc: 12, sr: 1, w: 3, h: 2 };

function stampInto(grid, piece, dc, dr) {
  for (let y = 0; y < piece.h; y++) {
    for (let x = 0; x < piece.w; x++) {
      grid[dr + y][dc + x] = SC(piece.sr + y, piece.sc + x);
    }
  }
}

function emptyGrid(w, h, fill) {
  return Array.from({ length: h }, () => Array(w).fill(fill));
}

// ── Level 1: El Primer Día (school hallway) ────────────────
function buildLevel1() {
  const W = 38, H = 12;
  const ground = emptyGrid(W, H, FLOOR_GREY);
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  for (let x = 0; x < W; x++) {
    ground[0][x] = WALL_TOP;
    ground[1][x] = WALL_FACE;
    ground[H - 1][x] = EDGE_DARK;
  }
  for (let y = 0; y < H; y++) { ground[y][0] = EDGE_DARK; ground[y][W - 1] = EDGE_DARK; }

  // lockers along the top wall, in banks with window gaps
  for (const dc of [2, 4, 8, 10, 14, 16, 22, 24, 28, 30]) stampInto(props, LOCKER, dc, 1);
  for (const dc of [7, 13, 21, 27, 33]) stampInto(deco, WINDOW, dc, 1);
  // benches along the bottom
  for (const dc of [6, 18, 30]) stampInto(props, BENCH, dc, 8);

  return {
    width: W, height: H,
    groundTileset: 'school', propsTileset: 'school',
    ground, props, deco,
    collideGround: [WALL_TOP, WALL_FACE, EDGE_DARK],
    playerSpawn: { x: 2, y: 8 },
    npcs: [
      { x: 9, y: 6 },    // The Huddle
      { x: 20, y: 5 },   // The Locker Friend
      { x: 27, y: 8 }    // The Window Reflection
    ],
    bossTrigger: { x: 35, y: 5, w: 2, h: 4 }, // far end of the corridor
    gems: [[4, 6], [12, 9], [16, 5], [25, 6]], // gentlest level: 4 gems
    ambient: { color: 0x201030, alpha: 0.12 },
    // HD-2D atmosphere (see systems/fx.js) — morning light through the windows
    grade: { contrast: 0.08, saturate: 0.12, vignette: [0.5, 0.5, 0.92, 0.26] },
    rays: [7, 21, 33].map(c => ({ x: (c + 0.5) * T + 10, y: 26, scale: 0.45 })),
    lights: [7, 13, 21, 27, 33].map(c => ({ x: (c + 0.5) * T, y: 30, color: 0xffe9b0, radius: 55, intensity: 0.07 })),
    motes: { color: 0xfff6d8, frequency: 260 }
  };
}

// ── Level 2: El Trabajo en Grupo (classroom + library corner) ──
function buildLevel2() {
  const W = 32, H = 20;
  const ground = emptyGrid(W, H, FLOOR_GREY);
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  for (let x = 0; x < W; x++) {
    ground[0][x] = WALL_TOP;
    ground[1][x] = WALL_FACE;
    ground[H - 1][x] = EDGE_DARK;
  }
  for (let y = 0; y < H; y++) {
    ground[y][0] = EDGE_DARK;
    ground[y][W - 1] = EDGE_DARK;
  }

  // Corkboards on the top wall, windows between them
  stampInto(deco, CORKBOARD, 4, 1);
  stampInto(deco, CORKBOARD, 20, 1);
  for (const dc of [9, 12, 24, 27]) stampInto(deco, WINDOW, dc, 1);

  // Standing chalkboard front-center (the boss waits here)
  stampInto(props, CHALKBOARD, 14, 2);

  // Teacher desk left of the chalkboard
  stampInto(props, DESK_TEACHER, 8, 3);

  // Group tables: desks pushed together in 2x2 clusters (group work!)
  for (const [dc, dr] of [[5, 8], [13, 8], [21, 8], [5, 13], [13, 13], [21, 13]]) {
    stampInto(props, DESK_NOTE, dc, dr);
    stampInto(props, DESK_PEN, dc + 1, dr);
  }

  // Library corner: bookcases along the right wall
  for (const dr of [3, 7, 11, 15]) stampInto(props, SHELF, 28, dr);

  // Rug in the middle aisle (walkable)
  stampInto(deco, RUG, 10, 17);

  return {
    width: W, height: H,
    groundTileset: 'school',
    propsTileset: 'school',
    ground, props, deco,
    collideGround: [WALL_TOP, WALL_FACE, EDGE_DARK],
    playerSpawn: { x: 15, y: 17 },
    npcs: [
      { x: 4, y: 10 },   // The Quiet Groupmate
      { x: 25, y: 12 },  // The Idea Notebook
      { x: 26, y: 5 }    // The Returning Student (library corner)
    ],
    bossTrigger: { x: 14, y: 5, w: 2, h: 1 }, // in front of the chalkboard
    gems: [[3, 16], [18, 11], [24, 16]],
    grade: { contrast: 0.1, saturate: 0.14, vignette: [0.5, 0.5, 0.88, 0.28] },
    rays: [9, 24].map(c => ({ x: (c + 0.5) * T + 10, y: 26, scale: 0.5 })),
    lights: [9, 12, 24, 27].map(c => ({ x: (c + 0.5) * T, y: 30, color: 0xffe9b0, radius: 55, intensity: 0.07 })),
    motes: { color: 0xfff6d8, frequency: 300 }
  };
}

// ── Level 3: La Presentación (dark stage + spotlight) ──────
function buildLevel3() {
  const W = 30, H = 20;
  const ground = emptyGrid(W, H, FLOOR_WOOD); // stage boards
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  for (let x = 0; x < W; x++) {
    ground[0][x] = EDGE_DARK;
    ground[1][x] = EDGE_DARK;
    ground[H - 1][x] = EDGE_DARK;
  }
  for (let y = 0; y < H; y++) { ground[y][0] = EDGE_DARK; ground[y][W - 1] = EDGE_DARK; }
  // wings: dark side strips (curtain shadows)
  for (let y = 2; y < H - 1; y++) { ground[y][1] = EDGE_DARK; ground[y][W - 2] = EDGE_DARK; }

  return {
    width: W, height: H,
    groundTileset: 'school', propsTileset: 'school',
    ground, props, deco,
    collideGround: [EDGE_DARK],
    playerSpawn: { x: 15, y: 16 },
    npcs: [
      { x: 5, y: 13 },   // The Actor in the Wings
      { x: 15, y: 10 },  // The Empty Microphone
      { x: 24, y: 13 }   // The Director's Note
    ],
    bossTrigger: { x: 14, y: 4, w: 3, h: 2 }, // center stage front
    gems: [[4, 8], [25, 8], [15, 13]],
    ambient: { color: 0x050510, alpha: 0.55 },
    spotlight: true,
    // hard theatrical grade: crushed edges, one column of light on the mic
    grade: { contrast: 0.14, saturate: 0.1, brightness: 1.22, vignette: [0.5, 0.45, 0.7, 0.4] },
    rays: [{ x: 264, y: 4, scale: 0.9, alpha: 0.1 }],
    lights: [{ x: 248, y: 100, color: 0xffe9a0, radius: 85, intensity: 0.12 }],
    motes: { color: 0xfff2c0, frequency: 380 }
  };
}

// ── Level 4: El Examen Final (exam hall — biggest map) ─────
function buildLevel4() {
  const W = 40, H = 24;
  const ground = emptyGrid(W, H, FLOOR_GREY);
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  for (let x = 0; x < W; x++) {
    ground[0][x] = WALL_TOP;
    ground[1][x] = WALL_FACE;
    ground[H - 1][x] = EDGE_DARK;
  }
  for (let y = 0; y < H; y++) {
    ground[y][0] = EDGE_DARK;
    ground[y][W - 1] = EDGE_DARK;
  }

  // Twin chalkboards flanking the boss spot — the front of the hall looms
  stampInto(props, CHALKBOARD, 15, 2);
  stampInto(props, CHALKBOARD, 23, 2);
  // Corkboards (exam instructions) on the top wall
  stampInto(deco, CORKBOARD, 5, 1);
  stampInto(deco, CORKBOARD, 33, 1);

  // Endless rows of exam desks: 7 columns x 5 rows, every one with the red pen
  const deskCols = [4, 9, 14, 19, 24, 29, 34];
  const deskRows = [7, 10, 13, 16, 19];
  for (const dr of deskRows) {
    for (const dc of deskCols) {
      stampInto(props, DESK_PEN, dc, dr);
      stampInto(props, DESK_PEN, dc + 2, dr);
    }
  }

  return {
    width: W, height: H,
    groundTileset: 'school',
    propsTileset: 'school',
    ground, props, deco,
    collideGround: [WALL_TOP, WALL_FACE, EDGE_DARK],
    playerSpawn: { x: 20, y: 21 },
    npcs: [
      { x: 6, y: 21 },   // The Front-Row Student
      { x: 32, y: 15 },  // The Practice Sheet
      { x: 12, y: 9 }    // The Kind Note
    ],
    bossTrigger: { x: 19, y: 4, w: 3, h: 2 }, // front-center, between the boards
    gems: [[36, 21], [2, 12]], // climax: only 2 gems in the whole hall
    ambient: { color: 0x3a0505, alpha: 0.22 },
    // oppressive: desaturated, closed-in vignette, cold light over the boards
    grade: { contrast: 0.16, saturate: 0.06, vignette: [0.5, 0.5, 0.72, 0.42] },
    lights: [[16, 4], [24, 4]].map(([c, r]) => ({ x: c * T, y: r * T, color: 0xffdddd, radius: 70, intensity: 0.05 })),
    motes: { color: 0xffe0d0, frequency: 520 }
  };
}

// ── Level 5: Tu Interior (mindscape) — dungeon tileset ─────
const DG = (r, c) => r * 19 + c;
const MIND_FLOOR = DG(6, 8);
const MIND_WALL = DG(6, 10);
const MIND_WALL2 = DG(2, 11);
const CRYSTAL_A = DG(7, 0);
const CRYSTAL_B = DG(8, 0);

function buildLevel5() {
  const W = 30, H = 20;
  const ground = emptyGrid(W, H, MIND_FLOOR);
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  for (let x = 0; x < W; x++) {
    ground[0][x] = MIND_WALL; ground[1][x] = MIND_WALL2; ground[H - 1][x] = MIND_WALL;
  }
  for (let y = 0; y < H; y++) { ground[y][0] = MIND_WALL; ground[y][W - 1] = MIND_WALL; }
  // floating crystal columns
  for (const [cx, cy] of [[6, 6], [23, 6], [6, 14], [23, 14], [14, 10]]) {
    props[cy][cx] = CRYSTAL_A; props[cy + 1][cx] = CRYSTAL_B;
  }

  return {
    width: W, height: H,
    groundTileset: 'dungeon', propsTileset: 'dungeon',
    ground, props, deco,
    collideGround: [MIND_WALL, MIND_WALL2],
    playerSpawn: { x: 15, y: 17 },
    npcs: [
      { x: 5, y: 10 },   // The Memory
      { x: 24, y: 10 }   // The Spark's Full Form
    ],
    bossTrigger: { x: 14, y: 3, w: 3, h: 2 },
    gems: [[15, 13]], // the deepest level: a single gem
    ambient: { color: 0x2a0055, alpha: 0.22 },
    // dreamlike: extra saturation + slight hue drift, fog, crystal glow
    grade: { contrast: 0.1, saturate: 0.22, hue: 12, brightness: 1.35, vignette: [0.5, 0.5, 0.85, 0.3] },
    lights: [[6, 6], [23, 6], [6, 14], [23, 14], [14, 10]].map(([c, r]) =>
      ({ x: (c + 0.5) * T, y: (r + 1) * T, color: 0x88ffee, radius: 60, intensity: 0.25 })),
    motes: { color: 0xcc99ff, frequency: 200, upward: true },
    fog: { color: 0xbb99ff, alpha: 0.12 }
  };
}

const MAPS = [buildLevel1(), buildLevel2(), buildLevel3(), buildLevel4(), buildLevel5()];
