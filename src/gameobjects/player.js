import Phaser from 'phaser';
import KeyboardManager from '../controllers/keyboardManager';
import GamepadManager from '../controllers/gamepadManager';

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor({scene, startx, starty, readyx}) {
        super(scene.matter.world, startx, starty, 'player');
        this.readyx = readyx;
        this.movementState = 'idle';
        this.scene = scene;
        this.inputmanager = null;
        this.gamepad = null;

        this.startwalking = false;
        this.walking = false;
        this.startbowing = false;
        this.bowing = false;

        scene.add.existing(this);
      }
      preload(){

      }
      create(){

      }
      setInputManager(){
          console.log('gamebad = '+this.usesGamePad());
          this.inputmanager = (this.usesGamePad()) ? new GamepadManager(this.scene) : new KeyboardManager(this.scene);
          this.inputmanager.init(this);
          this.inputmanager.initStates();
      }
      setGamePad(gamepad){
          this.gamepad = gamepad;
      }
      usesGamePad(){
          return (this.gamepad === null) ? false : true;
      }
      update(){
        this.inputmanager.checkForInput();
        if(this.startwalking){
            this.play('walking', true);
            this.startwalking = false;
            this.walking = true;
        }
        if(this.walking){
            //play walking animation
            this.x += 1;
            if(this.x >= this.readyx){
                this.walking = false;
                this.startbowing = true;
            }
        }
        if(this.startbowing){
            this.play('bow', true);
            this.startbowing = false;
            //play bow animation
            //animation finished then this.bowing = false;
        }
      }
}