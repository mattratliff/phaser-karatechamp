import Phaser from 'phaser';
import sounds from '../assets/sounds/processed';

export default class GamepadManager {
    constructor(scene) {
        this.scene = scene;
    }

    init(player){
        this.input = this.scene.input;
        this.anims = this.scene.anims;
        this.player = player;

        this.registerInputHandlers();

        this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            if(this.isLowKick)
              this.isLowKick = false;
            if(this.isKicking)
              this.isKicking = false;
            if(this.isRoundHouseKicking)
              this.isRoundHouseKicking = false;
            if(this.isBackFlipping)
              this.isBackFlipping = false;
            if(this.isFlyingSideKick)
              this.isFlyingSideKick = false;
            if(this.isFrontSweep)
              this.isFrontSweep = false;
            if(this.isBackSweep)
              this.isBackSweep = false;
            if(this.isBackKick)
              this.isBackKick = false;
            if(this.isLungePunching)
              this.isLungePunching = false;
            if(this.isSpinningHealKick)
              this.isSpinningHealKick = false;
            if(this.isJumpingForward)
              this.isJumpingForward = false;
            if(this.isFlipping)
              this.isFlipping = false;
            if(this.isJumpingBackKick)
                this.isJumpingBackKick = false;
        }, this);
    }

    registerInputHandlers(){
        this.LS = this.input.gamepad.leftStick;
        this.RS = this.input.gamepad.rightStick;
        this.L1 = this.input.gamepad.L1;
        this.R1 = this.input.gamepad.R1;
        this.L2 = this.input.gamepad.L2;
        this.R2 = this.input.gamepad.R2;
        this.X = this.input.gamepad.X;
        this.A = this.input.gamepad.A;
        this.B = this.input.gamepad.B;
        this.Y = this.input.gamepad.Y;
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
    }
    middleBlock(){
        this.player.play('middleblock', true);
    }
    lowBlock(){
        this.player.play('lowblock', true);
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
        // var RS = this.gamepad.rightStick;
    
        // if(this.gamepad.L2 > 0.4 && this.gamepad.A){
        //   console.log("testing punched in the face")
        // }
      }

    checkKeyboardInput(){
        this.player.x -= (this.isBackFlipping && this.player.anims.currentFrame.index > 1 && this.player.anims.currentFrame.index < 10) ? 3 : 0;
        this.player.x += (this.isFlipping && this.player.anims.currentFrame.index > 1 && this.player.anims.currentFrame.index < 10) ? 3 : 0;
    
        //HIGH BLOCK
        if(this.Y)this.highBlock();
        //MIDDLE BLOCK
        else if(this.B)this.middleBlock();
        //LOW BLOCK
        else if(this.A && !this.isFlipping)this.lowBlock();

        //LUNGE PUNCH
        else if(this.LS.x > 0.4 && this.RS.x > 0.4)this.lungePunch();

        //KICKS
        //SPINNING HEAL KICK
        else if(this.LS.x < -0.2 && this.RS.x > 0.2)this.spinningHealKick();
        //BACK FLIP
        else if(this.LS.y > 0.4 && this.RS.y < -0.4)this.backFlipping();
        //FRONT FLIP
        else if(this.LS.y < -0.4 && this.RS.y > 0.4)this.flipping();
        //FRONT LEG SWEEP
        else if(this.LS.y > 0.4 && this.RS.x > 0.4)this.frontLegSweep();
        //FLYING SIDE KICK
        else if(this.LS.y < -0.4 && this.RS.x > 0.4)this.flyingSideKick();
        //FRONT KICK
        else if(this.RS.x > 0.4 && !this.isFlyingSideKick && !this.isFrontSweep && !this.isLungePunching && !this.isSpinningHealKick)this.frontKick();
        //ROUND HOUSE KICK
        else if(this.RS.y < -0.4 && !this.isBackFlipping)this.roundHouseKick();
        //BACK KICK
        else if(this.RS.x < -0.4)this.backKick();
        //LOW KICK
        else if(this.RS.y > 0.4 && !this.isBackKick && !this.isFlipping && !this.isBackFlipping)this.lowKick();
        //FORWARD
        else if(this.LS.x > 0.4 && !this.isFlipping && !this.isLungePunching)this.forward();
        //BACKWARD
        else if(this.LS.x < -0.4)this.backward();
        //JUMP
        else if(this.LS.y < -0.4 & !this.isFlyingSideKick && !this.isFlipping)this.jump();
        //SQUAT
        else if(this.LS.y > 0.4 && !this.isSquating && !this.isFrontSweep && !this.isBackFlipping)this.squat();
        //STANDUP
        else if(this.LS.y > 0 && this.LS.y < 0.4 && this.isSquating)this.standup();
      }
}