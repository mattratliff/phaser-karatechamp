var jsonQuery = require('json-query')
const fixtures = require('../assets/white/fixtures.json');


export default class CollisionSystem{
    constructor(matter){
        this.fixtures = fixtures;
        this.matter = matter;
    }

    checkCollision(player, vase){
        if(player.anims.currentFrame){
            var bodyAFixtures = jsonQuery('[*label='+player.anims.currentFrame.frame.name+'].fixtures', {data: this.fixtures}).value;
            var bodyBFixtures = jsonQuery('[*label=vase].fixtures', {data: this.fixtures}).value;
            
            //if both bodies have fixtures
            if(bodyAFixtures.length > 0 && bodyBFixtures.length > 0){

                var bodyAfixture = this.matter.bounds.create(
                    this.adjustForAbsolutePosition(player, bodyAFixtures)
                );
                var bodyBfixture = this.matter.bounds.create(
                    this.adjustForAbsolutePosition(vase, bodyBFixtures)
                );

                return this.matter.bounds.overlaps(bodyAfixture, bodyBfixture);
            }
            else{
                return false;   //not playing a hit animation
            }
        }
        else{
            return false;  //player not moving
        }
    }

    adjustForAbsolutePosition(gameObject, gameObjectFixtures){
        var points = [];
        for(var i=0; i<gameObjectFixtures[0].vertices[0].length; i++){
            var point = {
                x: gameObjectFixtures[0].vertices[0][i].x + gameObject.body.bounds.min.x-15,
                y: gameObjectFixtures[0].vertices[0][i].y + gameObject.body.bounds.min.y
            };
            points.push(point);
        }
        return points;
    }
}