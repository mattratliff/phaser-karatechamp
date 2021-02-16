import BehaviorManager from '../managers/behaviorManager';
import GameObject from './gameobject';
var utils = require('../helpers/util');

export default class AIPlayer extends GameObject {
    constructor(scene, startx, starty, readyx) {
        super(scene, startx, starty, 'aiplayer');
        
        this.readyx = readyx;
        this.scene = scene;

        this.startwalking = false;
        this.walking = false;
        this.startbowing = false;
        this.bowing = false;
        this.ready = false;

        this.kickonce = false;

        this.direction = utils.Direction.LEFT;

        this.create();
      }
      preload(){}
      create(){
        this.behavior = new BehaviorManager(this);
        this.addAnimations();
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

      addAnimations(){
        this.anims.create(
          { key: 'red-walking', 
            frames: this.anims.generateFrameNames('aiplayer', { prefix: 'walking', start:1, end: 4, zeroPad: 1 }),
            frameRate: 8, 
            repeat: 20
        });

        this.anims.create(
          { key: 'red-bow', 
            frames: this.anims.generateFrameNames('aiplayer', { prefix: 'bow', start:1, end: 10, zeroPad: 1 }),
            frameRate: 8, 
            repeat: 0
        });

        this.anims.create(
          { key: 'red-frontkick', 
            frames: this.anims.generateFrameNames('aiplayer', { prefix: 'kick', start:1, end: 12, zeroPad: 2 }),
            frameRate: 10, 
            repeatDelay: 200,
            repeat: 1
        });
      }
}