//Declare global variables
let positions, thisMenu, backgroundMusicIntro;

import logoImgSrc from "../assets/logo13.png";
import menuMusic from "url:../assets/Audio/backgroundSuspenseMusic.mp3";
import wasdPng from "../assets/wasd.png";
import mousePng from "../assets/mouse.png";



class Menu extends Phaser.Scene {
    constructor() { 
        super({key: 'MenuScene'}); 
    }


    preload() {
        this.load.image("logo", logoImgSrc);
        this.load.audio("backgroundSuspenseMusic", menuMusic);
        this.load.image("wasd", wasdPng);
        this.load.image("mouse", mousePng);

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

        thisMenu = this;

    //menu music
    backgroundMusicIntro = this.sound.add("backgroundSuspenseMusic", {loop:true});
    backgroundMusicIntro.play();


    const logo = this.add.image(positions.centerX, positions.centerY - 100, "logo");
    logo.setScale(1.2);

    const wasd = this.add.image(positions.centerX -650, positions.centerY + 300, "wasd");
    wasd.setScale(.18)
    wasd.setAlpha(.8);

    const clickHere = this.add.image(positions.centerX +700, positions.centerY + 300, "mouse");
    clickHere.setScale(.3)
    clickHere.setAlpha(.8);

    const startGameButton = this.add.text(positions.centerX, positions.centerY + 150, 'Start Game!', { 
        fill: '#FFFFFF', 
        fontSize: 50,
        color: "#FFFFFF",
    }).setOrigin(0.5);

    startGameButton.setInteractive({ useHandCursor: true  });
    startGameButton.on('pointerup', () => { this.scene.start('GameScene'); });
    startGameButton.on('pointerup', () => { backgroundMusicIntro.stop(); });
    };


    update() {
        
    }
    
}

export default Menu;