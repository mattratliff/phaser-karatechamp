import constants from '../config/constants';
const fixtures = require('../assets/fixtures.json');

const { WIDTH, HEIGHT, SCALE } = constants;

const center = {
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5
};

const assetScale = SCALE;
const RIGHTEDGE = center.width + 463;
const LEFTEDGE = center.width - 462;

export default class CollisionSystem{
    constructor(matter, scene){
        this.fixtures = fixtures;
        this.matter = matter;
        this.scene = scene;
        this.buffer = 15;  //offset to handle velocity
    }

    checkBullCollision(player, bull){
      if(bull.body.bounds.min.x - player.body.bounds.max.x < 40 && bull.body.bounds.min.x > player.x && bull.velocity != 0){
        // var collision = 
        return this.checkBullCollision2(player, bull);
      }
    }

    checkBullCollision2(player, bull){
        if(player.anims.currentFrame && this.fixtures[player.anims.currentFrame.frame.name]){
            var bodyAFixtures = this.fixtures[player.anims.currentFrame.frame.name].fixtures;
            var bodyBFixtures = this.fixtures[bull.anims.currentFrame.frame.name].fixtures;

            // var bodyBFixtures = this.fixtures['vase'].fixtures;
            //if both bodies have fixtures
            if(bodyAFixtures.length > 0 && bodyBFixtures.length > 0){
              var bfixture = bodyBFixtures[0].label
                var bodyBfixture = this.matter.bounds.create(
                    this.adjustForAbsolutePosition(bull, bodyBFixtures[0])
                );

                //loop over every fixture to test for collision (foot, body, head, leg)
                var hit = false;
                var collided = false;
                var fixtureLocation = null;
                var fixture = null;
                for(var i=0; i<bodyAFixtures.length; i++){
                    hit = bodyAFixtures[i].isSensor;
                    fixtureLocation = bodyAFixtures[i].label;
                    var bodyAfixture = this.matter.bounds.create(
                        this.adjustForAbsolutePosition(player, bodyAFixtures[i])
                    );
                    fixture = bodyAfixture
                    collided = this.matter.bounds.overlaps(bodyAfixture, bodyBfixture);
                    if(collided)
                        break;
                }
                return {
                    collided: collided,
                    hit: hit,
                    fixture: fixtureLocation
                }
            }
            else{
                return { collided: false, hit: null, fixtureLocation: null };
            }
        }
        else{
            return { collided: false, hit: null, fixtureLocation: null };
        }
    }

    
    checkVaseCollision(player, vase){
        if(vase.x - player.body.bounds.max.x < 40 && vase.x > player.x && vase.velocity != 0){
          var collision = this.checkVaseCollision2(player, vase);
          if(collision.collided){
            //player hit vase
            if(collision.hit){
              vase.play('vase', true);
              vase.velocity = 0;
              this.scene.time.delayedCall(2000, vase.deactivate(RIGHTEDGE), [], this);
            }
            //vase hit player
            else{
              if(collision.fixture == "body-fixture")
                player.inputmanager.gutKick();
              else if(collision.fixture == "head-fixture")
                player.inputmanager.facePunch();
              else if(collision.fixture == "leg-fixture")
                player.inputmanager.lowKick();
              
              player.inputmanager.pause = true;
              vase.play('vase', true);
              vase.velocity = 0;
              this.scene.time.delayedCall(2000, vase.deactivate(RIGHTEDGE), [], this); 
            }
    
          }
        }
      }

    checkVaseCollision2(player, vase){
        if(player.anims.currentFrame && this.fixtures[player.anims.currentFrame.frame.name]){
            var bodyAFixtures = this.fixtures[player.anims.currentFrame.frame.name].fixtures;
            var bodyBFixtures = this.fixtures['vase'].fixtures;
            //if both bodies have fixtures
            if(bodyAFixtures.length > 0 && bodyBFixtures.length > 0){
                var bodyBfixture = this.matter.bounds.create(
                    this.adjustForAbsolutePosition(vase, bodyBFixtures[0])
                );

                //loop over every fixture to test for collision (foot, body, head, leg)
                var hit = false;
                var collided = false;
                var fixtureLocation = null;
                for(var i=0; i<bodyAFixtures.length; i++){
                    hit = bodyAFixtures[i].isSensor;
                    fixtureLocation = bodyAFixtures[i].label;
                    var bodyAfixture = this.matter.bounds.create(
                        this.adjustForAbsolutePosition(player, bodyAFixtures[i])
                    );
                    collided = this.matter.bounds.overlaps(bodyAfixture, bodyBfixture);
                    if(collided)
                        break;
                }
                return {
                    collided: collided,
                    hit: hit,
                    fixture: fixtureLocation
                }
            }
            else{
                return { collided: false, hit: null, fixtureLocation: null };
            }
        }
        else{
            return { collided: false, hit: null, fixtureLocation: null };
        }
    }

    adjustForAbsolutePosition(gameObject, fixtureSet){
        var points = [];
        for(var i=0; i<fixtureSet.vertices[0].length; i++){
            var point = {
                x: fixtureSet.vertices[0][i].x + gameObject.body.bounds.min.x-this.buffer,
                y: fixtureSet.vertices[0][i].y + gameObject.body.bounds.min.y
            };
            points.push(point);
        }
        return points;
    }
}