import { Application, Graphics } from "pixi.js";
import { ShareableMixin } from "./utils";
import { constants } from "./";

const { APP_HEIGHT } = constants.resolution;

export class Projectile extends Graphics {
  private readonly direction: "up" | "down";
  private readonly speed: number = 16;
  private readonly radius: number = 5;
  public isActive: boolean = false;
  public visible: boolean = false;

  constructor(app: Application, direction: "up" | "down" = "up") {
    super();

    this.direction = direction;
    this.beginFill(0xf18909);
    this.drawEllipse(0, 5, this.radius * 1, this.radius * 2);
    this.endFill();
    this.zIndex = 1;

    app.stage.addChild(this);
  }

  shootFrom(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.visible = true;
    this.isActive = true;
  }

  resetTo(x: number, y: number) {
    this.visible = false;
    this.isActive = false;
    this.x = x;
    this.y = y;
  }

  getBoundaries() {
    return this.getBounds();
  }

  update(delta: number) {
    if (this.isActive) {
      if (this.direction === "up") {
        this.y += this.speed * delta;
      } else if (this.direction === "down") {
        this.y -= this.speed * delta;
      }
    }
  }

  isOutsideScreen() {
    if (this.direction === "up") {
      return this.y + 20 < 0;
    } else if (this.direction === "down") {
      return this.y - 20 > APP_HEIGHT;
    }
  }
}

export class ProjectileGroup {
  private app: Application;
  projectiles: Projectile[] = [];
  private direction: "up" | "down";

  constructor(app: Application, direction: "up" | "down" = "down") {
    this.app = app;
    this.direction = direction;
  }

  fireFrom(x: number, y: number) {
    const projectile = this.getAvailableProjectile();
    projectile.shootFrom(x, y);
  }

  getAvailableProjectile() {
    const available = this.projectiles.find((p) => !p.visible);
    if (available) return available;

    const newProjectile = new Projectile(this.app, this.direction);
    this.projectiles.push(newProjectile);
    return newProjectile;
  }

  update(delta: number, x: number, y: number) {
    this.projectiles.forEach((p) => {
      if (p.visible) {
        p.update(delta);
        if (p.isOutsideScreen()) {
          p.resetTo(x, y);
        }
      }
    });
  }
}

export const SharedProjectileGroup = ShareableMixin(
  ProjectileGroup,
  "ProjectileGroup"
);
