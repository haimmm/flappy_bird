import { sprites } from "./const/configs";

export class Bird extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, sprites.bird.position[0], sprites.bird.position[1], "bird");
    this.setScale(2);
    this.setFlipX(true);
    this.setOrigin(sprites.bird.origin[0]);

    this.scene.anims.create({
      key: "fly",
      frames: this.scene.anims.generateFrameNumbers("bird", {
        start: 8,
        end: 15,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.play("fly");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setGravityY(sprites.bird.gravity[1]);
    this.setCollideWorldBounds(true);
  }

  flap(): void {
    (this.body as Phaser.Physics.Arcade.Body).setVelocityY(
      -sprites.bird.velocity[1]
    );
  }

  resetPosition(): void {
    this.setPosition(...sprites.bird.position);
    (this.body as Phaser.Physics.Arcade.Body).setVelocityY(0);
  }
}
