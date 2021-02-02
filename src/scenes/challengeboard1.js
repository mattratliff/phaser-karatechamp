import constants from '../config/constants';
import beachscene from '../assets/backgrounds/game/beach_background.png';
import SceneController from '../controllers/sceneController';

import shorelinePNG from '../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../assets/backgrounds/game/shore.json';

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

export default class ChallengeBoard1 extends SceneController {
  constructor() {
    super({ scenekey: 'ChallengeBoard1' });
    this.gamepad = null;
  }

  preload() {
    super.preload();

    this.load.atlas('vase', vasePNG, vaseJSON);
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

    this.vase = new ChallengeObject({ scene: this, x: RIGHTEDGE, y: this.getVasePosition(), object: 'vase' });
    this.vase.setCollisionGroup(-1);
    this.vase.setIgnoreGravity(true);
    this.vase.animated = false;

    super.addComponents();

    this.registerDropVasesForDebug();
  }

  /**
   * Randomly choose a y coordinate to start the vase
   */
  getVasePosition(){
    return center.height + 120 - (Math.random() * 130);
  }

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    super.update();
    if(this.player.ready)
        this.vase.update();
    this.collisionSystem.checkVaseCollision(this.player, this.vase);
  }

  render() {}
}
