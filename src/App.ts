import { Application } from "pixi.js";
import "./style.css";
import { AssetLoader, constants } from "./";
import { MenuScene, LevelOneScene, LevelTwoScene, SceneManager } from "./scenes";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

class App {
  private app: Application<HTMLCanvasElement>;
  private sceneManager: SceneManager = new SceneManager();

  constructor() {
    this.app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: false,
    });
    this.app.stage.sortableChildren = true;
    this.app.view.classList.add("game_view");
    document.body.appendChild(this.app.view);

    AssetLoader.getInstance();

    this.sceneManager.register("menu", new MenuScene(this.app, this.sceneManager));
    this.sceneManager.register("level-1", new LevelOneScene(this.app, this.sceneManager));
    this.sceneManager.register("level-2", new LevelTwoScene(this.app));
    this.sceneManager.changeTo('menu')

    console.log(this.sceneManager)
  }
}

new App();
