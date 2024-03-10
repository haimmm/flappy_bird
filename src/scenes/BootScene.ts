import { scenes, sprites } from "../const/configs";

export class BootScene extends Phaser.Scene {
  constructor() {
    super(scenes.bootScene);
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("back", "assets/back.png");

    this.load.spritesheet("bird", "assets/birdSprite.png", {
      frameWidth: sprites.bird.image.width,
      frameHeight: sprites.bird.image.height,
    });

    const pipesImgData = sprites.pipe.image;

    this.load.spritesheet("pipe", "assets/pipes.png", {
      frameWidth: pipesImgData.width / pipesImgData.grid.columns,
      frameHeight: pipesImgData.height / pipesImgData.grid.rows,
    });
  }

  create() {
    this.scene.start(scenes.menuScene);
  }

  update() {}
}
