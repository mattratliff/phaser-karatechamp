import Phaser from 'phaser';
import mainmenu from '../assets/backgrounds/start/mainmenu.png';
import testmenu from '../assets/backgrounds/start/testmenu.png';
import hand from '../assets/backgrounds/start/hand.png';
import audio from '../assets/backgrounds/start/audio.png';
import noaudio from '../assets/backgrounds/start/no-audio.png';
import sounds from '../assets/sounds/processed';
import constants from '../config/constants';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const timeBeforeShowingLanding = 1000;

 var cursors;
 var counter = 0;
 var selection = 1;

export default class Start extends Phaser.Scene {
  constructor() {
    super({ key: 'Start' });
    this.musicplaying = true;
    this.showleaderboard = false;
    this.selection = 0;
  }

  preloadBackground() {
    this.load.image('testmenu', testmenu);
  }

  createBackground(scale) {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    this.add
      .image(center.width, center.height, 'testmenu')
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
    sounds.stop(this.title_track);
    this.scene.stop('Start');

    if(this.selection == 0)
      this.scene.start('PhysicsSandbox');
    else if(this.selection == 1)
      this.scene.start('AnimationSandbox');
    else if(this.selection == 2)
      this.scene.start('AISandbox');
    else if(this.selection == 3)
      this.scene.start('MultiplayerSandbox');
  }
  inputHandler(){
    this.input.on('pointerdown', this.stopMusic, this);
    this.input.on('pointermove', this.resetTimer, this);
    this.input.keyboard.on('keydown-ENTER', this.startGame, this);
  }
  addComponents(){
    var audiox = center.width+300;
    var audioy = center.height-280;
    
    //pointer for choosing 1 or 2 players
    this.hand = this.add
    .image(center.width-160, center.height+10, 'hand')
    .setScale(assetScale);

    //audio icons
    this.audio = this.add
      .image(audiox, audioy, 'audio')
      .setScale(assetScale * .8);
    this.audio.visible = true;
    this.noaudio = this.add
      .image(audiox, audioy, 'noaudio')
      .setScale(assetScale * .8);
    this.noaudio.visible = false;
  }
  resetTimer(){
    if(this.showleaderboard){
      this.showleaderboard = false;
    }
    counter = 0;
  }
  update() {
    counter++;
    
    //transition to leaderboard if no input detected
    if(counter > timeBeforeShowingLanding){
      this.scene.switch('LeaderBoard');
      this.showleaderboard = true;
      counter = 0;
    }

    //input handling
    if(this.input.keyboard.checkDown(cursors.up, 250))
    {
      if(this.selection > 0){
        this.hand.y = this.hand.y - 35;
        this.selection--;
      }
    }
    if(this.input.keyboard.checkDown(cursors.down, 250))
    {
      if(this.selection < 3){
      this.hand.y = this.hand.y + 35;
      this.selection++;
      }
    }
  }
  render() {}

  playMusic = () => {
    // this.backgroundMusic = sounds.play('Main_Menu');
    sounds.loop(true, this.backgroundMusic);
    sounds.volume(0.6, this.backgroundMusic);
  };

  stopMusic() {
    if(this.musicplaying){
      sounds.volume(0, this.backgroundMusic);
      this.audio.visible = false;
      this.noaudio.visible = true;
    }
    else{
      sounds.volume(0.6, this.backgroundMusic);
      this.audio.visible = true;
      this.noaudio.visible = false;
    }
    this.musicplaying = !this.musicplaying;
  }

  makeText() {
    this.titleText = this.add
      .text(center.width, center.height * 0.20, 'Choose 1 or 2 players', {
        fill: '#ffffff',
        font: `${20 * SCALE}px Rajdhani`
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
