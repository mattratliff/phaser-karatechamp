import Phaser from 'phaser';

export default class WhitePlayer extends Phaser.Physics.Arcade.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, 'whiteplayer');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;

    this.body.onWorldBounds = true;
  }

  preload() {
  }

  create() {
  }
}
