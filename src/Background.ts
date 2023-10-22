import { Application, TilingSprite } from "pixi.js";
import { AssetLoader, constants } from "./";

const { BACKGROUND_SPEED } = constants.background;

export class Background {
  private tiles!: TilingSprite;
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.init();
  }

  public async init() {
    const assetLoader = AssetLoader.getInstance();
    const texture = assetLoader.getAsset("background");

    if (!texture) {
      console.error("Background texture not loaded!");
      return;
    }

    this.tiles = new TilingSprite(
      texture,
      this.app.screen.width,
      this.app.screen.height
    );
    this.tiles.zIndex = 0;
    this.app.stage.addChild(this.tiles);
  }

  public update(delta: number) {
    if (this.tiles) {
      this.tiles.tilePosition.y += BACKGROUND_SPEED * delta;
    }
  }
}
