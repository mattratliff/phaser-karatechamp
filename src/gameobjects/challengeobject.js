import Phaser from 'phaser';

export default class ChallengeObject extends Phaser.Physics.Matter.Image {
    constructor({scene, x, y, object}) {
        super(scene.matter.world, x, y, object);
        this.movementState = 'idle';
        this.scene = scene;
        scene.add.existing(this);
      }
      preload(){

      }
      create(){

      }
      activateObject(){
          this.movementState = 'flying';
      }
      update(){
            this.x -= 2;
      }
}