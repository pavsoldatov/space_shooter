import { Application } from "pixi.js";
import {
  Background,
  PlayerShip,
  SharedPlayerShip,
  AsteroidGroup,
  ProjectileGroup,
  AssetLoader,
  constants,
} from "../";
import { Scene, SceneManager } from "./";
import { CollisionDetector } from "../utils";
import {
  GameTimer,
  SharedGameTimer,
  HitCounter,
  SharedHitCounter,
  BitText,
} from "../UI";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;
const { NUM_HITS } = constants.winCondition;

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
  private transitioning: boolean = false;

  constructor(app: Application<HTMLCanvasElement>, sceneManager: SceneManager) {
    super(app);
    this.sceneManager = sceneManager;
    this.assetLoader = AssetLoader.getInstance();
  }

  async init() {
    try {
      this.assetLoader.loadBundle("level-1").then(() => {
        this.background = new Background(this.app, "background", true);
        this.hitCounter = new SharedHitCounter(this.app);
        this.asteroidGroup = new AsteroidGroup(this.app);
        this.gameTimer = new SharedGameTimer(this.app);
        this.projectiles = new ProjectileGroup(this.app);
        this.playerShip = new SharedPlayerShip(this.app, this.projectiles);
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
    if (hits >= NUM_HITS && !this.transitioning) {
      this.transitioning = true;

      let countdown = 3;

      const text = new BitText(
        this.app,
        APP_WIDTH / 2,
        APP_HEIGHT / 2,
        `Level 2 starts in ${countdown} seconds...`
      );
      text.setAnchor(0.5, 0.5);

      const countdownInterval = setInterval(() => {
        countdown--;
        text.updateText(`Level 2 starts in ${countdown} seconds...`);

        if (countdown === 0) {
          this.exit();
          text.remove();
          clearInterval(countdownInterval);
          this.sceneManager.changeTo("level-2");
        }
      }, 1000);
    }
  }

  update(delta: number) {
    this.background.update(delta);
    this.asteroidGroup.update(delta);
    this.playerShip.update(delta);
    this.gameTimer.update(); // relies on Date.now() instead of delta;

    if (this.playerShip && this.collisionDetector) {
      const x = this.playerShip.x;
      const y = this.playerShip.y;

      if (x && y) {
        this.collisionDetector.checkPlayerCollisions(x, y);
      }
    }

    this.checkHits(this.hitCounter.getHitCount());
  }

  exit() {
    if (this.projectiles && this.playerShip) {
      const shipX = this.playerShip.x;
      const shipY = this.playerShip.y;

      for (const projectile of this.projectiles.projectiles) {
        if (projectile.isActive) {
          projectile.resetTo(shipX, shipY);
        }
      }
    }
    this.gameTimer.resetTimer();
    this.playerShip.resetAmmoCount();

    this.app.ticker.remove(this.update, this);
    this.background.remove();
    this.asteroidGroup.remove();
    this.hitCounter.remove();
  }
}
