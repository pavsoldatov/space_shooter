import { Application, Assets } from "pixi.js";

import "./style.css";
import { constants } from "./constants";
import { Background } from "./Background";
import { PlayerShip } from "./PlayerShip";
import manifest from "./assets/manifest.json";
import { AsteroidGroup } from "./Asteroids";
import { Projectile } from "./Projectile";
import { GameTimer } from "./GameTimer";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

class App {
  private app: Application<HTMLCanvasElement>;
  private background: Background | null = null;
  private playerShip: PlayerShip | null = null;
  private asteroidGroup: AsteroidGroup | null = null;
  private playerProjectiles: Projectile[] | null = null;
  private gameTimer: GameTimer | null = null;

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
      this.playerShip = new PlayerShip(this.app);
      this.asteroidGroup = new AsteroidGroup(this.app, 9);
      this.gameTimer = new GameTimer(this.app);
    });

    this.app.ticker.add((delta) => this.update(delta));
  }

  shoot() {
    if (this.playerShip) {
      const projectile = new Projectile(
        this.app,
        this.playerShip.getX()!,
        this.playerShip.getY()!
      );
      this.playerProjectiles?.push(projectile);
    }
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
  }
}

new App();
