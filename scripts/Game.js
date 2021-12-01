//Declare global variables
let timedEvent, zombieDies3, zombieDies2, zombieDies, gunshotSound, hordeScream, fasterShorterZombieAudio3, fasterShorterZombieAudio2, fasterShorterZombieAudio, fasterZombieAudio, standardZombieLong, standardZombie, zombieHorde, carAlarm, playBells, positions, player, gameStarted, playerControls, zombies, fastZombies, blobZombies, thisGame, bullet, timeText, currentTime = 0, lastHordeTime = 0, timer, timePlayerSurvived;



//Import assets
import playerImageSrc from "../assets/player_9mm.png";
import bgImageSrc from "../assets/bg-mud.png";
// import zombiePng from "../assets/zombiebasic.png";
import bulletPng from "../assets/blue_bullet.png";
import carPng from "../assets/car.png";
import roof1ImageSrc from "../assets/roof1.jpg";
import roof2ImageSrc from "../assets/roof2.jpg";
import treePng from "../assets/tree.png";
import tree2Png from "../assets/tree2.png";
import treeShadowPng from "../assets/treeshadow.png";
import gunShot from "url:../assets/Audio/gunshotSound.mp3"
import zombieAtlas from "../assets/zombiebasic.json";
import smokeParticle from "../assets/smoke_particle.png";
import bloodParticle from "../assets/blood_drop.png";


import bellsAudio from "url:../assets/Bells.mp3";
import carAlarmAudio from "url:../assets/car-alarm.mp3";
import zombieHordeAudio from "url:../assets/zombie-horde.mp3";
import standardZombieAudio from "url:../assets/breathing-zombie.mp3";
import longerStandardZombieAudio from "url:../assets/breathing-zombie-long.mp3";
import aggressiveZombieAudio from "url:../assets/aggressive-zombie.mp3";
import shortZombieAudio from "url:../assets/short-attack.mp3";
import shortZombieAudio2 from "url:../assets/short-attack-2.mp3";
import shortZombieAudio3 from "url:../assets/short-attack-3.mp3";
import hordeScreamAudio from "url:../assets/horde-scream.mp3";
import gunshotAudio from "url:../assets/gunshotSound.mp3";
import zombieDiesAudio from "url:../assets/ZombieDies.mp3";
import zombieDiesAudio2 from "url:../assets/ZombieDies2.mp3";
import zombieDiesAudio3 from "url:../assets/ZombieDies3.mp3";

class Game extends Phaser.Scene {
    constructor() { 
        super({key: 'GameScene'}); 
    }

    preload() {
        this.input.maxPointers = 1; //Only allow one cursor input

        this.load.image("player", playerImageSrc);
        this.load.image("bg", bgImageSrc);
        this.load.image("blue_bullet", bulletPng);
        this.load.image("car", carPng);
        this.load.image("roof1", roof1ImageSrc);
        this.load.image("roof2", roof2ImageSrc);
        this.load.image("tree", treePng);
        this.load.image("tree2", tree2Png);
        this.load.image("shadow", treeShadowPng);
        this.load.image("smoke", smokeParticle);
        this.load.image("blood", bloodParticle);

        //Audios
        this.load.audio("gunshotSound", gunShot);



        //Something else xd juajua haha xDXXDXDXDXD

        this.load.multiatlas(
            "zombiebasic",
            "./assets/zombiebasic.json",
            "assets"
          );

        this.load.audio('bells', bellsAudio);
        this.load.audio("carAlarm", carAlarmAudio);
        this.load.audio("zombieHorde", zombieHordeAudio);
        this.load.audio("standardZombie", standardZombieAudio);
        this.load.audio("longerStandardZombie", longerStandardZombieAudio);
        this.load.audio("fasterZombieAudio", aggressiveZombieAudio);
        this.load.audio("fasterZombie1", shortZombieAudio);
        this.load.audio("fasterZombie2", shortZombieAudio2);
        this.load.audio("fasterZombie3", shortZombieAudio3);
        this.load.audio("hordeScream", hordeScreamAudio);
        this.load.audio("gunshot", gunshotAudio);
        this.load.audio("zombieDies", zombieDiesAudio);
        this.load.audio("zombieDies2", zombieDiesAudio2);
        this.load.audio("zombieDies3", zombieDiesAudio3);
    }

