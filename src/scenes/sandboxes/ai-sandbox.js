import SceneController from '../../controllers/sceneController';
import sounds from '../../assets/sounds/processed';
import constants from '../../config/constants';
import practiceboard from '../../assets/backgrounds/gameboard1.png';

const { WIDTH, HEIGHT, SCALE } = constants;
const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};
const assetScale = SCALE;

export default class AISandbox extends SceneController {
  constructor() {
    super({ scenekey: 'AISandbox' });
  }

  preload() { 
    super.preload(); 
    this.load.image('practiceboard', practiceboard);
  }

  create() { 
    super.create(); 
    sounds.play('Begin');

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'AI SANDBOX', {
      fill: '#000000',
      font: `${22 * assetScale}pt Silom`
    });
  }
  
  addComponents(){
    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);
    super.addComponents();
  }

  update(){ super.update(); }

  render() {}

}
