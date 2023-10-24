import { Application, BitmapText } from "pixi.js";
import { AssetLoader, constants } from "../";

const { FONT_NAME, FONT_SIZE } = constants.fonts;

export class BitText {
  private app: Application;
  private textElement: BitmapText | null = null;
  private x: number;
  private y: number;
  private anchorQueue: [number, number][] = [];

  constructor(app: Application, x: number, y: number, initialText: string) {
    this.app = app;
    this.x = x;
    this.y = y;
    this.init(initialText);
  }

  private async init(initialText: string) {
    await this.loadFont();
    this.createTextElement(initialText);
    this.setPosition();
    this.setZindex();
    this.addToStage();
    this.processAnchorQueue();
  }

  private async loadFont() {
    const assetLoader = AssetLoader.getInstance();
    await assetLoader.getAsset("font");
  }

  private createTextElement(text: string) {
    this.textElement = new BitmapText(text, {
      fontName: FONT_NAME,
      fontSize: FONT_SIZE,
    });
  }

  private setPosition() {
    if (!this.textElement) {
      console.error("Cannot set position. Missing the text element.");
      return;
    }

    this.textElement.x = this.x;
    this.textElement.y = this.y;
  }

  private setZindex() {
    if (this.textElement) {
      this.textElement.zIndex = 5;
    }
  }

  private addToStage() {
    if (this.textElement) {
      this.app.stage.addChild(this.textElement);
    }
  }

  private processAnchorQueue() {
    if (!this.textElement) {
      console.error(
        "Cannot process the anchor queue. Missing the text element."
      );
      return;
    }
    this.anchorQueue.forEach(([x, y]) => this.textElement!.anchor.set(x, y));
    this.anchorQueue = [];
  }

  setAnchor(x: number, y: number) {
    if (this.textElement) {
      this.textElement.anchor.set(x, y);
    } else {
      this.anchorQueue.push([x, y]);
    }
  }

  updateText(newText: string) {
    if (this.textElement) {
      this.textElement.text = newText;
    }
  }

  remove() {
    if (this.textElement) {
      this.app.stage.removeChild(this.textElement);
    }
  }
}
