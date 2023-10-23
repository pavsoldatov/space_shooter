import { Application, Container } from "pixi.js";

export abstract class Scene extends Container {
  protected app: Application;

  constructor(app: Application) {
    super();
    this.app = app;
  }

  abstract init(): void;
  abstract exit(): void;
  abstract update(delta: number): void;
}
