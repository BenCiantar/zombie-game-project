import Phaser from 'phaser';

import Menu from "./Menu.js";
import Game from "./Game.js";
import GameOver from "./GameOver.js";

const bodyId = document.getElementById("bodyId");

var config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 800,
  scale: {
    parent: bodyId,

    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

    // Minimum size
    min: {
        width: 800,
        height: 400
    },

    zoom: 1,  // Size of game canvas = game size * zoom
},
  scene: [ Menu, Game, GameOver ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      // debug: true
    },
  },
};

new Phaser.Game(config);