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