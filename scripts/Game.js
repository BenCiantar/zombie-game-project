//Declare global variables
let positions, player, gameStarted, playerControls, zombies, fastZombies, thisGame, roofs;


import playerImageSrc from "../assets/player_9mm.png";
import bgImageSrc from "../assets/bg-mud.png";
import zombieAtlas from "../assets/zombiebasic.json";
import zombiePng from "../assets/zombiebasic.png";
import bulletPng from "../assets/flaming_bullet.png";
import carPng from "../assets/car.png";
import roof1ImageSrc from "../assets/roof1.jpg";
import roof2ImageSrc from "../assets/roof2.jpg";




class Game extends Phaser.Scene {
    constructor() { 
        super({key: 'GameScene'}); 
    }

    preload() {
        this.load.image("player", playerImageSrc);
        this.load.image("bg", bgImageSrc);
        this.input.maxPointers = 1; //Only allow one cursor input
        this.load.multiatlas("zombiebasic", zombieAtlas, zombiePng);
        this.load.image("flaming_bullet", bulletPng);
        this.load.image("car", carPng);
        this.load.image("roof1", roof1ImageSrc);
        this.load.image("roof2", roof2ImageSrc);
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
        player.body.setSize(22, 25);
        player.setOffset(24, 19);
        
        this.roofs = this.add.group();

        let roof1 = this.add.tileSprite(140, 500, 1 * 280, 1 * 250,"roof1");
        this.physics.add.existing(roof1, true);
        this.roofs.add(roof1);

        let roof2 = this.add.tileSprite(1100, 200, 1 * 190, 1 * 312,"roof2");
        this.physics.add.existing(roof2, true);
        this.roofs.add(roof2);

        this.cars = this.add.group();

        let car1 = this.add.sprite(600, 300, "car");
        this.physics.add.existing(car1, true);
        this.cars.add(car1);

        let car2 = this.add.sprite(1300, 600, "car");
        this.physics.add.existing(car2, true);
        car2.rotation = 200;
        this.cars.add(car2);
        
        //When cursor is moved, run function to update sprite to face it
        this.input.on('pointermove', turnPlayer, this);

        gameStarted = true; //Set this to the startgame button on the menu
        
        //Initialise playerControls with directions mapped to arrow keys
        playerControls = this.input.keyboard.createCursorKeys();

        //Remap WASD keys to up, down, left and right
        playerControls = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,});
       
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
        zombies = this.physics.add.group();
        fastZombies = this.physics.add.group();
    }

    update() {
        if (gameStarted) {
            this.physics.add.collider(player, zombies.getChildren(), bounce, null, this);
            this.physics.add.collider(player, fastZombies.getChildren(), bounce, null, this);
            this.physics.add.collider(this.roofs, player);
            this.physics.add.collider(this.cars, player);
            
            // this.physics.add.collider(zombies.getChildren(), zombies.getChildren(), bounce, null, this);
            //Add collision for enemies?

            //Listen for key inputs for shooting
            // if (playerControls.space.isDown) {
            //     game.add.image(10,10, 'bullet');
            // }
            //Listen for player movement inputs
            if (playerControls.left.isDown) {
                player.setVelocityX(-160);
                turnZombies(zombies);
                turnZombies(fastZombies);
            }
            else if (playerControls.right.isDown) {
                player.setVelocityX(160);
                turnZombies(zombies);
                turnZombies(fastZombies);
            } else {
                player.setVelocityX(0);
                turnZombies(zombies);
                turnZombies(fastZombies);
            } 

            if (playerControls.up.isDown) {
                player.setVelocityY(-160);
                turnZombies(zombies);
                turnZombies(fastZombies);
            } 
            else if (playerControls.down.isDown) {
                player.setVelocityY(160);
                turnZombies(zombies);
                turnZombies(fastZombies);
            } else {
                player.setVelocityY(0);
                turnZombies(zombies);
                turnZombies(fastZombies);
            }

            let randomZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomZombieSpawn > 900) {
                chooseZombieDirection(zombies, "zombiebasic");
            }

            let randomFastZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomFastZombieSpawn > 990) {
                chooseZombieDirection(fastZombies, "zombiebasic");
            }
            moveAllZombies();
        }
    }
}

export default Game;

//Get the angle between player position and cursor position, then turn player to face cursor
//Triggers whenever cursor is moved
const turnPlayer = function (pointer) {
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(
            player.x, 
            player.y, 
            pointer.x, 
            pointer.y);

        player.setAngle(angle);
    }


const turnZombies = function (type) {
    type.getChildren().forEach(function(item) {
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(
            item.x, 
            item.y, 
            player.x, 
            player.y);

    item.setAngle(angle + 90);
    })
}


function bounce(player, zombie) {
    player.setVelocity(0.1);
    zombie.setVelocity(0.1);
    this.scene.start('GameOverScene');
}

function moveAllZombies() {
    Phaser.Utils.Array.Each(
        zombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 70)

    Phaser.Utils.Array.Each(
        fastZombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 150)
}

function chooseZombieDirection(type, ref) {
    let randomDirection = Math.floor(Math.random() * 4);

    let distanceFromEdge = 20;
    let randomPosX = Math.floor(Math.random() * positions.rightEdge);
    let randomPosY = Math.floor(Math.random() * positions.bottomEdge);

    if (randomDirection == 0) {
        spawnZombie(type, ref, randomPosX, (positions.topEdge - distanceFromEdge));
    } else if (randomDirection == 1) {
        spawnZombie(type, ref, (positions.rightEdge + distanceFromEdge), randomPosY);
    } else if (randomDirection == 2) {
        spawnZombie(type, ref, randomPosX, (positions.bottomEdge + distanceFromEdge));
    } else if (randomDirection == 3) {
        spawnZombie(type, ref, (positions.leftEdge - distanceFromEdge), randomPosY);
    }
}

function spawnZombie(type, ref, posX, posY){
    let newZombie = type.create(posX, posY, ref).setScale(0.65);
    newZombie.anims.play(ref);
}