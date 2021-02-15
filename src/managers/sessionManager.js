/**
 * Manages game state and timers
 * Game start, in progress, stopped
 * Timers
 * Who wins
 * Scoring system (updating score board)
 */
const GameState = {
    NEW: "New",
    INPROGRESS: "In Progress",
    COMPLETE: "Completed"
};

export default class SessionManager{
    constructor(scene) {
        this.scene = scene;
        this.useTimer = false;

        //set by board config
        this.timerAmount = 0;
        this.timerstarted = false;
        this.timerOffset = {"x": 0, "y": 0};

        this.gameState = GameState.NEW
        this.sceneCallback = null;

        //game objects
        this.teacher = null;
        this.whiteplayer = null;
        this.redplayer = null;
    }

    setGameObjects(teacher, whiteplayer, redplayer){
        this.teacher = teacher;
        this.whiteplayer = whiteplayer;
        this.redplayer = redplayer;
    }
    getCurrentState(){
        return this.gameState;
    }
    setState(newstate){
        this.gameState = newstate;
    }

    setCallbackOnComplete(callback){
        this.sceneCallback = callback;
    }
    setTimerLocation(offset){
        this.timerOffset = offset;
    }

    createTimer(x, y, SCALE){
        this.timerText = this.scene.add.text(x+parseInt(this.timerOffset.x), y+parseInt(this.timerOffset.y), this.timerAmount.toString(), {fill: '#ffffff',font: `${16 * SCALE}pt Silom`});
    }
    startTimer(){
        if(this.timerAmount == 0){
            this.gameState = GameState.COMPLETE;
            this.sceneCallback(this.teacher, this.whiteplayer);
        }else{
          this.timerAmount -= 1;
          this.timerText.setText(this.timerAmount);
          this.scene.time.delayedCall(1000, this.startTimer, [], this);
        }
    }
}