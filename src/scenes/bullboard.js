import constants from '../config/constants';
import SceneController from './sceneController';
import Bull from '../gameobjects/bull';
import bullPNG from '../assets/bull/bull-spritesheet.png';
import bullJSON from '../assets/bull/bull.json';

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

export default class BullBoard extends SceneController {
  constructor() {
    super('BullBoard');
    this.gamepad = null;
  }

  preload() {
    console.log("preloading")
    super.preload();

    this.numberBulls = 1;   //the number of bulls on the challenge

    this.load.atlas('bull', bullPNG, bullJSON);
  }

  create() {
    super.create();
  }

  addComponents(){
    super.addComponents();

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.player = new Player(this, LEFTEDGE+20, HEIGHT-200, center.width-150);
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.startwalking = true;

    this.bull = new Bull(this, RIGHTEDGE, HEIGHT-200, 'bull');
    this.bull.play('bull', true);
    this.bull.leftedge = LEFTEDGE;
    this.bull.rightedge = RIGHTEDGE;
    this.bull.activate();
    
    super.addBorders();
    
    this.practiceText = this.add
    .text(center.width-150, center.height+300, 'CONQUER THE BULL', {
      fill: '#000000',
      font: `${26 * SCALE}pt Silom`
    });
    super.useTimer = false;
  }

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    this.player.update();
    if(this.player.ready)
        this.bull.update();

    //only check for collision if player and bull are close to each other
    if(Math.abs(this.player.x - this.bull.x) < 200){
    var collision = this.collisionManager.checkForSpriteToSpriteCollision(this.player, this.bull);
    if(collision && collision.collided){
      console.log('collided')
        
        if(collision.hit){
          this.bull.play('bullfall', true);
          this.bull.velocity = 0;
          if(this.numberBulls > 0)
            this.time.delayedCall(8000, this.getNextBull, [], this);
          else
            this.time.delayedCall(8000, this.completeChallenge, [], this);
        }
        else{
          this.player.inputmanager.facePunch();
          this.player.inputmanager.pause = true;
          this.numberBulls--;
        }
      }
    }
  }
  
  getNextBull(){
    console.log('getting next bull')
    this.numberBulls--;
    //bull will randomly come from either direction
    this.bull.play('bull', true);
    this.direction = utils.getRandomInt(2);
    console.log("DIRECTION = ",this.direction);
    this.bull.reset(this.direction, (this.direction==utils.Direction.LEFT ? RIGHTEDGE : LEFTEDGE));
  }

  completeChallenge(){
    //talley up points
    // this.time.delayedCall(3000, this.player.inputmanager.win, [], this);
    console.log("challenge complete")
    this.scene.stop('BullBoard');
    this.scene.start('BullBoard');
  }

  render() {}
}
