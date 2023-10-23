import { Scene } from "./";

export class SceneManager {
  private scenes: Map<string, Scene> = new Map();
  private currentScene!: Scene;

  constructor() {}

  registerScene(name: string, scene: Scene) {
    this.scenes.set(name, scene);
  }

  changeScene(name: string) {
    if (this.currentScene) {
      this.currentScene.exit();
    }
    const newScene = this.scenes.get(name);
    if (newScene) {
      newScene.init();
      this.currentScene = newScene;
      // newScene.app.stage.addChild(newScene);
    } else {
      console.error(`Scene ${name} not found!`);
    }
  }
}
