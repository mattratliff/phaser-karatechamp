import Phaser from 'phaser';
// import person from '../assets/backgrounds/start/person.png';
// import platform from '../assets/backgrounds/start/platform.png';
// import bull from '../assets/backgrounds/start/bull-sprites.png';
// import border from '../assets/backgrounds/start/border.png';
// import leaderboard from '../assets/backgrounds/start/leaderboard.png';
// import sounds from '../assets/sounds/processed';

import controllers from '../assets/backgrounds/game/controllers.png';
import practiceboard from '../assets/backgrounds/gameboard1.png';
import constants from '../config/constants';

import arrowup from '../assets/backgrounds/game/practice/arrow-up.png';
import arrowdown from '../assets/backgrounds/game/practice/arrow-down.png';
import arrowleft from '../assets/backgrounds/game/practice/arrow-left.png';
import arrowright from '../assets/backgrounds/game/practice/arrow-right.png';

import yellowarrowup from '../assets/backgrounds/game/practice/yellow-arrow-up.png';
import yellowarrowdown from '../assets/backgrounds/game/practice/yellow-arrow-down.png';
import yellowarrowleft from '../assets/backgrounds/game/practice/yellow-arrow-left.png';
import yellowarrowright from '../assets/backgrounds/game/practice/yellow-arrow-right.png';

import spectatorwhite from '../assets/backgrounds/game/practice/spectator-white.png';
import spectatorred from '../assets/backgrounds/game/practice/spectator-red.png';

import RedPlayer from '../sprites/player/redplayer';
import WhitePlayer from '../sprites/player/whiteplayer';

import ground from '../assets/backgrounds/game/practice/practice-ground.png';
import redplayersheet from '../sprites/player/redplayer/player.png';
import whiteplayersheet from '../sprites/player/whiteplayer/player.png';
import begin from '../assets/begin.png';

// import playerred from '../assets/player/red/ready.png';
// import playerwhite from '../assets/player/white/ready.png';
import sounds from '../assets/sounds/processed';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
 var cursors;

