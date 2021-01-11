import Phaser from 'phaser';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import constants from '../../config/constants';
import ground from '../../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../../assets/white/spritesheet.png';
import playerJSON from '../../assets/white/sprites.json';
import sounds from '../../assets/sounds/processed';
import vase from '../../assets/vase.png';
import frontkickjson from '../../assets/frontkick.json';
import border from '../../assets/backgrounds/start/dojo-border.png';
import { Engine, Render, World, Bodies, Body, Events } from "matter-js";

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class PhysicsSandbox extends Phaser.Scene {
  constructor() {
    super({ key: 'PhysicsSandbox' });

    //game config settings
    this.flyingObjectSpeed = 5;
    this.isSquating = false;
    this.isFlipping = false;
    this.isFlyingSideKick = false;
    this.pad1 = null;
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);

    this.load.json('shapes', frontkickjson);

    this.load.image('practiceboard', practiceboard);
    this.load.image('ground', ground);
    this.load.image('vase', vase);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.shapes = this.cache.json.get('shapes');


    this.addComponents();
    this.addAnimations();
    this.buildInputs();
    sounds.play('Begin');

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'PHYSICS SANDBOX', {
      fill: '#000000',
      font: `${22 * SCALE}pt Silom`
    });
  }

  buildInputs(){
    //event to connect gamepad
    if(this.input.gamepad.total == 0){
      this.input.gamepad.once('connected', function (pad) {
        this.gamepad = pad;
    }, this);
   }
  }


  addComponents(){
    const center = {
        width: WIDTH * 0.5,
        height: HEIGHT * 0.5
      };

      var cat1 = this.matter.world.nextCategory();

      this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-100);
      // this.matter.world.setCollisionCategory(cat1);
      
    //add platform
    // this.grounds = this.matter.add.staticGroup();
    // this.grounds = this.matter.add.image(650, center.height, 'ground');
    // this.grounds.setCollisionCategory(cat1);

    //add board
    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    
    this.whiteplayer = this.matter.add.sprite(center.width - 100, center.height-30, 'player');
    this.whiteplayer.setCollisionCategory(cat1);


    this.challengeObjects = [];
    this.challengeObjects.push(this.matter.add.image(RIGHTEDGE, center.height-15, 'vase'));
    this.challengeObjects[0].setCollisionCategory(cat1);

    this.whiteplayer.setCollidesWith(cat1);

    this.whiteplayer.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
      if(this.isFlipping){
        this.isFlipping = false;
      }
      if(this.isFlyingSideKick){
        this.isFlyingSideKick = false;
      }
  }, this);


  this.matter.world.on('collisionstart', function (event) {

    JSON.stringify(event.pairs[0].bodyA.gameObject);
    JSON.stringify(event.pairs[0].bodyB.gameObject);
    // event.pairs[0].bodyB.gameObject.setTint(0x00ff00);

});

  // this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
  //   console.log("collision");
  //   console.log(bodyA);
  //   console.log(bodyB);
  //   console.log("***************************");
  //   if(bodyA.id==10 && bodyB.id==11) {
  //     console.log("player collided with vase");
  //     console.log("anim = "+JSON.stringify(this.whiteplayer.anims.currentAnim));
  //     console.log("key = "+JSON.stringify(this.whiteplayer.anims.currentFrame.index));
  //       // if(plane.anims.getCurrentKey() != "explode") {
  //       //     plane.play("explode");
  //       //     plane.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
  //       //         plane.destroy();
  //       //     });
  //       // }
  //   }
