import { Application } from "pixi.js";
import { Background, AssetLoader, PlayerShip, SharedPlayerShip, ProjectileGroup, Boss } from "../";
import { Scene } from "./";
import { GameTimer, HitCounter, SharedGameTimer } from "../UI";
import { CollisionDetector } from "../utils";

export class LevelTwoScene extends Scene {
  private assetLoader: AssetLoader;
  private background!: Background;
  private hitCounter!: HitCounter;
  private playerShip!: PlayerShip;
  private gameTimer!: GameTimer;
  private projectiles!: ProjectileGroup;
  private collisionDetector!: CollisionDetector;
  private boss!: Boss;

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

  // private checkHits(hits: number) {
  //   if (hits >= 2) {
  //     console.log("You win");
  //     this.app.stop();
  //   }
  // }

  private async loadAssets() {
    await this.assetLoader.loadBundle("level-2");
  }

  private setupComponents() {
    this.background = new Background(this.app, "background2", true);
    this.boss = new Boss(this.app);
    this.gameTimer = SharedGameTimer.getSharedInstance();
    this.playerShip = SharedPlayerShip.getSharedInstance();
    // this.collisionDetector = new CollisionDetector(
    //   this.projectiles,
    //   this.boss,
    //   this.hitCounter
    // );
    this.app.ticker.add(this.update, this);
  }

  exit(): void {
    console.log("Exiting Exiting Level 2");
    this.app.ticker.remove(this.update, this);
  }

  update(delta: number) {
    this.background.update(delta);
    this.playerShip.update(delta);
    this.gameTimer.update(); // relies on Date.now() instead of delta;
    this.boss.update(delta);
  }
}
