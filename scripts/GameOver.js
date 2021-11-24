//Declare global variables
let positions, thisGameOver, gameOverText;

class GameOver extends Phaser.Scene {
    constructor() { 
        super({key: 'GameOverScene'}); 
    }

     preload() {

    }


    create() {
        positions = {
            centerX: this.physics.world.bounds.width / 2,
            centerY: this.physics.world.bounds.height / 2,
            topEdge: 0,
            rightEdge: this.physics.world.bounds.width,
            bottomEdge: this.physics.world.bounds.height,
            leftEdge: 0
        };

        thisGameOver = this;

        gameOverText = this.add.text(positions.centerX, positions.centerY, 'Game Over!', { 
            fill: '#FFFFFF', 
            fontSize: 50,
            color: "#FFFFFF",
        }).setOrigin(0.5);
    }


    update() {
        
    }
    
}

export default GameOver;


