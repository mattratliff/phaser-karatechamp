import Phaser from 'phaser';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import constants from '../../config/constants';
import ground from '../../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../../assets/white/spritesheet.png';
import playerJSON from '../../assets/white/sprites.json';
import sounds from '../../assets/sounds/processed';
import vase from '../../assets/vase.png';
import border from '../../assets/backgrounds/start/dojo-border.png';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class AnimationSandbox extends Phaser.Scene {
  constructor() {
    super({ key: 'AnimationSandbox' });

    //game config settings
    this.flyingObjectSpeed = 5;
    this.isSquating = false;
    this.isBackFlipping = false;
    this.isKicking = false;
    this.isRoundHouseKicking = false;
    this.isFlyingSideKick = false;
    this.isLowKick = false;
    this.isFrontSweep = false;
    this.pad1 = null;
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.image('practiceboard', practiceboard);
    this.load.image('ground', ground);
    this.load.image('vase', vase);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.addComponents();
    this.addAnimations();
    this.buildInputs();
    sounds.play('Begin');

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'INPUT/ANIMATION SANDBOX', {
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



    //add platform
    // this.grounds = this.physics.add.staticGroup();
    // this.grounds.create(650, center.height+160, 'ground');
    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    //add board
    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    //add player
    this.whiteplayer = this.matter.add.sprite(center.width - 100, HEIGHT-200, 'player');

    this.whiteplayer.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
      if(this.isLowKick)
        this.isLowKick = false;
      if(this.isKicking)
        this.isKicking = false;
      if(this.isRoundHouseKicking)
        this.isRoundHouseKicking = false;
      if(this.isBackFlipping)
        this.isBackFlipping = false;
      if(this.isFlyingSideKick)
        this.isFlyingSideKick = false;
      if(this.isFrontSweep)
        this.isFrontSweep = false;
      if(this.isBackKick)
        this.isBackKick = false;
  }, this);

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
              frameRate: 12, 
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

          this.anims.create(
            { key: 'frontsweep', 
              frames: this.anims.generateFrameNames('player', { prefix: 'frontsweep', start:1, end: 10, zeroPad: 2 }),
              frameRate: 8, 
              repeat: 0 
          });
          
          this.anims.create(
            { key: 'backkick', 
              frames: this.anims.generateFrameNames('player', { prefix: 'backkick', start:1, end: 10, zeroPad: 2 }),
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
_X__ front leg sweep = left stick down, right stick right
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

    if(this.isBackFlipping){                                     //BACK FLIP
      if(this.whiteplayer.anims.currentFrame.index > 1 && this.whiteplayer.anims.currentFrame.index < 10)
        this.whiteplayer.x -= 2;
    }

    if(LS.y > 0.4 && RS.y < -0.4){                          //BACK FLIP
      this.whiteplayer.play('backflip', true); 
      this.isBackFlipping = true;
    }
    else if(LS.x < -0.2 && RS.x > 0.2){                     //SPINNING HEAL KICK
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      this.whiteplayer.play('spinningheal', true); 
    }
    else if(LS.y < -0.4 && RS.x > 0.4){                     //FLYING SIDE KICK
      if(!this.isFlyingSideKick){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      }
      this.isFlyingSideKick = true;
        this.whiteplayer.play('flyingside', true); 
        this.whiteplayer.x += 1;
    }
    else if(LS.y > 0.4 && RS.x > 0.4){                     //FRONT LEG SWEEP
      if(!this.isFrontSweep){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      }
      this.isFrontSweep = true;
      this.whiteplayer.play('frontsweep', true); 
    }
    else if(LS.x > 0.4){                                   //MOVE FORWARD
        this.whiteplayer.play('forward', true); 
        this.whiteplayer.x += 1;
    }
    else if(LS.x < -0.4){                                 //MOVE BACKWARD
      this.whiteplayer.play('backward', true); 
      this.whiteplayer.x -= 1;
    }
    else if(LS.y < -0.4 & !this.isFlyingSideKick){        //JUMP
      this.whiteplayer.play('jump', true); 
    }
    else if(LS.y > 0.4 && !this.isSquating && !this.isFrontSweep && !this.isBackFlipping){              //SQUAT
        this.whiteplayer.play('squat', true); 
        this.isSquating = true;
    }
    else if(LS.y > 0 && LS.y < 0.4 && this.isSquating){   //STANDUP
      this.whiteplayer.play('standup', true); 
      this.isSquating = false;
    }
    else if(RS.x > 0.4 && !this.isFlyingSideKick && !this.isFrontSweep){      //FRONT KICK
      if(!this.isKicking){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      }
      this.isKicking = true;
      this.whiteplayer.play('frontkick', true); 
      this.whiteplayer.x += 1;
    }
    else if(RS.y < -0.4 && !this.isBackFlipping){                     //ROUNDHOUSE KICK
      if(!this.isRoundHouseKicking){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      }
      this.isRoundHouseKicking = true;
      this.whiteplayer.play('roundhousekick', true); 
    }
    else if(RS.y > 0.4){                                          //LOW KICK
      if(!this.isLowKick){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      }
      this.isLowKick = true;
      this.whiteplayer.play('lowkick', true); 
    }
    else if(RS.x < -0.4){                                          //BACK KICK
      if(!this.isBackKick){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
      }
      this.isBackKick = true;
      this.whiteplayer.play('backkick', true); 
    }
  }

  checkKeyboardInput(){
  }

  // sendFlyingObject(){
  //   this.sendObject = true;
  // }

  // stopFlyingObject(){
  //   this.sendObject = false;
  //   this.challengeObjects[0].x = RIGHTEDGE;
  // }

  update(){
      this.checkGamePadInput();
      
      // if(this.sendObject){
      //     this.challengeObjects[0].x -= this.flyingObjectSpeed;
      //     if(this.challengeObjects[0].x <= LEFTEDGE){
      //       this.stopFlyingObject();
      //     }
      // }
  }

  hasNoInput(){
    // const { W,A,S,D,I,J,K,L } = this.locomotion;
    // return !W && !A && !S && !D && !I && !J && !K && !L;
  }

  render() {}

}