    create() {
        gameStarted = true; //Set this to the startgame button on the menu
        thisGame = this;

        //Fixing the audio for the menu:
        


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

        //Create sounds
        gunshotSound = this.sound.add("gunshotSound", {loop:false, volume:0.05});
        carAlarm = this.sound.add("carAlarm", {loop: false}, {volume: 1});
        zombieHorde = this.sound.add("zombieHorde", { loop: false}, {volume: 4});
        standardZombie = this.sound.add("standardZombie", { loop: false}, {volume: .2});
        standardZombieLong = this.sound.add("longerStandardZombie", { loop: true}, {volume: .3});
        fasterZombieAudio = this.sound.add("fasterZombieAudio", { loop: false}, {volume: .2});
        fasterShorterZombieAudio = this.sound.add("fasterZombie1", { loop: false}, {volume: .2});
        fasterShorterZombieAudio2 = this.sound.add("fasterZombie2", { loop: false}, {volume: .2});
        fasterShorterZombieAudio3 = this.sound.add("fasterZombie3", { loop: false}, {volume: .2});
        hordeScream = this.sound.add("hordeScream", { loop: false}, {volume: 1});
        gunshotSound = this.sound.add("gunshot", { loop: false}, {volume: .05});
        zombieDies = this.sound.add("zombieDies", { loop: false});
        zombieDies2 = this.sound.add("zombieDies2", { loop: false});
        zombieDies3 = this.sound.add("zombieDies3", { loop: false});


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
        blobZombies = this.physics.add.group();
        standardZombieLong.play();


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
            this.physics.add.collider(player, blobZombies.getChildren(), bounce, null, this);

            this.physics.add.collider(this.cars, player);
            this.physics.add.collider(this.cars, zombies.getChildren());
            this.physics.add.collider(this.cars, fastZombies.getChildren());
            this.physics.add.collider(this.cars, blobZombies.getChildren());

            this.physics.add.collider(this.roofs, player);
            this.physics.add.collider(this.roofs, zombies.getChildren());
            this.physics.add.collider(this.roofs, fastZombies.getChildren());
            this.physics.add.collider(this.roofs, blobZombies.getChildren());

            this.physics.add.collider(this.roofs, bullet, function (roof, bullet) {
                bullet.destroy();
            });

 ////////// CREATING HORDE //////////
            currentTime = this.resources;
            this.physics.add.collider(this.cars, bullet, function () {
                
                carAlarm.play();


                let randomDirectionHorde = (Math.floor(Math.random() * 3));
                let spread = 200;
                let halfSpread = spread / 2;
                let distanceOffscreen = 180;
                let negDistanceOffscreen = -180;
                bullet.destroy();
                if (lastHordeTime == 0 || currentTime >= (lastHordeTime + 20)) {
                    lastHordeTime = currentTime;
                    for (let i = 0; i < 15; i++) {
                        if (randomDirectionHorde == 0) {
                            let posX = positions.centerX + halfSpread - (Math.floor(Math.random() * spread));
                            let posY = negDistanceOffscreen + (Math.floor(Math.random() * spread));
                            spawnZombieHorde(zombies, "zombiebasic", posX, posY);
                            console.log("horde")
                        } else if (randomDirectionHorde == 1) {
                            let posX = positions.rightEdge + distanceOffscreen + (Math.floor(Math.random() * spread));
                            let posY = positions.centerY + halfSpread - (Math.floor(Math.random() * spread));
                            spawnZombieHorde(zombies, "zombiebasic", posX, posY);
                            console.log("horde")
                        } else if (randomDirectionHorde == 2) {
                            let posX = positions.centerX + halfSpread - (Math.floor(Math.random() * spread));
                            let posY = positions.bottomEdge + distanceOffscreen - (Math.floor(Math.random() * spread));
                            spawnZombieHorde(zombies, "zombiebasic", posX, posY);
                            console.log("horde")
                        } 
                    }
                    
                }
            });

            thisGame.physics.add.collider([zombies], bullet, function (zombie, bullet) {
                zombie.destroy();
                bullet.destroy();
                
                let randomNumber = Math.floor(Math.random() * 2); 
                if (randomNumber == 0) {
                    zombieDies.play();
                } else if (randomNumber == 1) {
                    zombieDies2.play();
                } else if (randomNumber == 2) {
                    zombieDies3.play();
                }
                
                let emitter;
                emitter = thisGame.add.particles('blood').setDepth(9).createEmitter({
                    x: zombie.x,
                    y: zombie.y,
                    scale: 0.2,
                    speed: { min: -100, max: 100 },
                    scale: { start: 0.7, end: 0.3 },
                    blendMode: 'ADD',
                    maxParticles: 30,
                    tint: [ 0x980002 ],
                });
            });

            thisGame.physics.add.collider([fastZombies], bullet, function (zombie, bullet) {
                zombie.destroy();
                bullet.destroy();

                let randomNumber = Math.floor(Math.random() * 2); 
                    if (randomNumber == 0) {
                        zombieDies.play();
                    } else if (randomNumber == 1) {
                        zombieDies2.play();
                    } else if (randomNumber == 2) {
                        zombieDies3.play();
                    } 

                let emitter;
                emitter = thisGame.add.particles('blood').setDepth(9).createEmitter({
                    x: zombie.x,
                    y: zombie.y,
                    scale: 0.1,
                    speed: { min: -100, max: 100 },
                    scale: { start: 0.7, end: 0.3 },
                    blendMode: 'ADD',
                    maxParticles: 20,
                    tint: [ 0x980002 ],
                });
            });

            thisGame.physics.add.collider([blobZombies], bullet, function (zombie, bullet) {
                zombie.destroy();
                bullet.destroy();
                zombieDies.play();
                let emitter;
                emitter = thisGame.add.particles('smoke').setDepth(10).createEmitter({
                    x: zombie.x,
                    y: zombie.y,
                    speed: { min: -700, max: 700 },
                    scale: { start: 0.3, end: 0.7 },
                    blendMode: 'ADD',
                    alpha: 0.7,
                    maxParticles: 120,
                    lifespan: 2000,
                    tint: [ 0xa3c010 ],
                });
                emitter.maxParticles = 70;
            });

////////// MOVEMENT //////////
      
            if (playerControls.left.isDown) {
                player.setVelocityX(-160);
                turnZombies(zombies);
                turnZombies(fastZombies);
                turnZombies(blobZombies);
            }
            else if (playerControls.right.isDown) {
                player.setVelocityX(160);
                turnZombies(zombies);
                turnZombies(fastZombies);
                turnZombies(blobZombies);
            } else {
                player.setVelocityX(0);
                turnZombies(zombies);
                turnZombies(fastZombies);
                turnZombies(blobZombies);
            } 

            if (playerControls.up.isDown) {
                player.setVelocityY(-160);
                turnZombies(zombies);
                turnZombies(fastZombies);
                turnZombies(blobZombies);
            } 
            else if (playerControls.down.isDown) {
                player.setVelocityY(160);
                turnZombies(zombies);
                turnZombies(fastZombies);
                turnZombies(blobZombies);
            } else {
                player.setVelocityY(0);
                turnZombies(zombies);
                turnZombies(fastZombies);
                turnZombies(blobZombies);
            }
      
////////// SPAWNING //////////

            let randomZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomZombieSpawn > 970) {
                chooseZombieDirection(zombies, "zombiebasic");
                
            }

