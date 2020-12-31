import Phaser from 'phaser';

import dojoboard from '../assets/backgrounds/start/dojoboard.png';
import sounds from '../assets/sounds/processed';
import constants from '../config/constants';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.5
  };

  const assetScale = SCALE;

export default class DojoBoaarad extends Phaser.Scene {
  constructor() {
    super({ key: 'DojoBoard' });
  }

  preloadBackground() {
    this.load.image('dojoboard', dojoboard);
  }

  createBackground(scale) {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    console.log("adding boarad");
    this.add
      .image(center.width, center.height, 'dojoboard')
      .setScale(scale);
  }

  preload() {
      this.preloadBackground();
  }

  create() {
    this.createBackground(assetScale);
    // this.input.on('pointermove', this.activateMainMenu, this);
    // this.addAnimations();
    // this.createBorder(assetScale);
    this.playMusic();
  }
  activateMainMenu(){
    // this.scene.switch('Start');
    // sounds.stop('Main_Menu');
  }

  playMusic = () => {
    this.backgroundMusic = sounds.play('Dojo_Music');
    sounds.loop(false, this.backgroundMusic);
    sounds.volume(0.6, this.backgroundMusic);
  };

  update() {
    // //animations (player and bull jumps around)
    // const RIGHTEDGE = center.width+400;
    // const LEFTEDGE = center.width-400;
    // this.bounce();
    
    // this.man.setVelocityX(40);

    // //edge detection
    // if (this.bull.x < LEFTEDGE) {
    //   this.bull.x = RIGHTEDGE;
    // }

  }
  render() {}

//   animaateMan(){
//     this.anims.create({
//         key: 'walk',
//         frames: this.anims.generateFrameNumbers('man', { frames: [ 0, 1 ] }),
//         frameRate: 10,
//         repeat: -1
//     });
//     this.platforms = this.physics.add.staticGroup();
//     this.platforms.create(650, 243, 'ground');
//     this.man = this.physics.add.sprite(center.width+375, center.height-190, 'man');
    
//     this.physics.add.collider(this.man, this.platforms);
//     this.man.play('run');
//   }
}
