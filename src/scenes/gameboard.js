import Phaser from 'phaser';
// import person from '../assets/backgrounds/start/person.png';
// import platform from '../assets/backgrounds/start/platform.png';
// import bull from '../assets/backgrounds/start/bull-sprites.png';
// import border from '../assets/backgrounds/start/border.png';
// import leaderboard from '../assets/backgrounds/start/leaderboard.png';
// import sounds from '../assets/sounds/processed';
import classWatching from '../assets/backgrounds/game/class-watching.png';
import controllers from '../assets/backgrounds/game/controllers.png';
import gameboard from '../assets/backgrounds/gameboard1.png';
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

export default class GameBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'GameBoard' });
  }

  preloadBackground() {
    this.load.image('gameboard', gameboard);
  }

  createBackground() {
    const center = {
      width: WIDTH * 0.5,
      height: HEIGHT * 0.5
    };
    this.add
      .image(center.width, center.height, 'gameboard')
      .setScale(assetScale);
      this.add
  }

  preload() {
    cursors = this.input.keyboard.createCursorKeys();
    this.preloadBackground();
    this.load.image('classWatching', classWatching);
  
    this.load.image('ground', ground);
    this.load.spritesheet('redplayer',
    redplayersheet,
    { frameWidth: 130, frameHeight: 139 }
    );
    
    this.load.spritesheet('whiteplayer',
    whiteplayersheet,
    { frameWidth: 130, frameHeight: 139 }
    );
  }
  

  create() {
    this.createBackground();
    this.addComponents();
    this.makeText();
    this.grounds = this.physics.add.staticGroup();
    
    this.grounds.create(650, center.height+130, 'ground');
    this.redplayer = new RedPlayer({scene: this, x: center.width + 165, y: center.height+50 });
    this.whiteplayer = new WhitePlayer({scene: this, x: center.width - 165, y: center.height+50 });
    
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
    this.physics.add.collider(this.redplayer, this.grounds);

    this.time.delayedCall(3000, this.startMatch, [], this);
  }

  startBegin(){
    sounds.play('Begin');
    console.log("start bein");
    this.begin = this.add.image(center.width, center.height, 'begin');
    this.begin.visible = true;
    this.time.delayedCall(3000, this.endBegin, [], this);
  }
  endBegin(){
      console.log("end begin");
    this.begin.visible = false;
  }

  addComponents(){
    this.classWatching = this.add
    .image(center.width, center.height+278, 'classWatching')
    .setScale(assetScale);
  }

  makeText() {
    // this.practiceText = this.add
    //   .text(center.width-305, center.height-235, 'PRACTICE', {
    //     fill: '#ffffff',
    //     font: `${22 * SCALE}pt Silom`
    //   });

      // this.movementText = this.add
      // .text(center.width-305, center.height+290, 'REVERSE PUNCH', {
      //   fill: '#ffffff',
      //   font: `${14 * SCALE}pt Silom`
      // });
  }

  update() {
      //player animation
      // this.player.update();

      const cursors = this.input.keyboard.createCursorKeys();
      var RIGHTEDGE = center.width + 210;
      var LEFTEDGE = center.width - 210;
  
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
