var jsonQuery = require('json-query')
const fixtures = require('../assets/fixtures.json');


export default class CollisionSystem{
    constructor(matter){
        this.fixtures = fixtures;
        this.matter = matter;
    }

    checkCollision(player, vase){
        if(player.anims.currentFrame){
            console.log(player.anims.currentFrame.frame.name);
            var bodyAFixtures = jsonQuery('[*label='+player.anims.currentFrame.frame.name+'].fixtures', {data: this.fixtures}).value;
            var bodyBFixtures = jsonQuery('[*label=vase].fixtures', {data: this.fixtures}).value;
            
            console.log(player);
            console.log(bodyAFixtures);
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
                    console.log("location = ", fixtureLocation);
                    

                    var bodyAfixture = this.matter.bounds.create(
                        this.adjustForAbsolutePosition(player, bodyAFixtures[i])
                    );
                    collided = this.matter.bounds.overlaps(bodyAfixture, bodyBfixture);
                    if(collided)
                        break;
                }
                console.log('collision = '+collided);
                console.log("hit = "+hit);
                console.log("location = ", fixtureLocation);

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
                x: fixtureSet.vertices[0][i].x + gameObject.body.bounds.min.x-15,
                y: fixtureSet.vertices[0][i].y + gameObject.body.bounds.min.y
            };
            points.push(point);
        }
        return points;
    }
}