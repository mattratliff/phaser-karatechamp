import Phaser, { Game, Input } from 'phaser';

//assets
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';

import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';

import vasePNG from '../assets/objects/spritesheet.png';
import vaseJSON from '../assets/objects/sprites.json';

// import backgroundPNG from '../assets/backgrounds/game/background-spritesheet.png';
// import backgroundJSON from '../assets/backgrounds/game/backgrounds.json';

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
    // this.load.atlas('background', backgroundPNG, backgroudnJSON);)

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

    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);
    
    this.player = new Player({ scene: this, startx: LEFTEDGE, starty: HEIGHT-200, readyx: center.width-100 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.animated = true;
    
    this.playerwalking = true;

    this.vase = new ChallengeObject({ scene: this, x: RIGHTEDGE, y: HEIGHT - 200, object: 'vase' });
    this.vase.setCollisionGroup(-1);
    this.vase.setIgnoreGravity(true);
    this.vase.animated = false;

    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
    this.player.startwalking = true;

    this.registerDropVasesForDebug();
  }

  registerDropVasesForDebug(){
    this.input.on('pointerdown', function (pointer) {  
        this.vase.x = pointer.x;
        this.vase.y = HEIGHT - 200;
        this.vase.velocity = -2;
        this.vase.active = true;
    }, this);
  }

  getVasePosition(){
    return center.height + 120 - (Math.random() * 130);
  }
  
  update(){
    this.vase.update();
    this.player.update();
    this.checkForCollision();
  }

  checkForCollision(){
    if(this.vase.x - this.player.body.bounds.max.x < 40 && this.vase.x > this.player.x && this.vase.velocity != 0){
      var collision = this.collisionSystem.checkCollision(this.player, this.vase);
      if(collision.collided){
        //player hit vase
        if(collision.hit){
          this.vase.play('vase', true);
          this.vase.velocity = 0;
          this.time.delayedCall(2000, this.vase.deactivate(RIGHTEDGE), [], this);
        }
        //vase hit player
        else{
          if(collision.fixture == "body-fixture")
            this.player.inputmanager.gutKick();
          else if(collision.fixture == "head-fixture")
            this.player.inputmanager.facePunch();
          else if(collision.fixture == "leg-fixture")
            this.player.inputmanager.lowKick();
          
          this.player.inputmanager.pause = true;
          this.vase.play('vase', true);
          this.vase.velocity = 0;
          this.time.delayedCall(2000, this.vase.deactivate(RIGHTEDGE), [], this); 
        }

      }
    }
  }
  
}
