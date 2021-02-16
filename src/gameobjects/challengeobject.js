import GameObject from './gameobject';
import sounds from '../assets/sounds/processed';
var utils = require('../helpers/util');

export default class ChallengeObject extends GameObject {
    constructor(scene, x, y, texturemap, rightedge) {
        super(scene, x, y, texturemap);
        this.active = false;
        this.velocity = -3;
        this.active = false;
        this.rightedge = rightedge;
      }
      preload(){}
      create(){}
      reset(RIGHTEDGE){
        this.active = false;
        this.x = RIGHTEDGE;
      }
      update(){
        if(this.active)
            this.x += this.velocity;
      }
}