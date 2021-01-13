import Phaser, { Game, Input } from 'phaser';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import constants from '../../config/constants';
import ground from '../../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../../assets/white/spritesheet.png';
import playerJSON from '../../assets/white/sprites.json';
import sounds from '../../assets/sounds/processed';
import border from '../../assets/backgrounds/start/dojo-border.png';

import KeyboardManager from '../../input/keyboardmanager';
import GamepadManager from '../../input/gamepadManager';

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

    this.pad1 = null;
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.image('practiceboard', practiceboard);
    this.load.image('ground', ground);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.addComponents();
    this.addAnimations();

    this.gamepadmanager = new GamepadManager(this);
    this.gamepadmanager.init(this.whiteplayer);
    this.gamepadmanager.initStates();

    this.keyboardmanager = new KeyboardManager(this);
    this.keyboardmanager.init(this.whiteplayer);
    this.keyboardmanager.initStates();

    this.checkForGamePad();

    sounds.play('Begin');

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'INPUT/ANIMATION SANDBOX', {
      fill: '#000000',
      font: `${22 * SCALE}pt Silom`
    });
  }

  checkForGamePad(){
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

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    this.whiteplayer = this.matter.add.sprite(center.width - 100, HEIGHT-200, 'player');

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
              frames: this.anims.generateFrameNames('player', { prefix: 'frontsweep', start:1, end: 9, zeroPad: 2 }),
              frameRate: 8, 
              repeat: 0 
          });
          
          this.anims.create(
            { key: 'backkick', 
              frames: this.anims.generateFrameNames('player', { prefix: 'backkick', start:1, end: 10, zeroPad: 2 }),
              frameRate: 8, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'highblock', 
              frames: this.anims.generateFrameNames('player', { prefix: 'highblock', start:1, end: 9, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'middleblock', 
              frames: this.anims.generateFrameNames('player', { prefix: 'middleblock', start:1, end: 9, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'lowblock', 
              frames: this.anims.generateFrameNames('player', { prefix: 'lowblock', start:1, end: 11, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'reverse', 
              frames: this.anims.generateFrameNames('player', { prefix: 'reverse', start:1, end: 7, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'lungepunch', 
              frames: this.anims.generateFrameNames('player', { prefix: 'lungepunch', start:1, end: 11, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

          this.anims.create(
            { key: 'flip', 
              frames: this.anims.generateFrameNames('player', { prefix: 'flip', start:1, end: 12, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

      this.time.delayedCall(3000, this.startBegin, [], this);
  }

  update(){
      if(this.gamepad){
        this.gamepadmanager.checkForGamePad(this.whiteplayer);
      }
      else
        this.keyboardmanager.checkKeyboardInput(this.whiteplayer);
  }

  render() {}

}
