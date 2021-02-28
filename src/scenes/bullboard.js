import constants from '../config/constants';
import beachscene from '../assets/backgrounds/game/beach_background.png';
import SceneController from './sceneController';

import shorelinePNG from '../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../assets/backgrounds/game/shore.json';

import Bull from '../gameobjects/bull';
import bullPNG from '../assets/bull/bull-spritesheet.png';
import bullJSON from '../assets/bull/bull.json';

import Player from '../gameobjects/player';

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
    this.bull.activate();
    
    super.addBorders();
    
    // this.practiceText = this.add
    // .text(center.width-150, center.height-300, 'CONQUER THE BULL', {
    //   fill: '#000000',
    //   font: `${26 * SCALE}pt Silom`
    // });
    
  }

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    this.player.update();
    if(this.bull.x > LEFTEDGE && this.player.ready)
        this.bull.update();

    var collision = this.collisionManager.checkForSpriteToSpriteCollision(this.player, this.bull);
    if(collision && collision.collided){
        //player hit bull
        if(collision.hit){
          this.bull.play('bullfall', true);
          this.time.delayedCall(3000, this.player.inputmanager.win, [], this);
          this.bull.velocity = 0;
        }
        //bull hit player
        else{
          this.player.inputmanager.facePunch();
          this.player.inputmanager.pause = true;
        }
        this.time.delayedCall(8000, this.completeChallenge, [], this);
      }
  }
  
  completeChallenge(){
    this.scene.stop('BullBoard');
    this.scene.start('BullBoard');
  }

  render() {}
}
