//DECLARE global variables
let center, player, gameStarted, playerControls;

import playerImageSrc from "../assets/player_9mm.png";

class Game extends Phaser.Scene {
    preload() {
        this.load.image("player", playerImageSrc);
    }

    create() {
        center = {
            x:this.physics.world.bounds.width / 2,
            y:this.physics.world.bounds.height / 2
        }

        player = this.physics.add.sprite(center.x, center.y, "player");

        gameStarted = true; //Set this to the startgame button on the menu
        
        //Initialise playerControls with directions mapped to arrow keys
        playerControls = this.input.keyboard.createCursorKeys();

        //Remap WASD keys to up, down, left and right
        playerControls = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
    }

    update() {
        if (gameStarted) {
            if (playerControls.left.isDown) {
                player.setVelocityX(-160);
            }
            else if (playerControls.right.isDown) {
                player.setVelocityX(160);
            } else {
                player.setVelocityX(0);
            } 

            if (playerControls.up.isDown) {
                player.setVelocityY(-160);
            } 
            else if (playerControls.down.isDown) {
                player.setVelocityY(160);
            } else {
                player.setVelocityY(0);
            }
        }
    }
}
//FUNCTIONS THAT THE GAME USES GO DOWN HERE

export default Game;