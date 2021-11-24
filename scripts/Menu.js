//Declare global variables
let thisMenu, text;

class Menu extends Phaser.Scene {
    constructor() { 
        super({key: 'MenuScene'}); 
    }
    
    preload() {

    }


    create() {
        thisMenu = this;

        text = this.add.text(
            640, 
            360, 
            "Hello World", 
            {
                fontSize: 50,
                color: "#FFFFFF",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    }


    update() {
        
    }
    
}

export default Menu;


