import Phaser from "phaser";
import { sizes } from "./const/configs";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";
import { BootScene } from "./scenes/BootScene";
import { ScoresScene } from "./scenes/ScoresScene";

//auto imported by Phaser
declare let gameCanvas: HTMLCanvasElement;

const config = {
  type: Phaser.WEBGL,
  ...sizes,
  canvas: gameCanvas,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
    },
  },
  scene: [BootScene, MenuScene, GameScene, ScoresScene],
};

//start the game
new Phaser.Game(config);
