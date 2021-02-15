import GameObject from './gameobject';
import sounds from '../assets/sounds/processed';
var utils = require('../helpers/util');

export default class Teacher extends GameObject {
    constructor({scene, startx, starty}) {
        super(scene, startx, starty, 'teacher');
        this.startx = startx;
        this.starty = starty;
        this.velocity = -0.5;
        this.startMatch = true;
        this.isWalking = false;
        this.canWalk = false;
        this.travelDistance = 50;
        this.active = false;

        this.setScale(0.35);

        this.create();
      }
      preload(){}
      create(){}
      addComponents(){
        this.stopmatch = this.scene.add.image(this.x+50, this.x-65, 'stop');
        this.stopmatch.visible = false;
        this.begin = this.scene.add.image(this.startx+50, this.starty-65, 'begin');
        this.begin.visible = false;

        //50% of the time the teacher will stand still
        this.canWalk = Boolean(utils.getRandomInt(2));
      }
      playBegin(){
        sounds.play('Begin');
        this.begin.visible = true;
        this.scene.time.delayedCall(2000, function(){ 
          //TODO: Need to figure out why this animation isn't working
            this.play('teacherwalking', true);
            this.begin.visible = false; 
            this.isWalking = true;
        }, [], this);
      }
      stopMatch(){
        //need sound here for stop
        this.isWalking = false;
        this.stopmatch.x = this.x+50;
        this.stopmatch.y = this.y-65;
        this.stopmatch.visible = true;

        console.log(this.stopmatch);
        this.scene.time.delayedCall(3000, function(){ 
            this.stop('teacherwalking', true); 
            this.stopmatch.visible = false; 
        }, [], this);
      }
      update(){
        if(this.isWalking && this.canWalk){
          if(this.x < this.startx - this.travelDistance)
              this.velocity = 0.5;
          if(this.x > this.startx + this.travelDistance)
              this.velocity = -0.5;
          this.begin.x += this.velocity;
          this.x += this.velocity;
        }
      }
}