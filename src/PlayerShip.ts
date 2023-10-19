import {
  Application,
  Assets,
  DisplayObject,
  Sprite,
  SpriteSource,
} from "pixi.js";

import { constants } from "./constants";
import { BoundsChecker } from "./BoundsChecker";
import { PlayerMovements } from "./PlayerMovements";
import { Exhaust } from "./Exhaust";
import { Projectile } from "./Projectile";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

export class PlayerShip {
  private app: Application;
  private movements: PlayerMovements;
  private ship: Sprite | null = null;
  private boundsChecker: BoundsChecker | null = null;
  private exhaust: Exhaust | null = null;
  private projectile: Projectile | null = null;

  constructor(app: Application) {
    this.app = app;
    this.movements = new PlayerMovements();
    this.init();

    document.addEventListener("keydown", (e) => {
      if (e.key === " " && this.ship) {
        this.fire();
      }
    });
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
    this.app.stage.addChild(this.ship as DisplayObject);
    this.boundsChecker = new BoundsChecker(this.ship);

    this.exhaust = new Exhaust(this.app, { x: 1, y: this.ship.position.y });
    this.projectile = new Projectile(
      this.app,
      this.ship.position._x,
      this.ship.position._y
    );
  }

  public getX() {
    if (!this.ship) {
      console.error(`Cannot get X. The ship is ${this.ship}`);
      return;
    }
    return this.ship.position._x;
  }

  public getY() {
    if (!this.ship) {
      console.error(`Cannot get Y. The ship is ${this.ship}`);
      return;
    }
    return this.ship.position._y;
  }

  public fire() {
    console.log("fired")
    if (!this.ship || !this.projectile) {
      console.error("Cannot fire. Ship or projectile is missing.");
      return;
    }

    const x = this.ship.position._x;
    const y = this.ship.position._y - this.ship.height;
  
    // a new projectile
    this.projectile = new Projectile(this.app, x, y);
  
    // add the projectile to the app's stage
    this.app.stage.addChild(this.projectile.projectile);
  }

  public update(delta: number) {
    this.boundsChecker?.update(delta, this.movements.getXSpeed());
    this.exhaust?.update(
      this.ship!.position._x,
      this.movements.getPressedKey()!
    );
  }
}
