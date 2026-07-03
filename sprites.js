// sprites.js — Pixel Art Sprite Definitions for "Brave Enough"
// Pure canvas pixel art. No external images. No SVG.
// All sprites drawn via ctx.fillRect() calls only.

const Sprites = (() => {

  // ─────────────────────────────────────────────
  // HELPER: draw a 2D pixel array at (x, y)
  // ─────────────────────────────────────────────
  function drawSprite(ctx, pixels, x, y, scale = 2) {
    for (let row = 0; row < pixels.length; row++) {
      for (let col = 0; col < pixels[row].length; col++) {
        const color = pixels[row][col];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
        }
      }
    }
  }

  // ─────────────────────────────────────────────
  // HERO — 16×24 pixels
  // Cloud Strife (FF7) inspired pixel art:
  // tall spiky blonde hair, dark SOLDIER outfit, shoulder pauldron,
  // signature mako-blue eyes.
  // ─────────────────────────────────────────────

  // Hero palette
  const SK  = '#F5C8A0';  // skin mid
  const SK2 = '#D4956A';  // skin shadow
  const SK3 = '#FFDDB8';  // skin highlight
  const YH  = '#FFCC00';  // blonde hair main
  const YH2 = '#CC9900';  // blonde hair shadow
  const YH3 = '#FFE566';  // blonde hair highlight
  const YH4 = '#997700';  // blonde hair deep shadow
  const OT  = '#1A1A30';  // outfit dark navy-black (SOLDIER)
  const OT2 = '#282840';  // outfit mid
  const OT3 = '#383858';  // outfit highlight
  const PA  = '#888898';  // pauldron grey
  const PA2 = '#666675';  // pauldron shadow
  const PA3 = '#AAAABC';  // pauldron highlight
  const PT  = '#0E0E1E';  // pants dark
  const PT2 = '#1C1C2E';  // pants mid
  const BT  = '#080816';  // boot dark
  const BT2 = '#161626';  // boot mid
  const EY  = '#4488FF';  // eye blue — Cloud's mako eyes
  const OL  = '#0A0A0A';  // outline
  const __  = null;       // transparent

  // HERO IDLE — Cloud-style: spiky blonde hair, dark SOLDIER outfit, pauldron right
  const heroIdlePixels = [
    //          0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15
    /* 00 */ [__,  __,  __,  OL,  OL,  OL,  OL,  OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 01 */ [__,  __,  OL,  YH3, YH,  YH,  YH,  YH2, OL,  __,  __,  __,  __,  __,  __,  __],
    /* 02 */ [__,  OL,  YH3, YH,  YH,  YH,  YH,  YH,  YH2, OL,  __,  __,  __,  __,  __,  __],
    /* 03 */ [OL,  YH3, YH,  YH,  YH,  YH2, YH,  YH,  YH2, YH4, OL,  __,  __,  __,  __,  __],
    /* 04 */ [OL,  YH,  YH,  YH4, SK3, SK,  SK,  SK,  SK3, YH4, YH2, OL,  __,  __,  __,  __],
    /* 05 */ [__,  OL,  YH4, YH,  YH4, SK,  SK,  SK,  SK,  SK3, YH4, OL,  __,  __,  __,  __],
    /* 06 */ [__,  __,  OL,  YH4, SK,  SK,  EY,  SK,  EY,  SK,  YH4, OL,  __,  __,  __,  __],
    /* 07 */ [__,  __,  __,  OL,  SK3, SK,  SK,  SK,  SK,  SK3, OL,  __,  __,  __,  __,  __],
    /* 08 */ [__,  __,  __,  __,  OL,  SK,  SK2, SK2, SK,  OL,  __,  __,  __,  __,  __,  __],
    /* 09 */ [__,  __,  __,  __,  __,  OL,  SK,  SK,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 10 */ [__,  __,  OL,  OT3, OT2, OT2, OT,  OT2, OT3, PA3, PA,  PA2, OL,  __,  __,  __],
    /* 11 */ [__,  OL,  OT3, OT2, OT,  OT,  OT,  OT,  OT2, OT3, PA,  PA2, PA,  OL,  __,  __],
    /* 12 */ [OL,  SK2, OT3, OT2, OT,  OT,  OT,  OT,  OT2, OT3, PA2, SK2, OL,  __,  __,  __],
    /* 13 */ [OL,  SK,  SK2, OT3, OT2, OT,  OT,  OT2, OT3, OT2, SK,  SK2, OL,  __,  __,  __],
    /* 14 */ [OL,  SK,  SK2, OT3, OT2, OT,  OT,  OT2, OT3, OT2, SK,  SK2, OL,  __,  __,  __],
    /* 15 */ [__,  OL,  SK2, SK,  OT3, OT2, OT,  OT2, OT3, SK,  SK2, OL,  __,  __,  __,  __],
    /* 16 */ [__,  __,  OL,  OT,  PT2, PT,  PT,  PT,  PT2, OT,  OL,  __,  __,  __,  __,  __],
    /* 17 */ [__,  __,  __,  OL,  PT,  PT2, OL,  OL,  PT2, PT,  OL,  __,  __,  __,  __,  __],
    /* 18 */ [__,  __,  __,  OL,  PT2, PT,  OL,  OL,  PT,  PT2, OL,  __,  __,  __,  __,  __],
    /* 19 */ [__,  __,  __,  OL,  PT,  PT2, OL,  OL,  PT2, PT,  OL,  __,  __,  __,  __,  __],
    /* 20 */ [__,  __,  __,  OL,  PT2, OL,  BT2, BT2, OL,  PT2, OL,  __,  __,  __,  __,  __],
    /* 21 */ [__,  __,  __,  OL,  BT,  OL,  BT,  BT,  OL,  BT,  OL,  __,  __,  __,  __,  __],
    /* 22 */ [__,  __,  __,  OL,  BT,  BT2, OL,  OL,  BT2, BT,  OL,  __,  __,  __,  __,  __],
    /* 23 */ [__,  __,  __,  OL,  BT,  BT,  OL,  OL,  BT,  BT,  OL,  __,  __,  __,  __,  __],
  ];

  // HERO ATTACK — forward lunge, arm thrust, hair swept back
  const heroAttackPixels = [
    //          0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15
    /* 00 */ [__,  __,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 01 */ [__,  OL,  YH3, YH,  YH,  YH,  YH,  YH2, YH,  OL,  __,  __,  __,  __,  __,  __],
    /* 02 */ [__,  OL,  YH3, YH,  YH4, SK3, SK,  SK3, YH4, YH2, OL,  __,  __,  __,  __,  __],
    /* 03 */ [__,  OL,  YH4, SK3, SK,  SK,  EY,  SK,  EY,  SK3, OL,  __,  __,  __,  __,  __],
    /* 04 */ [__,  __,  OL,  SK3, SK,  SK,  SK,  SK,  SK,  OL,  __,  __,  __,  __,  __,  __],
    /* 05 */ [__,  __,  OL,  SK2, SK,  SK2, SK2, SK,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 06 */ [__,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  __,  __,  __,  __],
    /* 07 */ [OL,  OT3, OT2, OT,  OT2, OT3, OT2, OT,  OT2, OT3, PA,  PA2, OL,  __,  __,  __],
    /* 08 */ [OL,  OT2, OT,  OT3, OT2, OT,  OT,  OT2, OT3, PA,  PA2, SK2, SK,  OL,  __,  __],
    /* 09 */ [OL,  OT,  OT2, OT3, OT2, OT,  OT,  OT3, PA2, SK,  SK2, SK,  SK2, OL,  __,  __],
    /* 10 */ [__,  OL,  OT,  OT2, OT3, OT2, OT,  PA2, SK,  SK2, SK,  OL,  OL,  OL,  __,  __],
    /* 11 */ [__,  OL,  SK2, OT,  OT2, OT3, SK2, SK,  SK2, SK,  OL,  __,  __,  __,  __,  __],
    /* 12 */ [__,  __,  OL,  SK,  OT,  SK2, SK,  OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 13 */ [__,  __,  OL,  SK,  SK2, SK,  OL,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 14 */ [__,  __,  OL,  SK,  OL,  OL,  OL,  SK,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 15 */ [__,  __,  __,  OL,  PT2, PT,  PT,  OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 16 */ [__,  __,  __,  OL,  PT,  PT2, PT2, OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 17 */ [__,  __,  __,  OL,  PT2, PT,  PT,  OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 18 */ [__,  __,  __,  OL,  PT,  PT2, PT2, OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 19 */ [__,  __,  __,  OL,  PT,  OL,  PT2, OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 20 */ [__,  __,  __,  OL,  BT,  OL,  BT2, OL,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 21 */ [__,  __,  __,  OL,  BT,  BT2, BT,  BT2, OL,  __,  __,  __,  __,  __,  __,  __],
    /* 22 */ [__,  __,  __,  OL,  BT,  BT,  BT,  BT,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 23 */ [__,  __,  __,  OL,  BT,  BT,  BT,  BT,  OL,  __,  __,  __,  __,  __,  __,  __],
  ];

  // HERO HURT — recoiling, arms raised, hair splayed wide
  const heroHurtPixels = [
    //          0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15
    /* 00 */ [__,  __,  __,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  __,  __,  __,  __,  __],
    /* 01 */ [__,  __,  OL,  YH3, YH,  YH,  YH,  YH,  YH,  YH2, YH,  OL,  __,  __,  __,  __],
    /* 02 */ [__,  OL,  YH3, YH,  YH,  YH2, YH,  YH,  YH2, YH,  YH4, YH,  OL,  __,  __,  __],
    /* 03 */ [__,  OL,  YH4, YH,  YH4, SK3, SK,  SK3, YH4, YH,  YH4, OL,  __,  __,  __,  __],
    /* 04 */ [__,  __,  OL,  YH4, SK,  SK,  EY,  SK,  EY,  SK,  YH4, OL,  __,  __,  __,  __],
    /* 05 */ [__,  __,  __,  OL,  SK3, SK,  OL,  OL,  SK,  SK3, OL,  __,  __,  __,  __,  __],
    /* 06 */ [__,  __,  __,  __,  OL,  SK2, SK,  SK,  SK2, OL,  __,  __,  __,  __,  __,  __],
    /* 07 */ [OL,  OL,  __,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  __,  __],
    /* 08 */ [OL,  OT3, OL,  OT3, OT2, OT,  OT,  OT,  OT2, OT3, PA3, PA,  OT3, OL,  __,  __],
    /* 09 */ [__,  OL,  OT3, OT2, OT,  OT,  OT,  OT,  OT2, OT3, PA,  PA2, OL,  __,  __,  __],
    /* 10 */ [__,  OL,  OT2, OT,  OT3, OT2, OT,  OT2, OT3, PA2, SK2, OL,  SK2, OL,  __,  __],
    /* 11 */ [__,  __,  OL,  OT,  OT2, OT3, OT2, OT3, PA2, SK,  SK2, OL,  __,  __,  __,  __],
    /* 12 */ [__,  __,  OL,  OT2, OT3, OT2, OT3, OT2, SK,  SK2, OL,  __,  __,  __,  __,  __],
    /* 13 */ [__,  __,  OL,  OT,  OT3, OT2, OT3, SK2, SK,  OL,  __,  __,  __,  __,  __,  __],
    /* 14 */ [__,  __,  OL,  SK2, OT,  OT2, SK2, SK,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 15 */ [__,  __,  OL,  SK,  OL,  OL,  OL,  SK,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 16 */ [__,  __,  __,  OL,  PT2, PT,  PT,  PT2, OL,  __,  __,  __,  __,  __,  __,  __],
    /* 17 */ [__,  __,  __,  OL,  PT,  PT2, PT2, PT,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 18 */ [__,  __,  __,  OL,  PT2, PT,  PT,  PT2, OL,  __,  __,  __,  __,  __,  __,  __],
    /* 19 */ [__,  __,  __,  OL,  PT,  PT2, PT2, PT,  OL,  __,  __,  __,  __,  __,  __,  __],
    /* 20 */ [__,  __,  __,  OL,  PT,  OL,  PT,  OL,  PT,  OL,  __,  __,  __,  __,  __,  __],
    /* 21 */ [__,  __,  __,  OL,  BT,  BT2, OL,  BT2, BT,  OL,  __,  __,  __,  __,  __,  __],
    /* 22 */ [__,  __,  __,  OL,  BT,  BT,  OL,  BT,  BT,  OL,  __,  __,  __,  __,  __,  __],
    /* 23 */ [__,  __,  __,  OL,  BT,  BT,  OL,  BT,  BT,  OL,  __,  __,  __,  __,  __,  __],
  ];

  // HERO VICTORY — both arms wide, triumphant Cloud pose
  const heroVictoryPixels = [
    //          0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15
    /* 00 */ [__,  __,  __,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  __,  __,  __,  __,  __,  __],
    /* 01 */ [__,  __,  OL,  YH3, YH,  YH,  YH,  YH,  YH2, YH,  OL,  __,  __,  __,  __,  __],
    /* 02 */ [__,  OL,  YH3, YH,  YH,  YH2, YH,  YH,  YH2, YH4, YH,  OL,  __,  __,  __,  __],
    /* 03 */ [__,  OL,  YH3, YH,  YH4, SK3, SK,  SK3, YH4, YH,  YH4, OL,  __,  __,  __,  __],
    /* 04 */ [__,  __,  OL,  YH4, SK,  SK,  EY,  SK,  EY,  SK,  YH4, OL,  __,  __,  __,  __],
    /* 05 */ [__,  __,  OL,  YH4, SK,  SK,  SK2, SK2, SK,  SK,  YH4, OL,  __,  __,  __,  __],
    /* 06 */ [__,  __,  __,  OL,  SK,  SK2, SK,  SK,  SK2, SK,  OL,  __,  __,  __,  __,  __],
    /* 07 */ [OL,  OL,  __,  __,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  OL,  __,  __],
    /* 08 */ [OL,  OT3, OL,  __,  OL,  OT2, OT,  OT,  OT2, OT3, PA3, PA,  OL,  OT3, OL,  __],
    /* 09 */ [__,  OL,  OT3, OL,  OT3, OT2, OT,  OT,  OT2, OT3, PA,  PA2, OL,  OT3, OL,  __],
    /* 10 */ [__,  __,  OL,  OT2, OT3, OT,  OT,  OT,  OT2, OT3, PA2, OL,  __,  __,  __,  __],
    /* 11 */ [__,  __,  OL,  OT3, OT2, OT3, OT2, OT3, OT,  OT2, OT3, OL,  __,  __,  __,  __],
    /* 12 */ [__,  __,  __,  OL,  OT,  OT2, OT3, OT2, OT,  OT,  OL,  __,  __,  __,  __,  __],
    /* 13 */ [__,  __,  __,  OL,  OT2, OT,  OT2, OT3, OT,  OL,  __,  __,  __,  __,  __,  __],
    /* 14 */ [__,  __,  __,  OL,  SK2, OT,  OT2, OT,  SK2, OL,  __,  __,  __,  __,  __,  __],
    /* 15 */ [__,  __,  __,  OL,  SK,  OL,  OL,  OL,  SK,  OL,  __,  __,  __,  __,  __,  __],
    /* 16 */ [__,  __,  __,  OL,  PT2, PT,  PT,  PT,  PT2, OL,  __,  __,  __,  __,  __,  __],
    /* 17 */ [__,  __,  __,  OL,  PT,  PT2, PT2, PT2, PT,  OL,  __,  __,  __,  __,  __,  __],
    /* 18 */ [__,  __,  OL,  PT,  PT2, PT,  PT,  PT,  PT2, PT,  OL,  __,  __,  __,  __,  __],
    /* 19 */ [__,  __,  OL,  PT2, PT,  PT2, PT2, PT2, PT,  PT2, OL,  __,  __,  __,  __,  __],
    /* 20 */ [__,  __,  OL,  PT,  OL,  PT,  PT,  PT,  OL,  PT,  OL,  __,  __,  __,  __,  __],
    /* 21 */ [__,  __,  OL,  BT,  BT2, OL,  OL,  OL,  OL,  BT2, BT,  OL,  __,  __,  __,  __],
    /* 22 */ [__,  __,  OL,  BT,  BT,  OL,  OL,  OL,  OL,  BT,  BT,  OL,  __,  __,  __,  __],
    /* 23 */ [__,  __,  OL,  BT,  BT,  OL,  OL,  OL,  OL,  BT,  BT,  OL,  __,  __,  __,  __],
  ];

  // ─────────────────────────────────────────────
  // SPARK — 12×12 pixels
  // A small glowing golden wisp / orb of self-belief
  // ─────────────────────────────────────────────

  const SC = '#FFD700';  // spark core gold
  const SC2 = '#FFA500'; // spark mid orange-gold
  const SC3 = '#FFEC8B'; // spark highlight pale yellow
  const SG = '#FF8C00';  // spark glow edge
  const SW = '#FFFACD';  // spark inner white-yellow
  const SA = '#FFD166';  // spark accent

  const sparkIdlePixels = [
    //        0    1    2    3    4    5    6    7    8    9   10   11
    /* 00 */ [__, __, __, __, SC2, SC, SC, SC2, __, __, __, __],
    /* 01 */ [__, __, __, SC2, SC, SC3, SW, SC3, SC, SC2, __, __],
    /* 02 */ [__, __, SC2, SC, SC3, SW, SW, SW, SC3, SC, SC2, __],
    /* 03 */ [__, SC2, SC, SC3, SW, SW, SW, SW, SW, SC3, SC, SC2],
    /* 04 */ [SC2, SC, SC3, SW, SW, SW, SW, SW, SW, SW, SC3, SC],
    /* 05 */ [SC, SC3, SW, SW, SW, SW, SW, SW, SW, SW, SW, SC3],
    /* 06 */ [SC, SC3, SW, SW, SW, SW, SW, SW, SW, SW, SW, SC3],
    /* 07 */ [SC2, SC, SC3, SW, SW, SW, SW, SW, SW, SW, SC3, SC],
    /* 08 */ [__, SC2, SC, SC3, SW, SW, SW, SW, SW, SC3, SC, SC2],
    /* 09 */ [__, __, SC2, SC, SC3, SW, SW, SW, SC3, SC, SC2, __],
    /* 10 */ [__, __, __, SC2, SC, SC3, SC3, SC3, SC, SC2, __, __],
    /* 11 */ [__, __, __, __, SC2, SC, SC, SC2, __, __, __, __],
  ];

  // SPARK SPEAK — same orb but with radiating lines (drawn wider)
  const sparkSpeakPixels = [
    //        0    1    2    3    4    5    6    7    8    9   10   11
    /* 00 */ [__, SC2, __, __, SC, SC, SC, SC, __, __, SC2, __],
    /* 01 */ [SC2, __, __, SC2, SC3, SW, SW, SC3, SC2, __, __, SC2],
    /* 02 */ [__, __, SC2, SC, SW, SW, SW, SW, SC, SC2, __, __],
    /* 03 */ [__, SC2, SC, SW, SW, SW, SW, SW, SW, SC, SC2, __],
    /* 04 */ [SC, SC3, SW, SW, SW, SW, SW, SW, SW, SW, SC3, SC],
    /* 05 */ [SC, SW, SW, SW, SW, SW, SW, SW, SW, SW, SW, SC],
    /* 06 */ [SC, SW, SW, SW, SW, SW, SW, SW, SW, SW, SW, SC],
    /* 07 */ [SC, SC3, SW, SW, SW, SW, SW, SW, SW, SW, SC3, SC],
    /* 08 */ [__, SC2, SC, SW, SW, SW, SW, SW, SW, SC, SC2, __],
    /* 09 */ [SC2, __, __, SC2, SC3, SW, SW, SC3, SC2, __, __, SC2],
    /* 10 */ [__, SC2, __, __, SC, SC3, SC3, SC, __, __, SC2, __],
    /* 11 */ [__, __, SC2, __, __, SC2, SC2, __, __, SC2, __, __],
  ];

  // ─────────────────────────────────────────────
  // BOSS 1 — LA PLUMA ROJA (32×32)
  // Persona Shadow: towering judge figure, black void body, golden all-seeing eye,
  // red ink dripping from its "hands", feather-quill silhouette motif
  // ─────────────────────────────────────────────

  const B1V  = '#050508'; // void black
  const B1D  = '#0D0D1A'; // body dark
  const B1M  = '#1A1A2E'; // body mid
  const B1L  = '#2A2A44'; // body light edge
  const B1G  = '#FFD700'; // gold eye glow core
  const B1G2 = '#FFC200'; // gold mid
  const B1G3 = '#FFAA00'; // gold outer
  const B1W  = '#FFFACD'; // eye white inner
  const B1R  = '#CC0000'; // red ink
  const B1R2 = '#880000'; // red dark
  const B1R3 = '#440000'; // red deep shadow
  const B1RH = '#FF3300'; // red ink drip highlight

  const bossRedPenPixels = [
    /* 00 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B1L, B1M, B1D, B1V, B1V, B1D, B1D, B1V, B1V, B1D, B1M, B1L, __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 01 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  B1L, B1M, B1D, B1V, B1V, B1D, B1M, B1M, B1D, B1V, B1V, B1D, B1M, B1L, __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 02 */ [__,  __,  __,  __,  __,  __,  __,  __,  B1L, B1M, B1D, B1V, B1V, B1M, B1D, B1D, B1D, B1D, B1M, B1V, B1V, B1D, B1M, B1L, __,  __,  __,  __,  __,  __,  __,  __],
    /* 03 */ [__,  __,  __,  __,  __,  __,  __,  B1L, B1M, B1D, B1V, B1V, B1M, B1D, B1V, B1V, B1V, B1V, B1D, B1M, B1V, B1V, B1D, B1M, B1L, __,  __,  __,  __,  __,  __,  __],
    /* 04 */ [__,  __,  __,  __,  __,  __,  B1L, B1M, B1D, B1V, B1V, B1M, B1D, B1V, B1V, B1V, B1V, B1V, B1V, B1D, B1M, B1V, B1V, B1D, B1M, B1L, __,  __,  __,  __,  __,  __],
    /* 05 */ [__,  __,  __,  __,  __,  B1L, B1M, B1D, B1V, B1V, B1M, B1D, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1D, B1M, B1V, B1V, B1D, B1M, B1L, __,  __,  __,  __,  __],
    /* 06 */ [__,  __,  __,  __,  B1R3,B1L, B1M, B1D, B1V, B1M, B1D, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1D, B1M, B1V, B1D, B1M, B1L, B1R3,__,  __,  __,  __],
    /* 07 */ [__,  __,  __,  B1R2,B1R3,B1L, B1M, B1V, B1V, B1D, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1D, B1V, B1V, B1M, B1L, B1R3,B1R2,__,  __,  __],
    /* 08 */ [__,  __,  B1R, B1R2,B1R3,B1L, B1M, B1V, B1D, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1D, B1V, B1M, B1L, B1R3,B1R2,B1R, __,  __],
    /* 09 */ [__,  __,  B1R, B1R2,B1R3,B1L, B1V, B1V, B1V, B1V, B1V, B1V, B1G3,B1G2,B1G, B1W, B1W, B1G, B1G2,B1G3,B1V, B1V, B1V, B1V, B1V, B1V, B1L, B1R3,B1R2,B1R, __,  __],
    /* 10 */ [__,  B1R, B1R2,B1R3,B1L, B1V, B1V, B1V, B1V, B1V, B1G3,B1G2,B1G, B1G, B1G2,B1W, B1W, B1G2,B1G, B1G, B1G2,B1G3,B1V, B1V, B1V, B1V, B1V, B1L, B1R3,B1R2,B1R, __],
    /* 11 */ [__,  B1R, B1R2,B1R3,B1L, B1V, B1V, B1V, B1V, B1G3,B1G2,B1G, B1G, B1W, B1W, B1W, B1W, B1W, B1W, B1G, B1G, B1G2,B1G3,B1V, B1V, B1V, B1V, B1L, B1R3,B1R2,B1R, __],
    /* 12 */ [B1R, B1R2,B1R3,B1R3,B1L, B1V, B1V, B1V, B1G3,B1G2,B1G, B1G, B1W, B1W, B1W, B1W, B1W, B1W, B1W, B1W, B1G, B1G, B1G2,B1G3,B1V, B1V, B1V, B1L, B1R3,B1R3,B1R2,B1R],
    /* 13 */ [B1R, B1R2,B1R3,B1R3,B1L, B1V, B1V, B1G3,B1G2,B1G, B1G, B1W, B1W, B1W, B1G, B1G, B1G, B1G, B1W, B1W, B1W, B1G, B1G, B1G2,B1G3,B1V, B1V, B1L, B1R3,B1R3,B1R2,B1R],
    /* 14 */ [__,  B1R, B1R2,B1R3,B1L, B1V, B1V, B1G3,B1G2,B1G, B1W, B1W, B1G, B1G2,B1G3,B1G3,B1G3,B1G3,B1G2,B1G, B1W, B1W, B1G, B1G2,B1G3,B1V, B1V, B1L, B1R3,B1R2,B1R, __],
    /* 15 */ [__,  B1R, B1R2,B1R3,B1L, B1V, B1V, B1G3,B1G2,B1G, B1W, B1W, B1G, B1G2,B1G3,B1G3,B1G3,B1G3,B1G2,B1G, B1W, B1W, B1G, B1G2,B1G3,B1V, B1V, B1L, B1R3,B1R2,B1R, __],
    /* 16 */ [__,  B1R, B1R2,B1R3,B1L, B1V, B1V, B1G3,B1G2,B1G, B1G, B1W, B1W, B1G, B1G2,B1G2,B1G2,B1G2,B1G, B1W, B1W, B1G, B1G, B1G2,B1G3,B1V, B1V, B1L, B1R3,B1R2,B1R, __],
    /* 17 */ [__,  __,  B1R, B1R2,B1L, B1V, B1V, B1V, B1G3,B1G2,B1G, B1G, B1G, B1G3,B1G3,B1G3,B1G3,B1G3,B1G3,B1G, B1G, B1G, B1G2,B1G3,B1V, B1V, B1V, B1L, B1R2,B1R, __,  __],
    /* 18 */ [__,  __,  B1R, B1R2,B1L, B1V, B1V, B1V, B1V, B1G3,B1G2,B1G2,B1G2,B1G3,B1V, B1V, B1V, B1V, B1G3,B1G2,B1G2,B1G2,B1G3,B1V, B1V, B1V, B1V, B1L, B1R2,B1R, __,  __],
    /* 19 */ [__,  __,  __,  B1R, B1L, B1M, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1M, B1L, B1R, __,  __,  __],
    /* 20 */ [__,  __,  __,  B1R, B1L, B1M, B1D, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1V, B1D, B1M, B1L, B1R, __,  __,  __],
    /* 21 */ [__,  __,  __,  __,  B1R2,B1L, B1M, B1D, B1V, B1V, B1V, B1R3,B1R2,B1V, B1V, B1V, B1V, B1V, B1V, B1R2,B1R3,B1V, B1V, B1V, B1D, B1M, B1L, B1R2,__,  __,  __,  __],
    /* 22 */ [__,  __,  __,  __,  __,  B1R2,B1L, B1M, B1D, B1V, B1R3,B1R2,B1R, B1R2,B1V, B1V, B1V, B1V, B1R2,B1R, B1R2,B1R3,B1V, B1D, B1M, B1L, B1R2,__,  __,  __,  __,  __],
    /* 23 */ [__,  __,  __,  __,  __,  __,  B1R2,B1L, B1M, B1R3,B1R2,B1R, B1RH,B1R, B1R2,B1V, B1V, B1R2,B1R, B1RH,B1R, B1R2,B1R3,B1M, B1L, B1R2,__,  __,  __,  __,  __,  __],
    /* 24 */ [__,  __,  __,  __,  __,  __,  __,  B1R3,B1R2,B1R, B1RH,B1R, B1R2,B1R3,B1R, B1V, B1V, B1R, B1R3,B1R2,B1R, B1RH,B1R, B1R2,B1R3,__,  __,  __,  __,  __,  __,  __],
    /* 25 */ [__,  __,  __,  __,  __,  __,  __,  __,  B1R3,B1RH,B1R, B1R2,__,  B1R3,B1RH,B1R, B1R, B1RH,B1R3,__,  B1R2,B1R, B1RH,B1R3,__,  __,  __,  __,  __,  __,  __,  __],
    /* 26 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  B1RH,B1R2,__,  __,  __,  B1RH,B1R2,B1R2,B1RH,__,  __,  __,  B1R2,B1RH,__,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 27 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B1RH,__,  __,  __,  __,  B1RH,B1RH,__,  __,  __,  __,  B1RH,__,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 28 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B1RH,B1RH,__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 29 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 30 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 31 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
  ];

  // ─────────────────────────────────────────────
  // BOSS 2 — EL COTILLEO (32×32)
  // Persona Shadow: condensed whispers, dark purple void body,
  // cluster of glowing gold eyes, ghostly mouth shapes, tentacle wisps
  // ─────────────────────────────────────────────

  const B2V  = '#050508'; // void black
  const B2D  = '#0A0015'; // body deepest
  const B2M  = '#1A0030'; // body dark purple
  const B2B  = '#2D0050'; // body mid purple
  const B2H  = '#4A0070'; // body highlight
  const B2L  = '#6600AA'; // body glow edge
  const B2G  = '#FFD700'; // eye gold
  const B2G2 = '#FFC200'; // eye mid gold
  const B2G3 = '#FFAA00'; // eye outer gold
  const B2W  = '#FFFACD'; // eye white inner
  const B2MO = '#9900CC'; // mouth ghost purple
  const B2T  = '#CC00FF'; // wisp tentacle tip

  const bossWhisperPixels = [
    /* 00 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  B2D, B2M, B2B, B2H, B2B, B2M, B2D, B2D, B2M, B2B, B2H, B2B, B2M, B2D, __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 01 */ [__,  __,  __,  __,  __,  __,  __,  __,  B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, __,  __,  __,  __,  __,  __,  __,  __],
    /* 02 */ [__,  __,  __,  __,  __,  __,  __,  B2D, B2M, B2B, B2H, B2L, B2H, B2G3,B2G2,B2G, B2G, B2G2,B2G3,B2H, B2L, B2H, B2B, B2M, B2D, __,  __,  __,  __,  __,  __,  __],
    /* 03 */ [__,  __,  __,  __,  __,  __,  B2D, B2M, B2B, B2H, B2L, B2G3,B2G2,B2G, B2W, B2W, B2W, B2W, B2G, B2G2,B2G3,B2L, B2H, B2B, B2M, B2D, __,  __,  __,  __,  __,  __],
    /* 04 */ [__,  __,  __,  __,  __,  B2T, B2M, B2B, B2H, B2L, B2G3,B2G2,B2G, B2W, B2W, B2G2,B2G2,B2W, B2W, B2G, B2G2,B2G3,B2L, B2H, B2B, B2M, B2T, __,  __,  __,  __,  __],
    /* 05 */ [__,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2G3,B2G2,B2G, B2W, B2W, B2G2,B2V, B2V, B2G2,B2W, B2W, B2G, B2G2,B2G3,B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __],
    /* 06 */ [__,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2G3,B2G2,B2G, B2G, B2G2,B2G3,B2G3,B2G3,B2G3,B2G2,B2G, B2G, B2G2,B2G3,B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __],
    /* 07 */ [__,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2D, B2M, B2B, B2B, B2M, B2D, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __],
    /* 08 */ [__,  __,  B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2V, B2D, B2M, B2M, B2D, B2V, B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, __,  __],
    /* 09 */ [__,  B2T, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2MO,B2V, B2V, B2D, B2D, B2V, B2V, B2MO,B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2T, __],
    /* 10 */ [__,  B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2D, B2V, B2V, B2MO,B2MO,B2MO,B2V, B2V, B2V, B2V, B2MO,B2MO,B2MO,B2V, B2V, B2D, B2B, B2H, B2L, B2H, B2B, B2M, B2D, __],
    /* 11 */ [B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2V, B2V, B2V, B2MO,B2V, B2MO,B2V, B2V, B2V, B2V, B2MO,B2V, B2MO,B2V, B2V, B2V, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T],
    /* 12 */ [B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2V, B2V, B2V, B2G3,B2G2,B2G, B2W, B2G, B2V, B2V, B2G, B2W, B2G, B2G2,B2G3,B2V, B2V, B2V, B2B, B2H, B2L, B2H, B2B, B2M, B2D],
    /* 13 */ [B2D, B2M, B2B, B2H, B2L, B2H, B2V, B2V, B2V, B2G3,B2G2,B2G, B2W, B2W, B2G2,B2G, B2G, B2G2,B2W, B2W, B2G, B2G2,B2G3,B2V, B2V, B2V, B2H, B2L, B2H, B2B, B2M, B2D],
    /* 14 */ [B2D, B2M, B2B, B2H, B2L, B2H, B2V, B2V, B2V, B2G3,B2G2,B2G, B2G, B2G2,B2G3,B2V, B2V, B2G3,B2G2,B2G, B2G, B2G2,B2G3,B2V, B2V, B2V, B2H, B2L, B2H, B2B, B2M, B2D],
    /* 15 */ [B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2V, B2V, B2V, B2D, B2V, B2V, B2D, B2V, B2V, B2V, B2V, B2D, B2V, B2V, B2D, B2V, B2V, B2V, B2B, B2H, B2L, B2H, B2B, B2M, B2D],
    /* 16 */ [B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2V, B2V, B2V, B2V, B2V, B2V, B2MO,B2MO,B2V, B2V, B2V, B2V, B2V, B2V, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T],
    /* 17 */ [__,  B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2MO,B2MO,B2MO,B2V, B2V, B2MO,B2MO,B2MO,B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, __],
    /* 18 */ [__,  B2T, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2MO,B2V, B2V, B2MO,B2V, B2V, B2MO,B2V, B2V, B2MO,B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2T, __],
    /* 19 */ [__,  __,  B2T, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2V, B2V, B2V, B2V, B2V, B2V, B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2T, __,  __],
    /* 20 */ [__,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2V, B2V, B2V, B2V, B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __],
    /* 21 */ [__,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2V, B2V, B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __],
    /* 22 */ [__,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __],
    /* 23 */ [__,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2V, B2V, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __],
    /* 24 */ [__,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __],
    /* 25 */ [__,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2M, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __],
    /* 26 */ [__,  __,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2B, B2B, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __,  __],
    /* 27 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2H, B2H, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 28 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2L, B2L, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 29 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2H, B2H, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 30 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2B, B2B, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 31 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  B2T, B2D, B2M, B2M, B2D, B2T, __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __,  __],
  ];

  // ─────────────────────────────────────────────
  // BOSS 3 — EL FOCO (32×32)
  // Persona Shadow: single massive glowing iris, dark angular body,
  // radiating dark-to-gold rays, black pupil inside the gold eye
  // ─────────────────────────────────────────────

  const B3V  = '#050508'; // void
  const B3D  = '#0D0D1A'; // dark body
  const B3M  = '#1A1A2E'; // body mid
  const B3L  = '#2A2A44'; // body edge
  const B3G  = '#FFD700'; // gold iris core
  const B3G2 = '#FFC200'; // gold mid ring
  const B3G3 = '#CC8800'; // gold outer ring
  const B3G4 = '#997700'; // gold far ring
  const B3W  = '#FFFACD'; // iris white inner
  const B3P  = '#000000'; // pupil black
  const B3RA = '#AA7700'; // ray shadow

  const bossSpotlightPixels = [
    /* 00 */ [B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D],
    /* 01 */ [B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M],
    /* 02 */ [B3L, B3M, B3D, B3V, B3V, B3V, B3RA,B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3RA,B3V, B3V, B3V, B3D, B3M, B3L],
    /* 03 */ [B3M, B3D, B3V, B3V, B3V, B3RA,B3G4,B3RA,B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3RA,B3G4,B3RA,B3V, B3V, B3V, B3V, B3D, B3M],
    /* 04 */ [B3D, B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G4,B3RA,B3V, B3V, B3V, B3V, B3G4,B3G3,B3G4,B3G4,B3G3,B3G4,B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G4,B3RA,B3V, B3V, B3V, B3V, B3D],
    /* 05 */ [B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G3,B3G4,B3RA,B3V, B3V, B3G4,B3G3,B3G2,B3G, B3G, B3G2,B3G3,B3G4,B3V, B3RA,B3G4,B3G3,B3G2,B3G3,B3G4,B3RA,B3V, B3V, B3V, B3V],
    /* 06 */ [B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G2,B3G3,B3G4,B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3G4,B3G3,B3G2,B3G, B3G2,B3G3,B3G4,B3RA,B3V, B3V],
    /* 07 */ [B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G2,B3G3,B3G2,B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G2,B3G3,B3G2,B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3V],
    /* 08 */ [B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA],
    /* 09 */ [B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3W, B3G, B3G, B3W, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3V],
    /* 10 */ [B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3V, B3V],
    /* 11 */ [B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3G, B3G2,B3G3,B3G4,B3RA,B3V, B3V, B3V],
    /* 12 */ [B3V, B3V, B3V, B3V, B3RA,B3G4,B3G3,B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3G3,B3G4,B3RA,B3V, B3V, B3V, B3V],
    /* 13 */ [B3V, B3V, B3V, B3V, B3V, B3RA,B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3P, B3G, B3G, B3G, B3G, B3P, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3RA,B3V, B3V, B3V, B3V, B3V],
    /* 14 */ [B3V, B3V, B3V, B3V, B3V, B3G4,B3W, B3W, B3P, B3P, B3P, B3P, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3P, B3P, B3P, B3P, B3W, B3W, B3G4,B3V, B3V, B3V, B3V, B3V],
    /* 15 */ [B3V, B3V, B3V, B3V, B3V, B3G4,B3W, B3W, B3P, B3P, B3P, B3P, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3P, B3P, B3P, B3P, B3W, B3W, B3G4,B3V, B3V, B3V, B3V, B3V],
    /* 16 */ [B3V, B3V, B3V, B3V, B3V, B3RA,B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3G, B3G, B3G, B3G, B3G, B3G, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3RA,B3V, B3V, B3V, B3V, B3V],
    /* 17 */ [B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3G, B3G2,B3G3,B3G4,B3RA,B3V, B3V, B3V],
    /* 18 */ [B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3P, B3P, B3P, B3P, B3P, B3P, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3V, B3V],
    /* 19 */ [B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3W, B3G, B3G, B3W, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3V],
    /* 20 */ [B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3W, B3W, B3W, B3W, B3W, B3W, B3W, B3W, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA],
    /* 21 */ [B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G, B3G2,B3G3,B3G4,B3RA,B3G4,B3G3,B3G2,B3G, B3G, B3G, B3G, B3G2,B3G3,B3G4,B3RA,B3G4,B3G3,B3G2,B3G, B3G2,B3G3,B3G4,B3RA,B3V, B3V],
    /* 22 */ [B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G3,B3G4,B3RA,B3V, B3V, B3G4,B3G3,B3G2,B3G, B3G, B3G2,B3G3,B3G4,B3V, B3V, B3RA,B3G4,B3G3,B3G2,B3G3,B3G4,B3RA,B3V, B3V, B3V],
    /* 23 */ [B3D, B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G4,B3RA,B3V, B3V, B3V, B3V, B3G4,B3G3,B3G4,B3G4,B3G3,B3G4,B3V, B3V, B3V, B3RA,B3G4,B3G3,B3G4,B3RA,B3V, B3V, B3V, B3V, B3D],
    /* 24 */ [B3M, B3D, B3V, B3V, B3V, B3RA,B3G4,B3RA,B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3RA,B3G4,B3RA,B3V, B3V, B3V, B3V, B3D, B3M],
    /* 25 */ [B3L, B3M, B3D, B3V, B3V, B3V, B3RA,B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3RA,B3V, B3V, B3V, B3D, B3M, B3L],
    /* 26 */ [B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M],
    /* 27 */ [B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D],
    /* 28 */ [B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V],
    /* 29 */ [B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V],
    /* 30 */ [B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V],
    /* 31 */ [B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3V, B3D, B3M, B3L, B3M, B3D, B3V, B3V, B3V, B3V],
  ];

  // ─────────────────────────────────────────────
  // BOSS 4 — EL PÁNICO ESCÉNICO (32×32)
  // Persona Shadow: tall gaunt cloak figure, split comedy/tragedy mask,
  // gold eyes behind the mask, tattered purple-void cloak edges
  // ─────────────────────────────────────────────

  const B4V  = '#050510'; // void
  const B4D  = '#0D0D20'; // body dark
  const B4M  = '#1A1A35'; // body mid
  const B4L  = '#2A2A50'; // body edge
  const B4CW = '#D4C8FF'; // mask pale half (comedy)
  const B4CB = '#0A0A15'; // mask black half (tragedy)
  const B4G  = '#FFD700'; // eye gold
  const B4G2 = '#FFC200'; // eye mid
  const B4G3 = '#FFAA00'; // eye outer
  const B4W  = '#FFFACD'; // eye white inner
  const B4P  = '#6600AA'; // cloak tattered purple
  const B4T  = '#1A0030'; // tatter shadow
  const B4S  = '#2D0050'; // tatter mid

  const bossStageFrightPixels = [
    /* 00 */ [__,  __,  __,  __,  __,  __,  __,  __,  __,  B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, __,  __,  __,  __,  __,  __,  __,  __,  __],
    /* 01 */ [__,  __,  __,  __,  __,  __,  __,  __,  B4D, B4M, B4L, B4M, B4L, B4M, B4D, B4V, B4V, B4D, B4M, B4L, B4M, B4L, B4M, B4D, __,  __,  __,  __,  __,  __,  __,  __],
    /* 02 */ [__,  __,  __,  __,  __,  __,  __,  B4D, B4M, B4L, B4CW,B4CW,B4CW,B4CB,B4CB,B4D, B4D, B4CB,B4CB,B4CW,B4CW,B4CW,B4L, B4M, B4D, __,  __,  __,  __,  __,  __,  __],
    /* 03 */ [__,  __,  __,  __,  __,  __,  B4D, B4M, B4L, B4CW,B4CW,B4CW,B4CW,B4CB,B4CB,B4V, B4V, B4CB,B4CB,B4CW,B4CW,B4CW,B4CW,B4L, B4M, B4D, __,  __,  __,  __,  __,  __],
    /* 04 */ [__,  __,  __,  __,  __,  B4D, B4M, B4L, B4CW,B4CW,B4G3,B4G2,B4CW,B4CB,B4G3,B4G2,B4G2,B4G3,B4CB,B4CW,B4G2,B4G3,B4CW,B4CW,B4L, B4M, B4D, __,  __,  __,  __,  __],
    /* 05 */ [__,  __,  __,  __,  B4D, B4M, B4L, B4CW,B4CW,B4G3,B4G2,B4G, B4W, B4CB,B4G2,B4G, B4G, B4G2,B4CB,B4W, B4G, B4G2,B4G3,B4CW,B4CW,B4L, B4M, B4D, __,  __,  __,  __],
    /* 06 */ [__,  __,  __,  B4T, B4M, B4L, B4CW,B4CW,B4G3,B4G2,B4G, B4W, B4W, B4CB,B4G, B4G2,B4G2,B4G, B4CB,B4W, B4W, B4G, B4G2,B4G3,B4CW,B4CW,B4L, B4M, B4T, __,  __,  __],
    /* 07 */ [__,  __,  B4T, B4D, B4M, B4L, B4CW,B4G3,B4G2,B4G, B4G, B4G2,B4G3,B4CB,B4CB,B4CB,B4CB,B4CB,B4CB,B4G3,B4G2,B4G, B4G, B4G2,B4G3,B4CW,B4L, B4M, B4D, B4T, __,  __],
    /* 08 */ [__,  __,  B4T, B4D, B4M, B4L, B4CW,B4CW,B4CW,B4CW,B4CW,B4CW,B4CB,B4CB,B4V, B4V, B4V, B4V, B4CB,B4CB,B4CW,B4CW,B4CW,B4CW,B4CW,B4CW,B4L, B4M, B4D, B4T, __,  __],
    /* 09 */ [__,  B4T, B4D, B4M, B4L, B4M, B4CW,B4CW,B4CW,B4CW,B4CW,B4CB,B4CB,B4V, B4V, B4V, B4V, B4V, B4V, B4CB,B4CB,B4CW,B4CW,B4CW,B4CW,B4CW,B4M, B4L, B4M, B4D, B4T, __],
    /* 10 */ [__,  B4T, B4D, B4M, B4L, B4M, B4D, B4CW,B4CW,B4CW,B4CB,B4CB,B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4CB,B4CB,B4CW,B4CW,B4CW,B4D, B4M, B4L, B4M, B4D, B4T, __],
    /* 11 */ [B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4D, B4CW,B4CW,B4CB,B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4CB,B4CW,B4CW,B4D, B4V, B4D, B4M, B4L, B4M, B4D, B4T],
    /* 12 */ [B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4D, B4M, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4M, B4D, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D],
    /* 13 */ [B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4V, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4V, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D],
    /* 14 */ [B4T, B4D, B4M, B4L, B4P, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4P, B4L, B4M, B4D, B4T],
    /* 15 */ [B4T, B4D, B4M, B4L, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4L, B4M, B4D, B4T],
    /* 16 */ [__,  B4T, B4D, B4M, B4L, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4L, B4M, B4D, B4T, __],
    /* 17 */ [__,  B4T, B4D, B4M, B4L, B4M, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4M, B4L, B4M, B4D, B4T, __],
    /* 18 */ [__,  __,  B4T, B4D, B4M, B4L, B4M, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4M, B4L, B4M, B4D, B4T, __,  __],
    /* 19 */ [__,  __,  B4T, B4D, B4M, B4L, B4M, B4D, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4D, B4M, B4L, B4M, B4D, B4T, __,  __],
    /* 20 */ [__,  __,  __,  B4T, B4D, B4M, B4L, B4M, B4D, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4D, B4M, B4L, B4M, B4D, B4T, __,  __,  __],
    /* 21 */ [__,  __,  B4T, B4S, B4D, B4M, B4L, B4M, B4D, B4V, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4V, B4D, B4M, B4L, B4M, B4D, B4S, B4T, __,  __],
    /* 22 */ [B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4P, B4S, B4D, B4V, B4V, B4V, B4V, B4D, B4S, B4P, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T],
    /* 23 */ [B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4P, B4S, B4D, B4V, B4V, B4D, B4S, B4P, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T],
    /* 24 */ [__,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4P, B4S, B4D, B4D, B4S, B4P, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __],
    /* 25 */ [__,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4P, B4S, B4S, B4P, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __],
    /* 26 */ [__,  __,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4P, B4P, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __,  __],
    /* 27 */ [__,  __,  __,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __,  __,  __],
    /* 28 */ [__,  __,  __,  __,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __,  __,  __,  __],
    /* 29 */ [__,  __,  __,  __,  __,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4V, B4V, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __,  __,  __,  __,  __],
    /* 30 */ [__,  __,  __,  __,  __,  __,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4D, B4D, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __,  __,  __,  __,  __,  __],
    /* 31 */ [__,  __,  __,  __,  __,  __,  __,  __,  B4T, B4S, B4P, B4T, B4D, B4M, B4L, B4M, B4M, B4L, B4M, B4D, B4T, B4P, B4S, B4T, __,  __,  __,  __,  __,  __,  __,  __],
  ];

  // ─────────────────────────────────────────────
  // BOSS 5 — LA ANSIEDAD (32×32)
  // The Final Shadow: massive abstract void form filling the grid,
  // golden anxiety spiral/vortex at center, many small eyes scattered
  // throughout, radiating void darkness at edges, glowing gold/white core
  // ─────────────────────────────────────────────

  const B5V  = '#020205'; // outer void
  const B5D  = '#050508'; // void dark
  const B5M  = '#0D0D1A'; // body dark
  const B5B  = '#1A1A2E'; // body mid
  const B5L  = '#2A2A44'; // body edge
  const B5G  = '#FFD700'; // gold spiral core
  const B5G2 = '#FFC200'; // gold spiral mid
  const B5G3 = '#FFAA00'; // gold spiral outer
  const B5G4 = '#997700'; // gold spiral far
  const B5W  = '#FFFACD'; // spiral center / eye white
  const B5E  = '#FFE566'; // small eye glow
  const B5EO = '#CC8800'; // small eye outer ring

  const bossAnxietyPixels = [
    /* 00 */ [B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V],
    /* 01 */ [B5V, B5D, B5M, B5B, B5L, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5L, B5B, B5M, B5D, B5V, B5V],
    /* 02 */ [B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G3,B5G4,B5B, B5L, B5B, B5M, B5D],
    /* 03 */ [B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L, B5M],
    /* 04 */ [B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5G2,B5G3,B5G4,B5B, B5L],
    /* 05 */ [B5L, B5B, B5G4,B5G3,B5G2,B5G, B5W, B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5W, B5G, B5G2,B5G3,B5G4,B5B, B5L],
    /* 06 */ [B5B, B5G4,B5G3,B5G2,B5G, B5W, B5W, B5W, B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5W, B5W, B5W, B5G, B5G2,B5G3,B5G4,B5B],
    /* 07 */ [B5L, B5G4,B5G3,B5G2,B5W, B5W, B5G, B5W, B5W, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5W, B5W, B5G, B5W, B5W, B5G2,B5G3,B5G4,B5L],
    /* 08 */ [B5B, B5G4,B5G3,B5G, B5W, B5G, B5G2,B5G, B5W, B5G, B5G3,B5G4,B5L, B5B, B5L, B5B, B5B, B5L, B5B, B5L, B5G4,B5G3,B5G, B5W, B5G, B5G2,B5G, B5W, B5G, B5G3,B5G4,B5B],
    /* 09 */ [B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L],
    /* 10 */ [B5B, B5L, B5B, B5G4,B5G3,B5G4,B5B, B5G4,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G4,B5B, B5G4,B5G3,B5G4,B5B, B5L, B5B],
    /* 11 */ [B5M, B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5M],
    /* 12 */ [B5D, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5B, B5M, B5D, B5V, B5V, B5E, B5E, B5V, B5V, B5D, B5M, B5B, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5D],
    /* 13 */ [B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5E, B5EO,B5EO,B5E, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5D, B5V],
    /* 14 */ [B5V, B5V, B5D, B5M, B5B, B5L, B5E, B5EO,B5L, B5B, B5M, B5D, B5V, B5E, B5EO,B5G, B5G, B5EO,B5E, B5V, B5D, B5M, B5B, B5L, B5EO,B5E, B5L, B5B, B5M, B5D, B5V, B5V],
    /* 15 */ [B5V, B5V, B5V, B5D, B5M, B5B, B5EO,B5G, B5B, B5L, B5B, B5M, B5D, B5EO,B5G, B5G, B5G, B5G, B5EO,B5D, B5M, B5B, B5L, B5B, B5G, B5EO,B5B, B5M, B5D, B5V, B5V, B5V],
    /* 16 */ [B5V, B5V, B5V, B5D, B5M, B5B, B5EO,B5G, B5B, B5L, B5B, B5M, B5D, B5EO,B5G, B5G, B5G, B5G, B5EO,B5D, B5M, B5B, B5L, B5B, B5G, B5EO,B5B, B5M, B5D, B5V, B5V, B5V],
    /* 17 */ [B5V, B5V, B5D, B5M, B5B, B5L, B5E, B5EO,B5L, B5B, B5M, B5D, B5V, B5E, B5EO,B5G, B5G, B5EO,B5E, B5V, B5D, B5M, B5B, B5L, B5EO,B5E, B5L, B5B, B5M, B5D, B5V, B5V],
    /* 18 */ [B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5E, B5EO,B5EO,B5E, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5D, B5V],
    /* 19 */ [B5D, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5B, B5M, B5D, B5V, B5V, B5E, B5E, B5V, B5V, B5D, B5M, B5B, B5M, B5B, B5L, B5B, B5M, B5B, B5L, B5B, B5M, B5D],
    /* 20 */ [B5M, B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5G4,B5B, B5L, B5B, B5M],
    /* 21 */ [B5B, B5L, B5B, B5G4,B5G3,B5G4,B5B, B5G4,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G4,B5B, B5G4,B5G3,B5G4,B5B, B5L, B5B],
    /* 22 */ [B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L],
    /* 23 */ [B5B, B5G4,B5G3,B5G, B5W, B5G, B5G2,B5G, B5W, B5G, B5G3,B5G4,B5L, B5B, B5L, B5B, B5B, B5L, B5B, B5L, B5G4,B5G3,B5G, B5W, B5G, B5G2,B5G, B5W, B5G, B5G3,B5G4,B5B],
    /* 24 */ [B5L, B5G4,B5G3,B5G2,B5W, B5W, B5G, B5W, B5W, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5W, B5W, B5G, B5W, B5W, B5G2,B5G3,B5G4,B5L],
    /* 25 */ [B5B, B5G4,B5G3,B5G2,B5G, B5W, B5W, B5W, B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5W, B5W, B5W, B5G, B5G2,B5G3,B5G4,B5B],
    /* 26 */ [B5L, B5B, B5G4,B5G3,B5G2,B5G, B5W, B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5W, B5G, B5G2,B5G3,B5G4,B5B, B5L],
    /* 27 */ [B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G, B5G2,B5G3,B5G4,B5B, B5L, B5B],
    /* 28 */ [B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5G2,B5G3,B5G4,B5B, B5L, B5B, B5M],
    /* 29 */ [B5D, B5M, B5B, B5L, B5B, B5G4,B5G3,B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5G3,B5G4,B5B, B5L, B5B, B5M, B5D],
    /* 30 */ [B5V, B5D, B5M, B5B, B5L, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5L, B5B, B5M, B5D, B5V],
    /* 31 */ [B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5D, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5V, B5D, B5M, B5B, B5L, B5B, B5M, B5D, B5V, B5V],
  ];

  // ─────────────────────────────────────────────
  // ENVIRONMENT TILES — 16×16 pixels each
  // ─────────────────────────────────────────────

  // === LEVEL 1: EXAM ROOM ===

  // Exam desk — grey worn wood surface
  const T1A = '#6B6B6B'; // desk grey mid
  const T1B = '#4A4A4A'; // desk grey dark
  const T1C = '#8C8C8C'; // desk grey light
  const T1D = '#2A2A35'; // room dark bg
  const T1E = '#3A3A4A'; // desk shadow
  const T1F = '#9E9E9E'; // desk highlight

  const tileExamDeskPixels = [
    /* 00 */ [T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B,T1B],
    /* 01 */ [T1B,T1C,T1F,T1C,T1C,T1F,T1C,T1C,T1F,T1C,T1C,T1F,T1C,T1C,T1C,T1B],
    /* 02 */ [T1B,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1B],
    /* 03 */ [T1B,T1A,T1C,T1A,T1C,T1A,T1C,T1A,T1C,T1A,T1C,T1A,T1C,T1A,T1C,T1B],
    /* 04 */ [T1B,T1A,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1A,T1B],
    /* 05 */ [T1B,T1A,T1A,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1A,T1A,T1B],
    /* 06 */ [T1B,T1A,T1A,T1A,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1C,T1A,T1A,T1A,T1B],
    /* 07 */ [T1B,T1A,T1A,T1A,T1A,T1C,T1A,T1B,T1B,T1A,T1C,T1A,T1A,T1A,T1A,T1B],
    /* 08 */ [T1B,T1A,T1A,T1A,T1A,T1A,T1B,T1D,T1D,T1B,T1A,T1A,T1A,T1A,T1A,T1B],
    /* 09 */ [T1B,T1A,T1A,T1A,T1A,T1B,T1D,T1D,T1D,T1D,T1B,T1A,T1A,T1A,T1A,T1B],
    /* 10 */ [T1B,T1A,T1A,T1A,T1B,T1D,T1D,T1D,T1D,T1D,T1D,T1B,T1A,T1A,T1A,T1B],
    /* 11 */ [T1B,T1A,T1A,T1B,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1B,T1A,T1A,T1B],
    /* 12 */ [T1B,T1A,T1B,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1B,T1A,T1B],
    /* 13 */ [T1B,T1B,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1B,T1B],
    /* 14 */ [T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D],
    /* 15 */ [T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D,T1D],
  ];

  // Exam wall — dark oppressive wall with chalk equation marks
  const T1W1 = '#2A2A35'; // wall bg
  const T1W2 = '#1E1E28'; // wall darker
  const T1W3 = '#3A3A4A'; // wall light seam
  const T1W4 = '#B8CC60'; // fluorescent chalk mark
  const T1W5 = '#CC2222'; // red X mark

  const tileExamWallPixels = [
    /* 00 */ [T1W2,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W2],
    /* 01 */ [T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1],
    /* 02 */ [T1W1,T1W4,T1W4,T1W4,T1W1,T1W1,T1W4,T1W4,T1W1,T1W4,T1W4,T1W4,T1W1,T1W1,T1W1,T1W1],
    /* 03 */ [T1W1,T1W1,T1W4,T1W1,T1W1,T1W4,T1W1,T1W4,T1W1,T1W1,T1W4,T1W1,T1W1,T1W5,T1W1,T1W1],
    /* 04 */ [T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W4,T1W1,T1W5,T1W1,T1W5,T1W1],
    /* 05 */ [T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W5,T1W1,T1W1],
    /* 06 */ [T1W3,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W3],
    /* 07 */ [T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1],
    /* 08 */ [T1W1,T1W1,T1W4,T1W1,T1W4,T1W1,T1W1,T1W4,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1],
    /* 09 */ [T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W5,T1W1,T1W5,T1W1],
    /* 10 */ [T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W5,T1W1,T1W1],
    /* 11 */ [T1W2,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W2],
    /* 12 */ [T1W1,T1W1,T1W1,T1W1,T1W1,T1W4,T1W4,T1W1,T1W4,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1],
    /* 13 */ [T1W1,T1W1,T1W1,T1W1,T1W4,T1W1,T1W1,T1W4,T1W1,T1W1,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1],
    /* 14 */ [T1W1,T1W1,T1W1,T1W1,T1W1,T1W4,T1W4,T1W1,T1W4,T1W4,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1],
    /* 15 */ [T1W3,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W1,T1W3],
  ];

  // Exam floor — cold grey linoleum with subtle cracks
  const T1F1 = '#8A8A8A'; // floor light
  const T1F2 = '#6A6A6A'; // floor mid
  const T1F3 = '#4A4A4A'; // floor dark / crack
  const T1F4 = '#9E9E9E'; // floor highlight
  const T1F5 = '#3A3A3A'; // crack line

  const tileExamFloorPixels = [
    /* 00 */ [T1F4,T1F1,T1F1,T1F1,T1F1,T1F1,T1F1,T1F4,T1F4,T1F1,T1F1,T1F1,T1F1,T1F1,T1F1,T1F4],
    /* 01 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 02 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F5,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 03 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F5,T1F2,T1F2,T1F2,T1F1],
    /* 04 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 05 */ [T1F1,T1F2,T1F5,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 06 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 07 */ [T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3],
    /* 08 */ [T1F4,T1F1,T1F1,T1F1,T1F1,T1F1,T1F1,T1F4,T1F4,T1F1,T1F1,T1F1,T1F1,T1F1,T1F1,T1F4],
    /* 09 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 10 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 11 */ [T1F1,T1F2,T1F2,T1F5,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F5,T1F2,T1F2,T1F1],
    /* 12 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 13 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 14 */ [T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1,T1F1,T1F1,T1F2,T1F2,T1F2,T1F2,T1F2,T1F2,T1F1],
    /* 15 */ [T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3,T1F3],
  ];

  // === LEVEL 2: HALLWAY ===

  // Hallway wall — metal lockers, teal handles
  const T2A = '#6B8FAB'; // locker blue-grey
  const T2B = '#4A6A82'; // locker shadow
  const T2C = '#8AAFC8'; // locker highlight
  const T2D = '#2E4A5C'; // locker darkest
  const T2E = '#00A99D'; // teal handle
  const T2F = '#007A72'; // handle shadow
  const T2G = '#1a2A36'; // deep shadow gap
  const T2H = '#C0D4E0'; // locker bright face

  const tileHallwayWallPixels = [
    /* 00 */ [T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G],
    /* 01 */ [T2G,T2D,T2B,T2A,T2A,T2C,T2H,T2C,T2G,T2D,T2B,T2A,T2A,T2C,T2H,T2G],
    /* 02 */ [T2G,T2D,T2A,T2A,T2H,T2H,T2C,T2A,T2G,T2D,T2A,T2A,T2H,T2H,T2C,T2G],
    /* 03 */ [T2G,T2D,T2A,T2H,T2H,T2H,T2A,T2A,T2G,T2D,T2A,T2H,T2H,T2H,T2A,T2G],
    /* 04 */ [T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2A,T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2G],
    /* 05 */ [T2G,T2D,T2A,T2E,T2E,T2A,T2A,T2A,T2G,T2D,T2A,T2E,T2E,T2A,T2A,T2G],
    /* 06 */ [T2G,T2D,T2A,T2F,T2F,T2A,T2A,T2A,T2G,T2D,T2A,T2F,T2F,T2A,T2A,T2G],
    /* 07 */ [T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2A,T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2G],
    /* 08 */ [T2G,T2D,T2B,T2A,T2A,T2A,T2B,T2A,T2G,T2D,T2B,T2A,T2A,T2A,T2B,T2G],
    /* 09 */ [T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2A,T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2G],
    /* 10 */ [T2G,T2D,T2A,T2A,T2H,T2A,T2A,T2A,T2G,T2D,T2A,T2A,T2H,T2A,T2A,T2G],
    /* 11 */ [T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2A,T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2G],
    /* 12 */ [T2G,T2D,T2A,T2E,T2E,T2A,T2A,T2A,T2G,T2D,T2A,T2E,T2E,T2A,T2A,T2G],
    /* 13 */ [T2G,T2D,T2A,T2F,T2F,T2A,T2A,T2A,T2G,T2D,T2A,T2F,T2F,T2A,T2A,T2G],
    /* 14 */ [T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2A,T2G,T2D,T2A,T2A,T2A,T2A,T2A,T2G],
    /* 15 */ [T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G,T2G],
  ];

  // Hallway floor — beige/grey linoleum checkerboard
  const T2F1 = '#D4C4A0'; // beige tile
  const T2F2 = '#B8AB88'; // beige darker
  const T2F3 = '#9A9A9A'; // grey tile
  const T2F4 = '#7E7E7E'; // grey darker
  const T2F5 = '#C8B890'; // beige mid

  const tileHallwayFloorPixels = [
    /* 00 */ [T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3],
    /* 01 */ [T2F1,T2F2,T2F2,T2F2,T2F2,T2F2,T2F2,T2F1,T2F3,T2F4,T2F4,T2F4,T2F4,T2F4,T2F4,T2F3],
    /* 02 */ [T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1,T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3],
    /* 03 */ [T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1,T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3],
    /* 04 */ [T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1,T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3],
    /* 05 */ [T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1,T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3],
    /* 06 */ [T2F1,T2F2,T2F2,T2F2,T2F2,T2F2,T2F2,T2F1,T2F3,T2F4,T2F4,T2F4,T2F4,T2F4,T2F4,T2F3],
    /* 07 */ [T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3],
    /* 08 */ [T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1],
    /* 09 */ [T2F3,T2F4,T2F4,T2F4,T2F4,T2F4,T2F4,T2F3,T2F1,T2F2,T2F2,T2F2,T2F2,T2F2,T2F2,T2F1],
    /* 10 */ [T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3,T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1],
    /* 11 */ [T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3,T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1],
    /* 12 */ [T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3,T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1],
    /* 13 */ [T2F3,T2F4,T2F3,T2F3,T2F3,T2F3,T2F4,T2F3,T2F1,T2F2,T2F5,T2F5,T2F5,T2F5,T2F2,T2F1],
    /* 14 */ [T2F3,T2F4,T2F4,T2F4,T2F4,T2F4,T2F4,T2F3,T2F1,T2F2,T2F2,T2F2,T2F2,T2F2,T2F2,T2F1],
    /* 15 */ [T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F3,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1,T2F1],
  ];

  // === LEVEL 3: SPORTS FIELD ===

  // Grass tile — artificial turf green with grid lines
  const T3A = '#3A7D44'; // turf green
  const T3B = '#2E6235'; // turf shadow
  const T3C = '#4E9A58'; // turf highlight
  const T3D = '#1E4A28'; // grid line dark
  const T3E = '#5CB868'; // blade highlight

  const tileGrassTilePixels = [
    /* 00 */ [T3D,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3D],
    /* 01 */ [T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A],
    /* 02 */ [T3A,T3B,T3C,T3E,T3B,T3C,T3E,T3B,T3C,T3E,T3B,T3C,T3E,T3B,T3C,T3A],
    /* 03 */ [T3A,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3A],
    /* 04 */ [T3D,T3A,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3A,T3D],
    /* 05 */ [T3A,T3C,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3A],
    /* 06 */ [T3A,T3B,T3C,T3B,T3C,T3B,T3A,T3C,T3E,T3B,T3A,T3C,T3E,T3B,T3C,T3A],
    /* 07 */ [T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D,T3D],
    /* 08 */ [T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A],
    /* 09 */ [T3A,T3B,T3C,T3E,T3B,T3C,T3E,T3B,T3C,T3E,T3B,T3C,T3E,T3B,T3C,T3A],
    /* 10 */ [T3D,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3D],
    /* 11 */ [T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A],
    /* 12 */ [T3A,T3B,T3E,T3C,T3B,T3A,T3C,T3E,T3B,T3C,T3A,T3E,T3B,T3C,T3A,T3A],
    /* 13 */ [T3A,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3B,T3A,T3C,T3A],
    /* 14 */ [T3D,T3A,T3B,T3C,T3A,T3B,T3C,T3A,T3B,T3C,T3A,T3B,T3C,T3A,T3B,T3D],
    /* 15 */ [T3D,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3A,T3D],
  ];

  // Track tile — rubber running track, rust-red
  const T3R1 = '#8B3A2A'; // track rust red
  const T3R2 = '#6E2C1E'; // track dark
  const T3R3 = '#A84E3C'; // track highlight
  const T3R4 = '#C06050'; // track bright stripe
  const T3R5 = '#4A1A10'; // track shadow

  const tileTrackTilePixels = [
    /* 00 */ [T3R5,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R5],
    /* 01 */ [T3R2,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R2],
    /* 02 */ [T3R2,T3R1,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R1,T3R2],
    /* 03 */ [T3R2,T3R1,T3R3,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R3,T3R1,T3R2],
    /* 04 */ [T3R2,T3R1,T3R3,T3R4,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R4,T3R3,T3R1,T3R2],
    /* 05 */ [T3R2,T3R1,T3R3,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R3,T3R1,T3R2],
    /* 06 */ [T3R2,T3R1,T3R3,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R3,T3R1,T3R2],
    /* 07 */ [T3R2,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R2],
    /* 08 */ [T3R2,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R2],
    /* 09 */ [T3R2,T3R1,T3R3,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R3,T3R1,T3R2],
    /* 10 */ [T3R2,T3R1,T3R3,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R3,T3R1,T3R2],
    /* 11 */ [T3R2,T3R1,T3R3,T3R4,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R4,T3R3,T3R1,T3R2],
    /* 12 */ [T3R2,T3R1,T3R3,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R4,T3R3,T3R1,T3R2],
    /* 13 */ [T3R2,T3R1,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R3,T3R1,T3R2],
    /* 14 */ [T3R2,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R1,T3R2],
    /* 15 */ [T3R5,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R2,T3R5],
  ];

  // === LEVEL 4: STAGE ===

  // Stage floor — dark wood planks with stage tape
  const T4A = '#8B6914'; // wood mid
  const T4B = '#6B4F0E'; // wood dark
  const T4C = '#A88020'; // wood highlight
  const T4D = '#4A340A'; // wood shadow
  const T4E = '#F0F0F0'; // stage tape white
  const T4F = '#C8A030'; // warm grain highlight

  const tileStageFloorPixels = [
    /* 00 */ [T4D,T4B,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4B,T4D],
    /* 01 */ [T4D,T4B,T4C,T4A,T4F,T4A,T4A,T4C,T4A,T4F,T4A,T4A,T4C,T4A,T4B,T4D],
    /* 02 */ [T4D,T4B,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4B,T4D],
    /* 03 */ [T4D,T4B,T4A,T4F,T4A,T4A,T4C,T4A,T4A,T4C,T4A,T4A,T4F,T4A,T4B,T4D],
    /* 04 */ [T4D,T4B,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4B,T4D],
    /* 05 */ [T4D,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4D],
    /* 06 */ [T4D,T4B,T4C,T4A,T4A,T4A,T4A,T4C,T4C,T4A,T4A,T4A,T4A,T4C,T4B,T4D],
    /* 07 */ [T4D,T4B,T4A,T4A,T4A,T4F,T4A,T4A,T4A,T4A,T4F,T4A,T4A,T4A,T4B,T4D],
    /* 08 */ [T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E,T4E],
    /* 09 */ [T4D,T4B,T4A,T4A,T4A,T4F,T4A,T4A,T4A,T4A,T4F,T4A,T4A,T4A,T4B,T4D],
    /* 10 */ [T4D,T4B,T4C,T4A,T4A,T4A,T4A,T4C,T4C,T4A,T4A,T4A,T4A,T4C,T4B,T4D],
    /* 11 */ [T4D,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4B,T4D],
    /* 12 */ [T4D,T4B,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4B,T4D],
    /* 13 */ [T4D,T4B,T4A,T4F,T4A,T4A,T4C,T4A,T4A,T4C,T4A,T4A,T4F,T4A,T4B,T4D],
    /* 14 */ [T4D,T4B,T4C,T4A,T4F,T4A,T4A,T4C,T4A,T4F,T4A,T4A,T4C,T4A,T4B,T4D],
    /* 15 */ [T4D,T4B,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4A,T4B,T4D],
  ];

  // Curtain — deep red velvet stage curtain panel
  const T4C1 = '#4A1535'; // velvet deep red-purple
  const T4C2 = '#3A0E28'; // velvet shadow
  const T4C3 = '#6B2050'; // velvet highlight
  const T4C4 = '#2A0820'; // velvet darkest
  const T4C5 = '#8A3068'; // velvet bright fold

  const tileCurtainPixels = [
    /* 00 */ [T4C4,T4C2,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2,T4C4,T4C2,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2],
    /* 01 */ [T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C1,T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C1],
    /* 02 */ [T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2,T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2],
    /* 03 */ [T4C4,T4C1,T4C3,T4C1,T4C3,T4C1,T4C3,T4C4,T4C4,T4C1,T4C3,T4C1,T4C3,T4C1,T4C3,T4C4],
    /* 04 */ [T4C2,T4C3,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2,T4C2,T4C3,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2],
    /* 05 */ [T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C4,T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C4],
    /* 06 */ [T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2,T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2],
    /* 07 */ [T4C4,T4C2,T4C3,T4C1,T4C3,T4C1,T4C3,T4C4,T4C4,T4C2,T4C3,T4C1,T4C3,T4C1,T4C3,T4C4],
    /* 08 */ [T4C2,T4C3,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2,T4C2,T4C3,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2],
    /* 09 */ [T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C4,T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C4],
    /* 10 */ [T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2,T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2],
    /* 11 */ [T4C4,T4C1,T4C3,T4C1,T4C3,T4C1,T4C3,T4C4,T4C4,T4C1,T4C3,T4C1,T4C3,T4C1,T4C3,T4C4],
    /* 12 */ [T4C2,T4C3,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2,T4C2,T4C3,T4C1,T4C3,T4C5,T4C3,T4C1,T4C2],
    /* 13 */ [T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C4,T4C4,T4C1,T4C3,T4C5,T4C3,T4C5,T4C3,T4C4],
    /* 14 */ [T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2,T4C2,T4C3,T4C5,T4C3,T4C1,T4C3,T4C5,T4C2],
    /* 15 */ [T4C4,T4C4,T4C2,T4C1,T4C3,T4C1,T4C2,T4C4,T4C4,T4C4,T4C2,T4C1,T4C3,T4C1,T4C2,T4C4],
  ];

  // === LEVEL 5: MINDSCAPE CORE ===

  // Mind floor — swirling purple/dark cosmic mirror tile
  const T5A = '#050508'; // void
  const T5B = '#1A0030'; // deep purple
  const T5C = '#6600CC'; // electric purple
  const T5D = '#00C2B5'; // teal neuron
  const T5E = '#3D0080'; // mid purple
  const T5F = '#00FFE0'; // teal bright
  const T5G = '#150020'; // near-void

  const tileMindFloorPixels = [
    /* 00 */ [T5A,T5A,T5G,T5B,T5B,T5G,T5A,T5A,T5A,T5A,T5G,T5B,T5B,T5G,T5A,T5A],
    /* 01 */ [T5A,T5G,T5B,T5E,T5E,T5B,T5G,T5A,T5A,T5G,T5B,T5E,T5D,T5E,T5B,T5G],
    /* 02 */ [T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G,T5G,T5B,T5E,T5C,T5D,T5C,T5E,T5B],
    /* 03 */ [T5B,T5E,T5C,T5D,T5F,T5C,T5E,T5B,T5B,T5E,T5C,T5F,T5C,T5D,T5C,T5E],
    /* 04 */ [T5B,T5E,T5C,T5F,T5D,T5C,T5E,T5B,T5B,T5E,T5C,T5D,T5F,T5C,T5E,T5B],
    /* 05 */ [T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G,T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G],
    /* 06 */ [T5A,T5G,T5B,T5E,T5E,T5B,T5G,T5A,T5A,T5G,T5B,T5E,T5E,T5B,T5G,T5A],
    /* 07 */ [T5A,T5A,T5G,T5B,T5B,T5G,T5D,T5A,T5A,T5D,T5G,T5B,T5B,T5G,T5A,T5A],
    /* 08 */ [T5A,T5A,T5G,T5B,T5B,T5G,T5A,T5D,T5D,T5A,T5G,T5B,T5B,T5G,T5A,T5A],
    /* 09 */ [T5A,T5G,T5B,T5E,T5D,T5B,T5G,T5A,T5A,T5G,T5B,T5E,T5E,T5B,T5G,T5A],
    /* 10 */ [T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G,T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G],
    /* 11 */ [T5B,T5E,T5C,T5F,T5D,T5C,T5E,T5B,T5B,T5E,T5C,T5D,T5F,T5C,T5E,T5B],
    /* 12 */ [T5B,T5E,T5C,T5D,T5F,T5C,T5E,T5B,T5B,T5E,T5C,T5F,T5D,T5C,T5E,T5B],
    /* 13 */ [T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G,T5G,T5B,T5E,T5C,T5C,T5E,T5B,T5G],
    /* 14 */ [T5A,T5G,T5B,T5E,T5E,T5B,T5G,T5A,T5A,T5G,T5B,T5E,T5E,T5B,T5G,T5A],
    /* 15 */ [T5A,T5A,T5G,T5B,T5B,T5G,T5A,T5A,T5A,T5A,T5G,T5B,T5B,T5G,T5A,T5A],
  ];

  // Mind wall — cracked black stone with glowing teal veins
  const T5W1 = '#0A0A12'; // stone dark
  const T5W2 = '#050508'; // stone void
  const T5W3 = '#1a1a2a'; // stone mid
  const T5W4 = '#00C2B5'; // vein teal
  const T5W5 = '#009988'; // vein shadow
  const T5W6 = '#00FFE0'; // vein glow
  const T5W7 = '#2A2A3A'; // stone light

  const tileMindWallPixels = [
    /* 00 */ [T5W1,T5W2,T5W1,T5W1,T5W2,T5W1,T5W3,T5W1,T5W1,T5W3,T5W1,T5W2,T5W1,T5W1,T5W2,T5W1],
    /* 01 */ [T5W2,T5W1,T5W3,T5W1,T5W1,T5W4,T5W1,T5W2,T5W2,T5W1,T5W4,T5W1,T5W1,T5W3,T5W1,T5W2],
    /* 02 */ [T5W1,T5W3,T5W1,T5W1,T5W4,T5W5,T5W4,T5W1,T5W1,T5W4,T5W5,T5W4,T5W1,T5W1,T5W3,T5W1],
    /* 03 */ [T5W1,T5W1,T5W2,T5W4,T5W6,T5W5,T5W1,T5W1,T5W1,T5W1,T5W5,T5W6,T5W4,T5W2,T5W1,T5W1],
    /* 04 */ [T5W2,T5W1,T5W4,T5W5,T5W1,T5W2,T5W1,T5W1,T5W1,T5W1,T5W2,T5W1,T5W5,T5W4,T5W1,T5W2],
    /* 05 */ [T5W1,T5W4,T5W5,T5W1,T5W1,T5W1,T5W2,T5W1,T5W1,T5W2,T5W1,T5W1,T5W1,T5W5,T5W4,T5W1],
    /* 06 */ [T5W3,T5W5,T5W1,T5W2,T5W1,T5W1,T5W1,T5W3,T5W3,T5W1,T5W1,T5W1,T5W2,T5W1,T5W5,T5W3],
    /* 07 */ [T5W1,T5W4,T5W1,T5W1,T5W3,T5W1,T5W1,T5W1,T5W1,T5W1,T5W1,T5W3,T5W1,T5W1,T5W4,T5W1],
    /* 08 */ [T5W1,T5W4,T5W1,T5W1,T5W3,T5W1,T5W1,T5W1,T5W1,T5W1,T5W1,T5W3,T5W1,T5W1,T5W4,T5W1],
    /* 09 */ [T5W3,T5W5,T5W1,T5W2,T5W1,T5W1,T5W1,T5W3,T5W3,T5W1,T5W1,T5W1,T5W2,T5W1,T5W5,T5W3],
    /* 10 */ [T5W1,T5W4,T5W5,T5W1,T5W1,T5W1,T5W2,T5W1,T5W1,T5W2,T5W1,T5W1,T5W1,T5W5,T5W4,T5W1],
    /* 11 */ [T5W2,T5W1,T5W4,T5W5,T5W1,T5W2,T5W1,T5W1,T5W1,T5W1,T5W2,T5W1,T5W5,T5W4,T5W1,T5W2],
    /* 12 */ [T5W1,T5W1,T5W2,T5W4,T5W6,T5W5,T5W1,T5W1,T5W1,T5W1,T5W5,T5W6,T5W4,T5W2,T5W1,T5W1],
    /* 13 */ [T5W1,T5W3,T5W1,T5W1,T5W4,T5W5,T5W4,T5W1,T5W1,T5W4,T5W5,T5W4,T5W1,T5W1,T5W3,T5W1],
    /* 14 */ [T5W2,T5W1,T5W3,T5W1,T5W1,T5W4,T5W1,T5W2,T5W2,T5W1,T5W4,T5W1,T5W1,T5W3,T5W1,T5W2],
    /* 15 */ [T5W1,T5W2,T5W1,T5W1,T5W2,T5W1,T5W3,T5W1,T5W1,T5W3,T5W1,T5W2,T5W1,T5W1,T5W2,T5W1],
  ];

  // ─────────────────────────────────────────────
  // UI ELEMENTS — 8×8 pixels each
  // ─────────────────────────────────────────────

  // Heart Full — 8×8 red pixel heart
  const HF1 = '#CC0000'; // heart red
  const HF2 = '#FF4444'; // heart bright
  const HF3 = '#880000'; // heart shadow

  const uiHeartFullPixels = [
    /* 0 */ [__,HF2,HF1,__,__,HF1,HF2,__],
    /* 1 */ [HF2,HF1,HF1,HF2,HF2,HF1,HF1,HF2],
    /* 2 */ [HF2,HF1,HF1,HF1,HF1,HF1,HF1,HF2],
    /* 3 */ [HF2,HF1,HF1,HF1,HF1,HF1,HF1,HF2],
    /* 4 */ [__,HF2,HF1,HF1,HF1,HF1,HF2,__],
    /* 5 */ [__,__,HF2,HF1,HF1,HF2,__,__],
    /* 6 */ [__,__,__,HF2,HF2,__,__,__],
    /* 7 */ [__,__,__,__,__,__,__,__],
  ];

  // Heart Empty — 8×8 hollow heart outline
  const HE1 = '#883333'; // outline muted red

  const uiHeartEmptyPixels = [
    /* 0 */ [__,HE1,HE1,__,__,HE1,HE1,__],
    /* 1 */ [HE1,__,__,HE1,HE1,__,__,HE1],
    /* 2 */ [HE1,__,__,__,__,__,__,HE1],
    /* 3 */ [HE1,__,__,__,__,__,__,HE1],
    /* 4 */ [__,HE1,__,__,__,__,HE1,__],
    /* 5 */ [__,__,HE1,__,__,HE1,__,__],
    /* 6 */ [__,__,__,HE1,HE1,__,__,__],
    /* 7 */ [__,__,__,__,__,__,__,__],
  ];

  // Spark Icon — 8×8 blue star (Calm/MP)
  const SI1 = '#4488FF'; // star blue
  const SI2 = '#88AAFF'; // star highlight
  const SI3 = '#2255CC'; // star shadow
  const SI4 = '#AACCFF'; // star glow

  const uiSparkIconPixels = [
    /* 0 */ [__,__,__,SI2,SI2,__,__,__],
    /* 1 */ [__,__,SI4,SI1,SI1,SI4,__,__],
    /* 2 */ [__,SI4,SI2,SI4,SI4,SI2,SI4,__],
    /* 3 */ [SI2,SI1,SI4,SI2,SI2,SI4,SI1,SI2],
    /* 4 */ [SI2,SI1,SI4,SI2,SI2,SI4,SI1,SI2],
    /* 5 */ [__,SI4,SI2,SI4,SI4,SI2,SI4,__],
    /* 6 */ [__,__,SI4,SI1,SI1,SI4,__,__],
    /* 7 */ [__,__,__,SI2,SI2,__,__,__],
  ];

  // Menu Cursor — 8×4 right-pointing arrow
  const MC1 = '#F0EEE0'; // cursor white
  const MC2 = '#C0BEB0'; // cursor shadow
  const MC3 = '#FFD166'; // cursor gold accent

  const uiMenuCursorPixels = [
    /* 0 */ [MC1,MC1,__,__,__,__,__,__],
    /* 1 */ [MC3,MC2,MC1,MC1,MC1,MC1,MC1,MC3],
    /* 2 */ [MC3,MC2,MC1,MC1,MC1,MC1,MC1,MC3],
    /* 3 */ [MC1,MC1,__,__,__,__,__,__],
  ];

  // ─────────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────────

  // sparkle: a small 4-pointed pixel star
  function drawSparkle(ctx, x, y, color, scale = 2) {
    ctx.fillStyle = color;
    // Center pixel
    ctx.fillRect(x + 2 * scale, y + 2 * scale, scale, scale);
    // Top arm
    ctx.fillRect(x + 2 * scale, y + 0 * scale, scale, scale);
    ctx.fillRect(x + 2 * scale, y + 1 * scale, scale, scale);
    // Bottom arm
    ctx.fillRect(x + 2 * scale, y + 3 * scale, scale, scale);
    ctx.fillRect(x + 2 * scale, y + 4 * scale, scale, scale);
    // Left arm
    ctx.fillRect(x + 0 * scale, y + 2 * scale, scale, scale);
    ctx.fillRect(x + 1 * scale, y + 2 * scale, scale, scale);
    // Right arm
    ctx.fillRect(x + 3 * scale, y + 2 * scale, scale, scale);
    ctx.fillRect(x + 4 * scale, y + 2 * scale, scale, scale);
    // Diagonal highlights (dimmer)
    ctx.fillStyle = color + '88';
    ctx.fillRect(x + 1 * scale, y + 1 * scale, scale, scale);
    ctx.fillRect(x + 3 * scale, y + 1 * scale, scale, scale);
    ctx.fillRect(x + 1 * scale, y + 3 * scale, scale, scale);
    ctx.fillRect(x + 3 * scale, y + 3 * scale, scale, scale);
  }

  // crack: a tiny lightning bolt pixel cluster
  function drawCrack(ctx, x, y, scale = 2) {
    const bright = '#00FFFF';
    const mid    = '#00AAAA';
    const glow   = '#AAFFFF';
    // Bolt shape, 5 pixels wide × 7 tall
    ctx.fillStyle = glow;
    ctx.fillRect(x + 2 * scale, y + 0 * scale, scale, scale);
    ctx.fillStyle = bright;
    ctx.fillRect(x + 2 * scale, y + 1 * scale, scale, scale);
    ctx.fillRect(x + 1 * scale, y + 2 * scale, scale, scale);
    ctx.fillRect(x + 2 * scale, y + 2 * scale, scale, scale);
    ctx.fillRect(x + 3 * scale, y + 3 * scale, scale, scale);
    ctx.fillStyle = mid;
    ctx.fillRect(x + 2 * scale, y + 3 * scale, scale, scale);
    ctx.fillRect(x + 1 * scale, y + 4 * scale, scale, scale);
    ctx.fillRect(x + 2 * scale, y + 4 * scale, scale, scale);
    ctx.fillStyle = bright;
    ctx.fillRect(x + 1 * scale, y + 5 * scale, scale, scale);
    ctx.fillStyle = glow;
    ctx.fillRect(x + 0 * scale, y + 6 * scale, scale, scale);
    ctx.fillRect(x + 1 * scale, y + 6 * scale, scale, scale);
  }

  // ─────────────────────────────────────────────
  // RETURN — public Sprites API
  // ─────────────────────────────────────────────

  return {

    // Mutable hero color — game can set this to change hoodie per level
    heroColor: null, // if set, replaces HB in hero sprites at draw time

    hero: {
      idle:    (ctx, x, y, scale = 2) => drawSprite(ctx, heroIdlePixels,    x, y, scale),
      attack:  (ctx, x, y, scale = 2) => drawSprite(ctx, heroAttackPixels,  x, y, scale),
      hurt:    (ctx, x, y, scale = 2) => drawSprite(ctx, heroHurtPixels,    x, y, scale),
      victory: (ctx, x, y, scale = 2) => drawSprite(ctx, heroVictoryPixels, x, y, scale),
    },

    spark: {
      idle:  (ctx, x, y, scale = 2) => drawSprite(ctx, sparkIdlePixels,  x, y, scale),
      speak: (ctx, x, y, scale = 2) => drawSprite(ctx, sparkSpeakPixels, x, y, scale),
    },

    bosses: {
      redPen:      (ctx, x, y, scale = 2) => drawSprite(ctx, bossRedPenPixels,      x, y, scale),
      whisper:     (ctx, x, y, scale = 2) => drawSprite(ctx, bossWhisperPixels,     x, y, scale),
      spotlight:   (ctx, x, y, scale = 2) => drawSprite(ctx, bossSpotlightPixels,   x, y, scale),
      stageFright: (ctx, x, y, scale = 2) => drawSprite(ctx, bossStageFrightPixels, x, y, scale),
      anxiety:     (ctx, x, y, scale = 2) => drawSprite(ctx, bossAnxietyPixels,     x, y, scale),
    },

    tiles: {
      // Level 1 — Exam Room
      examDesk:  (ctx, x, y, scale = 2) => drawSprite(ctx, tileExamDeskPixels,  x, y, scale),
      examWall:  (ctx, x, y, scale = 2) => drawSprite(ctx, tileExamWallPixels,  x, y, scale),
      examFloor: (ctx, x, y, scale = 2) => drawSprite(ctx, tileExamFloorPixels, x, y, scale),
      // Level 2 — Hallway
      hallwayWall:  (ctx, x, y, scale = 2) => drawSprite(ctx, tileHallwayWallPixels,  x, y, scale),
      hallwayFloor: (ctx, x, y, scale = 2) => drawSprite(ctx, tileHallwayFloorPixels, x, y, scale),
      // Level 3 — Sports Field
      grassTile: (ctx, x, y, scale = 2) => drawSprite(ctx, tileGrassTilePixels, x, y, scale),
      trackTile: (ctx, x, y, scale = 2) => drawSprite(ctx, tileTrackTilePixels, x, y, scale),
      // Level 4 — Stage
      stageFloor: (ctx, x, y, scale = 2) => drawSprite(ctx, tileStageFloorPixels, x, y, scale),
      curtain:    (ctx, x, y, scale = 2) => drawSprite(ctx, tileCurtainPixels,    x, y, scale),
      // Level 5 — Mindscape Core
      mindFloor: (ctx, x, y, scale = 2) => drawSprite(ctx, tileMindFloorPixels, x, y, scale),
      mindWall:  (ctx, x, y, scale = 2) => drawSprite(ctx, tileMindWallPixels,  x, y, scale),
    },

    ui: {
      heartFull:  (ctx, x, y, scale = 2) => drawSprite(ctx, uiHeartFullPixels,  x, y, scale),
      heartEmpty: (ctx, x, y, scale = 2) => drawSprite(ctx, uiHeartEmptyPixels, x, y, scale),
      sparkIcon:  (ctx, x, y, scale = 2) => drawSprite(ctx, uiSparkIconPixels,  x, y, scale),
      menuCursor: (ctx, x, y, scale = 2) => drawSprite(ctx, uiMenuCursorPixels, x, y, scale),
    },

    effects: {
      sparkle: (ctx, x, y, color, scale = 2) => drawSparkle(ctx, x, y, color, scale),
      crack:   (ctx, x, y, scale = 2)         => drawCrack(ctx, x, y, scale),
    },

  };

})();

// Make available as a module if running in Node/bundled environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sprites;
}
