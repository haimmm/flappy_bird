import Phaser from "phaser"; // Adjust the path as needed
import { GameScene } from "./scenes/GameScene";
import { sprites } from "./const/configs";
import { Pipe } from "./Pipe";

export default class Score extends Phaser.GameObjects.Text {
  private static readonly STYLES = {
    fontSize: "32px",
    fill: "#000",
  };

  private static readonly position: [number, number] = [16, 16];

  private readonly maxScoresHistory = 10;
  private readonly MAX_PIPES_VELOCITY = 500;

  private score: number;
  scoreEvent: Phaser.Time.TimerEvent;

  constructor(scene: GameScene) {
    super(scene, Score.position[0], Score.position[1], "", Score.STYLES);
    this.score = 0;
    this.setText(`Score: ${this.score}`);
    this.setDepth(1);
    this.scoreEvent = this.startScoreEvent();
    scene.add.existing(this);
  }

  increaseScore() {
    this.score += 1;
    this.setText(`Score: ${this.score}`);
  }

  startScoreEvent() {
    return this.scene.time.addEvent({
      delay: 100,
      callback: this.increaseScore,
      callbackScope: this,
      loop: true,
    });
  }

  stopScoreEvent() {
    this.scoreEvent.destroy();
  }

  getPipeVelocityX() {
    const minVelocity = sprites.pipe.velocity[0];
    const maxVelocity = this.MAX_PIPES_VELOCITY;

    const velocityMultiplier = Math.floor(this.score / 100);

    const velocity = minVelocity + velocityMultiplier * 10;

    return Math.min(Math.max(minVelocity, velocity), maxVelocity);
  }

  getPipepawnDelay() {
    const velocity = this.getPipeVelocityX();
    const delay = Pipe.DISTANCE_BETWEEN_PIPES / velocity;

    return delay;
  }

  updateScoresHistory() {
    const recentScore = this.score;
    let didScoresHistoryChange = false;
    const scoresHistory = Score.getScoresHistory();

    for (let i = 0; i <= scoresHistory.length; i++) {
      if (scoresHistory[i] <= recentScore) {
        //prevent scores duplicates
        if (scoresHistory[i] < recentScore) {
          scoresHistory.splice(i, 0, recentScore);
        }
        didScoresHistoryChange = true;
        break;
      }
    }

    const isScoresHistoryFull = scoresHistory.length >= this.maxScoresHistory;

    if (!didScoresHistoryChange && !isScoresHistoryFull) {
      scoresHistory.push(recentScore);
      didScoresHistoryChange = true;
    }

    scoresHistory.splice(this.maxScoresHistory);

    if (didScoresHistoryChange) {
      localStorage.setItem("scoresHistory", JSON.stringify(scoresHistory));
    }
  }

  static getScoresHistory() {
    let scoresHistory: null | string | Array<number> =
      localStorage.getItem("scoresHistory");

    if (typeof scoresHistory === "string") {
      scoresHistory = JSON.parse(scoresHistory);
    }

    if (!Array.isArray(scoresHistory)) {
      scoresHistory = [];
    }

    return scoresHistory;
  }
}
