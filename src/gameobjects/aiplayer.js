import Phaser from 'phaser';

export default class AIPlayer extends Phaser.Physics.Matter.Sprite {
    constructor({scene, startx, starty, readyx}) {
        super(scene.matter.world, startx, starty, 'aiplayer');
        this.readyx = readyx;
        this.movementState = 'idle';
        this.scene = scene;

        this.startwalking = false;
        this.walking = false;
        this.startbowing = false;
        this.bowing = false;
        this.ready = false;

        scene.add.existing(this);

        this.create();
      }
      preload(){}
      create(){}
      win(){
        this.inputmanager.win()
      }
      entrance(){
        if(this.startwalking){
            this.play('ai-walking', true);
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
            this.play('ai-bow', true);
            this.startbowing = false;
            this.scene.time.delayedCall(2000, this.setPlayerReady, [], this);
        }
      }

      setPlayerReady(){
          this.ready = true;
      }

      update(){
        this.entrance();
      }
}