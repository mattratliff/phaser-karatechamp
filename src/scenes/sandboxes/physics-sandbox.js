import constants from '../../config/constants';
import sounds from '../../assets/sounds/processed';
import vase from '../../assets/vase.png';
import beachscene from '../../assets/backgrounds/game/beach_background.png';
import SceneController from '../../controllers/sceneController';

import shorelinePNG from '../../assets/backgrounds/game/shore-spritesheet.png';
import shorelineJSON from '../../assets/backgrounds/game/shore.json';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;

export default class PhysicsSandbox extends SceneController {
  constructor() {
    super({ scenekey: 'PhysicsSandbox' });
    this.gamepad = null;
    // this.playerwalking = false;
  }

  preload() {
    super.preload();

    this.load.image('beachscene', beachscene);
    this.load.image('vase', vase);
    this.load.atlas('shoreline', shorelinePNG, shorelineJSON);
  }

  create() {
    super.create();
    
    sounds.play('Begin');
    this.GameSessionManager.createSession();

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'PHYSICS SANDBOX', {
      fill: '#000000',
      font: `${22 * SCALE}pt Silom`
    });

    this.sendvaseflying = true;
  }

  addComponents(){
    this.add.image(center.width, center.height, 'beachscene').setScale(assetScale);
    this.shoreline = this.matter.add.sprite(center.width, center.height-75, 'shoreline');
    this.shoreline.setIgnoreGravity(true);
    this.shoreline.setCollisionGroup(-1);
    this.shoreline.play('shore', true);

    super.addComponents();
  }

  update(){
    super.update();
  }

  render() {}

}
