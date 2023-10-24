import { Application, Graphics, Text } from "pixi.js";

export class StartButton {
  private button: Graphics;

  constructor(private app: Application, label: string, x: number, y: number) {
    this.button = new Graphics();
    this.button.beginFill(0xff06b5);
    this.button.drawRect(0, 0, 200, 50);
    this.button.endFill();
    this.button.x = x;
    this.button.y = y;
    this.button.eventMode = "static";
    this.button.cursor = "pointer";

    const buttonText = new Text(label, { fill: "white" });
    buttonText.x = (this.button.width - buttonText.width) / 2; // Center text
    buttonText.y = (this.button.height - buttonText.height) / 2;

    this.button.addChild(buttonText);
    this.app.stage.addChild(this.button);
  }

  set zIndex(value: number) {
    this.button.zIndex = value;
  }

  get zIndex() {
    return this.button.zIndex;
  }

  public remove() {
    this.button.removeAllListeners();
    this.app.stage.removeChild(this.button);
  }

  // For event handling
  public on(event: string, fn: () => void) {
    this.button.on(event, fn);
  }
}
