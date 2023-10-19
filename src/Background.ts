import { Application, TilingSprite, Assets } from "pixi.js";

import { constants } from "./constants";

const { BACKGROUND_SPEED } = constants.background;

export class Background {
  private tiles: TilingSprite | null = null;
  private app: Application;

  constructor(app: Application) {
    this.app = app;

    this.init();
  }

  public async init() {
    const texture = await Assets.load("background");

    this.tiles = new TilingSprite(
      texture,
      this.app.screen.width,
      this.app.screen.height
    );
    this.app.stage.addChild(this.tiles);
  }

  public update(delta: number) {
    if (this.tiles) {
      this.tiles.tilePosition.y += BACKGROUND_SPEED * delta;
    }
  }
}
