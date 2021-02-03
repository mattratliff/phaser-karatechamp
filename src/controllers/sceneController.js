import Phaser from 'phaser';

//assets
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';

import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';
import Player from '../gameobjects/player';

// import AIplayerPNG from '../assets/red/spritesheet.png';
// import AIplayerJSON from '../assets/red/sprites.json';
// import AIPlayer from '../gameobjects/aiplayer';

import border from '../assets/backgrounds/start/dojo-border.png';

import AnimationManager from '../controllers/animationManager';
import CollisionSystem from '../controllers/collisionSystem';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

/**
 * SceneController
 * Base class for different boards
 * Handles scene management, transition, etc..
 */
export default class AnimationSandbox extends Phaser.Scene {
  constructor({scenekey}) {
    super({ key: scenekey });
    this.gamepad = null;
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    // this.load.atlas('aiplayer', AIplayerPNG, AIplayerJSON);

    this.load.image('ground', ground);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.collisionSystem = new CollisionSystem(this.matter, this);

    this.animationManager = new AnimationManager(this.anims);
    this.animationManager.addAnimations();

    this.checkForGamePad();

    this.addComponents();
  }

  render() {}

  checkForGamePad(){
    if(this.input.gamepad.total == 0){
      this.input.gamepad.once('connected', function (pad) {
        this.gamepad = pad;
    }, this);
   }
  }

  addComponents(){
    const center = { width: WIDTH * 0.5, height: HEIGHT * 0.5 };

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.player = new Player({ scene: this, startx: LEFTEDGE+75, starty: HEIGHT-200, readyx: center.width-150 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.animated = true;
    this.player.startwalking = true;

    // this.AIplayer = new AIPlayer({ scene: this, startx: RIGHTEDGE-75, starty: HEIGHT-200, readyx: center.width+150 });
    // this.AIplayer.setCollisionGroup(-1);
    // this.AIplayer.animated = true;
    // this.AIplayer.startwalking = true;

    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
  }

  // registerDropVasesForDebug(){
  //   this.input.on('pointerdown', function (pointer) {  
  //       this.vase.x = pointer.x;
  //       this.vase.y = this.getVasePosition();
  //       this.vase.velocity = -3;
  //       this.vase.active = true;
  //   }, this);
  // }

  update(){
    this.player.update();
    // this.AIplayer.update();
  }
}
