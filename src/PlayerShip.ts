import { Application, Assets, Sprite, SpriteSource } from "pixi.js";
import { constants } from "./constants";
import { BoundsChecker } from "./BoundsChecker";
import { PlayerMovements } from "./PlayerMovements";
import { Exhaust } from "./Exhaust";
import { ProjectileGroup } from "./Projectile";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;
const { SHOOTING_DELAY } = constants.timers;

export class PlayerShip {
  private app: Application;
  private movements: PlayerMovements = new PlayerMovements();
  private ship: Sprite | null = null;
  private boundsChecker: BoundsChecker | null = null;
  private exhaust: Exhaust | null = null;
  private projectiles: ProjectileGroup;
  private canShoot: boolean = true;

  constructor(app: Application) {
    this.app = app;
    this.projectiles = new ProjectileGroup(this.app);
    this.init();

    document.addEventListener("keydown", (e) => this.handleShooting(e));
  }

  async init() {
    const shipSource: SpriteSource = await Assets.load("ship");

    if (!shipSource) {
      console.error(`Ship asset not loaded. The asset is ${shipSource}.`);
      return;
    }

    this.ship = Sprite.from(shipSource);
    this.ship.anchor.set(0.5);
    this.ship.position.set(
      APP_WIDTH / 2,
      APP_HEIGHT - this.ship.texture.width / 2
    );
    this.app.stage.addChild(this.ship);
    this.boundsChecker = new BoundsChecker(this.ship);
    this.exhaust = new Exhaust(this.app, { x: 1, y: this.ship.position.y });
  }

  private handleShooting(e: KeyboardEvent) {
    if (e.key === " " && this.ship) {
      const x = this.ship.position.x;
      const y = this.ship.position.y - this.ship.height / 2 + 20;
      if (this.canShoot) {
        this.projectiles.add(x, y);
        this.canShoot = false;
        setTimeout(() => {
          this.canShoot = true;
        }, SHOOTING_DELAY * 1000);
      }
    }
  }

  public getX() {
    if (!this.ship) {
      console.error(`Cannot get X. The ship is ${this.ship}`);
      return;
    }
    return this.ship.position.x;
  }

  public getY() {
    if (!this.ship) {
      console.error(`Cannot get Y. The ship is ${this.ship}`);
      return;
    }
    return this.ship.position.y;
  }

  public update(delta: number) {
    this.boundsChecker?.update(delta, this.movements.getXSpeed());
    this.exhaust?.update(
      this.ship!.position.x,
      this.movements.getPressedKey()!
    );
    this.projectiles.update(delta);
  }
}
