import { Application, Assets, BitmapText } from "pixi.js";
import { constants } from "./constants";

const { FONT_NAME, FONT_SIZE } = constants.fonts;

export class Text {
  private app: Application;
  private textElement: BitmapText | null = null;
  private x: number;
  private y: number;
  private anchorQueue: [number, number][] = [];
  private sizeQueue: [number, number][] = [];

  constructor(app: Application, x: number, y: number, initialText: string) {
    this.app = app;
    this.x = x;
    this.y = y;
    this.init(initialText);
  }

  private init(initialText: string) {
    Assets.load("font").then(() => {
      this.textElement = new BitmapText(initialText, {
        fontName: FONT_NAME,
        fontSize: FONT_SIZE,
      });

      this.textElement.x = this.x;
      this.textElement.y = this.y;
      this.app.stage.addChild(this.textElement);

      while (this.anchorQueue.length) {
        const anchor = this.anchorQueue.shift();
        if (anchor) {
          const [x, y] = anchor;
          this.textElement.anchor.set(x, y);
        }
      }
    });
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
}
