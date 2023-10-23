import { Application } from "pixi.js";
import { Counter } from "../utils";
import { BitText } from "./";
import { constants } from "../";

const { NUM_HITS } = constants.winCondition;
const { top, left } = constants.paddings;

export class HitCounter {
  private app: Application;
  private counter: Counter;
  private hitText: BitText;
  private readonly NUM_HITS: number = NUM_HITS;

  constructor(app: Application) {
    this.app = app;
    this.counter = new Counter(0);
    this.hitText = new BitText(
      app,
      left,
      top,
      `Hits: ${this.counter.getCount()}`
    );
    this.hitText.setAnchor(0, 0);
  }

  incrementHitCount() {
    this.counter.increment();
    this.updateHitText();
  }

  getHitCount() {
    return this.counter.getCount();
  }

  private updateHitText() {
    if (this.counter.getCount() >= this.NUM_HITS) {
      this.hitText.updateText(`Hits: ${this.counter.getCount()} You win!`);
      this.app.ticker.stop();
    } else {
      this.hitText.updateText(`Hits: ${this.counter.getCount()}`);
    }
  }
}
