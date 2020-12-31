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

export default class SceneTemplate extends Phaser.Scene {
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
    // this.playMusic();
  }
  activateMainMenu(){
  }

  playMusic = () => {
    // this.backgroundMusic = sounds.play('Main_Menu');
    // sounds.loop(true, this.backgroundMusic);
    // sounds.volume(0.6, this.backgroundMusic);
  };

  update() {
  }
  render() {}
}
