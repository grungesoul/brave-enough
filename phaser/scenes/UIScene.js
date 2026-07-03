'use strict';

// HUD overlay during exploration: CP / Calm bars + level name + mute hint.
class UIScene extends Phaser.Scene {
  constructor() { super('UI'); }

  init(data) { this.levelIndex = data.levelIndex || 0; }

  create() {
    if (!this.registry.get('worldHero')) {
      this.registry.set('worldHero', { cp: 100, maxCp: 100, calm: 80, maxCalm: 80 });
    }

    const names = T_(this.game, 'levelNames') || [];
    this.add.rectangle(0, 0, this.scale.width, 26, 0x0a0a12, 0.75).setOrigin(0);
    this.add.text(6, 5, (this.levelIndex + 1) + '. ' + (names[this.levelIndex] || ''), txtStyle(7, '#ffd700'));

    this.cpLabel = this.add.text(250, 5, '', txtStyle(7, '#ff8888'));
    this.calmLabel = this.add.text(350, 5, '', txtStyle(7, '#88ccff'));
    this.add.text(this.scale.width - 6, 5, '[M]', txtStyle(7, '#556677')).setOrigin(1, 0);

    this.registry.events.on('changedata-worldHero', () => this.refresh());
    this.events.on('shutdown', () => this.registry.events.off('changedata-worldHero'));
    this.refresh();
  }

  refresh() {
    const h = this.registry.get('worldHero');
    this.cpLabel.setText(T_(this.game, 'battleCp') + ' ' + h.cp + '/' + h.maxCp);
    this.calmLabel.setText(T_(this.game, 'battleCalm') + ' ' + h.calm + '/' + h.maxCalm);
  }
}
