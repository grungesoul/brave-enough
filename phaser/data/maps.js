// Code-generated tilemaps (no Tiled): each map is built from 2-D index arrays.
// ground indices → tiles/room-builder.png (17 cols)
// prop stamps    → tiles/interiors.png (16 cols)
// Tile picks verified with tileinspect.html + per-tile color analysis.
'use strict';

const T = 16; // tile size

const RB = (r, c) => r * 17 + c; // room-builder.png, 17 columns
const IN = (r, c) => r * 16 + c; // interiors.png, 16 columns

// ── room-builder picks ─────────────────────────────────────
const FLOOR_CREAM = RB(14, 12);  // warm cream floor (classroom)
const FLOOR_GREY = RB(10, 12);   // light grey floor
const WALL_TOP = RB(12, 1);      // pale wall band: top trim
const WALL_FACE = RB(13, 1);     // pale wall band: face
const EDGE_DARK = RB(10, 14);    // dark grey void/edge

// ── interiors picks (classroom set, rows 35-43) ────────────
// student desk w/ paper + red pen (1 col x 2 rows) — fits the exam theme
const DESK_PEN = { sc: 3, sr: 36, w: 1, h: 2 };
// student desk w/ pencil + notebook
const DESK_NOTE = { sc: 4, sr: 36, w: 1, h: 2 };
// teacher desk with open book (2x2)
const DESK_TEACHER = { sc: 5, sr: 36, w: 2, h: 2 };
// standing green chalkboard (2 cols x 3 rows)
const CHALKBOARD = { sc: 7, sr: 35, w: 2, h: 3 };
// corkboard with notes (2x1, wall decor)
const CORKBOARD = { sc: 0, sr: 41, w: 2, h: 1 };
// green rug (3x2) — decorative, walkable
const RUG = { sc: 0, sr: 42, w: 3, h: 2 };

function stampInto(grid, piece, dc, dr) {
  for (let y = 0; y < piece.h; y++) {
    for (let x = 0; x < piece.w; x++) {
      grid[dr + y][dc + x] = IN(piece.sr + y, piece.sc + x);
    }
  }
}

function emptyGrid(w, h, fill) {
  return Array.from({ length: h }, () => Array(w).fill(fill));
}

// ── Level 1: El Aula del Examen (classroom) ────────────────
function buildLevel1() {
  const W = 30, H = 20;
  const ground = emptyGrid(W, H, FLOOR_GREY);
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  // Top wall band (2 rows) + dark edge elsewhere
  for (let x = 0; x < W; x++) {
    ground[0][x] = WALL_TOP;
    ground[1][x] = WALL_FACE;
    ground[H - 1][x] = EDGE_DARK;
  }
  for (let y = 0; y < H; y++) {
    ground[y][0] = EDGE_DARK;
    ground[y][W - 1] = EDGE_DARK;
  }

  // Corkboards on the top wall
  stampInto(deco, CORKBOARD, 4, 1);
  stampInto(deco, CORKBOARD, 24, 1);

  // Standing chalkboard front-center (the boss waits here)
  stampInto(props, CHALKBOARD, 13, 2);

  // Teacher desk left of the chalkboard
  stampInto(props, DESK_TEACHER, 7, 3);

  // Student desks: 3 columns x 3 rows, alternating pen/notebook props
  const deskCols = [6, 13, 20];
  const deskRows = [8, 11, 14];
  let alt = 0;
  for (const dr of deskRows) {
    for (const dc of deskCols) {
      stampInto(props, (alt++ % 2 === 0) ? DESK_PEN : DESK_NOTE, dc, dr);
      stampInto(props, (alt % 2 === 0) ? DESK_PEN : DESK_NOTE, dc + 3, dr);
    }
  }

  // Rug in the middle aisle (walkable)
  stampInto(deco, RUG, 10, 16);

  return {
    width: W, height: H,
    groundTileset: 'room-builder',
    propsTileset: 'interiors',
    ground, props, deco,
    collideGround: [WALL_TOP, WALL_FACE, EDGE_DARK],
    playerSpawn: { x: 15, y: 17 },
    npcs: [
      { x: 3, y: 8 },    // The Anxious Echo
      { x: 26, y: 12 },  // The Hall Monitor of Mistakes
      { x: 3, y: 15 }    // The Encouraging Scrawl
    ],
    bossTrigger: { x: 13, y: 5, w: 2, h: 1 } // in front of the chalkboard
  };
}

