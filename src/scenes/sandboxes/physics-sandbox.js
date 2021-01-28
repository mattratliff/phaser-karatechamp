import constants from '../../config/constants';
import sounds from '../../assets/sounds/processed';
import vase from '../../assets/vase.png';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import SceneController from '../../controllers/sceneController';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class PhysicsSandbox extends SceneController {
  constructor() {
    super({ scenekey: 'PhysicsSandbox' });
    this.gamepad = null;
    // this.playerwalking = false;
  }

  preload() {
    super.preload();

    this.load.image('practiceboard', practiceboard);
    this.load.image('vase', vase);
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
    super.addComponents();
  }

  update(){
    super.update();
  }

  render() {}

}
