import Phaser from 'phaser';
import leaderboard from '../assets/backgrounds/start/leaderboard.png';
import mainmenu from '../assets/backgrounds/start/mainmenu.png';
import hand from '../assets/backgrounds/start/hand.png';
import audio from '../assets/backgrounds/start/audio.png';
import noaudio from '../assets/backgrounds/start/no_audio.png';
import sounds from '../assets/sounds/processed';
import constants from '../config/constants';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
 var cursors;
 var counter = 0;

export default class Start extends Phaser.Scene {
  constructor() {
    super({ key: 'Start' });
    this.musicplaying = false;
    this.showleaderboard = false;
  }

  preloadBackground() {
    this.load.image('mainmenu', mainmenu);
  }

  createBackground(scale) {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    this.add
      .image(center.width, center.height, 'mainmenu')
      .setScale(scale);
  }

  preload() {
    cursors = this.input.keyboard.createCursorKeys();
    this.preloadBackground();
    this.load.image('hand', hand);
    this.load.image('audio', audio);
    this.load.image('noaudio', noaudio);
  }
  create() {
    this.createBackground(assetScale);
    this.addComponents();
    this.makeText();
    this.inputHandler();
    this.playMusic();
  }
  startGame(){
    this.scene.start('Game');
  }
  inputHandler(){
    this.input.on('pointerdown', this.stopMusic, this);
    this.input.on('pointermove', this.resetTimer, this);
    this.input.keyboard.on('keydown_ENTER', this.startGame, this);
  }
  addComponents(){
    this.hand = this.add
    .image(center.width-35, center.height+35, 'hand')
    .setScale(assetScale * 0.5);
    this.audio = this.add
      .image(center.width+110, center.height-100, 'audio')
      .setScale(assetScale * .05);
    this.audio.visible = true;
    this.noaudio = this.add
      .image(center.width+110, center.height-100, 'noaudio')
      .setScale(assetScale * .75);
    this.noaudio.visible = false;
  }
  resetTimer(){
    if(this.showleaderboard){
      this.showleaderboard = false;
    }
    counter = 0;
  }
  update() {
    //if more than 20 seconds on main menu then render leaderboard... on mouse move on leaderboard navigate back to main menu
    counter++;
    if(counter > 100){
      // this.scene.stop('Start');
      this.scene.switch('LeaderBoard');
      this.showleaderboard = true;
      counter = 0;
    }
    if (cursors.up.isDown)
    {
      this.hand.setY(center.height+35);
      counter=0;
    }
    if (cursors.down.isDown)
    {
      this.hand.setY(center.height+50);
      counter=0;
    }
  }
  render() {}

  playMusic = () => {
    this.title_track = sounds.play('Main_Menu');
    sounds.loop(true, this.title_track);
    sounds.volume(0.6, this.title_track);
  };

  stopMusic() {
    if(this.musicplaying){
      sounds.volume(0, this.title_track);
      this.audio.visible = false;
      this.noaudio.visible = true;
    }
    else{
      sounds.volume(0.6, this.title_track);
      this.audio.visible = true;
      this.noaudio.visible = false;
    }
    this.musicplaying = !this.musicplaying;
  }

  makeText() {
    this.titleText = this.add
      .text(center.width, center.height * 0.30, 'Choose 1 or 2 players', {
        fill: '#ffffff',
        font: `${10 * SCALE}px Rajdhani`
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0);

    this.textTween = this.tweens.add({
      targets: this.titleText,
      alpha: {
        value: 1,
        delay: 2000,
        duration: 5000
      }
    });

    this.textTween = this.tweens.add({
      targets: [this.startText],
      alpha: {
        value: 1,
        delay: 7000,
        duration: 5000
      }
    });
  }
}
