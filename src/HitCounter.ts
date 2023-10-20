import { Application, Assets, BitmapText } from "pixi.js";

import { constants } from "./constants";

const { FONT_NAME, FONT_SIZE } = constants.fonts;

export class HitCounter {
  private app: Application;
  private hitText: BitmapText | null = null;
  private hitCount: number = 0;

  constructor(app: Application) {
    this.app = app;
    this.init();
  }

  private init() {
    Assets.load("font").then(() => {
      this.hitText = new BitmapText(`Hits: ${this.hitCount}`, {
        fontName: FONT_NAME,
        fontSize: FONT_SIZE,
      });

      this.hitText.anchor.set(0.0, 0);
      this.hitText.x = 0 + this.hitText.textWidth / 2 - 40;
      this.hitText.y = 10;

      this.app.stage.addChild(this.hitText);
    });
  }

  incrementHitCount() {
    this.hitCount++;
    this.updateHitText();
  }

  getHitCount() {
    return this.hitCount;
  }

  private updateHitText() {
    if (this.hitText) {
      if (this.hitCount >= 8) {
        this.hitText.text = `Hits: ${this.hitCount} You win!`;
        this.app.ticker.stop();
      } else {
        this.hitText.text = `Hits: ${this.hitCount}`;
      }
    }
  }
}
