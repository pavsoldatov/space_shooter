import { Application, Ticker, Sprite } from "pixi.js";
import { HealthBar, BossBehavior, constants, AssetLoader } from "./";

const { MAX_HEALTH } = constants.boss;

export class Boss {
  private sprite!: Sprite;
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
    this.sprite = Sprite.from(AssetLoader.getInstance().getAsset("enemyShip"));
    this.sprite.anchor.set(0.5);
    this.sprite.zIndex = 2;
    this.app.stage.addChild(this.sprite);

    this.sprite.x = this.app.view.width / 2;
    this.sprite.y = this.radius * 3;
  }

  private initHealthBar() {
    this.healthBar = new HealthBar(
      this.app,
      this.sprite.x,
      this.sprite.y - this.radius - 20,
      MAX_HEALTH
    );
  }

  private initBehavior() {
    this.behavior = new BossBehavior(this.app, this.sprite, true);
  }

  getProjectiles() {
    return this.behavior.getProjectiles();
  }

  public takeDamage(amount: number) {
    this.healthBar.takeDamage(amount);
  }

  private attachClickHandler() {
    this.app.stage.on("bossDefeated", () => this.animateShaking(1.5), this);
  }

  private animateShaking(duration: number) {
    this.shakeDuration = duration * 60; // assuming 60 fps
    this.ticker.add(this.handleShaking, this);
    this.ticker.start();
  }

  private handleShaking() {
    this.healthBar.remove();

    if (this.shakeDuration > 0) {
      // random offset to position
      this.sprite.x += (Math.random() - 0.5) * 2;
      this.sprite.y += (Math.random() - 0.5) * 2;
      this.shakeDuration--;

      if (this.shakeDuration === 0) {
        this.sprite.off("bossDefeated");
        this.ticker.stop();
        this.app.stage.removeChild(this.sprite);
        this.behavior.remove();
        this.ticker.remove(this.handleShaking, this);
        this.remove();
      }
    }
  }

  get boundaries() {
    return this.sprite.getBounds();
  }

  get x() {
    return this.sprite.position.x;
  }

  get y() {
    return this.sprite.position.y;
  }

  update(delta: number) {
    if (!this.healthBar) return;
    if (this.healthBar.health === 0) {
      const winEvent = new CustomEvent("bossDefeated");
      this.app.stage.emit(winEvent.type, winEvent);
    }
    this.healthBar.update(this.sprite.x);
  }

  remove() {}
}
