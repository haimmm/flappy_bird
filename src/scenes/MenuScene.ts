import { scenes } from "../const/configs";
import { ClickableText } from "../reusables/ClickableText";

type menuItem = {
  scene: (typeof scenes)[keyof typeof scenes];
  text: string;
  gameObject?: ClickableText;
};

export class MenuScene extends Phaser.Scene {
  private menu: menuItem[];

  private readonly verticalMenuItemsPadding = 50;

  constructor() {
    super(scenes.menuScene);

    this.menu = [
      { scene: scenes.gameScene, text: "Play" },
      {
        scene: scenes.scoresScene,
        text: "Scores",
      },
    ];
  }

  create() {
    this.initBg();
    this.initMenu();
  }

  update() {}

  initBg() {
    this.add.image(0, 0, "sky").setOrigin(0);
  }

  initMenu() {
    const center = [this.game.canvas.width / 2, this.game.canvas.height / 2];

    let nextMenuItemY =
      center[1] - (this.verticalMenuItemsPadding * this.menu.length) / 2;

    const isMenuItemsCountEven = this.menu.length % 2 === 0;

    if (isMenuItemsCountEven)
      nextMenuItemY += this.verticalMenuItemsPadding / 2;

    this.menu.forEach((menuItem) => {
      menuItem.gameObject = new ClickableText(
        this,
        center[0],
        nextMenuItemY,
        menuItem.text,
        () => {
          this.scene.start(menuItem.scene);
        }
      );
      nextMenuItemY += this.verticalMenuItemsPadding;
    });
  }
}
