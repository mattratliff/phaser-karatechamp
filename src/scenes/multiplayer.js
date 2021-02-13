import constants from '../config/constants';
import beachscene from '../assets/backgrounds/game/beach_background.png';
import SceneController from '../controllers/sceneController';

import shorelinePNG from '../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../assets/backgrounds/game/shore.json';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class Multiplayer extends SceneController {
  constructor() {
    super({ scenekey: 'Multiplayer' });
    this.gamepad = null;
  }

  preload() {
    super.preload();

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

    super.addComponents();
  }
  

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    super.update();
  }

  render() {}
}
