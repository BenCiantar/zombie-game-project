//Declare global variables
let positions, player, gameStarted, playerControls, zombies, fastZombies, thisGame, bullet, timeText, timer;


//Import assets
import playerImageSrc from "../assets/player_9mm.png";
import bgImageSrc from "../assets/bg-mud.png";
import zombieAtlas from "../assets/zombiebasic.json";
import zombiePng from "../assets/zombiebasic.png";
import bulletPng from "../assets/flaming_bullet.png";
import carPng from "../assets/car.png";
import roof1ImageSrc from "../assets/roof1.jpg";
import roof2ImageSrc from "../assets/roof2.jpg";
import treePng from "../assets/tree.png";
import tree2Png from "../assets/tree2.png"
import treeShadowPng from "../assets/treeshadow.png"


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
        this.load.image("tree", treePng);
        this.load.image("tree2", tree2Png);
        this.load.image("shadow", treeShadowPng);

    }

    create() {
        gameStarted = true; //Set this to the startgame button on the menu
        thisGame = this;
        //Create object that contains helpful positions
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

////////// ROOFS //////////
        
        this.roofs = this.add.group();

        let roof1 = this.add.tileSprite(120, 500, 1 * 280, 1 * 250, "roof1");

        this.physics.add.existing(roof1, true);
        this.roofs.add(roof1);

        let roof2 = this.add.tileSprite(1100, 200, 1 * 190, 1 * 312, "roof2");
        this.physics.add.existing(roof2, true);
        this.roofs.add(roof2);

////////// CARS //////////
      
        this.cars = this.add.group();

        let car1 = this.add.sprite(600, 300, "car");
        this.physics.add.existing(car1, true);
        this.cars.add(car1);

        let car2 = this.add.sprite(1300, 600, "car");
        this.physics.add.existing(car2, true);
        this.cars.add(car2);

////////// TREES //////////

        let treeBottomLeft1 = this.add.sprite(60, 670, "tree");
        this.physics.add.existing(treeBottomLeft1, true);
        treeBottomLeft1.setDepth(1)

        let treeBottomLeft2 = this.add.sprite(350, 620, "tree2");
        this.physics.add.existing(treeBottomLeft2, true);
        treeBottomLeft2.setDepth(1)
            let shadow1 = this.add.sprite(370, 610, "shadow");
            this.physics.add.existing(shadow1, true);
            shadow1.setScale(1.05);

        let treeMiddle = this.add.sprite(970, 390, "tree");
        this.physics.add.existing(treeMiddle, true);
        treeMiddle.setDepth(1)
            let shadow2 = this.add.sprite(980, 400, "shadow");
            this.physics.add.existing(shadow2, true);
            shadow2.setScale(.7);

        let treeTopRight1 = this.add.sprite(1400, 150, "tree");
        this.physics.add.existing(treeTopRight1, true);
        treeTopRight1.setDepth(1);

        let treeTopRight2 = this.add.sprite(1500, 200, "tree2");
        this.physics.add.existing(treeTopRight2, true);
        treeTopRight2.setDepth(1);
            let shadow3 = this.add.sprite(1500, 230, "shadow");
            this.physics.add.existing(shadow3, true);

        let treeTopLeft1 = this.add.sprite(60, 50, "tree");
        this.physics.add.existing(treeTopLeft1, true);
        treeTopLeft1.setDepth(1);
        treeTopLeft1.setScale(1.5);
            let shadow4 = this.add.sprite(70, 70, "shadow");
            this.physics.add.existing(shadow4, true);
        
        let treeTopLeft2 = this.add.sprite(180, 30, "tree2");
        this.physics.add.existing(treeTopLeft2, true);
        treeTopLeft2.setDepth(1);
            let shadow5 = this.add.sprite(190, 50, "shadow");
            this.physics.add.existing(shadow5, true);

////////// TIMER TEXT //////////

        var timeTextStyle = {font: "32px", fill: '#FFFFFF', stroke: '#000', strokeThickness: 4}; 
        timeText = this.add.text(60,60, "Time Survived: ", timeTextStyle); //Elapsed Time Text
        timeText.setDepth(1);
      
////////// PLAYER //////////

        //Create the player and set attributes
        player = this.physics.add.sprite(positions.centerX, positions.centerY, "player");
        player.setCollideWorldBounds(true);
        player.body.setCircle(10);
        player.setOffset(25, 25);
      
        //When cursor is moved, run function to update sprite to face it
        this.input.on('pointermove', turnPlayer, this);
        
        //Initialise playerControls with directions mapped to arrow keys
        playerControls = this.input.keyboard.createCursorKeys();

        //Remap WASD keys to up, down, left and right
        playerControls = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,});

        //Fire bullet on click
        this.input.on('pointerdown', fireBullet, this); 
      
   ////////// ZOMBIES //////////   
       
        //Zombie walk animation
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


        //Create zombie groups
        zombies = this.physics.add.group();
        fastZombies = this.physics.add.group();

        //Initialise variables for game timer
        this.resources = 0;
        this.timer = 0;
    }

    update(time, delta) {
        if (gameStarted) {
        
        timeText.setText("Time Survived: " + this.resources + " seconds"); 
     
        //Count time between frames and add them together, then add one to seconds when ms reaches 1000
        this.timer += delta;
        if (this.timer > 1000) {
            this.resources += 1;
            this.timer -= 1000;
        }

        //Update timer
        timeText.setText("Time Survived: " + this.resources + " seconds"); 
        
      
 ////////// COLLIDERS //////////
      
        this.physics.add.collider(player, zombies.getChildren(), bounce, null, this);
        this.physics.add.collider(player, fastZombies.getChildren(), bounce, null, this);

        this.physics.add.collider(this.cars, player);
        this.physics.add.collider(this.cars, zombies.getChildren());
        this.physics.add.collider(this.cars, fastZombies.getChildren());

        this.physics.add.collider(this.roofs, player);
        this.physics.add.collider(this.roofs, zombies.getChildren());
        this.physics.add.collider(this.roofs, fastZombies.getChildren());

        this.physics.add.collider(this.roofs, bullet, function (roof, bullet) {
            bullet.destroy();
        });

 ////////// CREATING HORDE //////////

        this.physics.add.collider(this.cars, bullet, function () {

            let randomDirectionHorde = (Math.floor(Math.random() * 3));

            for (let i = 0; i < 20; i++) {
                if (randomDirectionHorde == 0) {
                    let posX = positions.centerX - (Math.floor(Math.random() * 100));
                    let posY = -100 + (Math.floor(Math.random() * 200));
                    spawnZombieHorde(zombies, "zombiebasic", posY, posX);
                    bullet.destroy();
                } else if (randomDirectionHorde == 1) {
                    let posX = positions.rightEdge + 100 + (Math.floor(Math.random() * 100));
                    let posY = positions.centerY - (Math.floor(Math.random() * 100));
                    spawnZombieHorde(zombies, "zombiebasic", posY, posX);
                    bullet.destroy();
                } else if (randomDirectionHorde == 2) {
                    let posX = positions.centerX - (Math.floor(Math.random() * 200));
                    let posY = 100 + (Math.floor(Math.random() * 100));
                    spawnZombieHorde(zombies, "zombiebasic", posY, posX);
                    bullet.destroy();
                } 
            }
        });

        thisGame.physics.add.collider([zombies], bullet, function (zombie, bullet) {
            zombie.destroy();
            bullet.destroy();
        });

        thisGame.physics.add.collider([fastZombies], bullet, function (zombie, bullet) {
            zombie.destroy();
            bullet.destroy();
        });
        



////////// MOVEMENT //////////
      
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
      
////////// SPAWNING //////////

            let randomZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomZombieSpawn > 970) {
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

////////// FUNCTIONS //////////

//Get the angle between player position and cursor position, then turn player to face cursor
const turnPlayer = function (pointer) {
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(
            player.x, 
            player.y, 
            pointer.x, 
            pointer.y);

        player.setAngle(angle);
    }

//Turn zombies to face player direction on move
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

//Collision event for player and zombies
function bounce(player, zombie) {
    this.scene.start('GameOverScene');
}

//Move all players toward player
function moveAllZombies() {
    Phaser.Utils.Array.Each(
        zombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 70)

    Phaser.Utils.Array.Each(
        fastZombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 150)
}

//Pick a random position for zombies to spawn
function chooseZombieDirection(type, ref) {
    let randomDirection = Math.floor(Math.random() * 4);

    let distanceFromEdge = 20;
    let randomPosX = Math.floor(Math.random() * positions.rightEdge);
    let randomPosY = Math.floor(Math.random() * positions.bottomEdge);
    let halfRandomPosY = Math.floor(Math.random() * (positions.bottomEdge / 2));


    if (randomDirection == 0) {
        spawnZombie(type, ref, randomPosX, (positions.topEdge - distanceFromEdge));
    } else if (randomDirection == 1) {
        spawnZombie(type, ref, (positions.rightEdge + distanceFromEdge), randomPosY);
    } else if (randomDirection == 2) {
        spawnZombie(type, ref, randomPosX, (positions.bottomEdge + distanceFromEdge));
    } else if (randomDirection == 3) {
        spawnZombie(type, ref, (positions.leftEdge - distanceFromEdge), halfRandomPosY);
    }
}

//Create a zombie when called
function spawnZombie(type, ref, posX, posY){
    let newZombie = type.create(posX, posY, ref).setScale(0.65);
    newZombie.anims.play(ref);
    newZombie.body.setCircle(20);
    newZombie.setOffset(5, 5);
}

function spawnZombieHorde(type, ref, posX, posY){
    let newZombie = type.create(posX, posY, ref).setScale(0.65);
    newZombie.anims.play(ref);
    newZombie.body.setCircle(20);
    newZombie.setOffset(5, 5);
}

//Create and launch a bullet
function fireBullet() {
    let y = 500 * Math.sin((Math.PI * 2 * player.angle) / 360);
    let x = 500 * Math.cos((Math.PI * 2 * player.angle) / 360);

    bullet = thisGame.physics.add.sprite(player.x, player.y, "flaming_bullet")
    bullet.setVelocity(x, y);

    //newZombie.anchor.set(2);

    //let zombieShadow = type.create(posX, posY, ref).setScale(0.65);
    //zombieShadow.anchor.set(2);
    //zombieShadow.tint = 0x000000;
    //zombieShadow.alpha = 0.6;
}