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

    /**
     * Check for the collision of 2 matter sprites during animation (uses hit fixtures created using PhysicsEditor)
     * @param {Matter.Sprite} sprite1 
     * @param {Matter.Sprite} sprite2 
     */
    checkForSpriteToSpriteCollision(sprite1, sprite2){
      if(sprite2.body.bounds.min.x - sprite1.body.bounds.max.x < 40 && sprite2.body.bounds.min.x > sprite1.x && sprite2.velocity != 0){
          if(sprite1.anims.currentFrame && this.fixtures[sprite1.anims.currentFrame.frame.name]){
            var bodyAFixtures = this.fixtures[sprite1.anims.currentFrame.frame.name].fixtures;
            var bodyBFixtures = this.fixtures[sprite2.anims.currentFrame.frame.name].fixtures;

            if(bodyAFixtures.length > 0 && bodyBFixtures.length > 0){
                var bodyBfixture = this.matter.bounds.create(
                    this.adjustForAbsolutePosition(sprite2, bodyBFixtures[0])
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
                        this.adjustForAbsolutePosition(sprite1, bodyAFixtures[i])
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
    }

    /**
     * Check for the collision of a matter sprite body with a matter body
     * @param {Matter.Sprite} sprite1 
     * @param {Matter.Body} body1
     */
    checkForSpriteToBodyCollision(sprite1, body1){
        if(body1.x - sprite1.body.bounds.max.x < 40 && body1.x > sprite1.x && body1.velocity != 0){
            if(sprite1.anims.currentFrame && this.fixtures[sprite1.anims.currentFrame.frame.name]){
              var bodyAFixtures = this.fixtures[sprite1.anims.currentFrame.frame.name].fixtures;
              var bodyBFixtures = this.fixtures['vase'].fixtures;
              //if both bodies have fixtures
              if(bodyAFixtures.length > 0 && bodyBFixtures.length > 0){
                  var bodyBfixture = this.matter.bounds.create(
                      this.adjustForAbsolutePosition(body1, bodyBFixtures[0])
                  );

                  //loop over every fixture to test for collision (foot, body, head, leg)
                  var hit = false;
                  var collided = false;
                  var fixtureLocation = null;
                  for(var i=0; i<bodyAFixtures.length; i++){
                      hit = bodyAFixtures[i].isSensor;
                      fixtureLocation = bodyAFixtures[i].label;
                      var bodyAfixture = this.matter.bounds.create(
                          this.adjustForAbsolutePosition(sprite1, bodyAFixtures[i])
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