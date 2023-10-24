import { Application, TickerCallback } from "pixi.js";
import {
  Background,
  PlayerShip,
  AsteroidGroup,
  ProjectileGroup,
  AssetLoader,
} from "../";
import { Scene, SceneManager } from "./";
import { CollisionDetector } from "../utils";
import { GameTimer, HitCounter } from "../UI";

export class LevelOneScene extends Scene {
  private background!: Background;
  private playerShip!: PlayerShip;
  private asteroidGroup!: AsteroidGroup;
  private projectiles!: ProjectileGroup;
  private gameTimer!: GameTimer;
  private collisionDetector!: CollisionDetector;
  private hitCounter!: HitCounter;
  private assetLoader: AssetLoader;
  private sceneManager: SceneManager;

  constructor(app: Application<HTMLCanvasElement>, sceneManager: SceneManager) {
    super(app);
    this.sceneManager = sceneManager;
    this.assetLoader = AssetLoader.getInstance();
  }

  async init() {
    try {
      this.assetLoader.loadBundle("level-1").then(() => {
        this.background = new Background(this.app, "background", true);
        this.hitCounter = new HitCounter(this.app);
        this.asteroidGroup = new AsteroidGroup(this.app);
        this.gameTimer = new GameTimer(this.app);
        this.projectiles = new ProjectileGroup(this.app);
        this.playerShip = new PlayerShip(this.app, this.projectiles);
        this.collisionDetector = new CollisionDetector(
          this.projectiles,
          this.asteroidGroup,
          this.hitCounter
        );
        this.app.ticker.add(this.update, this);
      });
    } catch (error) {
      console.error("Failed to initialize LevelOneScene:", error);
    }
  }

  private checkHits(hits: number) {
    if (hits >= 2) {
      console.log(hits);
      this.exit();
      this.sceneManager.changeTo("level-2");
      this.hitCounter.resetHitCount();
    }
  }

  update(delta: number) {
    this.background?.update(delta);
    this.asteroidGroup?.update(delta);
    this.playerShip?.update(delta);
    this.gameTimer?.update(); // relies on Date.now() instead of delta;

    if (this.playerShip && this.collisionDetector) {
      const x = this.playerShip.getX();
      const y = this.playerShip.getY();

      if (x && y) {
        this.collisionDetector.checkCollisions(x, y);
      }
    }

    this.checkHits(this.hitCounter.getHitCount());
  }

  exit() {
    console.log("Exiting Level-1");
    this.app.ticker.remove(this.update, this);
    this.background.remove();
    this.playerShip.remove();
  }
}
