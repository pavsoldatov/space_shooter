import { Application, Container } from "pixi.js";
import {
  Background,
  PlayerShip,
  AsteroidGroup,
  GameTimer,
  CollisionDetector,
  ProjectileGroup,
  HitCounter,
  AssetLoader,
} from "./";

export class LevelOneScene extends Container {
  private app: Application<HTMLCanvasElement>;
  private background!: Background;
  private playerShip!: PlayerShip;
  private asteroidGroup!: AsteroidGroup;
  private projectiles!: ProjectileGroup;
  private gameTimer!: GameTimer;
  private collisionDetector!: CollisionDetector;
  private hitCounter!: HitCounter;
  private assetLoader: AssetLoader;

  constructor(app: Application<HTMLCanvasElement>) {
    super();

    this.app = app;
    this.assetLoader = AssetLoader.getInstance();

    this.init();
  }

  private async init() {
    try {
      this.assetLoader.loadBundle("level-1").then(() => {
        this.background = new Background(this.app);
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
      });
      this.app.ticker.add((delta) => this.update(delta));
    } catch (error) {
      console.error("Failed to initialize LevelOneScene:", error);
    }
  }

  private update(delta: number): void {
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
  }
}