            let randomFastZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomFastZombieSpawn > 993) {
                chooseZombieDirection(fastZombies, "zombiebasic");
                let randomNumber = Math.floor(Math.random() * 4); 
                if (randomNumber == 0) {
                    fasterShorterZombieAudio.play()
                } else if (randomNumber == 1) {
                    fasterShorterZombieAudio2.play()
                } else if (randomNumber == 2) {
                    fasterShorterZombieAudio3.play()
                } else if (randomNumber == 3) {
                    fasterZombieAudio.play()
                }   
            }

            let randomBlobZombieSpawn = (Math.floor(Math.random() * 1000));
            if (randomBlobZombieSpawn > 996) {
                chooseZombieDirection(blobZombies, "zombiebasic");

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
    this.scene.start('GameOverScene', {timePlayerSurvived : this.resources})
    standardZombieLong.pause();
    zombieHorde.pause();
    carAlarm.pause();
    fasterShorterZombieAudio.pause();
}


        
//Move all players toward player
function moveAllZombies() {
    Phaser.Utils.Array.Each(
        zombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 70)

    Phaser.Utils.Array.Each(
        fastZombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 150)

    Phaser.Utils.Array.Each(
        blobZombies.getChildren(), thisGame.physics.moveToObject, thisGame.physics, player, 30)
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
        spawnZombie(type, ref, (positions.leftEdge - distanceFromEdge), halfRandomPosY - 30);
    }
}

//Create a zombie when called
function spawnZombie(type, ref, posX, posY){
    let newZombie = type.get(posX, posY, ref).setScale(0.65);
    newZombie.anims.play(ref);
    newZombie.body.setCircle(20);
    newZombie.setOffset(5, 5);
    
    if (blobZombies.contains(newZombie)) {
        newZombie.setScale(1.2);
        newZombie.setTint(0xa3c010);
    };

    if (fastZombies.contains(newZombie)) {
        newZombie.setScale(0.4);
        newZombie.setTint(0xd0e429);
    };
}

function spawnZombieHorde(type, ref, posX, posY){
    let newZombie = type.get(posX, posY, ref).setScale(0.65);
    newZombie.anims.play(ref);
    newZombie.body.setCircle(20);
    newZombie.setOffset(5, 5);

    zombieHorde.play();
    hordeScream.play();
}


//Create and launch a bullet
function fireBullet() {

    gunshotSound.play();

    let y = 800 * Math.sin((Math.PI * 2 * player.angle) / 360);
    let x = 800 * Math.cos((Math.PI * 2 * player.angle) / 360);


    bullet = thisGame.physics.add.sprite(player.x, player.y, "blue_bullet").setScale(1.2);
    bullet.setVelocity(x, y);
}

