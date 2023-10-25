import { Application } from "pixi.js";
import {
  Background,
  AssetLoader,
  PlayerShip,
  SharedPlayerShip,
  Boss,
  constants,
} from "../";
import { Scene } from "../scenes";
import { BitText, GameTimer, SharedGameTimer } from "../UI";
import { CollisionDetector2 } from "../utils";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

export class LevelTwoScene extends Scene {
  private assetLoader: AssetLoader;
  private background!: Background;
  private playerShip!: PlayerShip;
  private gameTimer!: GameTimer;
  private collisionDetector!: CollisionDetector2;
  private boss!: Boss;

  constructor(app: Application<HTMLCanvasElement>) {
    super(app);
    this.app = app;
    this.assetLoader = AssetLoader.getInstance();
  }

  async init() {
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
    this.setupGameElements();
    this.setupEventListeners();
  }

  private setupGameElements() {
    this.background = new Background(this.app, "background2", true);
    this.boss = new Boss(this.app);
    this.gameTimer = SharedGameTimer.getSharedInstance();
    this.playerShip = SharedPlayerShip.getSharedInstance();

    this.collisionDetector = new CollisionDetector2(
      this.app,
      this.playerShip.getProjectiles(),
      this.boss.getProjectiles(),
      this.boss
    );

    this.app.ticker.add(this.update, this);
  }

  private setupEventListeners() {
    this.app.stage.on("bossDefeated", this.handleBossDefeat, this);
    this.app.stage.on("playerDefeated", this.handlePlayerDefeat, this);
  }

  private handleBossDefeat() {
    new BitText(this.app, APP_WIDTH / 2, APP_HEIGHT / 2, "YOU WIN").setAnchor(
      0.5,
      0.5
    );

    this.boss.remove();
    setTimeout(() => {
      this.app.stop();
    }, 1600);
  }

  private handlePlayerDefeat() {
    new BitText(
      this.app,
      APP_WIDTH / 2,
      APP_HEIGHT / 2,
      "YOU LOSE,\nTHE ENEMY HIT YOU!"
    ).setAnchor(0.5, 0.5);

    setTimeout(() => {
      this.app.stop();
      this.boss.remove();
    }, 1600);
  }

  exit(): void {
    this.app.ticker.remove(this.update, this);
  }

  update(delta: number) {
    this.background.update(delta);
    this.playerShip.update(delta);
    this.gameTimer.update(); // relies on Date.now() instead of delta;
    this.boss.update();

    this.collisionDetector.checkProjectileCollisions(
      this.boss,
      this.playerShip
    );
    this.collisionDetector.checkPlayerCollisions(this.playerShip);
    this.collisionDetector.checkBossCollisions(this.playerShip);
  }
}
