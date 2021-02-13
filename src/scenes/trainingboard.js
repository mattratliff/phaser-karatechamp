import constants from '../config/constants';

import SceneController from '../controllers/sceneController';

import practiceboard from '../assets/backgrounds/boards/board3.png';

import sounds from '../assets/sounds/processed';

import controllers from '../assets/backgrounds/game/controllers.png';

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

import {begin, stop, good, verygood} from '../helpers/balloons';

import line from '../assets/line.png';

import girlPNG from '../assets/girls/girlspritesheet.png';
import girlJSON from '../assets/girls/girls.json';

import Player from '../gameobjects/player';
var utils = require('../helpers/util');
const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class TrainingBoard extends SceneController {
  constructor() {
    super({ scenekey: 'TrainingBoard' });
    this.gamepad = null;
    this.practiceStarted = false;
    this.trainingCompleted = false;
    this.deliverBelt = false;
    this.gameState = -1;
  }

  preload() {
    super.preload();
    this.load.image('practiceboard', practiceboard);

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

    this.load.atlas('girl', girlPNG, girlJSON);

    this.load.image('begin', begin);
    this.load.image('stop', stop);
    this.load.image('good', good);
    this.load.image('line', line);
    this.load.image('verygood', verygood);
  }

  create() {
    super.create();
  }

  checkPracticeStep(){
    if(!this.completeStep){
        switch(this.gameState){
            case 0:
                this.line.visible = true;
                this.movehereText.visible = true;
                this.checkMove(this.moves['FORWARD'], function(line, text){
                    line.visible = false;
                    text.visible = false;
                });
                break;
            case 1:
                this.line.x = center.width-150;
                this.movehereText.x = center.width-250;
                this.line.visible = true;
                this.movehereText.visible = true;
                this.checkMove(this.moves['BACKWARD'], function(line, text){
                    line.visible = false;
                    text.visible = false;
                });
                break;
            case 2:
                this.checkMove(this.moves['SQUAT'], function(){});
                break;
            case 3:
                this.checkMove(this.moves['JUMP'], function(){});
                break;
            case 4:
                this.checkMove(this.moves['FRONTKICK'], function(){});
                break;
            case 5:
                this.checkMove(this.moves['ROUNDKICK'], function(){});
                break;
            case 6:
                this.checkMove(this.moves['BACKKICK'], function(){});
                break;
            case 7:
                this.checkMove(this.moves['LOWKICK'], function(){});
                break;
            case 8:
                this.checkMove(this.moves['LUNGEPUNCH'], function(){});
                break;
            case 9:
                this.checkMove(this.moves['HIGHBLOCK'], function(){});
                break;
            case 10:
                this.checkMove(this.moves['MIDDLEBLOCK'], function(){});
                break;
            case 11:
                this.checkMove(this.moves['LOWBLOCK'], function(){});
                break;
            case 12:
              this.checkMove(this.moves['FLYINGSIDEKICK'], function(){});
              break;
            case 13:
                this.checkMove(this.moves['SPINNINGHEALKICK'], function(){});
                break;
            case 14:
              this.checkMove(this.moves['FRONTFLIP'], function(){});
              break;
            case 15:
              this.checkMove(this.moves['BACKFLIP'], function(){});
              break;
            case 16:
                this.trainingCompleted = true;
                break;
        }
    }
  }

checkMove(option, callback){
      this.movementText.setText(option.statusText);
      if(option.leftcontrol != ''){
        option.leftcontrol.visible = false
        option.leftactivecontrol.visible = true;
      }
      if(option.rightcontrol != ''){
        option.rightcontrol.visible = false
        option.rightactivecontrol.visible = true;
      }
      if(option.condition(this.player, this.line)){
          this.completeStep = true;
          if(option.leftcontrol != ''){
            option.leftcontrol.visible = true;
            option.leftactivecontrol.visible = false;
          }
          if(option.rightcontrol != ''){
            option.rightcontrol.visible = true;
            option.rightactivecontrol.visible = false;
          }
          callback(this.line, this.movehereText);    
          this.time.delayedCall(1000, this.startGood, [], this);
          this.gameState++;
      }
  }

  startGood(){
    this.good = null;
    if(utils.getRandomInt(3)==1)   // %33 chance of getting "Good"
        this.good = this.add.image(center.width+50, center.height-200, 'good');
    this.time.delayedCall(2000, function(){
      if(this.good)
        this.good.visible = false;
      this.completeStep = false;
    }, [], this);      
  }

  playerVeryGood(){
    this.verygood = this.add.image(center.width+50, center.height-200, 'verygood');
    this.time.delayedCall(2000, function(){
        this.verygood.visible = false;
        this.completeStep = false;
    }, [], this);     
  }

  startBegin(){
    sounds.play('Begin');
    this.player.active = true;
    this.begin = this.add.image(center.width+50, center.height-200, 'begin');
    this.time.delayedCall(2000, function(){ 
        this.begin.visible = false; 
        this.practiceStarted = true; 
        this.gameState = 0;
        this.completeStep = false;
    }, [], this);
  }

  addComponents(){
    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);
    
    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);

    this.line = this.add.image(center.width, center.height+120, 'line').setScale(assetScale * .5);
    this.line.visible = false;

    this.addPracticeControllersComponent();
    this.addSpectators();

    this.practiceText = this.add
    .text(center.width-305, center.height-235, 'PRACTICE', {
      fill: '#ffffff',
      font: `${22 * SCALE}pt Silom`
    });

    this.movementText = this.add
    .text(center.width-305, center.height+290, "", {
      fill: '#ffffff',
      font: `${14 * SCALE}pt Silom`
    });

    this.movehereText = this.add
    .text(center.width, center.height+80, 'Move Here', {
      fill: '#000000',
      font: `${14 * SCALE}pt Silom`
    });
    this.movehereText.visible = false;
    super.addComponents();
    
    this.moves = this.loadMoves();
  }

  addPracticeControllersComponent(){
    this.add.image(center.width, center.height+278, 'controllers').setScale(assetScale);

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

  addSpectators(){
    //add spectators
    this.whitespectator1 = this.add.image(center.width-250, center.height-30, 'spectatorwhite').setScale(assetScale);
    this.whitespectator2 = this.add.image(center.width-265, center.height+60, 'spectatorwhite').setScale(assetScale);

    this.redspectator1 = this.add.image(center.width+250, center.height-30, 'spectatorred').setScale(assetScale);
    this.redspectator2 = this.add.image(center.width+265, center.height+60, 'spectatorred').setScale(assetScale);

    //add the player here so that he walks between the spectators
    this.player = new Player({ scene: this, startx: LEFTEDGE+20, starty: HEIGHT-200, readyx: center.width-100 });
    this.player.setGamePad(this.gamepad);
    this.player.setInputManager(this.inputmanager);
    this.player.setCollisionGroup(-1);
    this.player.startwalking = true;
    this.player.chopping = false;
        
    this.girl = this.matter.add.sprite(center.width+400, center.height, 'girl').setScale(assetScale * .9);
    this.girl.setCollisionGroup(-1);
    
    
    this.whitespectator3 = this.add.image(center.width-280, center.height+150, 'spectatorwhite').setScale(assetScale);
    this.redspectator3 = this.add.image(center.width+280, center.height+150, 'spectatorred').setScale(assetScale);
  }

  completeTraining(){
    this.playerVeryGood();
    this.deliverBelt = true;
    this.girl.play('redgirlwalk', true);
    this.player.play('sweat', true);
  }

  /**
   * scene controller handles the player and this handles the vase
   * after update check for collision
   */
  update(){
    if(this.deliverBelt){
      if(this.girl.body.bounds.min.x > this.player.body.bounds.max.x + 5){
        this.girl.x -= 1;
      }else
        this.girl.stop('redgirlwalk');
    }

    this.player.update();
    if(!this.player.ready)
        return;
    if(this.gameState==-1){
        this.gameState = 0;
        this.startBegin();
    }
    if(this.trainingCompleted){
      this.time.delayedCall(3000, this.completeTraining, [], this);
    }else
      this.checkPracticeStep();
  }

  render() {}

  loadMoves(){
      var data = [];
      data['FORWARD'] = {
            'statusText':'FORWARD', 
            'leftcontrol':this.leftarrowright, 
            'leftactivecontrol':this.yellowleftarrowright,
            'rightcontrol':'', 
            'rightactivecontrol':'',
            'condition':function(player, line){return player.x >= line.x-20}
            };
      data['BACKWARD'] = {
            'statusText':'BACKWARD', 
            'leftcontrol':this.leftarrowleft, 
            'leftactivecontrol':this.yellowleftarrowleft,
            'rightcontrol':'', 
            'rightactivecontrol':'',
            'condition':function(player, line){return player.x <= line.x+40}
            };
    data['SQUAT'] = {
            'statusText':'SQUAT', 
            'leftcontrol':this.leftarrowdown, 
            'leftactivecontrol':this.yellowleftarrowdown,
            'rightcontrol':'', 
            'rightactivecontrol':'',
            'condition':function(player){return player.inputmanager.isSquating;}
            };
    data['JUMP'] = {
            'statusText':'JUMP', 
            'leftcontrol':this.leftarrowup, 
            'leftactivecontrol':this.yellowleftarrowup,
            'rightcontrol':'', 
            'rightactivecontrol':'',
            'condition':function(player){return player.inputmanager.isJumping;}
            };
    data['FRONTKICK'] = {
            'statusText':'FRONT KICK', 
            'rightcontrol':this.rightarrowright, 
            'rightactivecontrol':this.yellowrightarrowright,
            'leftcontrol':'', 
            'leftactivecontrol':'',
            'condition':function(player){return player.inputmanager.isKicking;}
            };
    data['ROUNDKICK'] = {
            'statusText':'ROUND KICK', 
            'rightcontrol':this.rightarrowup, 
            'rightactivecontrol':this.yellowrightarrowup,
            'leftcontrol':'', 
            'leftactivecontrol':'',
            'condition':function(player){return player.inputmanager.isRoundHouseKicking;}
            };
    data['BACKKICK'] = {
            'statusText':'BACK KICK', 
            'rightcontrol':this.rightarrowleft, 
            'rightactivecontrol':this.yellowrightarrowleft,
            'leftcontrol':'', 
            'leftactivecontrol':'',
            'condition':function(player){return player.inputmanager.isBackKick;}
            };
    data['LOWKICK'] = {
            'statusText':'LOW KICK', 
            'rightcontrol':this.rightarrowdown, 
            'rightactivecontrol':this.yellowrightarrowdown,
            'leftcontrol':'', 
            'leftactivecontrol':'',
            'condition':function(player){return player.inputmanager.isLowKick;}
            };
    data['LUNGEPUNCH'] = {
            'statusText':'LUNGE PUNCH', 
            'rightcontrol':this.rightarrowright, 
            'rightactivecontrol':this.yellowrightarrowright,
            'leftcontrol':this.leftarrowright,
            'leftactivecontrol':this.yellowleftarrowright,
            'condition':function(player){return player.inputmanager.isLungePunching;}
            };
      data['FRONTSWEEP'] = {
        'statusText':'FRONT SWEEP', 
        'leftcontrol':this.leftarrowdown,
        'leftactivecontrol':this.yellowleftarrowdown,
        'rightcontrol':this.rightarrowright, 
        'rightactivecontrol':this.yellowrightarrowright,
        'condition':function(player){return player.inputmanager.isFrontSweep;}
        };
      data['HIGHBLOCK'] = {
        'statusText':'HIGH BLOCK', 
        'leftcontrol':this.leftarrowup,
        'leftactivecontrol':this.yellowleftarrowup,
        'rightcontrol':this.rightarrowup, 
        'rightactivecontrol':this.yellowrightarrowup,
        'condition':function(player){return player.inputmanager.isHighBlocking;}
        };
      data['MIDDLEBLOCK'] = {
        'statusText':'MIDDLE BLOCK', 
        'leftcontrol':this.leftarrowleft,
        'leftactivecontrol':this.yellowleftarrowleft,
        'rightcontrol':this.rightarrowleft, 
        'rightactivecontrol':this.yellowrightarrowleft,
        'condition':function(player){return player.inputmanager.isMiddleBlocking;}
        };
      data['LOWBLOCK'] = {
        'statusText':'LOW BLOCK', 
        'leftcontrol':this.leftarrowdown,
        'leftactivecontrol':this.yellowleftarrowdown,
        'rightcontrol':this.rightarrowdown, 
        'rightactivecontrol':this.yellowrightarrowdown,
        'condition':function(player){return player.inputmanager.isLowBlocking;}
        };
      data['FLYINGSIDEKICK'] = {
        'statusText':'FLYING SIDE KICK', 
        'leftcontrol':this.leftarrowup,
        'leftactivecontrol':this.yellowleftarrowup,
        'rightcontrol':this.rightarrowright, 
        'rightactivecontrol':this.yellowrightarrowright,
        'condition':function(player){return player.inputmanager.isFlyingSideKick;}
        };
        data['SPINNINGHEALKICK'] = {
          'statusText':'SPINNING HEAL KICK', 
          'leftcontrol':this.leftarrowleft,
          'leftactivecontrol':this.yellowleftarrowleft,
          'rightcontrol':this.rightarrowright, 
          'rightactivecontrol':this.yellowrightarrowright,
          'condition':function(player){return player.inputmanager.isSpinningHealKick;}
          };
      data['FRONTFLIP'] = {
        'statusText':'FRONT FLIP', 
        'leftcontrol':this.leftarrowdown,
        'leftactivecontrol':this.yellowleftarrowdown,
        'rightcontrol':this.rightarrowup, 
        'rightactivecontrol':this.yellowrightarrowup,
        'condition':function(player){return player.inputmanager.isFlipping;}
        };
      data['BACKFLIP'] = {
        'statusText':'BACK FLIP', 
        'leftcontrol':this.leftarrowup,
        'leftactivecontrol':this.yellowleftarrowup,
        'rightcontrol':this.rightarrowdown, 
        'rightactivecontrol':this.yellowrightarrowdown,
        'condition':function(player){return player.inputmanager.isBackFlipping;}
        };
    return data;
  }
}
