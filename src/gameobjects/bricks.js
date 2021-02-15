var utils = require('../helpers/util');
import GameObject from './gameobject';

export default class Brick extends GameObject {
    constructor({scene, x, y, texturemap, frame}) {
        super(scene, x, y, texturemap, frame);
        this.breaking = false;
      }
      preload(){}
      create(){}
      update(){}
}