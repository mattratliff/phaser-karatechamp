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
            if(bodyAFixtures.length > 0){
                //need to add player.x to each x coordinate in vertices
                var points = [];
                for(var i=0; i<bodyAFixtures[0].vertices[0].length; i++){
                    var point = {
                        x: bodyAFixtures[0].vertices[0][i].x + player.body.bounds.min.x - 15,
                        y: bodyAFixtures[0].vertices[0][i].y + player.body.bounds.min.y
                    };
                    points.push(point);
                }
                var bodyAfixture = this.matter.bounds.create(points);
                var bodyBfixture = this.matter.bounds.create([vase.body.bounds.min, vase.body.bounds.max]);

                return this.matter.bounds.overlaps(bodyBfixture, bodyAfixture);
            }
            else{
                return false;
            }
        }
        else{
            //if no animations are playing
            return false;
        }
    }
}