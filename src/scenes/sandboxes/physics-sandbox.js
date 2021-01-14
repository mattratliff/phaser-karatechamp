import Phaser, { Game, Input } from 'phaser';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import constants from '../../config/constants';
import ground from '../../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../../assets/white/spritesheet.png';
import playerJSON from '../../assets/white/sprites.json';
import sounds from '../../assets/sounds/processed';
import border from '../../assets/backgrounds/start/dojo-border.png';
import vase from '../../assets/vase.png';

import KeyboardManager from '../../input/keyboardmanager';
import GamepadManager from '../../input/gamepadManager';
import AnimationManager from '../../input/animationManager';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class PhysicsSandbox extends Phaser.Scene {
  constructor() {
    super({ key: 'PhysicsSandbox' });
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.image('practiceboard', practiceboard);
    this.load.image('ground', ground);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
    this.load.image('vase', vase);
  }

  create() {
    this.addComponents();

    this.animationManager = new AnimationManager(this.anims);
    this.animationManager.addAnimations();

    this.gamepadmanager = new GamepadManager(this);
    this.gamepadmanager.init(this.player);
    this.gamepadmanager.initStates();

    this.keyboardmanager = new KeyboardManager(this);
    this.keyboardmanager.init(this.player);
    this.keyboardmanager.initStates();

    this.checkForGamePad();

    sounds.play('Begin');

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'PHYSICS SANDBOX', {
      fill: '#000000',
      font: `${22 * SCALE}pt Silom`
    });
  }

  checkForGamePad(){
    if(this.input.gamepad.total == 0){
      this.input.gamepad.once('connected', function (pad) {
        this.gamepad = pad;
    }, this);
   }
  }

  addComponents(){
    const center = { width: WIDTH * 0.5, height: HEIGHT * 0.5 };

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    var cat1 = this.matter.world.nextCategory();
    
    this.player = this.matter.add.sprite(center.width - 100, HEIGHT-200, 'player');
    this.player.setCollisionCategory(cat1);

    this.challengeObjects = [];
    this.challengeObjects.push(this.matter.add.image(RIGHTEDGE, center.height-15, 'vase'));
    this.challengeObjects[0].setCollisionCategory(cat1);

    this.add.image(LEFTEDGE, center.height, 'leftborder');
    this.add.image(RIGHTEDGE, center.height, 'rightborder');
  }

  update(){
    if(this.gamepad)
      this.gamepadmanager.checkForGamePad(this.player);
    else
      this.keyboardmanager.checkKeyboardInput(this.player);
  }

  render() {}

}
