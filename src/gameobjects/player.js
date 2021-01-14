import Phaser from 'phaser';
import KeyboardManager from '../input/keyboardManager';
import GamepadManager from '../input/gamepadManager';

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor({scene, x, y}) {
        super(scene.matter.world, x, y, 'player');
        this.movementState = 'idle';
        this.scene = scene;
        this.inputmanager = null;
        this.gamepad = null
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