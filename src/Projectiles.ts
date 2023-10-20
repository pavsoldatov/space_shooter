import { Application, Graphics } from "pixi.js";

export class Projectile extends Graphics {
  private speed: number = 5;
  private radius: number = 5;

  constructor(app: Application, x: number, y: number) {
    super();

    this.beginFill(0xf18909);
    this.drawEllipse(0, 5, this.radius * 1, this.radius * 2);
    this.endFill();

    this.x = x;
    this.y = y;

    app.stage.addChild(this);
  }

  getBoundaries() {
    return this.getBounds();
  }

  update(delta: number) {
    this.y -= this.speed * delta;
  }

  isOutsideScreen() {
    return this.y + 20 < 0;
  }
}

export class ProjectileGroup {
  private app: Application;
  projectiles: Projectile[] = [];

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
