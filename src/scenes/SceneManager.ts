import { Scene } from "./";

export class SceneManager {
  private scenes: Map<string, Scene> = new Map();
  private currentScene!: Scene;

  constructor() {}

  register(name: string, scene: Scene) {
    this.scenes.set(name, scene);
  }

  goNext() {
    if (!this.currentScene) {
      console.error("Cannot go next scene - no current scene.");
    }

    let foundCurrent = false;
    let nextSceneName: string | null = null;

    for (let [name, scene] of this.scenes) {
      if (foundCurrent) {
        nextSceneName = name;
        break;
      }
      if (scene === this.currentScene) {
        foundCurrent = true;
      }
    }

    if (!nextSceneName) {
      console.error(
        "Current scene is the last scene. No next scene to move to."
      );
      return;
    }

    this.changeTo(nextSceneName);
  }

  changeTo(name: string) {
    if (this.currentScene) {
      this.currentScene.exit();
    }
    const newScene = this.scenes.get(name);
    if (newScene) {
      newScene.init();
      this.currentScene = newScene;
    } else {
      console.error(`Scene ${name} not found!`);
    }
  }
}
