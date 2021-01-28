//Class that handles all of the collision between game objects
// check for collision and then determines the nature of the collision pass back the result

// import blockingframes from '../config/blocking.json';
// import hitframes from '../config/hitframes.json';
//  var fixtures = require('../assets/white/frontkick.json');
var jsonQuery = require('json-query')
const json = require('../assets/white/frontkick.json');


export default class CollisionSystem{
    constructor(matter){
        this.fixtures = json;
        this.matter = matter;
        console.log("matter = ");
        console.log(this.matter);
    }
    

    checkCollision(pair){
        console.log("fixtures = "+this.fixtures);

        if(!pair.bodyA.gameObject)
            return null;

        if(pair.bodyA.gameObject.anims.currentFrame){
            var keyframe = pair.bodyA.gameObject.anims.currentFrame.frame.name;
            var fixtures = jsonQuery('[*label='+keyframe+'].fixtures', {data: this.fixtures}).value;
            //if the animation frame isnt the one we're looking for
            


            if(fixtures){
                var vertices = fixtures[0].vertices[0];
                var fixture = this.matter.bounds.create(vertices);

                var vert2 = [pair.bodyB.bounds.min, pair.bodyB.bounds.max];
                var fixture2 = this.matter.bounds.create(vert2);

                console.log(fixture);
                console.log(fixture2);

                console.log(this.matter.bounds.overlaps(fixture, fixture2));

                // console.log(vertices);
                return {object: "vase", animation: ""};
            }
            else{
                return {object: "player", animation: ""};
            }
        }
        else{
            //if no animations are playing
            return {object: "player", animation: ""};
        }
    }
}