import { Application, Assets, BitmapText } from "pixi.js";

import { constants } from "./constants";

const { FONT_NAME, FONT_SIZE } = constants.fonts;

export class AmmoCounter {
  private app: Application;
  private ammoText: BitmapText | null = null;
  private ammoCount: number = 10;

  constructor(app: Application) {
    this.app = app;
    this.init();
  }

  private init() {
    Assets.load("font").then(() => {
      this.ammoText = new BitmapText(`Ammo: ${this.ammoCount} / 10`, {
        fontName: FONT_NAME,
        fontSize: FONT_SIZE,
      });

      this.ammoText.anchor.set(0.0, 0);
      this.ammoText.x = 0 + this.ammoText.textWidth / 2 - 130;
      this.ammoText.y = this.ammoText.textHeight + 20;

      this.app.stage.addChild(this.ammoText);
    });
  }

  decrementAmmoCount() {
    this.ammoCount--;
    this.updateAmmoText();
  }

  getAmmoCount() {
    return this.ammoCount;
  }

  private updateAmmoText() {
    if (this.ammoText) {
      if (this.ammoCount < 0) {
        this.ammoText.text = `You lose - out of ammo!`;
        setTimeout(() => {
          this.app.ticker.stop();
        }, 10);
      } else {
        this.ammoText.text = `Ammo: ${this.ammoCount} / 10`;
      }
    }
  }
}
