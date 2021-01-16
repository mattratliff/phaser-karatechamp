import SceneController from '../../controllers/sceneController';
import sounds from '../../assets/sounds/processed';
import constants from '../../config/constants';
import practiceboard from '../../assets/backgrounds/gameboard1.png';
import shapes from '../../assets/white/objects.json';
import vase from '../../assets/vase.png';
import vase2 from '../../assets/vase2.png';
import playerPNG from '../../assets/white/spritesheet.png';
import playerJSON from '../../assets/white/sprites.json';
import platform from '../../assets/backgrounds/start/platform.png';

import Player from '../../gameobjects/player';


const { WIDTH, HEIGHT, SCALE } = constants;
const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};
const assetScale = SCALE;

export default class PhysicsSandbox extends SceneController {
  constructor() {
    super({ scenekey: 'PhysicsSandbox' });
  }

  preload() { 
    this.load.atlas('player', playerPNG, playerJSON);
    this.load.image('platform', platform);
    this.load.image('practiceboard', practiceboard);
    super.preload(); 
    this.load.image('vase', vase);
    this.load.image('vase2', vase2);
    this.load.json('shapes', shapes);
  }

  create() { 
    super.create(); 
    sounds.play('Begin');

    this.practiceText = this.add
    .text(center.width-305, center.height+300, 'Physics SANDBOX', {
      fill: '#000000',
      font: `${22 * assetScale}pt Silom`
    });
  }
  
  addComponents(){

    this.matter.world.setBounds(0, 0, WIDTH, HEIGHT-200);
    
    var shapes = this.cache.json.get('shapes');

    this.add.image(center.width, center.height, 'practiceboard').setScale(assetScale);


    // var playergroup = this.matter.world.nextGroup();
    // var platformcategory = this.matter.world.nextCategory();

    //doesno collide when:
    //  platform has collision group that match player collision group
    //  platorm has collsiion category that matches vase collision category
    //  platform has set collide with collision category

    //   1. player collsion category is null
    //   2.  player has group category

    //   3. vase has collsiion category
    //   4. vase has sets collide with collision category


    //collides when
    //  platform has collision group that match player collision group
    //  platorm has collsiion category that matches vase collision category
    //  platform has set collide with collision category

    //   1. player collsion category is matches vase collision category
    //    player has set collide with colision category
    //   2.  player has group category

        //   3. vase has collsiion category
    //   4. vase has sets collide with collision category
    // var cat1 = this.matter.world.nextCategory();
    // var platform = this.matter.add.image(center.width-175, HEIGHT-200, 'platform').setStatic(true);
    // platform.setCollisionCategory(cat1);

    //create new collision category and assign to player
    // var cat2 = this.matter.world.nextCategory();
    // this.player = new Player({ scene: this, x: center.width - 100, y: HEIGHT-300, jsonconfig: { objects: shapes.kick06 } });
    // this.player.setGamePad(this.gamepad);
    // this.player.setInputManager(this.inputmanager);
    // this.player.setCollisionCategory(cat2);

    this.vase2 = this.matter.add.sprite(center.width, HEIGHT-280, 'player', 'vase2', { shape: shapes.vase2 });
    this.vase2.setIgnoreGravity(true);

    this.vase3 = this.matter.add.sprite(center.width-100, HEIGHT-280, 'player', 'vase2', { shape: shapes.vase3 });
    this.vase3.setIgnoreGravity(true);

    this.vase = this.matter.add.sprite(center.width+300, HEIGHT-280, 'player', 'vase', { shape: shapes.vase });
    console.log(this.vase);
    // this.vase.setCollisionCategory(cat2);

    //sets with the player will collide with
    // this.vase.setCollidesWith([ cat1, cat2 ]);
    this.vase.setIgnoreGravity(true);

    super.addComponents();

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

      console.log(bodyA);
      console.log(bodyB);
      // if(bodyA.gameObject){
      //   // console.log(bodyA.gameObject.body.collisionFilter.category);
      //   if(bodyA.gameObject.frame.name=="kick05" || bodyA.gameObject.frame.name=="kick06" || bodyA.gameObject.frame.name=="kick07"){
      //     console.log("HIT VASE");
      //     //destory vase
      //   }
      //   else{
      //     console.log("HIT PLAYER");
      //     //hit gut animation
      //   }
      // }

  });

    // this.input.on('pointerdown', function (pointer)
    // {console.log("here");

        //  this.player.setCollidesWith([ cat0, cat1  ]);
    // }, this);
  }

  update(){ 
    // super.update(); 
    this.vase.x -= 2;
  }

  render() {}

}
