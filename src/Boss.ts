import { Graphics, Application, Ticker } from "pixi.js";
import { HealthBar, BossBehavior, constants } from "./";

const { MAX_HEALTH } = constants.boss;

export class Boss {
  private sprite!: Graphics;
  private app: Application;
  private radius: number = 50;
  private healthBar!: HealthBar;
  private ticker: Ticker = new Ticker();
  private shakeDuration!: number;
  private behavior!: BossBehavior;

  constructor(app: Application) {
    this.app = app;

    this.init();
    this.initHealthBar();
    this.attachClickHandler();
    this.initBehavior();
  }

  private init() {
    this.sprite = new Graphics();
    this.sprite.beginFill(0xff0000);
    this.sprite.drawCircle(0, 0, this.radius);
    this.sprite.endFill();

    this.sprite.x = this.app.view.width / 2;
    this.sprite.y = this.radius * 2;
    this.sprite.zIndex = 1;

    this.app.stage.addChild(this.sprite);
  }

  private initHealthBar() {
    this.healthBar = new HealthBar(
      this.app,
      this.sprite.x,
      this.sprite.y - this.radius - 10,
      MAX_HEALTH
    );
  }
  
  private initBehavior() {
    this.behavior = new BossBehavior(this.sprite);
  }

  public takeDamage(amount: number) {
    this.healthBar.takeDamage(amount);
  }

  private attachClickHandler() {
    this.sprite.eventMode = "static";

    this.sprite.on("pointerdown", () => {
      this.takeDamage(1);
      if (this.healthBar.health === 0) {
        this.animateShaking(1.5);
        this.healthBar.remove();
      }
    });
  }

  private animateShaking(duration: number) {
    this.shakeDuration = duration * 60; // assuming 60 fps
    this.ticker.add(this.handleShaking, this);
    this.ticker.start();
  }

  private handleShaking() {
    if (this.shakeDuration > 0) {
      // random offset to position
      this.sprite.x += (Math.random() - 0.5) * 10;
      this.sprite.y += (Math.random() - 0.5) * 10;
      this.shakeDuration--;

      if (this.shakeDuration === 0) {
        this.ticker.remove(this.handleShaking, this);
        this.app.stage.removeChild(this.sprite);
      }
    }
  }

  update(delta: number) {
    this.behavior.update(delta);
    this.healthBar.update(this.sprite.x)
  }
}
