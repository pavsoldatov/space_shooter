import { Application } from "pixi.js";

import "./style.css";
import { AssetLoader, LevelOneScene, constants } from "./";
const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

class App {
  private app: Application<HTMLCanvasElement>;
  private levelOneScene: LevelOneScene;

  constructor() {
    this.app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: false,
    });
    this.app.stage.sortableChildren = true;
    this.app.view.classList.add("game_view");
    document.body.appendChild(this.app.view);

    AssetLoader.getInstance().init();    
    this.levelOneScene = new LevelOneScene(this.app); // will need to switch scenes
    this.app.stage.addChild(this.levelOneScene);
  }
}

new App();
