import constants from '../config/constants';
import beachscene from '../assets/backgrounds/game/beach_background.png';
import SceneController from '../controllers/sceneController';

import shorelinePNG from '../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../assets/backgrounds/game/shore.json';

import Bull from '../gameobjects/bull';

import bullPNG from '../assets/bull/bull-spritesheet.png';
import bullJSON from '../assets/bull/bull.json';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class ChallengeBoard2 extends SceneController {
  constructor() {
    super({ scenekey: 'ChallengeBoard2' });
    this.gamepad = null;
  }

  preload() {
    super.preload();

    this.load.atlas('bull', bullPNG, bullJSON);
    this.load.image('beachscene', beachscene);
    this.load.atlas('shoreline', shorelinePNG, shorelineJSON);
  }

  create() {
    super.create();
  }

  addComponents(){
    this.add.image(center.width, center.height, 'beachscene').setScale(assetScale);
    this.shoreline = this.matter.add.sprite(center.width, center.height-75, 'shoreline');
    this.shoreline.setIgnoreGravity(true);
    this.shoreline.setCollisionGroup(-1);
    this.shoreline.play('shore', true);

    this.bull = new Bull({ scene: this, x: RIGHTEDGE, y: HEIGHT-200, object: 'bull' });
    this.bull.setCollisionGroup(-1);
    this.bull.setIgnoreGravity(true);
    this.bull.play('bull', true);
    this.bull.activate();
    
    this.practiceText = this.add
    .text(center.width-150, center.height-300, 'CHALLENGE BOARD', {
      fill: '#000000',
      font: `${26 * SCALE}pt Silom`
    });

    super.addComponents();
  }

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    super.update();
    if(this.bull.x > LEFTEDGE && this.player.ready)
        this.bull.update();

    var collision = this.collisionSystem.checkBullCollision(this.player, this.bull);
    if(collision && collision.collided){
        //player hit bull
        if(collision.hit){
          this.bull.play('bullfall', true);
          this.time.delayedCall(2000, this.player.inputmanager.win, [], this);
          this.time.delayedCall(5000, this.completeChallenge, [], this);
          this.bull.velocity = 0;
        }
        //bull hit player
        else{
          this.player.inputmanager.facePunch();
          this.player.inputmanager.pause = true;
          this.time.delayedCall(5000, this.completeChallenge, [], this);
        }

      }
  }
  
  completeChallenge(){
    this.scene.switch('Start');
  }

  render() {}
}
