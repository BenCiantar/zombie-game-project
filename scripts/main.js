import Phaser from 'phaser';

import Menu from "./Menu.js";
import Game from "./Game.js";
import GameOver from "./GameOver.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [ Game ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
    },
  },
};

new Phaser.Game(config);