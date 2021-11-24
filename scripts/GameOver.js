//Declare global variables
let thisGameOver;

class GameOver extends Phaser.Scene {
    constructor() { 
        super({key: 'GameOverScene'}); 
    }
    
    preload() {

    }

    
    create() {
        thisGameOver = this;

    }


    update() {
        
    }
    
}

export default GameOver;


