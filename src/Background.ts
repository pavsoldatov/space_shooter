import { Application, TilingSprite } from "pixi.js";
import { AssetLoader, constants } from "./";

const { BACKGROUND_SPEED } = constants.background;

export class Background {
  private app: Application;
  private tiles!: TilingSprite;
  private gameStarted: boolean;
  private assetName: string;

  constructor(app: Application, assetName: string, gameStarted?: boolean) {
    this.app = app;
    this.assetName = assetName;
    this.gameStarted = gameStarted ?? false;
    this.init();
  }

  public async init() {
    const assetLoader = AssetLoader.getInstance();
    const texture = assetLoader.getAsset(this.assetName);

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

  public setGameStarted(gameStarted: boolean) {
    this.gameStarted = gameStarted;
  }

  public get sprite(): TilingSprite {
    return this.tiles;
  }

  public update(delta: number) {
    if (this.tiles && this.gameStarted) {
      this.tiles.tilePosition.y += BACKGROUND_SPEED * delta;
    }
  }
}
