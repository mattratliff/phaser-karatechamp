import Phaser from 'phaser';
import KeyboardManager from '../controllers/keyboardManager';
import GamepadManager from '../controllers/gamepadManager';
var utils = require('../helpers/util');

const PlayerDirection = {
    RIGHT: 1,
    LEFT: -1
  };

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor({scene, startx, starty, readyx, frame}) {
        super(scene.matter.world, startx, starty, 'player', frame);
        this.setIgnoreGravity(true);
        this.setCollisionGroup(-1);

        this.readyx = readyx;
        this.scene = scene;
        this.inputmanager = null;
        this.gamepad = null;
        this.direction = PlayerDirection.RIGHT;
        this.verticaldistance = 0;
        this.horizontaldistance = 0;
        this.yoffset = 4;
        this.xoffset = 3;
        this.starty = starty;
        this.startx = startx;

        this.startwalking = false;
        this.walking = false;
        this.startbowing = false;
        this.bowing = false;
        this.ready = false;

        this.chopping = false;
        this.chopped = false;
        
        this.breaking = false;
        this.broke = false;

        scene.add.existing(this);

        this.create();
      }
      preload(){}
      create(){}
      setInputManager(){
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
      win(){
        this.inputmanager.win()
      }
      entrance(){
        if(this.startwalking){
            this.inputmanager.pause = true;
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
            this.scene.time.delayedCall(2000, this.setPlayerReady, [], this);
        }
      }

      setPlayerReady(){
          this.ready = true;
          this.inputmanager.pause = false;
      }

      update(){
        this.inputmanager.checkForInput();
        if(!this.chopping && !this.breaking)
            this.entrance();

        if(this.chopping){
            if(!this.chopped)
                utils.bounce(this);
        }
        if(this.breaking){
            if(!this.broke)
                utils.breaking(this);
        }
      }
}