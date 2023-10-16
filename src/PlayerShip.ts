import { Application, Assets, Sprite, SpriteSource } from "pixi.js";

import { constants } from "./constants";
import { BoundsChecker } from "./BoundsChecker";
import { PlayerMovements } from "./PlayerMovements";

const { APP_WIDTH, APP_HEIGHT } = constants.resolution;

export class PlayerShip {
  private app: Application;
  private movements: PlayerMovements;
  private ship: Sprite | null = null;
  private boundsChecker: BoundsChecker | null = null;

  constructor(app: Application) {
    this.app = app;
    this.movements = new PlayerMovements();

    this.init();
  }

  async init() {
    await Assets.loadBundle("level-1");
    const shipAsset = await Assets.load("ship");

    if (!shipAsset) {
      console.error(`Asset not loaded. The asset is ${shipAsset}.`);
      return;
    }

    //TODO: Create exhausts and make them follow the ship

    this.ship = Sprite.from(shipAsset);
    this.ship.anchor.set(0.5);
    this.ship.position.set(
      APP_WIDTH / 2,
      APP_HEIGHT - this.ship.texture.width / 2
    );
    this.app.stage.addChild(this.ship);
    this.boundsChecker = new BoundsChecker(this.ship);
  }

  public update(delta: number) {
    // console.log(this.movements.getPressedKey())
    this.boundsChecker?.update(delta, this.movements.getXSpeed());
  }
}
