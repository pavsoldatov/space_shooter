import { Application } from "pixi.js";
import { Counter } from "../utils";
import { BitText } from "./";
import { constants } from "../";

const { paddings } = constants;
const { NUM_AMMO } = constants.looseCondition;

export class AmmoCounter {
  private counter: Counter;
  private ammoText: BitText;
  private onOutOfAmmo: () => void;
  private readonly maxAmmo: number = NUM_AMMO;

  constructor(app: Application, outOfAmmoCallback: () => void) {
    this.counter = new Counter(this.maxAmmo);
    this.ammoText = new BitText(
      app,
      paddings.left,
      paddings.top,
      `Ammo: ${this.counter.getCount()} / 10`
    );
    this.ammoText.setAnchor(0, 0);
    this.onOutOfAmmo = outOfAmmoCallback;
  }

  decrementAmmoCount() {
    this.counter.decrement();
    this.updateAmmoText();
  }

  getAmmoCount() {
    return this.counter.getCount();
  }

  resetAmmoCount() {
    this.counter.setCount(NUM_AMMO)
    this.updateAmmoText();
  }

  private updateAmmoText() {
    if (this.counter.getCount() <= 0) {
      this.ammoText.updateText(`You lose - out of ammo!`);
      this.onOutOfAmmo();
    } else {
      this.ammoText.updateText(`Ammo: ${this.counter.getCount()} / 10`);
    }
  }
}
