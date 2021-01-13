import Phaser from 'phaser';
import sounds from '../assets/sounds/processed';
import InputManager from './inputManager';

export default class KeyboardInputManager extends InputManager {
    constructor(scene) {
        super(scene);
        this.scene = scene;
    }

    init(player){
        super.init(player);
        this.input = this.scene.input;
        this.anims = this.scene.anims;
        this.player = player;

        this.registerInputHandlers();
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
        super.initStates();
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