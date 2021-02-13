import Phaser from 'phaser';

//assets
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';

import spectators1 from '../assets/spectators1.png';
import spectators2 from '../assets/spectators2.png';
import spectators3 from '../assets/spectators3.png';
import spectators4 from '../assets/spectators4.png';
import spectators5 from '../assets/spectators5.png';
import spectators6 from '../assets/spectators6.png';

import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';

import AIplayerPNG from '../assets/red/spritesheet.png';
import AIplayerJSON from '../assets/red/sprites.json';

import board1 from '../assets/backgrounds/boards/board1.png';
import board2 from '../assets/backgrounds/boards/board2.png';
import board3 from '../assets/backgrounds/boards/board3.png';
import board4 from '../assets/backgrounds/boards/board4.png';
import board5 from '../assets/backgrounds/boards/board5.png';
import board6 from '../assets/backgrounds/boards/board6.png';

import border from '../assets/backgrounds/start/dojo-border.png';

import AnimationManager from '../controllers/animationManager';
import CollisionSystem from '../controllers/collisionSystem';
const boardConfig = require('../config/boards.json');
var utils = require('../helpers/util');

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
    this.board = null;
    this.hasSpectators = false;
    this.spectators = [];
  }

  preload() {
    this.load.image('board1', board1);
    this.load.image('board2', board2);
    this.load.image('board3', board3);
    this.load.image('board4', board4);
    this.load.image('board5', board5);
    this.load.image('board6', board6);

    this.load.atlas('player', playerPNG, playerJSON);
    this.load.atlas('aiplayer', AIplayerPNG, AIplayerJSON);

    this.load.image('ground', ground);
    this.load.image('spectators1', spectators1);
    this.load.image('spectators2', spectators2);
    this.load.image('spectators3', spectators3);
    this.load.image('spectators4', spectators4);
    this.load.image('spectators5', spectators5);
    this.load.image('spectators6', spectators6);
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

  getRandomBoard(){
    return "board"+(utils.getRandomInt(6)+1);
  }

  addComponents(){
    const center = { width: WIDTH * 0.5, height: HEIGHT * 0.5 };
    // this.board = this.getRandomBoard();
    this.board = 5;
    var index = "board"+(this.board+1);
    this.groundOffset = boardConfig[index].groundOffset;

    this.add.image(center.width, center.height, index);

    this.hasSpectators=boardConfig[index].hasSpectators;
    if(this.hasSpectators){
      this.spectators = [
        this.add.image(center.width, center.height+280, 'spectators1'),
        this.add.image(center.width, center.height+280, 'spectators2'),
        this.add.image(center.width, center.height+280, 'spectators3'),
        this.add.image(center.width, center.height+280, 'spectators4'),
        this.add.image(center.width, center.height+280, 'spectators5'),
        this.add.image(center.width, center.height+280, 'spectators6')
      ];
      this.spectators.forEach(spectator => {
        spectator.visible = false;
      });
      console.log(this.spectators);
    }
  }

  animateSpectators(){
    //50% of the time look ahead, the other 50% select 2 through 6 images
    this.spectators[this.board].visible = false;
    if(utils.getRandomInt(2)==1){
      this.board = 0;
    }else{
      this.board = utils.getRandomInt(5);
    }
    this.spectators[this.board].visible = true;
    console.log("chagning image")
    this.time.delayedCall(3000, this.animateSpectators, [], this);

  }

  addBorders(){
    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
  }

  update(){
  }
}
