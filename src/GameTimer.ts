import { Application, Assets, BitmapText } from "pixi.js";

import { constants } from "./constants";

const { GAME_TIME } = constants.timers;
const { FONT_SIZE, FONT_NAME } = constants.fonts;

export class GameTimer {
  app: Application;
  bitmapText: BitmapText | null = null;
  gameTime: number = GAME_TIME + 1; // +1 for human-intuitive calculation (61 to 1);
  startTime: number | null = null;
  gameEnded: boolean = false;

  constructor(app: Application) {
    this.app = app;
    this.init();
  }

  private init() {
    Assets.load("font").then(() => {
      this.bitmapText = new BitmapText(`Time: ${this.gameTime} seconds`, {
        fontName: FONT_NAME,
        fontSize: FONT_SIZE,
      });
      this.bitmapText.anchor.set(0.5, 0);
      this.bitmapText.x =
        this.app.screen.width - this.bitmapText.textWidth / 2 - 20;
      this.startTime = Date.now();

      this.app.stage.addChild(this.bitmapText);
    });
  }

  private checkGameStatus(elapsedTime: number) {
    if (this.bitmapText) {
      switch (true) {
        case this.gameTime < elapsedTime + 1: // for human-intuitive calculation (61 to 1);
          this.bitmapText.text = `You lost`;
          this.gameEnded = true;
          this.app.ticker.stop();
          break;
        default:
          const remainingTime = Math.max(0, this.gameTime - elapsedTime);
          this.bitmapText.text = `Time: ${Math.floor(remainingTime)} seconds`;
      }
    }
  }

  update() {
    if (!this.gameEnded && this.startTime) {
      const elapsedTime = (Date.now() - this.startTime) / 1000;
      this.checkGameStatus(elapsedTime);
    }
  }
}
