import Phaser from 'phaser';
import sounds from '../assets/sounds/processed';

export default class KeyboardInputManager {
    constructor(scene) {
        this.scene = scene;
    }

    init(player){
        this.input = this.scene.input;
        this.anims = this.scene.anims;
        this.player = player;

        this.registerInputHandlers();

        this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            if(this.isLowKick)this.isLowKick = false;
            if(this.isKicking)this.isKicking = false;
            if(this.isRoundHouseKicking)this.isRoundHouseKicking = false;
            if(this.isBackFlipping)this.isBackFlipping = false;
            if(this.isFlyingSideKick)this.isFlyingSideKick = false;
            if(this.isFrontSweep)this.isFrontSweep = false;
            if(this.isBackSweep)this.isBackSweep = false;
            if(this.isBackKick)this.isBackKick = false;
            if(this.isLungePunching)this.isLungePunching = false;
            if(this.isSpinningHealKick)this.isSpinningHealKick = false;
            if(this.isJumpingForward)this.isJumpingForward = false;
            if(this.isFlipping)this.isFlipping = false;
            if(this.isJumpingBackKick)this.isJumpingBackKick = false;
            if(this.isLungePunching)this.isLungePunching = false;
            if(this.isHighBlocking)this.isHighBlocking = false;
            if(this.isMiddleBlocking)this.isMiddleBlocking = false;
            if(this.isLowBlocking)this.isLowBlocking = false;
        }, this);
    }

    registerInputHandlers(){
        this.keyLeftLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyLeftUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyLeftDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyLeftRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        this.keyRightLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyRightUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyRightDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.keyRightRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    initStates(){
        this.isSquating = false;
        this.isBackFlipping = false;
        this.isKicking = false;
        this.isRoundHouseKicking = false;
        this.isFlyingSideKick = false;
        this.isLowKick = false;
        this.isFrontSweep = false;
        this.isBackSweep = false;
        this.isSpinningHealKick = false;
        this.isFlipping = false;
        this.isJumpingBackKick = false;
        this.changingDirection = false;
        this.isHighBlocking = false;
        this.isLowBlocking = false;
        this.isMiddleBlocking = false;
        this.isLungePunching = false;
    }

    flipping(){
        this.player.play('flip', true); 
        this.isFlipping = true;
    }
    backFlipping(){
        this.player.play('backflip', true); 
        this.isBackFlipping = true;
    }
    spinningHealKick(){                                                     
        if(!this.isSpinningHealKick){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.player.play('spinningheal', true); 
        this.isSpinningHealKick = true;
    }
    frontLegSweep(){
        if(!this.isFrontSweep){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.isFrontSweep = true;
        this.player.play('frontsweep', true); 
    }
    flyingSideKick(){
        if(!this.isFlyingSideKick){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.isFlyingSideKick = true;
        this.player.play('flyingside', true); 
        this.player.x += 1;
    }
    frontKick(){
        if(!this.isKicking){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.isKicking = true;
        this.player.play('frontkick', true); 
        this.player.x += 1;
    }
    roundHouseKick(){
        if(!this.isRoundHouseKicking){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.isRoundHouseKicking = true;
        this.player.play('roundhousekick', true); 
    }
    backKick(){
        if(!this.isBackKick){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.isBackKick = true;
        this.player.play('backkick', true); 
    }
    lowKick(){
        if(!this.isLowKick){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
        this.isLowKick = true;
        this.player.play('lowkick', true); 
    }
    forward(){
        this.player.play('forward', true);
        this.player.x += 1;
    }
    backward(){
        this.player.play('backward', true);
        this.player.x -= 1;
    }
    jump(){
        this.player.play('jump', true); 
    }
    squat(){
        this.player.play('squat', true); 
        this.isSquating = true;
    }
    standup(){
        this.player.play('standup', true); 
        this.isSquating = false;
    }
    jumpingBackKick(){

    }
    changeDirection(){
        this.scene.time.delayedCall(1000, this.finishChangeDirection, [], this);
        this.player.flipX = !this.player.flipX;
        this.changingDirection = true;
    }
    finishChangeDirection(){
        this.changingDirection = false;
    }
    highBlock(){
        this.player.play('highblock', true);
        this.isHighBlocking = true;
    }
    middleBlock(){
        this.player.play('middleblock', true);
        this.isMiddleBlocking = true;
    }
    lowBlock(){
        this.player.play('lowblock', true);
        this.isLowBlocking = true;
    }
    lungePunch(){
        if(!this.isLungePunching){
            var frontkick = sounds.play('Front_Kick', false);
            sounds.volume(0.3, frontkick);
        }
      this.player.play('lungepunch', true); 
      this.isLungePunching = true;
      if(this.player.flipX)
        this.player.x -= 1;
      else
        this.player.x += 1;
    }
  /**
   * RAGDOLL TESTING: (L2)
___ punched in the face   +A
___ punched in the stomach  +B
___ leg sweeped   +X
___ flying side kicked   +Y
___ back kicked   +RS RIGHT
___ round house kicked   +RS LEFT
___ spinning heal kicked   +RS DOWN
   */
    checkForHit(){

    }

    checkKeyboardInput(){
        this.player.x -= (this.isBackFlipping && this.player.anims.currentFrame.index > 1 && this.player.anims.currentFrame.index < 10) ? 3 : 0;
        this.player.x += (this.isFlipping && this.player.anims.currentFrame.index > 1 && this.player.anims.currentFrame.index < 12) ? 3 : 0;
    
        //HIGH BLOCK
        if(this.keyLeftUp.isDown && this.keyRightUp.isDown)this.highBlock();
        //MIDDLE BLOCK
        else if(this.keyLeftLeft.isDown && this.keyRightLeft.isDown)this.middleBlock();
        //LOW BLOCK
        else if(this.keyLeftDown.isDown && this.keyRightDown.isDown && !this.isFlipping)this.lowBlock();

        //LUNGE PUNCH
        else if(this.keyLeftRight.isDown && this.keyRightRight.isDown)this.lungePunch();

        //KICKS
        //SPINNING HEAL KICK
        else if(this.keyLeftLeft.isDown && this.keyRightRight.isDown)this.spinningHealKick();
        //CHANGE DIRECTION
        else if(this.keySpace.isDown && !this.changingDirection)this.changeDirection();
        //BACK FLIP
        else if(this.keyLeftUp.isDown && this.keyRightDown.isDown)this.backFlipping();
        //FRONT FLIP
        else if(this.keyLeftDown.isDown && this.keyRightUp.isDown && !this.isSquating)this.flipping();
        //FRONT LEG SWEEP
        else if(this.keyLeftDown.isDown && this.keyRightRight.isDown && !this.isSpinningHealKick)this.frontLegSweep();
        //FLYING SIDE KICK
        else if(this.keyLeftUp.isDown && this.keyRightRight.isDown && !this.isSpinningHealKick)this.flyingSideKick();
        //FRONT KICK
        else if(this.keyRightRight.isDown && !this.isFlyingSideKick && !this.isFrontSweep && !this.isSpinningHealKick)this.frontKick();
        //ROUND HOUSE KICK
        else if(this.keyRightUp.isDown && !this.isFlipping)this.roundHouseKick();
        //BACK KICK
        else if(this.keyRightLeft.isDown && !this.isMiddleBlocking)this.backKick();
        //LOW KICK
        else if(this.keyRightDown.isDown && !this.isBackFlipping && !this.isBackSweep)this.lowKick();
        //FORWARD
        else if(this.keyLeftRight.isDown && !this.isLungePunching)this.forward();
        //BACKWARD
        else if(this.keyLeftLeft.isDown && !this.isSpinningHealKick)this.backward();
        //JUMP
        else if(this.keyLeftUp.isDown && !this.isFlyingSideKick && !this.isBackFlipping && !this.isHighBlocking)this.jump();
        //SQUAT
        else if(this.keyLeftDown.isDown && !this.isSquating && !this.isFrontSweep && !this.isBackFlipping && !this.isFlipping && !this.isLowBlocking)this.squat();
        //STANDUP
        else if(!this.keyLeftDown.isDown && this.isSquating)this.standup();
      }
}