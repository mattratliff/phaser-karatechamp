import Phaser, { Game, Input } from 'phaser';

//assets
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';

import border from '../assets/backgrounds/start/dojo-border.png';

//game objects
import Player from '../gameobjects/player';

import AnimationManager from '../controllers/animationManager';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

/**
 * SceneController
 * Base class for different boards
 * Handles scene management, transition, etc..
 */
export default class AnimationSandbox extends Phaser.Scene {
  constructor({scenekey}) {
      console.log("scene = "+scenekey);
    super({ key: scenekey });
    this.gamepad = null;
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.image('ground', ground);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.addComponents();

    this.animationManager = new AnimationManager(this.anims);
    this.animationManager.addAnimations();

    this.checkForGamePad();
  }

  checkForGamePad(){
    if(this.input.gamepad.total == 0){
      this.input.gamepad.once('connected', function (pad) {
        this.gamepad = pad;
    }, this);
   }
  }

  addComponents(){
    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.player = new Player({ scene: this, x: center.width - 100, y: HEIGHT-200 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);

    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
  }

  update(){
    this.player.update();
  }

  render() {}

}
