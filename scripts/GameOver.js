//Declare global variables
let positions, thisGameOver, gameOverText, playAgainButton;

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

        gameOverText = this.add.text(positions.centerX, positions.centerY - 30, 'Game Over!', { 
            fill: '#FFFFFF', 
            fontSize: 50,
            color: "#FFFFFF",
        }).setOrigin(0.5);

        playAgainButton = this.add.text(positions.centerX, positions.centerY + 30, 'Play again?', { 
            fill: '#FFFFFF', 
            fontSize: 30,
            color: "#FFFFFF",
        }).setOrigin(0.5);

        playAgainButton.setInteractive({ useHandCursor: true  });

        playAgainButton.on('pointerover', () => { console.log('add highlight animation'); });
        playAgainButton.on('pointerout', () => { console.log('remove highlight animation'); });
        playAgainButton.on('pointerdown', () => { console.log('add pressing animation'); });
        playAgainButton.on('pointerup', () => { this.scene.start('GameScene'); });
    }


    update() {
        
    }
    
}

export default GameOver;


