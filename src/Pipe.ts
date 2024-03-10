import { GameScene } from "./scenes/GameScene";
import { sizes, sprites } from "./const/configs";

type lastPipeProps = {
  y: number;
  colorIndex: number;
};

export class Pipe extends Phaser.Physics.Arcade.Sprite {
  private travelTimeInSeconds: number;
  private isBottomPipe: boolean;
  private static lastPipeProps: lastPipeProps = {
    y: 0,
    colorIndex: 0,
  };

  private static readonly BOTTOM_PIPE_HEIGHT_RANGE: [number, number] = [
    250,
    sizes.height - 50,
  ];

  private static readonly PIPES_GAPE_RANGE: [number, number] = [100, 200];

  private static readonly PIPE_SCALE = [2, 1];

  static readonly DISTANCE_BETWEEN_PIPES = 250;

  scene: GameScene;

  destroyEvent: Phaser.Time.TimerEvent;

  constructor(scene: GameScene, velocityX: number, isBottomPipe = false) {
    super(scene, sprites.pipe.position[0], sprites.pipe.position[1], "pipe");

    this.scene = scene;

    this.isBottomPipe = isBottomPipe;

    this.travelTimeInSeconds =
      (this.width * 3 + sizes.width) / sprites.pipe.velocity[0];

    this.setFrame(this.getPipeRandomColorIndex());
    this.setScale(Pipe.PIPE_SCALE[0], Pipe.PIPE_SCALE[1]);
    this.setX(sizes.width + this.width);
    this.setY(this.getPipeHeight());
    this.setOrigin(0);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable();

    (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-velocityX);

    this.setDelayedDestroy();
  }

  getPipeHeight(): number {
    const pipeHeight = this.isBottomPipe
      ? Phaser.Math.Between(...Pipe.BOTTOM_PIPE_HEIGHT_RANGE)
      : Pipe.lastPipeProps.y -
        this.height -
        Phaser.Math.Between(...Pipe.PIPES_GAPE_RANGE);

    Pipe.lastPipeProps.y = pipeHeight;
    return pipeHeight;
  }

  getPipeRandomColorIndex(): number {
    const pipeColorGrid = sprites.pipe.image.grid;

    const colorIndex: number = this.isBottomPipe
      ? Math.floor(Math.random() * pipeColorGrid.columns * pipeColorGrid.rows)
      : Pipe.lastPipeProps.colorIndex;

    Pipe.lastPipeProps.colorIndex = colorIndex;

    return colorIndex;
  }

  setDelayedDestroy(): void {
    this.destroyEvent = this.scene.time.delayedCall(
      this.travelTimeInSeconds * 1000,
      () => {
        this.scene.pipes.filter((pipe) => pipe !== this);
        this.destroy();
      },
      [],
      this
    );
  }
}
