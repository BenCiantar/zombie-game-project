//Declare global variables
let center, player, gameStarted, playerControls, basicZombie;

import playerImageSrc from "../assets/player_9mm.png";
import bgImageSrc from "../assets/bg-mud.png";
import zombieAtlas from "../assets/zombiebasic.json";
import zombiePng from "../assets/zombiebasic.png";


class Game extends Phaser.Scene {
    preload() {
        this.load.image("player", playerImageSrc);
        this.load.image("bg", bgImageSrc);
        this.input.maxPointers = 1; //Only allow one cursor input
        this.load.multiatlas("zombiebasic", zombieAtlas, zombiePng);
    }

    create() {
        center = {
            x:this.physics.world.bounds.width / 2,
            y:this.physics.world.bounds.height / 2
        };

        //Creates repeating tile background
        this.add.tileSprite(0, 0, center.x * 4, center.y * 4, "bg");

        player = this.physics.add.sprite(center.x, center.y, "player");
        player.setCollideWorldBounds(true);
        player.body.setSize(22, 22);
        player.setOffset(24, 19);

        //When cursor is moved, run function to update sprite to face it
        this.input.on('pointermove', turn, this);

        gameStarted = true; //Set this to the startgame button on the menu
        
        //Initialise playerControls with directions mapped to arrow keys
        playerControls = this.input.keyboard.createCursorKeys();

        //Remap WASD keys to up, down, left and right
        playerControls = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});
       
        

        this.anims.create({key: "zombiebasic", 
            frames: [
                {key: "zombiebasic", frame: "zombiebasic1.png"},
                {key: "zombiebasic", frame: "zombiebasic2.png"},
                {key: "zombiebasic", frame: "zombiebasic3.png"},
                {key: "zombiebasic", frame: "zombiebasic4.png"},
                {key: "zombiebasic", frame: "zombiebasic5.png"},
                {key: "zombiebasic", frame: "zombiebasic6.png"},
            ], 
            frameRate: 7, 
            repeat: -1
        })

        basicZombie = this.physics.add.sprite(center.x - 100, center.y - 100, "zombiebasic");
        basicZombie.setScale(0.65);
        basicZombie.anims.play("zombiebasic");

        
    }

    update() {
        if (gameStarted) {

            this.physics.moveToObject(basicZombie, player, 70);

            //Listen for player movement inputs
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

        this.physics.add.collider(player, basicZombie, bounce, null, this);


    }
}

export default Game;

//Get the angle between player position and cursor position, then turn player to face cursor
//Triggers whenever cursor is moved
const turn = function (pointer) {
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(
            player.x, 
            player.y, 
            pointer.x, 
            pointer.y);

        player.setAngle(angle);
    }

    function bounce(player, basicZombie) {
        player.setVelocity(0.1);
        basicZombie.setVelocity(0.1);

    }