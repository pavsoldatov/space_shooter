import { Application } from "pixi.js";
import { Background, AssetLoader } from "../";
import { Scene, SceneManager } from "./";

// const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

export class LevelTwoScene extends Scene {
  private sceneManager: SceneManager;
  private assetLoader: AssetLoader;
  private background!: Background;

  constructor(app: Application<HTMLCanvasElement>, sceneManager: SceneManager) {
    super(app);
    this.app = app;
    this.sceneManager = sceneManager;
    this.assetLoader = AssetLoader.getInstance();
    this.sortableChildren = true;
    this.app.stage.sortableChildren = true;
  }

  async init() {
    console.log("Entering Lvl 2 Scene");
    try {
      await this.loadAssets();
      this.setupComponents();
    } catch (error) {
        console.error("Failed to initialize MenuScene:", error);
    }
}

private async loadAssets() {
    await this.assetLoader.loadBundle("level-2");
}

private setupComponents() {
    this.background = new Background(this.app, "background2", true);
    this.app.ticker.add((delta) => this.update(delta));
  }

  exit(): void {
    console.log("Exiting MenuScene");
    this.removeChildren();
    this.app.stage.removeChild(this);
    this.app.ticker.remove(this.update);
  }

  update(delta: number) {
    this.background?.update(delta);
  }
}
