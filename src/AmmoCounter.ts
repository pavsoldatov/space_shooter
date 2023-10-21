import { Application } from "pixi.js";
import { Counter, Text } from "./";

import { constants } from "./constants";
const { left, top } = constants.paddings;

export class AmmoCounter {
  private app: Application;
  private counter: Counter;
  private ammoText: Text;
  private readonly maxAmmo: number = 10;

  constructor(app: Application) {
    this.app = app;
    this.counter = new Counter(this.maxAmmo);
    this.ammoText = new Text(
      app,
      left,
      top * 7,
      `Ammo: ${this.counter.getCount()} / 10`
    );
    this.ammoText.setAnchor(0, 0);
  }

  decrementAmmoCount() {
    this.counter.decrement();
    this.updateAmmoText();
  }

  private updateAmmoText() {
    if (this.counter.getCount() <= 0) {
      this.ammoText.updateText(`You lose - out of ammo!`);
      
      setTimeout(() => {
        this.app.ticker.stop();
      }, 7);
    } else {
      this.ammoText.updateText(`Ammo: ${this.counter.getCount()} / 10`);
    }
  }
}
