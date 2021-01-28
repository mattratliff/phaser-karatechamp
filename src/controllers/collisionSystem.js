//Class that handles all of the collision between game objects
// check for collision and then determines the nature of the collision pass back the result

import blockingframes from '../config/blocking.json';
import hitframes from '../config/hitframes.json';
var jsonQuery = require('json-query')

export default class CollisionSystem{
    constructor(){
        // this.hitframes = 
    }

    checkCollision(pair){
        if(!pair.bodyA.gameObject)
            return null;

        if(pair.bodyA.gameObject.anims.currentFrame){
            var key = pair.bodyA.gameObject.anims.currentAnim.key;
            var keyframe = pair.bodyA.gameObject.anims.currentFrame.frame.name;
            var frames = jsonQuery('[*label='+key+'].hitframes', {data: hitframes}).value;

            //if the animation frame isnt the one we're looking for
            if(frames.includes(keyframe)){
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