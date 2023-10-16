import { Application, Assets } from "pixi.js";

import "./style.css";
import { constants } from "./constants";
import { Background } from "./Background";
import { PlayerShip } from "./PlayerShip";
import manifest from "./assets/manifest.json";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

class App {
  private app: Application<HTMLCanvasElement>;
  private background: Background;
  private playerShip: PlayerShip;

  constructor() {
    this.app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: true,
    });
    this.app.view.classList.add("game_view");
    document.body.appendChild(this.app.view);

    this.initAssets();

    this.background = new Background(this.app);
    this.playerShip = new PlayerShip(this.app);

    this.app.ticker.add((delta) => this.update(delta));
  }

  private async initAssets() {
    await Assets.init({ manifest });
    // await Assets.loadBundle("level-1");
    // this.playerShip.init();
    // this.background.init();
  }


  private update(delta: number) {
    this.background.update(delta);
    this.playerShip.update(delta);
  }
}

new App();
