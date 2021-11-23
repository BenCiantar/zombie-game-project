//Declare global variables
let positions, player, gameStarted, playerControls, basicZombie, zombies, thisGame;

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
        thisGame = this;
        positions = {
            centerX: this.physics.world.bounds.width / 2,
            centerY: this.physics.world.bounds.height / 2,
            topEdge: 0,
            rightEdge: this.physics.world.bounds.width,
            bottomEdge: this.physics.world.bounds.height,
            leftEdge: 0
        };

        //Creates repeating tile background
        this.add.tileSprite(0, 0, positions.centerX * 4, positions.centerY * 4, "bg");

        player = this.physics.add.sprite(positions.centerX, positions.centerY, "player");
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
        });
        // spawnZombie(this, basicZombie, "zombiebasic");
        zombies = this.physics.add.group();

        // basicZombie = this.physics.add.sprite(positions.centerX - 100, positions.centerY - 100, "zombiebasic");
        // basicZombie.setScale(0.65);
        // basicZombie.anims.play("zombiebasic");

    }

    update() {
        if (gameStarted) {

            // this.physics.moveToObject(basicZombie, player, 70);
            this.physics.add.collider(player, zombies.getChildren(), bounce, null, this);

            //Listen for player movement inputs
            if (playerControls.left.isDown) {
                player.setVelocityX(-160);
                turnZombies(player);
            }
            else if (playerControls.right.isDown) {
                player.setVelocityX(160);
                turnZombies(player);
            } else {
                player.setVelocityX(0);
                turnZombies(player);
            } 

            if (playerControls.up.isDown) {
                player.setVelocityY(-160);
                turnZombies(player);
            } 
            else if (playerControls.down.isDown) {
                player.setVelocityY(160);
                turnZombies(player);
            } else {
                player.setVelocityY(0);
                turnZombies(player);
            }

            let randomZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomZombieSpawn > 900) {
                addZombies();
            }
        }
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

const turnZombies = function (playerPos) {

    zombies.getChildren().forEach(function(item) {
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(
            item.x, 
            item.y, 
            player.x, 
            player.y);
    
        item.setAngle(angle + 90);
    }, thisGame);
}

//Collision event between player and zombies
function bounce(player, zombie) {
    player.setVelocity(0.1);
    zombie.setVelocity(0.1);
}


function addZombies() {
    spawnZombie()

    Phaser.Utils.Array.Each(
        zombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 70)
//  Phaser.Utils.Array.Each(
    //  zombies.getChildren.anims.play("zombiebasic")
//    )
}

function spawnZombie() {

    let randomDirection = Math.floor(Math.random() * 4);
    if (randomDirection == 0) {
        zombies.create((Math.floor(Math.random() * positions.rightEdge)), positions.topEdge - 20, "zombiebasic").setScale(0.65);

    } else if (randomDirection == 1) {
        zombies.create(positions.rightEdge + 20, (Math.floor(Math.random() * positions.bottomEdge)), "zombiebasic").setScale(0.65);

    } else if (randomDirection == 2) {
        zombies.create((Math.floor(Math.random() * positions.rightEdge)), positions.bottomEdge + 20, "zombiebasic").setScale(0.65);

    } else if (randomDirection == 3) {
        zombies.create(positions.leftEdge - 20, (Math.floor(Math.random() * positions.bottomEdge)), "zombiebasic").setScale(0.65);

    }
}