import { Application, Sprite, Ticker } from "pixi.js";
import { ProjectileGroup, constants } from "./";

const { APP_WIDTH } = constants.resolution;

export class BossBehavior {
  private sprite: Sprite;
  private movingLeft: boolean = false;
  private speed: number = 1.5;
  private ticker: Ticker;
  private elapsedFrames: number = 0;
  private projectileGroup: ProjectileGroup;
  private defeated: boolean = false;
  private gameOver: boolean = false;

  constructor(app: Application, sprite: Sprite, autoMove: boolean = false) {
    this.sprite = sprite;
    this.projectileGroup = new ProjectileGroup(app, "down");
    this.ticker = new Ticker();
    this.ticker.add(this.update, this);
    autoMove && this.moveAndShoot();

    app.stage.on("bossDefeated", () => {
      this.defeated = true;
      this.projectileGroup.remove();
      this.remove();
    });
    app.stage.on("playerDefeated", () => {
      this.gameOver = true;
      this.projectileGroup.remove();
      this.remove();
    });
  }

  private decideDirection() {
    if (this.sprite.x <= this.sprite.width * 0.5) return false;
    if (this.sprite.x >= APP_WIDTH - this.sprite.width * 0.5) return true;
    return Math.random() < 0.5;
  }

  private moveForDuration(duration: number, callback: () => void) {
    this.elapsedFrames = 0;
    this.ticker.start();

    const stopMoving = () => {
      this.ticker.stop();
      callback();
    };

    const updateFunction = () => {
      if (this.movingLeft && this.sprite.x > this.sprite.width * 0.5) {
        this.sprite.x -= this.speed;
      } else if (this.sprite.x < APP_WIDTH - this.sprite.width * 0.5) {
        this.sprite.x += this.speed;
      }

      this.elapsedFrames++;
      if (this.elapsedFrames >= duration) {
        stopMoving();
        this.ticker.remove(updateFunction);
      }
    };

    this.ticker.add(updateFunction);
  }

  set isDefeated(status: boolean) {
    this.defeated = status;
  }

  getProjectiles() {
    return this.projectileGroup;
  }

  private moveAndShoot() {
    if (this.defeated || this.gameOver) return;

    this.movingLeft = this.decideDirection();
    const duration = 60 + Math.floor(Math.random() * 60);

    this.moveForDuration(duration, () => {
      this.shoot();
      setTimeout(() => {
        this.moveAndShoot();
      }, 1000);
    });
  }

  private shoot() {
    if (this.defeated || this.gameOver) return;
    this.projectileGroup.fireFrom(this.sprite.x, this.sprite.y);
  }

  private update(delta: number) {
    this.projectileGroup.update(
      delta,
      this.sprite.position.x,
      this.sprite.position.y
    );
  }

  remove() {
    this.ticker.stop();
    this.projectileGroup.remove();
    this.defeated = true;
    this.gameOver = true;
  }
}