export default class PracticeBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'PracticeBoard' });
  }

  preloadBackground() {
    this.load.image('practiceboard', practiceboard);
  }

  createBackground() {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    this.add
      .image(center.width, center.height, 'practiceboard')
      .setScale(assetScale);
      this.add
  }

  preload() {
    cursors = this.input.keyboard.createCursorKeys();
    this.preloadBackground();

    this.load.image('controllers', controllers);
    
    this.load.image('arrowup', arrowup);
    this.load.image('arrowdown', arrowdown);
    this.load.image('arrowleft', arrowleft);
    this.load.image('arrowright', arrowright);

    this.load.image('yellowarrowup', yellowarrowup);
    this.load.image('yellowarrowdown', yellowarrowdown);
    this.load.image('yellowarrowleft', yellowarrowleft);
    this.load.image('yellowarrowright', yellowarrowright);

    this.load.image('spectatorwhite', spectatorwhite);
    this.load.image('spectatorred', spectatorred);

    this.load.image('ground', ground);
    
    this.load.image('begin', begin);

    this.load.spritesheet('whiteplayer',
    whiteplayersheet,
    { frameWidth: 130, frameHeight: 139 }
    );
  }
  

  create() {
    this.createBackground();
    this.addComponents();
    
    this.practiceText = this.add
    .text(center.width-305, center.height-235, 'PRACTICE', {
      fill: '#ffffff',
      font: `${22 * SCALE}pt Silom`
    });

    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(650, center.height+160, 'ground');
    this.whiteplayer = new WhitePlayer({scene: this, x: center.width - 100, y: center.height+80 });
    
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('whiteplayer', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'standstill',
      frames: [ { key: 'whiteplayer', frame: 0 } ],
      frameRate: 20
    });

    this.physics.add.collider(this.whiteplayer, this.grounds);
    this.time.delayedCall(3000, this.startBegin, [], this);
  }

  addComponents(){
    this.addPracticeControllersComponent();
    this.addSpectators();
  }

  addSpectators(){
        //add spectators
        this.whitespectator1 = this.add
        .image(center.width-250, center.height-30, 'spectatorwhite')
        .setScale(assetScale);
        this.whitespectator2 = this.add
        .image(center.width-265, center.height+60, 'spectatorwhite')
        .setScale(assetScale);
        this.whitespectator3 = this.add
        .image(center.width-280, center.height+150, 'spectatorwhite')
        .setScale(assetScale);
    
        this.redspectator1 = this.add
        .image(center.width+250, center.height-30, 'spectatorred')
        .setScale(assetScale);
        this.redspectator2 = this.add
        .image(center.width+265, center.height+60, 'spectatorred')
        .setScale(assetScale);
        this.redspectator3 = this.add
        .image(center.width+280, center.height+150, 'spectatorred')
        .setScale(assetScale);
  }
  //show practice controllers at bottom of screen
  addPracticeControllersComponent(){
    this.classWatching = this.add
    .image(center.width, center.height+278, 'controllers')
    .setScale(assetScale);

    //left arrows
    this.leftarrowup = this.add.image(center.width-58, center.height+282, 'arrowup');
    this.leftarrowdown = this.add.image(center.width-58, center.height+345, 'arrowdown');
    this.leftarrowleft = this.add.image(center.width-97, center.height+315, 'arrowleft');
    this.leftarrowright = this.add.image(center.width-20, center.height+315, 'arrowright');

    //right arrows
    this.rightarrowup = this.add.image(center.width+82, center.height+282, 'arrowup');
    this.rightarrowdown = this.add.image(center.width+82, center.height+345, 'arrowdown');
    this.rightarrowleft = this.add.image(center.width+45, center.height+315, 'arrowleft');
    this.rightarrowright = this.add.image(center.width+120, center.height+315, 'arrowright');

    //left arrows
    this.yellowleftarrowup = this.add.image(center.width-58, center.height+282, 'yellowarrowup');
    this.yellowleftarrowdown = this.add.image(center.width-58, center.height+345, 'yellowarrowdown');
    this.yellowleftarrowleft = this.add.image(center.width-97, center.height+315, 'yellowarrowleft');
    this.yellowleftarrowright = this.add.image(center.width-20, center.height+315, 'yellowarrowright');

    //right arrows
    this.yellowrightarrowup = this.add.image(center.width+82, center.height+282, 'yellowarrowup');
    this.yellowrightarrowdown = this.add.image(center.width+82, center.height+345, 'yellowarrowdown');
    this.yellowrightarrowleft = this.add.image(center.width+45, center.height+315, 'yellowarrowleft');
    this.yellowrightarrowright = this.add.image(center.width+120, center.height+315, 'yellowarrowright');

    this.yellowleftarrowup.visible = false;
    this.yellowleftarrowdown.visible = false;
    this.yellowleftarrowleft.visible = false;
    this.yellowleftarrowright.visible = false;

    this.yellowrightarrowup.visible = false;
    this.yellowrightarrowdown.visible = false;
    this.yellowrightarrowleft.visible = false;
    this.yellowrightarrowright.visible = false;
  }

  startPractice() {
      this.movementText = this.add
      .text(center.width-305, center.height+290, 'MOVE FORWARD', {
        fill: '#ffffff',
        font: `${14 * SCALE}pt Silom`
      });
      this.rightarrowright.visible = false;
      this.yellowrightarrowright.visible = true;
  }

  startBegin(){
    sounds.play('Begin');
    this.begin = this.add.image(center.width+50, center.height-200, 'begin');
    this.time.delayedCall(2000, this.endBegin, [], this);
  }
  endBegin(){
    this.begin.visible = false;
    this.startPractice();
  }

  update() {
      const cursors = this.input.keyboard.createCursorKeys();
      var RIGHTEDGE = center.width + 150;
      var LEFTEDGE = center.width - 150;
  
        if (cursors.left.isDown) {
          //show walking left animation
          this.whiteplayer.anims.play('move', true);
          console.log("X = "+this.whiteplayer.x);
          console.log(LEFTEDGE);
          if(this.whiteplayer.x >= LEFTEDGE)
          this.whiteplayer.x -= 1;
  
        } else if (cursors.right.isDown) {
          //show walking right animaataion
          this.whiteplayer.anims.play('move', true);
          if(this.whiteplayer.x <= RIGHTEDGE)
          this.whiteplayer.x += 1;
        }
  
        if (this.hasNoInput()) {
          //show still aniimation
          console.log("standing still");
          this.whiteplayer.anims.play('standstill');
          this.whiteplayer.setVelocity(0);
        }

  }

  hasNoInput(){
    return !cursors.left.isDown && !cursors.right.isDown;
  }

  render() {}

}
