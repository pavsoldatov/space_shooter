import { Application } from "pixi.js";
import { Counter, ShareableMixin } from "../utils";
import { BitText } from "../UI";
import { constants } from "../";

const { NUM_HITS } = constants.winCondition;
const { paddings } = constants;

export class HitCounter {
  private counter: Counter;
  private hitText: BitText;

  constructor(app: Application) {
    this.counter = new Counter(0);
    this.hitText = new BitText(
      app,
      paddings.left,
      paddings.top * 7,
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

  resetHitCount() {
    this.counter.setCount(0);
    this.updateHitText();
  }

  remove() {
    this.hitText.remove();
  }

  private updateHitText() {
    if (this.counter.getCount() >= NUM_HITS) {
      this.hitText.updateText(`Hits: ${this.counter.getCount()} You win!`);
    } else {
      this.hitText.updateText(`Hits: ${this.counter.getCount()}`);
    }
  }
}

export const SharedHitCounter = ShareableMixin(HitCounter, "HitCounter");
