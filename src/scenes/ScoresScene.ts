import Score from "../Score";
import { scenes, sizes } from "../const/configs";

export class ScoresScene extends Phaser.Scene {
  verticalMenuItemsPadding = 30;
  scores: Phaser.GameObjects.Text[] = [];
  backButton: Phaser.GameObjects.Image;

  scoresStyles: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: "20px",
    color: "#FFF",
  };

  constructor() {
    super(scenes.scoresScene);
  }

  preload() {}

  create() {
    this.initBg();
    this.initScores();
    this.initBackButton();
  }

  update() {}

  initBg() {
    this.add.image(0, 0, "sky").setOrigin(0);
  }

  initScores() {
    const scores = Score.getScoresHistory();

    const center = [this.game.canvas.width / 2, this.game.canvas.height / 2];

    let nextScoreY =
      center[1] - (this.verticalMenuItemsPadding * scores.length) / 2;

    const isScoresCountEven = scores.length % 2 === 0;

    if (isScoresCountEven) nextScoreY += this.verticalMenuItemsPadding / 2;

    scores.forEach((score, i) => {
      this.scores.push(
        this.add
          .text(center[0], nextScoreY, `${i + 1}. ${score}`, this.scoresStyles)
          .setOrigin()
      );

      nextScoreY += this.verticalMenuItemsPadding;
    });
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
}
