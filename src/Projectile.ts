import { Application, Graphics, Sprite, Texture } from "pixi.js";

export class Projectile {
  public projectile: Graphics;
  private app: Application;
  private speed: number;

  constructor(app: Application, x: number, y: number) {
    this.app = app;
    this.projectile = new Graphics();
    this.projectile.beginFill(0x00ff00);
    this.projectile.drawCircle(0, 0, 20);
    this.projectile.x = x;
    this.projectile.y = y;
    this.speed = 5;
    app.stage.addChild(this.projectile);
  }

  update(delta: number) {
    this.projectile.y -= this.speed * delta;
    if (this.projectile.y < 0) {
      this.app.stage.removeChild(this.projectile);
      this.app.ticker.remove((delta) => this.update(delta));
    }
  }
}
