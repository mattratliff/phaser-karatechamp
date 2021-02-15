import Phaser from 'phaser';
import BehaviorManager from '../controllers/behaviorManager';

const PlayerDirection = {
  RIGHT: 1,
  LEFT: -1
};

export default class AIPlayer extends Phaser.Physics.Matter.Sprite {
    constructor({scene, startx, starty, readyx}) {
        super(scene.matter.world, startx, starty, 'aiplayer');
        this.setIgnoreGravity(true);
        this.setCollisionGroup(-1);
        
        this.readyx = readyx;
        this.scene = scene;

        this.startwalking = false;
        this.walking = false;
        this.startbowing = false;
        this.bowing = false;
        this.ready = false;

        this.kickonce = false;

        this.direction = PlayerDirection.LEFT;

        scene.add.existing(this);

        this.create();
      }
      preload(){}
      create(){
        this.behavior = new BehaviorManager(this);
      }
      win(){
        this.inputmanager.win()
      }
      entrance(){
        if(this.startwalking){
            this.play('red-walking', true);
            this.startwalking = false;
            this.walking = true;
        }
        if(this.walking){
            this.x -= 1;
            if(this.x <= this.readyx){
                this.walking = false;
                this.startbowing = true;
            }
        }
        if(this.startbowing){
            this.play('red-bow', true);
            this.startbowing = false;
            this.scene.time.delayedCall(2000, this.setPlayerReady, [], this);
        }
      }

      setPlayerReady(){
          this.ready = true;
      }


      update(){
        if(!this.ready)
          this.entrance();
        else{
          this.behavior.update(); 
        }
      }
}