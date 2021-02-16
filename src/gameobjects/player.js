var utils = require('../helpers/util');
import GameObject from './gameobject';

export default class Player extends GameObject {
    constructor(scene, startx, starty, readyx, frame) {
        super(scene, startx, starty, 'player', frame);

        this.readyx = readyx;
        this.startx = startx;
        this.starty = starty;
        this.verticaldistance = 0;
        this.horizontaldistance = 0;
        this.yoffset = 4;
        this.xoffset = 3;

        this.startwalking = false;
        this.walking = false;
        this.startbowing = false;
        this.bowing = false;
        this.ready = false;

        this.chopping = false;
        this.chopped = false;
        
        this.breaking = false;
        this.broke = false;

        this.create();
      }
      preload(){}
      create(){}
      setInputManager(){
          super.setInputManager();
      }
      setGamePad(gamepad){
        super.setGamePad(gamepad);
      }
      win(){
        this.inputmanager.win()
      }
      entrance(){
        if(this.startwalking){
            this.inputmanager.pause = true;
            this.play('walking', true);
            this.startwalking = false;
            this.walking = true;
        }
        if(this.walking){
            this.x += 1;
            if(this.x >= this.readyx){
                this.walking = false;
                this.startbowing = true;
            }
        }
        if(this.startbowing){
            this.play('bow', true);
            this.startbowing = false;
            this.scene.time.delayedCall(2000, this.setPlayerReady, [], this);
        }
      }

      setPlayerReady(){
          this.ready = true;
          this.inputmanager.pause = false;
      }

      update(){
        this.inputmanager.checkForInput();
        if(!this.chopping && !this.breaking)
            this.entrance();

        if(this.chopping){
            if(!this.chopped)
                utils.bounce(this);
        }
        if(this.breaking){
            if(!this.broke)
                utils.breaking(this);
        }
      }
}