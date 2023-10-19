import { Application, Graphics } from "pixi.js";

export class Projectile extends Graphics {
  private projectile: Graphics;
  private speed: number = 5;

  constructor(app: Application, x: number, y: number) {
    super();
    this.projectile = new Graphics();

    this.projectile.beginFill(0x808080);
    this.projectile.drawPolygon([
      -5,
      0, // Tip left
      0,
      -20, // Tip top
      5,
      0, // Tip right
      0,
      20, // Bottom
    ]);
    this.projectile.endFill();

    this.projectile.x = x;
    this.projectile.y = y;

    app.stage.addChild(this.projectile);
  }

  update(delta: number) {
    this.projectile.y -= this.speed * delta;
  }

  isOutsideScreen() {
    return this.projectile.y + 20 < 0;
  }
}

export class ProjectileGroup {
  private app: Application;
  private projectiles: Projectile[] = [];

  constructor(app: Application) {
    this.app = app;
  }

  add(x: number, y: number) {
    this.projectiles.push(new Projectile(this.app, x, y));
  }

  update(delta: number) {
    this.projectiles = this.projectiles.filter((p) => {
      p.update(delta);
      if (p.isOutsideScreen()) {
        p.destroy();
        return false;
      }
      return true;
    });
  }
}
