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

import WhitePlayer from '../gameobjects/player/whiteplayer';

import ground from '../assets/backgrounds/game/practice/practice-ground.png';
import whiteplayersheet from '../gameobjects/player/whiteplayer/player.png';
import begin from '../assets/begin.png';
import good from '../assets/good.png';
import line from '../assets/line.png';

import sounds from '../assets/sounds/processed';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 150;
const LEFTEDGE = center.width - 150;
 var cursors;

export default class TrainingBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'TrainingBoard' });
    this.practiceStarted = false;
    this.gameState = 0;
    console.log("setting gamesate to 0");
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
    this.load.image('good', good);
    this.load.image('line', line);

    this.load.spritesheet('whiteplayer',
    whiteplayersheet,
    { frameWidth: 130, frameHeight: 237 }
    );
  }
  

  create() {
    const cursors = this.input.keyboard.createCursorKeys();
    const WASD = this.input.keyboard.addKeys('W,A,S,D');
    const { W, A, S, D } = WASD;
    const dirUp = W;
    const dirDown = S;
    const dirLeft = A;
    const dirRight = D;

    this.locomotion = {
        dirUp,
        dirDown,
        dirLeft,
        dirRight
      };

    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(650, center.height+160, 'ground');
    this.createBackground();
    this.addComponents();
    
    this.practiceText = this.add
    .text(center.width-305, center.height-235, 'PRACTICE', {
      fill: '#ffffff',
      font: `${22 * SCALE}pt Silom`
    });

    this.movehereText = this.add
    .text(center.width, center.height+80, 'Move Here', {
      fill: '#000000',
      font: `${14 * SCALE}pt Silom`
    });
    this.movehereText.visible = false;

    this.whiteplayer = new WhitePlayer({scene: this, x: center.width - 100, y: center.height+30 });

    //MOVE FORWARD/BACKWARD
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('whiteplayer', { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    //SQUAT
    this.anims.create({
        key: 'squat',
        frames: [ { key: 'whiteplayer', frame: 5 } ],
        frameRate: 8,
        repeat: -1
      });

    //JUMP
    this.anims.create({
        key: 'jump',
        frames: [ { key: 'whiteplayer', frame: 7 } ],
        frameRate: 8,
        repeat: -1
      });

    //STAND STILL
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
    this.line = this.add.image(center.width, center.height+120, 'line').setScale(assetScale * .5);
    this.line.visible = false;
    this.movementText = this.add
    .text(center.width-305, center.height+290, "", {
      fill: '#ffffff',
      font: `${14 * SCALE}pt Silom`
    });
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


  //can move these states to behaviors.JSON file
  startPractice() {
    this.practiceStarted = true; 
    this.gameState = 0;
    console.log("setting gamesate to 0");
    this.completeStep = false;

  }

  updateStatusText(status){
    this.movementText.setText(status);
  }

  startGood(){
    // sounds.play('Begin');
    this.good = this.add.image(center.width+50, center.height-200, 'good');
    this.time.delayedCall(2000, this.endGood, [], this);      
  }
  endGood(){
    this.good.visible = false;
    console.log("setting complete step = false");
    this.completeStep = false;   //reset to get ready for next step
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
      if(!this.practiceStarted)
        return;

      this.checkPracticeStep();
  
        if (this.hasNoInput()) {
          //show still aniimation
          this.whiteplayer.anims.play('standstill');
          this.whiteplayer.setVelocity(0);
        }
  }

  checkPracticeStep(){
      if(!this.completeStep){
          console.log(this.gameState);
          switch(this.gameState){
              case 0:
                  this.checkMoveForward();
                  break;
              case 1:
                  this.checkMoveBackward();
                  break;
              case 2:
                  this.checkSquat();
                  break;
              case 3:
                  this.checkJump();
                  break;
          }
      }
  }

  checkMoveForward(){
    this.updateStatusText("MOVE FORWARD");
    this.leftarrowright.visible = false;
    this.yellowleftarrowright.visible = true;
    this.line.visible = true;
    this.movehereText.visible = true;
    const { dirUp, dirDown, dirLeft, dirRight } = this.locomotion;

    if (dirRight.isDown) {
        this.whiteplayer.anims.play('move', true); 
        if(this.whiteplayer.x <= RIGHTEDGE)
            this.whiteplayer.x += 1;
    }

      //if moved pasted the threshold then complete step
    if(this.whiteplayer.x >= this.line.x-20){
        this.completeStep = true;
        this.leftarrowright.visible = true;
        this.yellowleftarrowright.visible = false;
        this.startGood();
        this.gameState = 1;
        this.line.visible = false;
        this.movehereText.visible = false;
    }
  }

  checkMoveBackward(){
    this.updateStatusText("MOVE BACKWARD");
    this.leftarrowleft.visible = false;
    this.yellowleftarrowleft.visible = true;
    this.line.x = center.width-150;
    this.movehereText.x = center.width-250;
    this.line.visible = true;
    this.movehereText.visible = true;
    const { dirUp, dirDown, dirLeft, dirRight } = this.locomotion;

    if (dirRight.isDown) {
        this.whiteplayer.anims.play('move', true); 
        if(this.whiteplayer.x <= RIGHTEDGE)
            this.whiteplayer.x += 1;
    }
    else if (dirLeft.isDown) {
        this.whiteplayer.anims.play('move', true);
        if(this.whiteplayer.x >= LEFTEDGE)
            this.whiteplayer.x -= 1;
    }

      if(this.whiteplayer.x <= this.line.x+40){
        this.completeStep = true;
        this.leftarrowleft.visible = true;
        this.yellowleftarrowleft.visible = false;
        this.startGood();
        this.gameState = 2;
        this.line.visible = false;
        this.movehereText.visible = false;
    }
  }

  checkSquat(){
    this.updateStatusText("SQUAT (DEFEND)");
    this.leftarrowdown.visible = false;
    this.yellowleftarrowdown.visible = true;
    const { dirUp, dirDown, dirLeft, dirRight } = this.locomotion;

    if (dirRight.isDown) {
        this.whiteplayer.anims.play('move', true); 
        if(this.whiteplayer.x <= RIGHTEDGE)
            this.whiteplayer.x += 1;
    }
    else if (dirLeft.isDown) {
        this.whiteplayer.anims.play('move', true);
        if(this.whiteplayer.x >= LEFTEDGE)
            this.whiteplayer.x -= 1;
    }
    else if(dirDown.isDown) {
        this.whiteplayer.anims.play('squat'); 
        this.completeStep = true;
        this.leftarrowdown.visible = true;
        this.yellowleftarrowdown.visible = false;
        this.startGood();
        this.gameState = 3;
    }
  }

  checkJump(){
    this.updateStatusText("JUMP");
    this.leftarrowup.visible = false;
    this.yellowleftarrowup.visible = true;
    const { dirUp, dirDown, dirLeft, dirRight } = this.locomotion;

    if (dirRight.isDown) {
        this.whiteplayer.anims.play('move', true); 
        if(this.whiteplayer.x <= RIGHTEDGE)
            this.whiteplayer.x += 1;
    }
    else if (dirLeft.isDown) {
        this.whiteplayer.anims.play('move', true);
        if(this.whiteplayer.x >= LEFTEDGE)
            this.whiteplayer.x -= 1;
    }
    else if(dirDown.isDown) {
        this.whiteplayer.anims.play('squat'); 
    }
    else if(dirUp.isDown){
        this.whiteplayer.anims.play('jump'); 
        this.completeStep = true;
        this.leftarrowup.visible = true;
        this.yellowleftarrowup.visible = false;
        this.startGood();
        this.gameState = 4;
    }
  }

  hasNoInput(){
    const { dirUp, dirDown, dirLeft, dirRight } = this.locomotion;
    return !dirLeft.isDown && !dirRight.isDown && !dirDown.isDown && !dirUp.isDown;
  }

  render() {}

}