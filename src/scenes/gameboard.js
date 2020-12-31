import Phaser from 'phaser';
// import person from '../assets/backgrounds/start/person.png';
// import platform from '../assets/backgrounds/start/platform.png';
// import bull from '../assets/backgrounds/start/bull-sprites.png';
// import border from '../assets/backgrounds/start/border.png';
// import leaderboard from '../assets/backgrounds/start/leaderboard.png';
// import sounds from '../assets/sounds/processed';
import gameboard from '../assets/backgrounds/gameboard1.png';
import constants from '../config/constants';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
//  var cursors;

export default class GameBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'GameBoard' });
  }

  preloadBackground() {
    this.load.image('gameboard', gameboard);
  }

  createBackground(scale) {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    this.add
      .image(center.width, center.height, 'gameboard')
      .setScale(scale);
      this.add
  }

  preload() {
    // cursors = this.input.keyboard.createCursorKeys();
    // this.load.image('person-1', person);
    // this.load.image('person-2', person);
    // this.load.image('platform', platform);
    // this.load.spritesheet('bull',
    //   bull,
    //   { frameWidth: 90, frameHeight: 61 }
    //   );
    // this.load.image('leftborder', border);
    // this.load.image('rightborder', border);
    this.preloadBackground();
  }

  create() {
    this.createBackground(assetScale);
    // this.input.on('pointermove', this.activateMainMenu, this);
    // this.addAnimations();
    // this.createBorder(assetScale);
  }
//   activateMainMenu(){
//     this.scene.switch('Start');
//     sounds.stop('Main_Menu');
//   }
  update() {
    //animations (player and bull jumps around)
    const RIGHTEDGE = center.width+143;
    const LEFTEDGE = center.width-143;
    // this.bounce();
    
    // this.bull.setVelocityX(-40);

    //edge detection
    // if (this.bull.x < LEFTEDGE-30) {
    //   this.bull.x = RIGHTEDGE;
    // }

  }
  render() {}

//   bounce(){
//     const RIGHTEDGE = center.width+143;
//     const LEFTEDGE = center.width-143;
//     const TOP = center.height-102;
//     const BOTTOM = center.height-45;

//     this.people.forEach(( person ) => {
    
//       //edge detection
//       if (person.x < LEFTEDGE) {
//         person.x = RIGHTEDGE;
//       } else {
//         person.x = person.x - person.speed;
//       }

//     person.y = person.y + person.direction;

//         if(person.y > BOTTOM){
//             person.y = BOTTOM;
//             person.direction = -1;
//         }      
//         if(person.y < TOP+10){
//             person.y = TOP+10;
//             person.direction = 1;
//         } 
//     });
//   }

//   addAnimations(){
//       this.people = [];

//       var person = this.add
//       .image(
//         center.width+80,
//         center.height - 102,
//         'person-1'
//       )
//       .setScale(assetScale * .3);
//       person.speed = 1.2;
//       person.direction = 1;
//       person.gravity = 2;
//       this.people.push(person);


//       var person = this.add
//       .image(
//         center.width-40,
//         center.height - 70,
//         'person-2'
//       )
//       .setScale(assetScale * .3);
//       person.speed = 0.8;
//       person.direction = 1;
    
//       this.people.push(person);

//       this.anims.create({
//         key: 'run',
//         frames: this.anims.generateFrameNumbers('bull', { frames: [ 0, 1 ] }),
//         frameRate: 10,
//         repeat: -1
//     });

//     this.platforms = this.physics.add.staticGroup();
//     this.platforms.create(270, 125, 'platform');
//     this.bull = this.physics.add.sprite(center.width+175, center.height-55, 'bull');
    
//     this.physics.add.collider(this.bull, this.platforms);
//     this.bull.play('run');
//   }
}