// ── interiors picks (hallway set) ──────────────────────────
const LOCKER = { sc: 0, sr: 45, w: 2, h: 3 };      // wardrobe = school locker
const BENCH = { sc: 2, sr: 51, w: 3, h: 2 };       // long bench
const WINDOW = { sc: 2, sr: 33, w: 1, h: 1 };      // wall window
const SHELF = { sc: 13, sr: 18, w: 2, h: 3 };      // shelf/vending

// ── Level 2: El Pasillo (school hallway) ───────────────────
function buildLevel2() {
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
    groundTileset: 'room-builder', propsTileset: 'interiors',
    ground, props, deco,
    collideGround: [WALL_TOP, WALL_FACE, EDGE_DARK],
    playerSpawn: { x: 2, y: 8 },
    npcs: [
      { x: 9, y: 6 },    // The Gossiping Silhouettes
      { x: 20, y: 5 },   // The Friend at a Locker
      { x: 27, y: 8 }    // The Mirror Locker
    ],
    bossTrigger: { x: 35, y: 5, w: 2, h: 4 }, // far end of the corridor
    ambient: { color: 0x201030, alpha: 0.18 }
  };
}

// ── Level 3: La Pista (sports field) — overworld tileset ───
const OW = (r, c) => r * 29 + c;
const GRASS = OW(1, 1);
const GRASS2 = OW(1, 2);
const TREE_TOP = OW(9, 9);
const TREE_BOT = OW(10, 9);
const BUSH = OW(7, 12);
const DIRT = OW(4, 12);
const DIRT2 = OW(5, 13);

function buildLevel3() {
  const W = 32, H = 20;
  const ground = emptyGrid(W, H, GRASS);
  const props = emptyGrid(W, H, -1);
  const deco = emptyGrid(W, H, -1);

  // grass variation
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if ((x * 7 + y * 13) % 11 === 0) ground[y][x] = GRASS2;
  }
  // running track: dirt ring
  for (let y = 4; y < 16; y++) {
    for (let x = 4; x < 28; x++) {
      const onRing = (y < 6 || y >= 14 || x < 6 || x >= 26);
      if (onRing) ground[y][x] = DIRT;
    }
  }
  // tree/bush perimeter (props = collide)
  for (let x = 0; x < W; x += 2) { props[0][x] = TREE_TOP; props[1][x] = TREE_BOT; props[0][x + 1] = BUSH; }
  for (let y = 3; y < H - 3; y += 2) {
    props[y][0] = TREE_TOP; props[y + 1][0] = TREE_BOT;
    props[y][W - 1] = TREE_TOP; props[y + 1][W - 1] = TREE_BOT;
  }
  for (let x = 1; x < W - 1; x += 2) { props[H - 2][x] = TREE_TOP; props[H - 1][x] = TREE_BOT; }

  return {
    width: W, height: H,
    groundTileset: 'overworld', propsTileset: 'overworld',
    ground, props, deco,
    collideGround: [],
    playerSpawn: { x: 16, y: 17 },
    npcs: [
      { x: 5, y: 10 },   // The Teammate on the Bench
      { x: 26, y: 8 },   // The Whistle
      { x: 16, y: 12 }   // The Left-Behind Trophy
    ],
    bossTrigger: { x: 15, y: 8, w: 3, h: 2 } // center of the field
  };
}

// ── Level 4: El Escenario (dark stage + spotlight) ─────────
function buildLevel4() {
  const W = 30, H = 20;
  const ground = emptyGrid(W, H, FLOOR_CREAM); // warm wood boards
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
    groundTileset: 'room-builder', propsTileset: 'interiors',
    ground, props, deco,
    collideGround: [EDGE_DARK],
    playerSpawn: { x: 15, y: 16 },
    npcs: [
      { x: 5, y: 13 },   // The Actor in the Wings
      { x: 15, y: 10 },  // The Empty Microphone
      { x: 24, y: 13 }   // The Director's Note
    ],
    bossTrigger: { x: 14, y: 4, w: 3, h: 2 }, // center stage front
    ambient: { color: 0x050510, alpha: 0.55 },
    spotlight: true
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
    ambient: { color: 0x2a0055, alpha: 0.18 }
  };
}

const MAPS = [buildLevel1(), buildLevel2(), buildLevel3(), buildLevel4(), buildLevel5()];
