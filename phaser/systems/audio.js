// Music/SFX manager: crossfades between music tracks, remembers mute (M key).
'use strict';

const AudioSystem = {
  current: null,
  currentKey: null,

  playMusic(scene, key, { fade = 600, volume = 0.4 } = {}) {
    if (this.currentKey === key && this.current && this.current.isPlaying) return;
    const next = scene.sound.add(key, { loop: true, volume: 0 });
    next.play();
    scene.tweens.add({ targets: next, volume, duration: fade });
    if (this.current && this.current.isPlaying) {
      const prev = this.current;
      scene.tweens.add({ targets: prev, volume: 0, duration: fade, onComplete: () => prev.destroy() });
    }
    this.current = next;
    this.currentKey = key;
  },

  stopMusic(scene, { fade = 400 } = {}) {
    if (this.current && this.current.isPlaying) {
      const prev = this.current;
      scene.tweens.add({ targets: prev, volume: 0, duration: fade, onComplete: () => prev.destroy() });
    }
    this.current = null;
    this.currentKey = null;
  },

  sfx(scene, key, volume = 0.8) {
    scene.sound.play(key, { volume });
  },

  toggleMute(game) {
    game.sound.mute = !game.sound.mute;
    game.registry.set('muted', game.sound.mute);
    SaveSystem.save(game);
    return game.sound.mute;
  }
};
