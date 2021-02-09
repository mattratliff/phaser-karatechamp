import constants from '../config/constants';
import SceneController from '../controllers/sceneController';
import background from '../assets/backgrounds/game/stadium1.png';

// import brickPNG from '../assets/bricks/brickspritesheet.png';
// import brickJSON from '../assets/bricks/bricks.json';
import brickboard from '../assets/bricks/brickboard.png';
import horizontal from '../../processed images/white/WHITE-COMBINED/horizontal2.png';
import indicator from '../assets/backgrounds/game/joystick-indicator.png';
import Brick from '../gameobjects/bricks';
import Player from '../gameobjects/player';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;

export default class BrickBoard2 extends SceneController {
  constructor() {
    super({ scenekey: 'BrickBoard2' });
    this.gamepad = null;
    this.numbervases = 5;
  }

  preload() {
    super.preload();
    this.load.image('background', background);
    this.load.image('brickboard', brickboard);
    this.load.image('indicator', indicator);
    // this.load.image('horizontal', horizontal);
    // this.load.atlas('brick', brickPNG, brickJSON);
  }

  create() {
    super.create();
  }

  addComponents(){
    this.add.image(center.width, center.height, 'background').setScale(assetScale);

    this.add.image(center.width+150, center.height+100, 'brickboard');

    this.add.image(center.width+200, center.height+250, 'indicator');

    // this.add.image(center.width-100, center.height+80, 'horizontal');

    super.addComponents();    
    
    this.player = new Player({ scene: this, startx: center.width-200, starty: center.height+80, readyx: center.width-150, frame: 'horizontal1' });
    this.player.setGamePad(this.gamepad);
    this.player.setIgnoreGravity(true);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.animated = true;
    this.player.breaking = true;

    // this.bricks = new Brick({ scene: this, x: center.width, y: center.height+150, object: 'brick' });
    // this.bricks.setScale(0.5);
    // this.bricks.setIgnoreGravity(true);
    // this.bricks.setCollisionGroup(-1);
    // this.bricks.breaking = false;
    

    this.practiceText = this.add
    .text(center.width-20, center.height-253, '30', {
      fill: '#ffffff',
      font: `${20 * SCALE}pt Silom`
    });
  }

  update(){
    super.update();
    
    // if(this.player.chopped){
    //   var distance = this.player.y - this.bricks.body.bounds.min.y;
    //     if(!this.bricks.breaking){
    //       if(distance < 0)this.bricks.play('brick1', true);
    //       if(distance > 0 && distance < 3)this.bricks.play('brick2', true);
    //       if(distance > 3 && distance < 9)this.bricks.play('brick3', true);
    //       if(distance > 9 && distance < 12)this.bricks.play('brick4', true);
    //       if(distance > 12 && distance < 15)this.bricks.play('brick5', true);
    //       if(distance > 15 && distance < 18)this.bricks.play('brick6', true);
    //       if(distance > 18 && distance < 21)this.bricks.play('brick7', true);
    //       if(distance > 21 && distance < 24)this.bricks.play('brick8', true);
    //       if(distance > 24 && distance < 27)this.bricks.play('brick9', true);
    //       if(distance > 27 && distance < 30)this.bricks.play('brick10', true);
          
    //       this.time.delayedCall(4000, this.checkSuccess(distance), [], this);

    //       this.bricks.breaking = true;
    //     }
    // }
    // else
      this.player.update();
  }

  // checkSuccess(distance){
  //   if(distance > 21){
  //     this.player.play('happy', true);
  //   }
  //   this.time.delayedCall(8000, this.changeScene, [], this);
  // }

  changeScene(){
    this.scene.stop('BrickBoard');
    this.scene.start('BrickBoard');
  }
  render() {}
}
