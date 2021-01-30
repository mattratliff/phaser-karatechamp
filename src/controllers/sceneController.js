import Phaser, { Game, Input } from 'phaser';

//assets
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';

import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';

import vasePNG from '../assets/objects/spritesheet.png';
import vaseJSON from '../assets/objects/sprites.json';

import border from '../assets/backgrounds/start/dojo-border.png';

//game objects
import Player from '../gameobjects/player';
import ChallengeObject from '../gameobjects/challengeobject';

import AnimationManager from '../controllers/animationManager';
import CollisionSystem from '../controllers/collisionSystem';
import GameSessionManager from './gameSessionManager';

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
    super({ key: scenekey });
    this.gamepad = null;
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.atlas('vase', vasePNG, vaseJSON);

    this.load.image('ground', ground);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
  }

  create() {
    this.GameSessionManager = new GameSessionManager();

    this.collisionSystem = new CollisionSystem(this.matter);

    this.animationManager = new AnimationManager(this.anims);
    this.animationManager.addAnimations();

    this.checkForGamePad();

    this.addComponents();
  }

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

    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    var cat1 = this.matter.world.nextCategory();
    
    this.player = new Player({ scene: this, startx: center.width, starty: HEIGHT-200, readyx: center.width-100 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.animated = true;
    
    console.log("starty ", HEIGHT-200);
    // this.playerwalking = true;

    var cat2 = this.matter.world.nextCategory();

    this.vase = new ChallengeObject({ scene: this, x: RIGHTEDGE, y: center.height+80, object: 'vase' });
    this.vase.setCollisionGroup(-1);
    this.vase.setIgnoreGravity(true);
    this.vase.animated = false;

    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
    this.player.startwalking = true;
    this.vase.active = true;
  }

  update(){
    // console.log((this.player.x + this.player.width) - this.vase.x);

    
    if(this.vase.x - this.player.body.bounds.max.x < 40 && this.vase.x > this.player.x && this.vase.velocity != 0){
      if(this.collisionSystem.checkCollision(this.player, this.vase)){
        console.log("playing vase animation");
        this.vase.play('vase', true);
        this.vase.velocity = 0;
        this.time.delayedCall(2000, this.vase.deactivate(RIGHTEDGE), [], this);
      }
    }
    if(this.player.x >= this.vase.body.bounds.min.x && this.vase.velocity != 0){
      this.player.inputmanager.gutKick();
      this.player.inputmanager.pause = true;
      this.vase.play('vase', true);
      this.vase.velocity = 0;
      this.time.delayedCall(2000, this.vase.deactivate(RIGHTEDGE), [], this);
    }

      this.vase.update();

    this.player.update();
    
  }

  render() {}

}
