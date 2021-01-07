import Phaser from 'phaser';
import practiceboard from '../assets/backgrounds/gameboard1.png';
import constants from '../config/constants';
import ground from '../assets/backgrounds/game/practice/practice-ground.png';
import playerPNG from '../assets/white/spritesheet.png';
import playerJSON from '../assets/white/sprites.json';
import sounds from '../assets/sounds/processed';

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 150;
const LEFTEDGE = center.width - 150;

export default class Sandbox extends Phaser.Scene {
  constructor() {
    super({ key: 'Sandbox' });
  }

  preload() {
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.image('practiceboard', practiceboard);
    this.load.image('ground', ground);
  }

  create() {
    this.addComponents();
    this.addAnimations();
    this.buildInputs();
    sounds.play('Begin');
  }

  buildInputs(){
    const actions = this.input.keyboard.addKeys('W,A,S,D,J,I,L,K');
    const { W, A, S, D, J, I, L, K } = actions;
    const dirUp = W;
    const dirDown = S;
    const dirLeft = A;
    const dirRight = D;
    const actionKick = L;
    const spinningHealKick = J;
    const roundHouseKick = I;
    const legSweep = K;

    this.locomotion = {
        dirUp,
        dirDown,
        dirLeft,
        dirRight,
        actionKick,
        spinningHealKick,
        roundHouseKick,
        legSweep
      };
  }
  addComponents(){
    const center = {
        width: WIDTH * 0.5,
        height: HEIGHT * 0.5
      };

    //add platform
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(650, center.height+160, 'ground');

    //add board
    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);

    //add player
    this.whiteplayer = this.add.sprite(center.width - 100, center.height-15, 'player')
  }

  addAnimations(){
      this.anims.create(
          { key: 'frontkick', 
            frames: this.anims.generateFrameNames('player', { prefix: 'kick', end: 12, zeroPad: 2 }),
            frameRate: 10, 
            repeatDelay: 200,
            repeat: 0 
        });

        this.anims.create(
            { key: 'roundhousekick', 
                frames: this.anims.generateFrameNames('player', { prefix: 'roundhouse', end: 12, zeroPad: 2 }),
                frameRate: 10, 
                repeatDelay: 200,
                repeat: 0 
            });
  
        this.anims.create(
            { key: 'spinningheal', 
                frames: this.anims.generateFrameNames('player', { prefix: 'spinningheal', end: 11, zeroPad: 2 }),
                frameRate: 10, 
                repeatDelay: 200,
                repeat: 0 
            });

        this.anims.create(
            { key: 'forward', 
              frames: this.anims.generateFrameNames('player', { prefix: 'forward', end: 3, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

        this.anims.create(
            { key: 'backward', 
              frames: this.anims.generateFrameNames('player', { prefix: 'forward', end: 3, zeroPad: 2 }),
              frameRate: 10, 
              repeat: 0 
          });

      this.physics.add.collider(this.whiteplayer, this.grounds);
      this.time.delayedCall(3000, this.startBegin, [], this);
  }


  checkInput(){
    if(this.locomotion.dirRight.isDown){
        this.whiteplayer.play('forward', true); 
        this.whiteplayer.x += 1;
    }
    if(this.locomotion.dirLeft.isDown){
        this.whiteplayer.play('forward', true); 
        this.whiteplayer.x -= 1;
    }
    if(this.locomotion.actionKick.isDown){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
        this.whiteplayer.play('frontkick', true); 
        this.whiteplayer.x += 1;
    }
    if(this.locomotion.roundHouseKick.isDown){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
        this.whiteplayer.play('roundhousekick', true); 
    }
    if(this.locomotion.spinningHealKick.isDown){
        var frontkick = sounds.play('Front_Kick', false);
        sounds.volume(0.3, frontkick);
        this.whiteplayer.play('spinningheal', true); 
    }
  }

  update(){
      this.checkInput();
  }

  hasNoInput(){
    const { dirUp, dirDown, dirLeft, dirRight } = this.locomotion;
    return !dirLeft.isDown && !dirRight.isDown && !dirDown.isDown && !dirUp.isDown;
  }

  render() {}

}
