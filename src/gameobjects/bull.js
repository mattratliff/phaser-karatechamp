import Phaser from 'phaser';

export default class Bull extends Phaser.Physics.Matter.Sprite {
    constructor({scene, x, y, object}) {
        super(scene.matter.world, x, y, object);
        this.movementState = 'idle';
        this.scene = scene;
        this.active = false;
        this.velocity = -2;
        this.active = false;
        scene.add.existing(this);
      }
      preload(){

      }
      create(){

      }

      activate(){
          this.active = true;
      }
      deactivate(){
        this.velocity = 0;
      }
      update(){
        if(this.active)
            this.x += this.velocity;
      }
}