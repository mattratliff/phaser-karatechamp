/**
 * Manages game sessions
 */
export default class GameSessionManager{
    constructor() {
        this.gamestate = 0;
      }
    createSession(){
        this.gamestate = 1;
    }
    endSession(){
        this.gamestate = 0;
    }
}