import Phaser from 'phaser';

export default class Brick extends Phaser.Physics.Matter.Sprite {
    constructor({scene, x, y, object, frame}) {
        super(scene.matter.world, x, y, object, frame);
        this.scene = scene;
        this.breaking = false;
        scene.add.existing(this);
      }
      preload(){}
      create(){}
      update(){}
}