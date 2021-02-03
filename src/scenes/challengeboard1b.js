import constants from '../config/constants';
import beachscene from '../assets/backgrounds/game/beach_background.png';
import SceneController from '../controllers/sceneController';

import shorelinePNG from '../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../assets/backgrounds/game/shore.json';
// import practiceboard from '../assets/backgrounds/gameboard1.png';

import vasePNG from '../assets/objects/spritesheet.png';
import vaseJSON from '../assets/objects/sprites.json';

import ChallengeObject from '../gameobjects/challengeobject';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class ChallengeBoard1b extends SceneController {
  constructor() {
    super({ scenekey: 'ChallengeBoard1b' });
    console.log('board 1b');
    this.gamepad = null;
    this.numbervases = 5;
  }

  preload() {
    super.preload();

    this.load.atlas('vase', vasePNG, vaseJSON);
    // this.load.image('practiceboard', practiceboard);
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

    // this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    this.vase = new ChallengeObject({ scene: this, x: RIGHTEDGE, y: this.getVasePosition(), object: 'vase', rightedge: RIGHTEDGE });
    this.vase.setCollisionGroup(-1);
    this.vase.setIgnoreGravity(true);
    this.vase.animated = false;

    this.practiceText = this.add
    .text(center.width-220, center.height-300, 'FLYING OBJECT CHALLENGE', {
      fill: '#000000',
      font: `${26 * SCALE}pt Silom`
    });

    this.practiceText = this.add
    .text(center.width-230, center.height+300, 'Click where you want the vase to begin', {
      fill: '#000000',
      font: `${16 * SCALE}pt Silom`
    });

    super.addComponents();

    this.registerDropVasesForDebug();
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
    super.update();
    if(this.player.ready && this.vase.x > LEFTEDGE)
        this.vase.update();

    var collision = this.collisionSystem.checkForSpriteToBodyCollision(this.player, this.vase);
    if(collision && collision.collided){

      console.log("exploding vase");
      this.vase.play('vase', true);
      this.vase.velocity = 0;
      this.time.delayedCall(300, this.resetVase, [], this);

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
