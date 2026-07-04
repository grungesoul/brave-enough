// localStorage save — persists name, language and level progress so a refresh
// resumes from the current level (hero stats reset at level start, as the
// original game fully restored between levels).
'use strict';

const SAVE_KEY = 'braveEnoughPhaser';
// Bump when the level order / unlock schedule changes: old saves point at the
// wrong mission (the step-up redesign reordered all five levels).
const SAVE_VERSION = 2;

const SaveSystem = {
  save(game) {
    try {
      const r = game.registry;
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        version: SAVE_VERSION,
        playerName: r.get('playerName'),
        lang: r.get('lang'),
        currentLevel: r.get('currentLevel'),
        unlockedAbilities: r.get('unlockedAbilities'),
        muted: r.get('muted') || false
      }));
    } catch (e) { /* private mode etc. — play without saving */ }
  },

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      const data = raw ? JSON.parse(raw) : null;
      if (data && data.version !== SAVE_VERSION) return null; // stale pre-redesign save
      return data;
    } catch (e) { return null; }
  },

  clear() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  }
};
