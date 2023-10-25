// BossBehavior.ts
import { Graphics } from "pixi.js";
import { constants } from "./";

const { APP_WIDTH } = constants.resolution;

export class BossBehavior {
  private sprite: Graphics;

  constructor(sprite: Graphics) {
    this.sprite = sprite;
  }

  private shoot() {
    console.log("Boss shoots!");
  }

  update(delta: number) {
    if (this.sprite.x < APP_WIDTH - this.sprite.width * 0.5) {
      this.sprite.x += delta;
    }
  }
}
