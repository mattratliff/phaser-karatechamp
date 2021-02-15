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

import teacherPNG from '../assets/teacher/spritesheet.png';
import teacherJSON from '../assets/teacher/sprites.json';

import board1 from '../assets/backgrounds/boards/board1.png';
import board2 from '../assets/backgrounds/boards/board2.png';
import board3 from '../assets/backgrounds/boards/board3.png';
import board4 from '../assets/backgrounds/boards/board4.png';
import board5 from '../assets/backgrounds/boards/board5.png';
import board6 from '../assets/backgrounds/boards/board6.png';

import spectatorwhite from '../assets/backgrounds/game/practice/spectator-white.png';
import spectatorred from '../assets/backgrounds/game/practice/spectator-red.png';

import border from '../assets/backgrounds/start/dojo-border.png';

import AnimationManager from '../managers/animationManager';
import CollisionManager from '../managers/collisionmanager';

import Teacher from '../gameobjects/teacher';
import SessionManager from '../managers/sessionManager';

import {begin, stop, good, verygood, fullpoint, halfpoint, white} from '../helpers/balloons';

const boardConfig = require('../config/boards.json');
var utils = require('../helpers/util');

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const GameState = {
  NEW: "New",
  INPROGRESS: "In Progress",
  COMPLETE: "Completed"
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
    super({ key: scenekey });
    this.gamepad = null;
    this.board = null;
    this.hasSpectators = false;
    this.player = null;
    this.boardConfig = null;
    this.timerstarted = false;
    this.spectators = [];
    this.useTimer = null;
    this.timerAmount = 0;
  }

  preload() {
    this.load.image('begin', begin);
    this.load.image('stop', stop);
    this.load.image('good', good);
    this.load.image('verygood', verygood);

    this.load.image('board1', board1);
    this.load.image('board2', board2);
    this.load.image('board3', board3);
    this.load.image('board4', board4);
    this.load.image('board5', board5);
    this.load.image('board6', board6);

    this.load.atlas('player', playerPNG, playerJSON);
    this.load.atlas('aiplayer', AIplayerPNG, AIplayerJSON);
    this.load.atlas('teacher', teacherPNG, teacherJSON);

    this.load.image('ground', ground);

    this.load.image('spectators1', spectators1);
    this.load.image('spectators2', spectators2);
    this.load.image('spectators3', spectators3);
    this.load.image('spectators4', spectators4);
    this.load.image('spectators5', spectators5);
    this.load.image('spectators6', spectators6);

    this.load.image('spectatorwhite', spectatorwhite);
    this.load.image('spectatorred', spectatorred);

    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.collisionManager = new CollisionManager(this.matter, this);

    this.animationManager = new AnimationManager(this.anims);
    this.animationManager.addAnimations();

    this.sessionManager = new SessionManager(this);
    this.sessionManager.setCallbackOnComplete(this.completeMatch);

    this.sessionManager.setState(GameState.NEW);

    this.checkForGamePad();

    this.addComponents();
  }

  render() {}

  addSideLineSpectators(){
    this.whitespectator1 = this.add.image(center.width-250, center.height-30, 'spectatorwhite').setScale(assetScale);
    this.whitespectator2 = this.add.image(center.width-265, center.height+60, 'spectatorwhite').setScale(assetScale);

    this.redspectator1 = this.add.image(center.width+250, center.height-30, 'spectatorred').setScale(assetScale);
    this.redspectator2 = this.add.image(center.width+265, center.height+60, 'spectatorred').setScale(assetScale);
  }

  checkForGamePad(){
    if(this.input.gamepad.total == 0){
      this.input.gamepad.once('connected', function (pad) {
        this.gamepad = pad;
    }, this);
   }
  }

  getRandomBoard(){
    return utils.getRandomInt(5)+1;
  }

  // setAIPlayer(aiplayer){
  //   this.aiManager.setPlayer(aiplayer);
  // }
  /**
   * 
   * Callback from game manager once match is complete for cleanup
   */
  completeMatch(teacher, player){
    teacher.stopMatch();
    player.inputmanager.pause = true;

    //TODO: judge will have to award points here based on something
  }

  addComponents(){
    const center = { width: WIDTH * 0.5, height: HEIGHT * 0.5 };

    this.boardConfig = this.createBoard();
    this.useTimer = this.boardConfig.useTimer;
    this.timerAmount = this.boardConfig.timerAmount;

    this.sessionManager.timerAmount = this.timerAmount;
    this.sessionManager.setTimerLocation(this.boardConfig.timerOffset);

    var teacherOffsetX = this.boardConfig.teacherOffset.x;
    var teacherOffsetY = this.boardConfig.teacherOffset.y;

    this.hasSpectators=this.boardConfig.hasSpectators;
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

      if(this.hasSpectators && this.board!=null){
        this.animateSpectators();
      }

      if(this.boardConfig.hasSideLineSpectators)
        this.addSideLineSpectators();
    }

    this.sessionManager.createTimer(center.width-15, center.height-245, SCALE);

    this.teacher = new Teacher({ scene: this, startx: center.width+teacherOffsetX, starty: center.height+teacherOffsetY });
    this.teacher.addComponents();
  }

  updateGameObjects(){
    this.sessionManager.setGameObjects(this.teacher, this.player, null);
  }

  createBoard(){
    this.board = this.getRandomBoard();
    var index = "board"+(this.board+1);
    this.groundOffset = boardConfig[index].groundOffset;
    this.add.image(center.width, center.height, index);
    return boardConfig[index];
  }

  animateSpectators(){
    this.spectators[this.board].visible = false;
    if(utils.getRandomInt(2)==1){
      this.board = 0;
    }else{
      this.board = utils.getRandomInt(5);
    }
    this.spectators[this.board].visible = true;
    this.time.delayedCall(3000, this.animateSpectators, [], this);
  }

  addBorders(){
    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
  }

  update(){
    if(this.player.ready){
      if(!this.timerstarted){
        this.timerstarted = true;
        this.teacher.playBegin();
        this.sessionManager.setState(GameState.INPROGRESS);
        if(this.useTimer)
          this.time.delayedCall(3000, this.sessionManager.startTimer(), [], this);
      }
      this.teacher.update();
    }
  }
}
