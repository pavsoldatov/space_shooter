import { Application } from "pixi.js";
import {
  Background,
  AssetLoader,
  PlayerShip,
  HitCounter,
  ProjectileGroup,
} from "../";
import { Scene } from "./";
import { GameTimer } from "../UI";
import { CollisionDetector } from "../utils";

export class LevelTwoScene extends Scene {
  private assetLoader: AssetLoader;
  private background!: Background;
  private hitCounter!: HitCounter;
  private playerShip!: PlayerShip;
  private gameTimer!: GameTimer;
  private projectiles!: ProjectileGroup;
  private collisionDetector!: CollisionDetector;
  private boss: any;

  constructor(app: Application<HTMLCanvasElement>) {
    super(app);
    this.app = app;
    this.assetLoader = AssetLoader.getInstance();
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
    this.hitCounter = new HitCounter(this.app);
    this.gameTimer = new GameTimer(this.app);
    this.projectiles = new ProjectileGroup(this.app);
    this.playerShip = new PlayerShip(this.app, this.projectiles);
    this.collisionDetector = new CollisionDetector(
      this.projectiles,
      this.boss,
      this.hitCounter
    );
    this.app.ticker.add(this.update, this);
  }

  exit(): void {
    console.log("Exiting Exiting Level 2");
    this.app.ticker.remove(this.update, this);
  }

  update(delta: number) {
    if (this.background) {
      this.background.update(delta);
    }
  }
}
