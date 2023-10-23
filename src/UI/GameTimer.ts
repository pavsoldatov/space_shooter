import { Application } from "pixi.js";
import { Counter } from "../utils";
import { BitText } from "./";
import { constants } from "../";

const { GAME_TIME } = constants.timers;
const { top, left } = constants.paddings;

export class GameTimer {
  private app: Application;
  private timerCounter: Counter;
  private timerText: BitText;
  private startTime: number | null = null;
  private gameEnded: boolean = false;

  constructor(app: Application) {
    this.app = app;
    this.timerCounter = new Counter(GAME_TIME);
    this.timerText = new BitText(
      app,
      app.screen.width - left,
      top,
      this.formatTimeText(this.timerCounter.getCount())
    );
    this.startTime = Date.now();
    this.timerText.setAnchor(1, 0);
  }

  private formatTimeText(time: number) {
    return `Time: ${time} seconds`;
  }

  private getElapsedTime() {
    if (!this.startTime) return 0;
    return (Date.now() - this.startTime) / 1000;
  }

  private updateGameStatus(elapsedTime: number) {
    if (elapsedTime >= this.timerCounter.getCount()) {
      this.endGame();
    } else {
      this.updateRemainingTimeDisplay(
        this.timerCounter.getCount() - Math.floor(elapsedTime)
      );
    }
  }

  private endGame() {
    this.timerText.updateText(`YOU LOSE`);
    this.gameEnded = true;
    this.app.ticker.stop();
  }

  private updateRemainingTimeDisplay(remainingTime: number) {
    this.timerText.updateText(this.formatTimeText(remainingTime));
  }

  update() {
    if (!this.gameEnded) {
      this.updateGameStatus(this.getElapsedTime());
    }
  }
}
