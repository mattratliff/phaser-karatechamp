// var jsonQuery = require('json-query')
const fixtures = require('../assets/fixtures.json');


export default class CollisionSystem{
    constructor(matter){
        this.fixtures = fixtures;
        this.matter = matter;
        this.buffer = 15;  //offset to handle velocity
    }

    checkCollision(player, vase){
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