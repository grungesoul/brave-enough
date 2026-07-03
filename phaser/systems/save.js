// localStorage save — persists name, language and level progress so a refresh
// resumes from the current level (hero stats reset at level start, as the
// original game fully restored between levels).
'use strict';

const SAVE_KEY = 'braveEnoughPhaser';

const SaveSystem = {
  save(game) {
    try {
      const r = game.registry;
      localStorage.setItem(SAVE_KEY, JSON.stringify({
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
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },

  clear() {
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  }
};
