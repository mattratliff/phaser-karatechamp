import constants from '../../config/constants';
import sounds from '../../assets/sounds/processed';
import vase from '../../assets/vase.png';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import Player from '../../gameobjects/player';
import ChallengeObject from '../../gameobjects/ChallengeObject';
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

    this.matter.world.on('collisionstart', (event) => {
      event.pairs.forEach(pair => {                                  
          const { bodyA, bodyB  } = pair;
          console.log("obj1 = "+JSON.stringify(bodyA.force));
          console.log("obj2 = "+JSON.stringify(bodyB.force));
      });
  });

  }

  addComponents(){
    const center = { width: WIDTH * 0.5, height: HEIGHT * 0.5 };

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    var cat1 = this.matter.world.nextCategory();

    
    this.player = new Player({ scene: this, startx: center.width - 300, starty: HEIGHT-200, readyx: center.width-100 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionCategory(cat1);
    
    // this.playerwalking = true;

    this.challengeObject = new ChallengeObject({ scene: this, x: RIGHTEDGE, y: center.height+50, object: 'vase' });
    this.challengeObject.setIgnoreGravity(true);
    this.challengeObject.setCollisionCategory(cat1);

    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
    this.player.startwalking = true;
  }

  update(){
    this.player.update();

    // if(this.sendvaseflying)
      // this.challengeObject.update();
  }

  render() {}

}
