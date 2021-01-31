import Phaser from 'phaser';
import KeyboardManager from '../controllers/keyboardManager';
import GamepadManager from '../controllers/gamepadManager';

// import kickfixtures from '../assets/white/frontkick.json';

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

        this.create();
      }
      preload(){

      }
      create(){
          console.log("creating");
        // this.scene.load.json('kickfixtures', kickfixtures);




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
      entrance(){
        if(this.startwalking){
            this.play('walking', true);
            this.startwalking = false;
            this.walking = true;
        }
        if(this.walking){
            this.x += 1;
            if(this.x >= this.readyx){
                this.walking = false;
                this.startbowing = true;
            }
        }
        if(this.startbowing){
            this.play('bow', true);
            this.startbowing = false;
        }
      }
      update(){
        this.inputmanager.checkForInput();
        this.entrance();
      }
}