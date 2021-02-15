import GameObject from './gameobject';

export default class Bull extends GameObject {
    constructor({scene, x, y, texturemap}) {
        super(scene, x, y, texturemap);
        this.active = false;
        this.velocity = -2;
      }
      preload(){}
      create(){}
      activate(){this.active = true;}
      deactivate(){this.velocity = 0;}
      update(){
        if(this.active)
            this.x += this.velocity;
      }
}