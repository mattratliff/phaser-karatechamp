const moves = require('../config/moves.json');

/**
 * BehaviorManager
 * Moves the ai player based on a behavior model defined within this class
 */
export default class BehaviorManager{
    constructor(player) {
        this.player = player;
    }
    update(){
        this.player.play("red-frontkick", true);
    }
}