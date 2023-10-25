import { Graphics, Application } from "pixi.js";

export class HealthBar {
  private hitPoints: Graphics[] = [];
  private app: Application;
  private maxHealth: number;
  private currentHealth: number;
  private radius: number = 5; // hitpoint radius.
  private xPos: number;
  private yPos: number;

  constructor(app: Application, x: number, y: number, maxHealth: number) {
    this.app = app;
    this.xPos = x;
    this.yPos = y;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;

    this.init();
  }

  private init() {
    for (let i = 0; i < this.maxHealth; i++) {
      const hitPoint = new Graphics();
      hitPoint.beginFill(0x00ff00);
      hitPoint.drawCircle(0, 0, this.radius);
      hitPoint.endFill();

      const xPos =
        this.xPos + i * (this.radius * 2 + 4) - this.maxHealth * this.radius;

      hitPoint.x = xPos;
      hitPoint.y = this.yPos;

      this.hitPoints.push(hitPoint);
      this.app.stage.addChild(hitPoint);
    }
  }

  public takeDamage(amount: number) {
    this.currentHealth -= amount;
    this.updateHealth();
  }

  private updateHealth() {
    for (let i = 0; i < this.hitPoints.length; i++) {
      this.hitPoints[i].clear();

      if (i < this.currentHealth) {
        this.hitPoints[i].beginFill(0x00ff00);
      } else {
        this.hitPoints[i].beginFill(0xa1a1a1);
      }

      this.hitPoints[i].drawCircle(0, 0, this.radius);
      this.hitPoints[i].endFill();
    }
  }

  get health() {
    return this.currentHealth;
  }

  setPosition(x: number) {
    const updatedX = x;

    for (let i = 0; i < this.hitPoints.length; i++) {
      const xPos =
        updatedX + i * (this.radius * 2 + 4) - this.maxHealth * this.radius;
      this.hitPoints[i].x = xPos;
    }
  }

  public remove() {
    for (const hp of this.hitPoints) {
      this.app.stage.removeChild(hp);
    }
  }

  update(x: number) {
    this.setPosition(x);
  }
}
