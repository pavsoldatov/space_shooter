import { Application, Assets, Sprite, TextureSource } from "pixi.js";
import {
  PlayerMovements,
  Exhaust,
  ProjectileGroup,
  constants,
  AssetLoader,
} from "./";
import { BoundsChecker, ShareableMixin } from "./utils";
import { AmmoCounter } from "./UI";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;
const { SHOOTING_DELAY } = constants.timers;

export class PlayerShip {
  private app!: Application;
  private movements: PlayerMovements = new PlayerMovements();
  private ship!: Sprite;
  private boundsChecker!: BoundsChecker;
  private exhaust!: Exhaust;
  private projectiles!: ProjectileGroup;
  private canShoot: boolean = true;
  private ammoCounter!: AmmoCounter;

  constructor(app: Application, projectiles: ProjectileGroup) {
    this.app = app;
    this.projectiles = projectiles;
    this.ammoCounter = new AmmoCounter(this.app, this.onOutOfAmmo);
    this.init();

    document.addEventListener("keydown", (e) => this.handleShooting(e));
  }

  async init() {
    this.ship = Sprite.from(AssetLoader.getInstance().getAsset("playerShip"));
    this.ship.anchor.set(0.5);
    this.ship.position.set(
      APP_WIDTH / 2,
      APP_HEIGHT - this.ship.texture.width / 2
    );
    this.ship.zIndex = 2;
    this.app.stage.addChild(this.ship);
    this.boundsChecker = new BoundsChecker(this.ship);
    this.exhaust = new Exhaust(this.app, { x: 1, y: this.ship.position.y });
  }

  private onOutOfAmmo = () => {
    this.app.renderer.render(this.app.stage);
    this.app.ticker.stop();
  };

  private handleShooting(e: KeyboardEvent) {
    if (e.key === " " && this.ship) {
      const x = this.ship.position.x;
      const y = this.ship.position.y - this.ship.height / 2 + 20;
      if (this.canShoot) {
        this.projectiles.fireFrom(x, y);
        this.canShoot = false;
        this.ammoCounter.decrementAmmoCount();

        setTimeout(() => {
          this.canShoot = true;
        }, SHOOTING_DELAY * 1000);
      }
    }
  }

  getProjectiles() {
    return this.projectiles;
  }

  get x() {
    return this.ship.position.x;
  }

  get y() {
    return this.ship.position.y;
  }

  getBoundaries() {
    return this.ship.getBounds();
  }

  public resetAmmoCount() {
    this.ammoCounter.resetAmmoCount();
  }

  public update(delta: number) {
    if (!this.ship) throw Error(`The ship is ${this.ship}`);

    this.boundsChecker?.update(delta, this.movements.getXSpeed());
    this.exhaust?.update(this.ship.position.x, this.movements.getPressedKey()!);
    this.projectiles.update(delta, this.ship.position.x, this.ship.position.y);
  }

  public remove() {
    this.app.stage.removeChild(this.ship);
    this.exhaust.remove();
  }
}

export const SharedPlayerShip = ShareableMixin(PlayerShip, "PlayerShip");
