import GameObject from './gameobject';

export default class Bull extends GameObject {
    constructor(scene, x, y, texturemap) {
        super(scene, x, y, texturemap);
        this.active = false;
        this.velocity = -2;
      }
      preload(){}
      create(){
        this.addAnimations();
      }
      activate(){this.active = true;}
      deactivate(){this.velocity = 0;}
      update(){
        if(this.active)
            this.x += this.velocity;
      }
      addAnimations(){
        this.anims.create(
          { key: 'bull', 
            frames: this.anims.generateFrameNames('bull', { prefix: 'bull', start:1, end: 8, zeroPad: 2 }),
            frameRate: 8, 
            repeat: -1
        });

        this.anims.create(
          { key: 'bullfall', 
            frames: this.anims.generateFrameNames('bull', { prefix: 'bullfall', start:1, end: 2, zeroPad: 1 }),
            frameRate: 1, 
            repeat: 0
        });
      }
}