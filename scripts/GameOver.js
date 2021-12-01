//Declare global variables
let positions, time, thisGameOver, gameOverText, timeSurvivedText, playAgainButton, timePlayerSurvived;

class GameOver extends Phaser.Scene {
    constructor() { 
        super({key: 'GameOverScene'}); 
    }

// This uploads the variable timePlayerSurvived from game.js
    init(data) {
        timePlayerSurvived = data.timePlayerSurvived

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

        timeSurvivedText = this.add.text(positions.centerX, positions.centerY -150, 'You survived ' + timePlayerSurvived + ' seconds', { 
            fill: '#FFFFFF', 
            fontSize: 50,
            color: "#FFFFFF",
        }).setOrigin(0.5);

        playAgainButton = this.add.text(positions.centerX, positions.centerY -0, 'Play again!', { 
            fill: '#FFFFFF', 
            fontSize: 90,
            color: "#FFFFFF",
        }).setOrigin(0.5);

        playAgainButton.setInteractive({ useHandCursor: true  });
        playAgainButton.on('pointerup', () => { this.scene.start('GameScene'); });
    }


    update() {
        
    }
    
}

export default GameOver;


