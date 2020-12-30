import Phaser from 'phaser';
import person from '../assets/backgrounds/start/person.png';
import bull from '../assets/backgrounds/start/bull-1.png';
import border from '../assets/backgrounds/start/border.png';
import leaderboard from '../assets/backgrounds/start/leaderboard.png';
import sounds from '../assets/sounds/processed';
import constants from '../config/constants';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
 var cursors;

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoard' });
  }

  preloadBackground() {
    this.load.image('leaderboard', leaderboard);
  }

  createBackground(scale) {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    this.add
      .image(center.width, center.height, 'leaderboard')
      .setScale(scale);
      this.add
  }
  createBorder(scale){
    this.add
    .image(center.width-173, center.height-72, 'leftborder')
    .setScale(scale);
    this.add
    .image(center.width+173, center.height-72, 'rightborder')
    .setScale(scale);
  }

  preload() {
    cursors = this.input.keyboard.createCursorKeys();
    this.load.image('person-1', person);
    this.load.image('person-2', person);
    this.load.image('bull', bull);
    this.load.image('leftborder', border);
    this.load.image('rightborder', border);
    this.preloadBackground();
  }

  create() {
    this.createBackground(assetScale);
    this.input.on('pointermove', this.activateMainMenu, this);
    this.addAnimations();
    this.createBorder(assetScale);
  }
  activateMainMenu(){
    this.scene.switch('Start');
    sounds.stop('Main_Menu');
  }
  update() {
    //animations (player and bull jumps around)
    this.bounce();
    this.moveBull();
  }
  render() {}

  bounce(){
    const RIGHTEDGE = center.width+143;
    const LEFTEDGE = center.width-143;
    const TOP = center.height-102;
    const BOTTOM = center.height-45;

    this.people.forEach(( person ) => {
    
      //edge detection
      if (person.x < LEFTEDGE) {
        person.x = RIGHTEDGE;
      } else {
        person.x = person.x - person.speed;
      }

    person.y = person.y + person.direction;

        if(person.y > BOTTOM){
            person.y = BOTTOM;
            person.direction = -1;
        }      
        if(person.y < TOP+10){
            person.y = TOP+10;
            person.direction = 1;
        } 
    });
  }

  moveBull(){
    const RIGHTEDGE = center.width+143;
    const LEFTEDGE = center.width-143;
    if (this.bull.x < LEFTEDGE) {
        this.bull.x = RIGHTEDGE;
      } else {
        this.bull.x = this.bull.x - this.bull.speed;
      }
  }

  addAnimations(){
      this.people = [];

      var person = this.add
      .image(
        center.width+80,
        center.height - 102,
        'person-1'
      )
      .setScale(assetScale * .3);
      person.speed = 1.2;
      person.direction = 1;
      person.gravity = 2;
      this.people.push(person);


      var person = this.add
      .image(
        center.width-40,
        center.height - 70,
        'person-2'
      )
      .setScale(assetScale * .3);
      person.speed = 0.8;
      person.direction = 1;
    
      this.people.push(person);

      this.bull = this.add
      .image(
          center.width+170,
          center.height-50,
          'bull'
      )
      .setScale(assetScale * .3);
      this.bull.speed = 0.7;
  }
}
