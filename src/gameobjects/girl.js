import GameObject from './gameobject';
import girlPNG from '../assets/girls/girlspritesheet.png';
import girlJSON from '../assets/girls/girls.json';

export default class Girl extends GameObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'girl');
        this.active = false;
        this.velocity = -2;
        this.walking = false;
        this.setScale(.9);
      }
      preload(){
        this.scene.load.atlas('girl', girlPNG, girlJSON);
      }
      create(){
        this.addAnimations();
      }
      activate(){this.active = true;}
      deactivate(){this.velocity = 0;}
      walk(){
        this.anims.play('redgirlwalk', true);
      }
      standstill(){
          this.anims.stop('redgirlwalk');
          this.active = false;
      }
      update(){
        if(this.active){
          if(!this.walking){
            this.walk();
            this.walking = true;
          }
          this.x -= 1;
        }
            
      }
      addAnimations(){
        this.anims.create(
            { key: 'redgirlwalk', 
              frames: this.anims.generateFrameNames('girl', { prefix: 'redgirl', start:1, end: 2, zeroPad: 1 }),
              frameRate: 5, 
              repeat: -1
          });
      }
}