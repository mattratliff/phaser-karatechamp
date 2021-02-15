import constants from '../config/constants';
// import beachscene from '../assets/backgrounds/game/beach_background.png';
import SceneController from '../controllers/sceneController';

import Player from '../gameobjects/player';
import AIPlayer from '../gameobjects/aiplayer';


const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class SinglePlayer extends SceneController {
  constructor() {
    super({ scenekey: 'SinglePlayer' });
    this.gamepad = null;
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
  }

  addComponents(){
    super.addComponents();

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-this.groundOffset);

    this.player = new Player({ scene: this, startx: LEFTEDGE+20, starty: HEIGHT-200, readyx: center.width-150 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.startwalking = true;

    super.player = this.player;

    this.aiplayer = new AIPlayer({ scene: this, startx: RIGHTEDGE-20, starty: HEIGHT-200, readyx: center.width+150 });
    this.aiplayer.startwalking = true;

    super.addBorders();  
    super.updateGameObjects();  
    // super.setAIPlayer(this.aiplayer);
  }
  

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    this.player.update();
    this.aiplayer.update();
    
    super.update();
  }

  render() {}
}
