//DECLARE global variables
let center, player;

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

    }

    update() {

    }
}
//FUNCTIONS THAT THE GAME USES GO DOWN HERE

export default Game;