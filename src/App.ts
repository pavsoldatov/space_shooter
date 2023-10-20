import { Application, Assets } from "pixi.js";

import "./style.css";
import { manifest } from "./assets";
import { constants } from "./constants";
import {
  Background,
  PlayerShip,
  AsteroidGroup,
  GameTimer,
  CollisionDetector,
  ProjectileGroup,
  HitCounter,
} from "./";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

class App {
  private app: Application<HTMLCanvasElement>;
  private background: Background | null = null;
  private playerShip: PlayerShip | null = null;
  private asteroidGroup: AsteroidGroup | null = null;
  private projectiles: ProjectileGroup | null = null;
  private gameTimer: GameTimer | null = null;
  private collisionDetector: CollisionDetector | null = null;
  private hitCounter: HitCounter | null = null;

  constructor() {
    this.app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: false,
    });
    this.app.view.classList.add("game_view");
    document.body.appendChild(this.app.view);

    this.initAssets().then(() => {
      this.background = new Background(this.app);
      this.hitCounter = new HitCounter(this.app);
      this.asteroidGroup = new AsteroidGroup(this.app);
      this.gameTimer = new GameTimer(this.app);
      this.projectiles = new ProjectileGroup(this.app);
      this.playerShip = new PlayerShip(this.app, this.projectiles);
      this.collisionDetector = new CollisionDetector(
        this.app,
        this.projectiles,
        this.asteroidGroup,
        this.hitCounter
      );
    });

    this.app.ticker.add((delta) => this.update(delta));
  }

  private async initAssets() {
    await Assets.init({ manifest });
    await Assets.loadBundle("level-1");
  }

  private update(delta: number) {
    this.background?.update(delta);
    this.asteroidGroup?.update(delta);
    this.playerShip?.update(delta);
    this.gameTimer?.update(); // relies on Date.now() instead of delta;
    this.collisionDetector?.checkCollisions();
  }
}

new App();