// });
    //create objects


    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
  }

  addAnimations(){
      this.anims.create(
          { key: 'frontkick', 
            frames: this.anims.generateFrameNames('player', { prefix: 'kick', start:1, end: 12, zeroPad: 2 }),
            frameRate: 10, 
            repeatDelay: 200,
            repeat: 0 
        });

        this.anims.create(
            { key: 'roundhousekick', 
                frames: this.anims.generateFrameNames('player', { prefix: 'roundhouse', start:1, end: 12, zeroPad: 2 }),
                frameRate: 10, 
                repeatDelay: 200,
                repeat: 0 
            });
  
        this.anims.create(
            { key: 'spinningheal', 
                frames: this.anims.generateFrameNames('player', { prefix: 'spinningheal', start:1, end: 11, zeroPad: 2 }),
                frameRate: 10, 
                repeatDelay: 200,
                repeat: 0 
            });

        this.anims.create(
            { key: 'forward', 
              frames: this.anims.generateFrameNames('player', { prefix: 'forward', start:1, end: 3, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

        this.anims.create(
            { key: 'backward', 
              frames: this.anims.generateFrameNames('player', { prefix: 'forward', start:1, end: 3, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'jump', 
              frames: this.anims.generateFrameNames('player', { prefix: 'jump', start:1, end: 11, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'squat', 
              frames: this.anims.generateFrameNames('player', { prefix: 'squat', start:1, end: 5, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'standup', 
              frames: this.anims.generateFrameNames('player', { prefix: 'standup', start:1, end: 4, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'lowkick', 
              frames: this.anims.generateFrameNames('player', { prefix: 'lowkick', start:1, end: 9, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'flyingside', 
              frames: this.anims.generateFrameNames('player', { prefix: 'flyingside', start:1, end: 13, zeroPad: 2 }),
              frameRate: 12, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'backflip', 
              frames: this.anims.generateFrameNames('player', { prefix: 'backflip', start:1, end: 10, zeroPad: 2 }),
              frameRate: 8, 
              repeat: 0 
          });

          
      // this.physics.add.collider(this.whiteplayer, this.grounds);
      this.time.delayedCall(3000, this.startBegin, [], this);
  }

/*
    Inputs:

___ back kick = right stick left
_X__ round kick = right stik up
_X__ front kick = right stick right
_X__ low kick = right stick down
___ front leg sweep = left stick down, right stick right
___ back leg sweep = left stick down, right stick left
_X__ spinning heal kick = left stick right, right stick left
___ reverse spinning heal kick = left stick left, right stick right
_X__ flying side kick = left stick up, right stick right

___ front flip = left stick up, right stick down
_X__ back flip = left stick down, right stick up

_X__ move forward = left stick right
_X__ move backward = left stick left
_X__ jump = left stick up
_X__ squat = left stick down

___ upperpunch = left trigger + right stick up
___ reverse punch = left trigger + right stick right
___ squating reverse punch = left trigger + right stick down
___ thrust punch = left stick right + right stick right
___ (new) back fist = left trigger + right stick right
___ (new) spinning back fist = left trigger + left stick left + right stick right

___ high block = left trigger + left stick up
___ middle block = left trigger + left stick back
___ low block = left trigger + left stick down

___ change direction = right trigger

___ jump forward = A + left stick right
___ jump back = A + left stick left
*/
  checkGamePadInput(){
    if(!this.gamepad)
      return;

    var LS = this.gamepad.leftStick;
    var RS = this.gamepad.rightStick;

    if(this.isFlipping){
      if(this.whiteplayer.anims.currentFrame.index > 1 && this.whiteplayer.anims.currentFrame.index < 10)
        this.whiteplayer.x -= 2;
    }

    if(LS.y > 0.4 && RS.y < -0.4){
      this.whiteplayer.play('backflip', true); 
      this.isFlipping = true;
    }
    else if(LS.x < -0.2 && RS.x > 0.2){
      var frontkick = sounds.play('Front_Kick', false);
      sounds.volume(0.3, frontkick);
      this.whiteplayer.play('spinningheal', true); 
    }
    else if(LS.y < -0.4 && RS.x > 0.4){
        this.whiteplayer.play('flyingside', true); 
        this.isFlyingSideKick = true;
        this.whiteplayer.x += 1;
    }
    else if(LS.x > 0.4){
        this.whiteplayer.play('forward', true); 
        this.whiteplayer.x += 1;
    }
    else if(LS.x < -0.4){
      this.whiteplayer.play('backward', true); 
      this.whiteplayer.x -= 1;
    }
    else if(LS.y < -0.4 & !this.isFlyingSideKick){
      this.whiteplayer.play('jump', true); 
    }
    else if(LS.y > 0.4 && !this.isSquating){
        this.whiteplayer.play('squat', true); 
        this.isSquating = true;
    }
    else if(LS.y > 0 && LS.y < 0.4 && this.isSquating){
      this.whiteplayer.play('standup', true); 
      this.isSquating = false;
    }
    else if(RS.x > 0.4 && !this.isFlyingSideKick){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
        this.whiteplayer.play('frontkick', true); 
        this.whiteplayer.x += 1;
    }
    else if(RS.x < -0.4){
      //back kick
    }
    else if(RS.y < -0.4 && !this.isFlipping){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
        this.whiteplayer.play('roundhousekick', true); 
    }
    else if(RS.y > 0.4){
        this.whiteplayer.play('lowkick', true); 
    }
    else if(this.gamepad.B){
      //send flying object
      this.sendFlyingObject();
    }


  }

  checkKeyboardInput(){
  }

  sendFlyingObject(){
    this.sendObject = true;
  }

  stopFlyingObject(){
    this.sendObject = false;
    this.challengeObjects[0].x = RIGHTEDGE;
  }

  update(){
      this.checkGamePadInput();

      if(this.sendObject){
          this.challengeObjects[0].x -= this.flyingObjectSpeed;
          if(this.challengeObjects[0].x <= LEFTEDGE){
            this.stopFlyingObject();
          }
      }
  }

  render() {}

}
