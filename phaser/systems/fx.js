'use strict';

// HD-2D presentation helpers (Octopath-style grade/atmosphere) built on
// Phaser 3.90's built-in FX. All postFX/preFX are WebGL-only and no-op on
// Canvas, so every helper guards on renderer type; the ambient tint
// rectangles in WorldScene remain the base mood layer for that fallback.
const HD2D = {
  isWebGL(scene) {
    return scene.game.renderer.type === Phaser.WEBGL;
  },

  // Per-level camera grade: ColorMatrix (contrast+saturation) BEFORE Vignette,
  // so the vignette darkening isn't re-graded. def: { contrast, saturate,
  // hue, vignette: [x, y, radius, strength], tiltshift: [...] }
  grade(scene, def) {
    if (!def || !this.isWebGL(scene)) return;
    const cam = scene.cameras.main;
    cam.postFX.clear(); // scenes restart across levels — never stack passes
    const cm = cam.postFX.addColorMatrix();
    cm.contrast(def.contrast || 0.1);
    cm.saturate(def.saturate || 0.12, true);
    // Phaser's contrast() darkens hard at this scale — lift the mids back up
    cm.brightness(def.brightness == null ? 1.15 : def.brightness, true);
    if (def.hue) cm.hue(def.hue, true);
    const v = def.vignette || [0.5, 0.5, 0.85, 0.3];
    cam.postFX.addVignette(v[0], v[1], v[2], v[3]);
    if (def.tiltshift) cam.postFX.addTiltShift(...def.tiltshift);
  },

  // God ray: NinjaAdventure Raylight.png (216x102, beams slanting down-left),
  // additive, slow alpha breathing. Angle ~0 already reads as window light.
  ray(scene, x, y, opts = {}) {
    if (!this.isWebGL(scene)) return null;
    const r = scene.add.image(x, y, 'fx-ray')
      .setOrigin(0.5, 0)
      .setScale(opts.scale || 0.5)
      .setAngle(opts.angle || 0)
      .setTint(opts.color || 0xfff2c0)
      .setAlpha(opts.alpha || 0.14)
      .setBlendMode(Phaser.BlendModes.ADD)
      .setDepth(opts.depth == null ? 22 : opts.depth);
    scene.tweens.add({
      targets: r, alpha: (opts.alpha || 0.14) * 1.7,
      duration: 2400 + Math.floor(x % 5) * 300, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });
    return r;
  },

  // Soft point light (radial gradient, additive) — window pools, stage spot,
  // crystal glow. Cheap: no Light2D pipeline, no normal maps.
  light(scene, x, y, color, radius, intensity) {
    if (!this.isWebGL(scene)) return null;
    const l = scene.add.pointlight(x, y, color, radius || 60, intensity || 0.08);
    l.attenuation = 0.06;
    l.setDepth(21);
    l.setBlendMode(Phaser.BlendModes.ADD);
    scene.tweens.add({
      targets: l, intensity: (intensity || 0.08) * 1.35,
      duration: 1600 + (x % 7) * 180, yoyo: true, repeat: -1, ease: 'sine.inOut'
    });
    return l;
  },

  // Drifting atmospheric motes across the whole map (dust / embers / sparks).
  // Texture 'fx-dot' is generated in PreloadScene.
  motes(scene, w, h, opts = {}) {
    return scene.add.particles(0, 0, 'fx-dot', {
      x: { min: 0, max: w }, y: { min: 0, max: h },
      lifespan: { min: 5000, max: 9000 },
      speedX: { min: opts.upward ? -4 : 2, max: opts.upward ? 4 : 9 },
      speedY: opts.upward ? { min: -10, max: -3 } : { min: -3, max: 3 },
      alpha: { start: 0, end: 0.5, ease: 'sine.out', yoyo: true },
      scale: { min: 0.5, max: 1.4 },
      quantity: 1,
      frequency: opts.frequency || 260,
      tint: opts.color == null ? 0xfff6d8 : opts.color,
      blendMode: 'ADD',
      advance: 4000 // pre-warm so the level doesn't start empty
    }).setDepth(23);
  },

  // Scrolling fog band (L5 mindscape). Returns the tileSprite; caller scrolls
  // it in update() (tilePositionX += speed * dt).
  fog(scene, w, h, color, alpha) {
    const f = scene.add.tileSprite(w / 2, h - 60, w, 180, 'fx-fog')
      .setAlpha(alpha || 0.12).setTint(color || 0xbb99ff)
      .setBlendMode(Phaser.BlendModes.ADD).setDepth(24).setScrollFactor(0.6, 1);
    return f;
  },

  // Octopath-style rim light: a faint outer glow that separates a character
  // sprite from the (blurred, dark) backdrop. Cool white by default.
  rim(scene, sprite, color, strength) {
    if (!this.isWebGL(scene)) return null;
    sprite.preFX.setPadding(6);
    return sprite.preFX.addGlow(color == null ? 0xdfe8ff : color, strength == null ? 1.4 : strength, 0);
  },

  // Framed dialogue portrait. mode 'head' crops a LimeZu 16x32 char's face;
  // mode 'fit' scales any texture/frame to fit the box (bosses, object NPCs).
  // Returns a container so callers can add it to their dialogue group.
  portrait(scene, x, y, key, opts = {}) {
    const size = opts.size || 44;
    const c = scene.add.container(x, y);
    const bg = scene.add.nineslice(0, 0, 'ui-panel', 0, size, size, 5, 5, 5, 5).setAlpha(0.98);
    const edge = scene.add.rectangle(0, 0, size, size).setStrokeStyle(1, opts.edge || 0xffd700, 0.9);
    c.add([bg, edge]);
    if (scene.textures.exists(key)) {
      let spr;
      if (opts.mode === 'head') {
        // LimeZu 16x32, front frame 18: the head fills x 1-15, y 8-22
        // (body starts at y≈22; rows measured with PIL, not guessed)
        spr = scene.add.sprite(0, 0, key, opts.frame == null ? 18 : opts.frame);
        spr.setCrop(1, 8, 14, 14);
        const s = (size - 10) / 14;
        spr.setScale(s);
        // visible-rect center is (8,15) in frame coords; sprite center is (8,16)
        spr.y = 1 * s;
      } else {
        // spritesheets take frame 0; plain images use their base frame
        let frame = opts.frame;
        if (frame == null && scene.textures.get(key).has('0')) frame = 0;
        spr = frame == null ? scene.add.sprite(0, 0, key) : scene.add.sprite(0, 0, key, frame);
        const s = (size - 8) / Math.max(spr.width, spr.height);
        spr.setScale(s);
      }
      if (opts.tint) spr.setTint(opts.tint);
      // mask overflow: head crops stay inside, fit mode already fits
      c.add(spr);
    }
    return c;
  },

  // Grounding shadow under a sprite. Static placement; caller repositions
  // for moving sprites (see WorldScene.update).
  shadow(scene, target, w) {
    const s = scene.add.ellipse(target.x, target.y + (target.displayHeight * 0.32),
      w || 14, 5, 0x000000, 0.28);
    s.setDepth((target.depth || 5) - 1);
    return s;
  },

  // Cinematic letterbox bars (boss intro / phase change). show() tweens in,
  // returns a handle with hide().
  letterbox(scene, ms = 400) {
    const w = scene.scale.width, h = scene.scale.height, bh = 26;
    const top = scene.add.rectangle(0, -bh, w, bh, 0x000000).setOrigin(0).setDepth(95).setScrollFactor(0);
    const bot = scene.add.rectangle(0, h, w, bh, 0x000000).setOrigin(0).setDepth(95).setScrollFactor(0);
    scene.tweens.add({ targets: top, y: 0, duration: ms, ease: 'cubic.out' });
    scene.tweens.add({ targets: bot, y: h - bh, duration: ms, ease: 'cubic.out' });
    return {
      hide() {
        scene.tweens.add({ targets: top, y: -bh, duration: ms, ease: 'cubic.in', onComplete: () => top.destroy() });
        scene.tweens.add({ targets: bot, y: h, duration: ms, ease: 'cubic.in', onComplete: () => bot.destroy() });
      }
    };
  }
};
