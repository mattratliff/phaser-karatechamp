import Phaser from 'phaser';

export default class ChallengeObject extends Phaser.Physics.Matter.Sprite {
    constructor({scene, x, y, object, rightedge}) {
        super(scene.matter.world, x, y, object);
        this.movementState = 'idle';
        this.scene = scene;
        this.active = false;
        this.velocity = -3;
        this.active = false;
        this.rightedge = rightedge;
        console.log("resetting to ", this.rightedge);
        scene.add.existing(this);
      }
      preload(){

      }
      create(){

      }
      reset(RIGHTEDGE){
        console.log(RIGHTEDGE);
        this.active = false;
        this.x = RIGHTEDGE;
        
        console.log(this.x);
      }
      update(){
        if(this.active)
            this.x += this.velocity;
      }
}