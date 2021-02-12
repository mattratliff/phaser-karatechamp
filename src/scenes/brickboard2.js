import constants from '../config/constants';
import SceneController from '../controllers/sceneController';
import background from '../assets/backgrounds/game/stadium1.png';

import brickPNG from '../assets/bricks/brickspritesheet.png';
import brickJSON from '../assets/bricks/bricks.json';
import brickboard from '../assets/bricks/brickboard.png';
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
    this.load.atlas('brick', brickPNG, brickJSON);
  }

  create() {
    super.create();
  }

  addComponents(){
    this.add.image(center.width, center.height, 'background').setScale(assetScale);

    this.add.image(center.width+150, center.height+100, 'brickboard');

    this.add.image(center.width+200, center.height+250, 'indicator');

    super.addComponents();    
    
    this.player = new Player({ scene: this, startx: center.width-200, starty: center.height+80, readyx: center.width-150, frame: 'horizontal1' });
    this.player.setGamePad(this.gamepad);
    this.player.setIgnoreGravity(true);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.animated = true;
    this.player.breaking = true;

    this.bricks = new Brick({ scene: this, x: center.width+120, y: center.height+55, object: 'brick', frame: 'horizontalbrick1' });
    this.bricks.setIgnoreGravity(true);
    this.bricks.setCollisionGroup(-1);
    this.bricks.breaking = false;

    this.practiceText = this.add
    .text(center.width-20, center.height-253, '30', {
      fill: '#ffffff',
      font: `${20 * SCALE}pt Silom`
    });
  }

  update(){
    // super.update();
    
    if(this.player.broke){
      var distance = this.player.body.bounds.max.x - this.bricks.body.bounds.min.x;

        if(!this.bricks.breaking){
          console.log('distance = ', distance);
          if(distance < 0)this.bricks.play('horizontalbrick1', true);
          if(distance > 0 && distance < 5)this.bricks.play('horizontalbrick2', true);
          if(distance > 5 && distance < 10)this.bricks.play('horizontalbrick3', true);
          if(distance > 10 && distance < 25)this.bricks.play('horizontalbrick4', true);
          if(distance > 15 && distance < 30)this.bricks.play('horizontalbrick5', true);
          if(distance > 20 && distance < 35)this.bricks.play('horizontalbrick6', true);
          if(distance > 25 && distance < 30)this.bricks.play('horizontalbrick7', true);
          if(distance > 30 && distance < 35)this.bricks.play('horizontalbrick8', true);
          if(distance > 35 && distance < 40)this.bricks.play('horizontalbrick9', true);
          if(distance > 40)this.bricks.play('horizontalbrick10', true);
          
          this.time.delayedCall(4000, this.checkSuccess(distance), [], this);

          this.bricks.breaking = true;
        }
    }
    else
      this.player.update();
  }

  checkSuccess(distance){
    // if(distance > 21){
    //   this.player.play('happy', true);
    // }
    this.time.delayedCall(5000, this.changeScene, [], this);
  }

  changeScene(){
    this.scene.stop('BrickBoard2');
    this.scene.start('BrickBoard2');
  }
  render() {}
}