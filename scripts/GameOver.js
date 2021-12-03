//Declare global variables
let positions, time, thisGameOver, gameOverText, timeSurvivedText, playAgainButton, timePlayerSurvived, scoresArray, highestScoreText;

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
        createScoresArray();
        
        positions = {
            centerX: this.physics.world.bounds.width / 2,
            centerY: this.physics.world.bounds.height / 2,
            topEdge: 0,
            rightEdge: this.physics.world.bounds.width,
            bottomEdge: this.physics.world.bounds.height,
            leftEdge: 0
        };

        thisGameOver = this;

        timeSurvivedText = this.add.text(positions.centerX, positions.centerY -150, 'You survived: ' + timePlayerSurvived + ' seconds', { 
            fill: '#72BC65', 
            fontSize: 50,
            color: "#FFFFFF",
        }).setOrigin(0.5);

        highestScoreText = this.add.text(positions.centerX, positions.centerY -220, "Highest score: " + getHighestScore() + " seconds", {
            fill: '#E2E2E2', 
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

function createScoresArray() {
    scoresArray = JSON.parse(localStorage.getItem("scoresArrayLocal")); 
  }

function getHighestScore() {
    let max = Math.max(...scoresArray);
    return max;
}

export default GameOver;


