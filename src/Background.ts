import { Application, TilingSprite, Assets } from "pixi.js";

import backgroundSrc from "/src/assets/background/Blue_Nebula_05-1024x1024.png";
import { constants } from "./constants";

export class Background {
  private tiles: TilingSprite | null = null;
  private app: Application;

  constructor(app: Application<HTMLCanvasElement>) {
    this.app = app;

    this.init();
  }

  public async init() {
    const texture = await Assets.load(backgroundSrc);

    this.tiles = new TilingSprite(
      texture,
      this.app.screen.width,
      this.app.screen.height
    );
    this.app.stage.addChild(this.tiles);
  }

  public update(delta: number) {
    if (this.tiles) {
      this.tiles.tilePosition.y += constants.background.SPEED * delta;
    }
  }
}
