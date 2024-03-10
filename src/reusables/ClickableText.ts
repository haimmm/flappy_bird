type textStyles = {
  static: Phaser.Types.GameObjects.Text.TextStyle;
  onHover: Phaser.Types.GameObjects.Text.TextStyle;
};

export class ClickableText extends Phaser.GameObjects.Text {
  textStyles: textStyles;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick: () => void,
    config?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    const defaultStyles: textStyles = {
      static: { fontSize: "32px", color: "#FFF" },
      onHover: { color: "#ff0" },
    };

    if (config) {
      defaultStyles.static = config;
    }

    super(scene, x, y, text, defaultStyles.static);
    scene.add.existing(this);
    this.setOrigin();
    this.setInteractive();

    this.textStyles = defaultStyles;

    this.on("pointerover", this.onPointerHover, this)
      .on("pointerout", this.onPointerUnhover, this)
      .on("pointerup", onClick, this.scene);
  }

  onPointerHover() {
    this.setStyle(this.textStyles.onHover);
  }

  onPointerUnhover() {
    this.setStyle(this.textStyles.static);
  }
}
