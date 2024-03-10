import { Bird } from "../Bird";
import { Pipe } from "../Pipe";
import Score from "../Score";
import { scenes, sizes } from "../const/configs";
import { ClickableText } from "../reusables/ClickableText";

export class GameScene extends Phaser.Scene {
  bird: Bird;
  pipes: Pipe[];
  bottomBoundry: Phaser.Physics.Arcade.Sprite;
  pipesEvent: Phaser.Time.TimerEvent;
  score: Score;
  scoreText: Phaser.GameObjects.Text;
  restartText: ClickableText;
  backButton: Phaser.GameObjects.Image;

  private keys: {
    spacebar: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super(scenes.gameScene);
    this.pipes = [];
  }

  create() {
    this.initBg();
    this.initBird();
    this.initBottomBoundry();
    this.initKeys();
    this.initScore();
    this.initPipesEvent();
    this.initColliders();
  }

  update() {}

  initBg() {
    this.add.image(0, 0, "sky").setOrigin(0);
  }

  initBird() {
    this.bird = new Bird(this);
  }

  initBottomBoundry() {
    this.bottomBoundry = this.physics.add.sprite(
      sizes.width / 2,
      sizes.height,
      ""
    );
    this.bottomBoundry.setSize(sizes.width, 1);
  }

  initKeys() {
    this.input.on("pointerdown", this.bird.flap, this.bird);

    this.keys = {
      spacebar: (
        this.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin
      ).addKey("SPACE"),
    };

    this.keys.spacebar.on("down", this.bird.flap, this.bird);
  }

  initPipesEvent() {
    const latestVelocity = this.score.getPipeVelocityX();

    if (this.pipesEvent) this.pipesEvent.destroy();

    this.pipesEvent = this.time.addEvent({
      delay: 1000 * this.score.getPipepawnDelay(),
      callback: () => {
        this.createPairOfPipes();

        const currentPipesCount = this.pipes.length;

        if (currentPipesCount > 0) {
          const latestPipeBody = this.pipes[currentPipesCount - 1]
            .body as Phaser.Physics.Arcade.Body;

          const didVelocityChange =
            Math.abs(latestPipeBody.velocity.x) !== latestVelocity;

          if (didVelocityChange) {
            this.updatePipesVelocity(latestVelocity);
            this.initPipesEvent();
          }
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  initColliders() {
    this.physics.add.collider(
      this.bird,
      this.pipes,
      this.gameOver,
      undefined,
      this
    );

    this.physics.add.collider(
      this.bird,
      this.bottomBoundry,
      this.gameOver,
      undefined,
      this
    );
  }

  initScore() {
    this.score = new Score(this);
  }

  createPairOfPipes() {
    const dynamicVelocityX = this.score.getPipeVelocityX();
    this.pipes.push(new Pipe(this, dynamicVelocityX, true));
    this.pipes.push(new Pipe(this, dynamicVelocityX));
  }

  updatePipesVelocity(velocity: number) {
    this.pipes.forEach((pipe) => {
      //pipe might be destroyed at thi point
      const pipeBody = pipe?.body as Phaser.Physics.Arcade.Body | null;

      pipeBody?.setVelocityX(-velocity);
    });
  }

  gameOver() {
    console.log("game over!");
    this.physics.pause();
    this.score.stopScoreEvent();
    this.stopPipesDestroyEvent();
    this.score.updateScoresHistory();

    this.time.addEvent({
      delay: 1000,
      callback: this.initGameOverButtons,
      callbackScope: this,
      loop: false,
    });
  }

  initGameOverButtons() {
    this.initBackButton();
    this.initRestartText();
  }

  initBackButton() {
    this.backButton = this.add
      .image(sizes.width - 10, sizes.height - 10, "back")
      .setOrigin(1)
      .setScale(2)
      .setInteractive()
      .on("pointerup", () => {
        this.scene.start(scenes.menuScene);
      });
  }

  initRestartText() {
    const center: [number, number] = [
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
    ];

    this.restartText = new ClickableText(this, ...center, "Restart", () =>
      this.scene.restart()
    );
  }

  stopPipesDestroyEvent() {
    this.pipes.forEach((pipe) => pipe.destroyEvent.destroy());
  }
}
