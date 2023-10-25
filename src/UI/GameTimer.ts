import { Application } from "pixi.js";
import { Counter, ShareableMixin } from "../utils";
import { BitText } from "./";
import { constants } from "../";

const { GAME_TIME } = constants.timers;
const { paddings } = constants;

export class GameTimer {
  private app: Application;
  private timerCounter: Counter;
  private timerText: BitText;
  private startTime!: number;
  private gameEnded: boolean = false;

  constructor(app: Application) {
    this.app = app;
    this.timerCounter = new Counter(GAME_TIME);
    this.timerText = new BitText(
      app,
      app.screen.width - paddings.left,
      paddings.top,
      this.formatTimeText(this.timerCounter.getCount())
    );
    this.startTime = Date.now();
    this.timerText.setAnchor(1, 0);
  }

  resetTimer() {
    this.timerCounter.setCount(GAME_TIME);
    this.startTime = Date.now();
    this.updateGameStatus(this.getElapsedTime());
  }

  update() {
    if (!this.gameEnded) {
      this.updateGameStatus(this.getElapsedTime());
    }
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
      this.updateRemainingTimeText(
        this.timerCounter.getCount() - Math.floor(elapsedTime)
      );
    }
  }

  private endGame() {
    this.timerText.updateText(`YOU LOSE`);
    this.gameEnded = true;
    this.app.ticker.stop();
  }

  private updateRemainingTimeText(remainingTime: number) {
    this.timerText.updateText(this.formatTimeText(remainingTime));
  }


}

export const SharedGameTimer = ShareableMixin(GameTimer, "GameTimer");
