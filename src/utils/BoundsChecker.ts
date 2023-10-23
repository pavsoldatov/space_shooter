import { Sprite } from "pixi.js";

import { constants } from "../constants";

const { APP_WIDTH } = constants.resolution;

export class BoundsChecker {
  private sprite: Sprite | null = null;

  constructor(sprite: Sprite | null) {
    this.sprite = sprite;
  }

  public update(delta: number, xSpeed: number) {
    if (this.sprite) {
      const x = this.sprite.x + xSpeed * delta;
      const xOffset = this.sprite.texture.width / 2;
      switch (true) {
        case x - xOffset < 0:
          this.sprite.x = xOffset;
          break;
        case x + xOffset > APP_WIDTH:
          this.sprite.x = APP_WIDTH - xOffset;
          break;
        default:
          this.sprite.x = x;
      }
    }
  }
}
