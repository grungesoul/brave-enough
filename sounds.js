// sounds.js — Web Audio API Sound Effects for "Eres más fuerte"
// All sounds synthesized procedurally — no external files required.
// Retro chip-tune style: square/triangle waves, short envelopes, nostalgic JRPG feel.

const SFX = (() => {
  'use strict';

  let _ctx = null;
  let _ready = false;   // true once AudioContext is confirmed running
  let _queue = [];      // sounds queued before first unlock
  let _typeCharCounter = 0;

  // Public mute toggle
  let muted = false;

  function getCtx() {
    if (!_ctx) {
      try {
        _ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return null;
      }
    }
    return _ctx;
  }

  // Called once the context is confirmed running.
  // Flushes any sounds that were queued before unlock.
  function _onRunning() {
    if (_ready) return;
    _ready = true;
    const q = _queue.splice(0);
    for (const fn of q) {
      try { fn(); } catch (_) {}
    }
  }

  // Call this from every user-gesture event handler (keydown, click, touchstart).
  // Safe to call repeatedly — only does work the first time (or after tab suspend).
  function resume() {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === 'running') {
        _onRunning();
        return;
      }
      // Safari requires an actual buffer .start() call inside the gesture handler
      // to unlock audio — ctx.resume() alone is not enough on older Safari.
      try {
        const buf = ctx.createBuffer(1, 1, ctx.sampleRate);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
      } catch (_) {}
      // Chrome / Firefox: ctx.resume() is sufficient.
      ctx.resume().then(() => _onRunning()).catch(() => {});
    } catch (e) { /* silent fail */ }
  }

  // Runs fn() as soon as the AudioContext is confirmed running.
  // If already ready: runs immediately (with a tab-suspend guard).
  // If not yet ready: queues fn for when unlock fires.
  function _whenReady(fn) {
    if (_ready) {
      const ctx = getCtx();
      if (ctx && ctx.state !== 'running') {
        // Tab was backgrounded and context re-suspended; resume and retry.
        ctx.resume().then(fn).catch(() => {});
      } else {
        fn();
      }
    } else {
      _queue.push(fn);
    }
  }

  // ── CORE AUDIO HELPERS ──────────────────────────────────

  // Play a simple tone.
  function tone(freq, type, duration, volume, delay) {
    if (muted) return;
    const d = delay || 0;
    _whenReady(() => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + d);
        gain.gain.setValueAtTime(0, ctx.currentTime + d);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + d + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + duration);
        osc.start(ctx.currentTime + d);
        osc.stop(ctx.currentTime + d + duration + 0.05);
      } catch (e) { /* silent fail */ }
    });
  }

  // Frequency sweep (pitch glide).
  function sweep(freqStart, freqEnd, type, duration, volume, delay) {
    if (muted) return;
    const d = delay || 0;
    _whenReady(() => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freqStart, ctx.currentTime + d);
        osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + d + duration);
        gain.gain.setValueAtTime(0, ctx.currentTime + d);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + d + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + duration);
        osc.start(ctx.currentTime + d);
        osc.stop(ctx.currentTime + d + duration + 0.05);
      } catch (e) { /* silent fail */ }
    });
  }

  // White noise burst (for impact effects).
  function noiseBurst(duration, volume, delay) {
    if (muted) return;
    const d = delay || 0;
    _whenReady(() => {
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const bufferSize = Math.ceil(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        source.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0, ctx.currentTime + d);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + d + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + duration);
        source.start(ctx.currentTime + d);
      } catch (e) { /* silent fail */ }
    });
  }

  // ── UI SOUNDS ────────────────────────────────────────────

  function menuMove() {
    tone(200, 'square', 0.08, 0.08);
  }

  function menuConfirm() {
    tone(440, 'triangle', 0.08, 0.12, 0);
    tone(660, 'triangle', 0.08, 0.12, 0.09);
  }

  function menuBack() {
    sweep(300, 200, 'square', 0.12, 0.08);
  }

  // ── DIALOGUE SOUNDS ──────────────────────────────────────

  function typeChar() {
    _typeCharCounter++;
    if (_typeCharCounter % 3 !== 0) return;
    tone(800, 'sine', 0.03, 0.04);
  }

  function dialogueAdvance() {
    sweep(1200, 600, 'sine', 0.1, 0.06);
  }

  // ── TRANSITION & ATMOSPHERE ──────────────────────────────

  function fadeTransition() {
    tone(80, 'sine', 0.8, 0.06);
  }

  function levelIntroAppear() {
    tone(261, 'square', 0.15, 0.10, 0);
    tone(329, 'square', 0.15, 0.10, 0.17);
    tone(392, 'square', 0.15, 0.10, 0.34);
  }

  // ── BATTLE SOUNDS ────────────────────────────────────────

  function playerAttack() {
    sweep(300, 600, 'square', 0.15, 0.15);
  }

  function playerHeal() {
    tone(659, 'triangle', 0.12, 0.10, 0);
    tone(784, 'triangle', 0.12, 0.10, 0.12);
    tone(988, 'triangle', 0.12, 0.10, 0.24);
  }

  function playerHurt() {
    sweep(400, 100, 'sawtooth', 0.3, 0.18);
    noiseBurst(0.12, 0.08, 0);
  }

  function bossAttack() {
    tone(60, 'sine', 0.4, 0.14);
    tone(120, 'triangle', 0.4, 0.10);
  }

  function bossHurt() {
    sweep(800, 200, 'square', 0.2, 0.12);
  }

  function bigAttack() {
    tone(300, 'sawtooth', 0.4, 0.18);
    tone(375, 'sawtooth', 0.4, 0.18);
    tone(450, 'sawtooth', 0.4, 0.18);
  }

  function statusEffect() {
    tone(659,  'triangle', 0.08, 0.08, 0);
    tone(784,  'triangle', 0.08, 0.08, 0.09);
    tone(988,  'triangle', 0.08, 0.08, 0.18);
    tone(1319, 'triangle', 0.08, 0.08, 0.27);
  }

  // ── VICTORY & DEFEAT ─────────────────────────────────────

  function bossDefeated() {
    const descScale = [880, 784, 698, 659, 587, 523];
    for (let i = 0; i < descScale.length; i++) {
      tone(descScale[i], 'square', 0.08, 0.15, i * 0.09);
    }
    const riseDelay = descScale.length * 0.09 + 0.25;
    tone(523, 'square', 0.15, 0.10, riseDelay);
    tone(659, 'square', 0.15, 0.10, riseDelay + 0.17);
    tone(784, 'square', 0.15, 0.10, riseDelay + 0.34);
  }

  function levelClear() {
    const melody = [523, 659, 784, 1047, 1319, 1568, 2093];
    for (let i = 0; i < melody.length; i++) {
      tone(melody[i], 'square', 0.12, 0.15, i * 0.13);
    }
  }

  function abilityUnlock() {
    const chime = [523, 587, 659, 784, 880];
    for (let i = 0; i < chime.length; i++) {
      tone(chime[i], 'triangle', 0.1, 0.12, i * 0.11);
    }
  }

  function gameOver() {
    const sad = [523, 440, 349, 261];
    for (let i = 0; i < sad.length; i++) {
      tone(sad[i], 'sine', 0.25, 0.12, i * 0.28);
    }
  }

  function finalVictory() {
    const scale = [261, 294, 329, 349, 392, 440, 494, 523];
    for (let i = 0; i < scale.length; i++) {
      tone(scale[i], 'square', 0.08, 0.12, i * 0.09);
    }
    tone(523, 'square', 1.5, 0.12, 0.3 + scale.length * 0.09);
    tone(659, 'square', 1.5, 0.12, 0.3 + scale.length * 0.09);
    tone(784, 'square', 1.5, 0.12, 0.3 + scale.length * 0.09);
    const shimmerDelay = 0.8 + scale.length * 0.09;
    sweep(1568, 2093, 'triangle', 0.5, 0.12, shimmerDelay);
  }

  // ── SPARK / SPIRIT SOUNDS ────────────────────────────────

  function sparkAppear() {
    tone(1319, 'triangle', 0.1, 0.08, 0);
    tone(1568, 'triangle', 0.1, 0.08, 0.12);
    tone(1976, 'triangle', 0.1, 0.08, 0.24);
  }

  function sparkSpeak() {
    tone(523, 'sine', 0.3, 0.05);
    tone(659, 'sine', 0.3, 0.05);
  }

  // ── LIMIT BREAK ───────────────────────────────────────────

  function limitBreak() {
    tone(80, 'sawtooth', 0.2, 0.2, 0);       // deep bass hit
    sweep(200, 800, 'square', 0.3, 0.2, 0.1); // rising sweep
    tone(523, 'square', 0.15, 0.18, 0.4);     // C5 fanfare
    tone(784, 'square', 0.15, 0.18, 0.57);    // G5
    tone(1047, 'square', 0.3, 0.18, 0.74);    // C6 held
    sweep(1047, 1568, 'triangle', 0.4, 0.12, 0.9); // shimmer out
  }

  // ── MUTE TOGGLE ──────────────────────────────────────────

  function toggleMute() {
    muted = !muted;
    return muted;
  }

  function isMuted() {
    return muted;
  }

  // ── DEBUG ─────────────────────────────────────────────────

  // Returns current AudioContext state for diagnostics.
  function debugState() {
    const ctx = _ctx;
    return {
      contextState: ctx ? ctx.state : 'not created',
      ready: _ready,
      queued: _queue.length,
      muted,
    };
  }

  // Public API
  return {
    resume,
    toggleMute,
    isMuted,
    debugState,
    // UI
    menuMove,
    menuConfirm,
    menuBack,
    // Dialogue
    typeChar,
    dialogueAdvance,
    // Transitions
    fadeTransition,
    levelIntroAppear,
    // Battle
    playerAttack,
    playerHeal,
    playerHurt,
    bossAttack,
    bossHurt,
    bigAttack,
    statusEffect,
    // Victory & Defeat
    bossDefeated,
    levelClear,
    abilityUnlock,
    gameOver,
    finalVictory,
    // Limit Break
    limitBreak,
    // Spark
    sparkAppear,
    sparkSpeak,
  };
})();
