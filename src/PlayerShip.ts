import { Application, Assets, Sprite, SpriteSource } from "pixi.js";

import { constants } from "./constants";
import { BoundsChecker } from "./BoundsChecker";
import { PlayerMovements } from "./PlayerMovements";
import { Exhaust } from "./Exhaust";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

export class PlayerShip {
  private app: Application;
  private movements: PlayerMovements;
  private ship: Sprite | null = null;
  private boundsChecker: BoundsChecker | null = null;
  private exhaust: Exhaust | null = null;

  constructor(app: Application) {
    this.app = app;
    this.movements = new PlayerMovements();
    this.init();
  }

  async init() {
    await Assets.loadBundle("level-1");
    const shipSource: SpriteSource = await Assets.load("ship");

    if (!shipSource) {
      console.error(`Ship asset not loaded. The asset is ${shipSource}.`);
      return;
    }

    this.initShip(shipSource);
    console.log(this.ship)
  }

  private initShip(shipSprite: SpriteSource) {
    this.ship = Sprite.from(shipSprite);
    this.ship.anchor.set(0.5);
    this.ship.position.set(
      APP_WIDTH / 2,
      APP_HEIGHT - this.ship.texture.width / 2
    );
    this.app.stage.addChild(this.ship);
    this.boundsChecker = new BoundsChecker(this.ship);

    this.exhaust = new Exhaust(this.app, {x: 1, y: this.ship.position.y});
  }

  public update(delta: number) {
    // console.log(this.ship?.position._x)
    // this.exhaust?.setX

    // console.log(this.movements.getPressedKey())
    this.boundsChecker?.update(delta, this.movements.getXSpeed());
    this.exhaust?.update(this.ship!.position._x, this.movements.getPressedKey());
  }
}
