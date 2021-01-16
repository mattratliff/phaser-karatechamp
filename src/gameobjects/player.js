import Phaser from 'phaser';
import KeyboardManager from '../controllers/keyboardManager';
import GamepadManager from '../controllers/gamepadManager';

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor({scene, x, y, jsconfig}) {
        super(scene.matter.world, x, y, 'player', jsconfig);
        this.movementState = 'idle';
        this.scene = scene;
        this.inputmanager = null;
        this.gamepad = null
        //add matterbodyconfig
        /*
        this.matterbodyconfig = { lungepunch: config };
        */
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
      }
}