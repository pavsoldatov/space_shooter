import { Application } from "pixi.js";
import { Background, AssetLoader, constants } from "../";
import { StartButton, BitText } from "../UI";
import { Scene, SceneManager } from "../scenes";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

export class MenuScene extends Scene {
  private sceneManager: SceneManager;
  private assetLoader: AssetLoader;
  private background!: Background;
  private startButton!: StartButton;
  private heroText!: BitText;

  constructor(app: Application<HTMLCanvasElement>, sceneManager: SceneManager) {
    super(app);
    this.app = app;
    this.sceneManager = sceneManager;
    this.assetLoader = AssetLoader.getInstance();
  }

  async init() {
    try {
      await this.loadAssets();
      this.setupComponents();
      this.startButton.on("pointerdown", this.onGameStart);
    } catch (error) {
      console.error("Failed to initialize MenuScene:", error);
    }
  }

  private async loadAssets() {
    await this.assetLoader.loadBundle("menu", true);
  }

  private setupComponents() {
    this.background = new Background(this.app, "background");
    this.heroText = this.createHeroText();
    this.startButton = this.createStartButton();
  }

  private createHeroText() {
    const heroText = new BitText(
      this.app,
      APP_WIDTH / 2,
      APP_HEIGHT / 2,
      "Space Shooter"
    );
    heroText.setAnchor(0.5, 0.5);
    return heroText;
  }

  private createStartButton() {
    const startButton = new StartButton(
      this.app,
      "Start Game",
      APP_WIDTH / 2 - 100,
      APP_HEIGHT - 100
    );
    startButton.zIndex = 2;
    return startButton;
  }

  private onGameStart = () => {
    this.sceneManager.changeTo("level-1");
    this.exit();
  };

  exit(): void {
    this.startButton.remove();
    this.heroText.remove();
  }

  update() {}
}
