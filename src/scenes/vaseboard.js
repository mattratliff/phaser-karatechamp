import constants from '../config/constants';

import SceneController from './sceneController';

import beachscene from '../assets/backgrounds/game/beach_background.png';

import practiceboard from '../assets/backgrounds/boards/board5.png';

import shorelinePNG from '../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../assets/backgrounds/game/shore.json';

import vasePNG from '../assets/objects/spritesheet.png';
import vaseJSON from '../assets/objects/sprites.json';

import ChallengeObject from '../gameobjects/challengeobject';

import Player from '../gameobjects/player';
var utils = require('../helpers/util');

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class VaseBoard extends SceneController {
  constructor() {
    super('VaseBoard');
    this.gamepad = null;
    this.numbervases = 5;
    this.board = utils.getRandomInt(2);
  }

  preload() {
    super.preload();

    this.load.atlas('vase', vasePNG, vaseJSON);
  }

  create() {
    super.create();
  }

  addComponents(){

    super.addComponents();

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-180);

    this.player = new Player(this, LEFTEDGE+20, HEIGHT-200, center.width-150 );
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.startwalking = true;
    this.player.chopping = false;

    this.vase = new ChallengeObject(this, RIGHTEDGE, this.getVasePosition(), 'vase', RIGHTEDGE );
    this.vase.setCollisionGroup(-1);
    this.vase.setIgnoreGravity(true);
    this.vase.animated = false;

    this.practiceText = this.add
    .text(center.width-230, center.height+300, 'Click where you want the vase to start', {
      fill: '#000000',
      font: `${16 * SCALE}pt Silom`
    });

    this.registerDropVasesForDebug();

    super.addBorders();
  }

    registerDropVasesForDebug(){
    this.input.on('pointerdown', function (pointer) {  
        this.vase.x = pointer.x;
        // this.vase.y = this.getVasePosition();
        this.vase.y = pointer.y;
        this.vase.velocity = -3;
        this.vase.active = true;
    }, this);
  }

  /**
   * Randomly choose a y coordinate to start the vase
   */
  getVasePosition(){
    return center.height + 120 - (Math.random() * 130);
  }

  resetVase(){
    this.vase.x = RIGHTEDGE;
  }
  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    if(!this.player || !this.vase)
    return;

    this.player.update();
    if(this.player.ready && this.vase.x > LEFTEDGE)
        this.vase.update();

    var collision = this.collisionManager.checkForSpriteToSpriteCollision(this.player, this.vase);
    if(collision && collision.collided){

      console.log("exploding vase");
      this.vase.play('vase', true);
      this.vase.velocity = 0;
      this.time.delayedCall(500, this.resetVase, [], this);

      //vase hit player
      if(!collision.hit){
        if(collision.fixture == "body-fixture")
          this.player.play('gutkick');
        else if(collision.fixture == "head-fixture")
          this.player.play('facepunch');
        else if(collision.fixture == "leg-fixture")
          this.player.play('fall');

        // this.time.delayedCall(2000, this.player.inputmanager.sweat, [], this);
      }
      else{
        this.numbervases--;
        if(this.numbervases==0){
          this.player.inputmanager.pause = true;
          this.time.delayedCall(500, this.player.inputmanager.win, [], this);
        }
      }

    }

  }

  render() {}
}
