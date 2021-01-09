import Phaser from 'phaser';
import practiceboard from '../assets/backgrounds/gameboard1.png';
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';
import sounds from '../assets/sounds/processed';
import vase from '../assets/vase.png';
import border from '../assets/backgrounds/start/dojo-border.png';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class ChallengeBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'ChallengeBoard' });

    //game config settings
    this.flyingObjectSpeed = 5;
    this.isSquating = false;
    this.isFlipping = false;
    this.isFlyingSideKick = false;
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
    // sounds.play('Begin');
  }

  buildInputs(){

    //event to connect gamepad
    if(this.input.gamepad.total == 0){
      this.input.gamepad.once('connected', function (pad) {
        this.gamepad = pad;
    }, this);
   }
    // const actions = this.input.keyboard.addKeys('W,A,S,D,J,I,L,K,U');
    // const { W, A, S, D, J, I, L, K, U } = actions;
    // const sendObject = U;

    // this.locomotion = {
    //     W,A,S,D,J,I,L,K,U
    //   };
  }


  addComponents(){
    const center = {
        width: WIDTH * 0.5,
        height: HEIGHT * 0.5
      };



    //add platform
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(650, center.height+160, 'ground');

    //add board
    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    //add player
    this.whiteplayer = this.add.sprite(center.width - 100, center.height-15, 'player');

    this.whiteplayer.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
      if(this.isFlipping){
        this.isFlipping = false;
      }
      if(this.isFlyingSideKick){
        this.isFlyingSideKick = false;
      }
  }, this);

    //create objects
    this.challengeObjects = [];
    this.challengeObjects.push(this.add.sprite(RIGHTEDGE, center.height-15, 'vase'));

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

          
      this.physics.add.collider(this.whiteplayer, this.grounds);
      this.time.delayedCall(3000, this.startBegin, [], this);
  }

/*
    Inputs:

    back kick = right stick left
    round kick = right stik up
    front kick = right stick right
    low kick = right stick down
    front leg sweep = left stick down, right stick right
    back leg sweep = left stick down, right stick left
    spinning heal kick = left stick right, right stick left
    reverse spinning heal kick = left stick left, right stick right
    flying side kick = left stick up, right stick right

    front flip = left stick up, right stick down
    back flip = left stick down, right stick up

    move forward = left stick right
    move backward = left stick left
    jump = left stick up
    squat = left stick down

    upperpunch = left trigger + right stick up
    reverse punch = left trigger + right stick right
    squating reverse punch = left trigger + right stick down
    thrust punch = left stick right + right stick right
    (new) back fist = left trigger + right stick right
    (new) spinning back fist = left trigger + left stick left + right stick right

    high block = left trigger + left stick up
    middle block = left trigger + left stick back
    low block = left trigger + left stick down

    change direction = right trigger

    jump forward = A + left stick right
    jump back = A + left stick left
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
            //  var frontkick = sounds.play('Front_Kick', false);
        // sounds.volume(0.3, frontkick);
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
      // if(this.hasNoInput()){
        //play ready

      // }

      if(this.sendObject){
          this.challengeObjects[0].x -= this.flyingObjectSpeed;
          if(this.challengeObjects[0].x <= LEFTEDGE){
            this.stopFlyingObject();
          }
      }
  }

  hasNoInput(){
    // const { W,A,S,D,I,J,K,L } = this.locomotion;
    // return !W && !A && !S && !D && !I && !J && !K && !L;
  }

  render() {}

}
