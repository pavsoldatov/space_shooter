import { AnimatedSprite, Application, BaseTexture, Spritesheet } from "pixi.js";

import { constants } from "./constants";
import atlasNormal from "./assets/exhaust/normal/atlas.json";
import atlasTurbo from "./assets/exhaust/turbo/atlas.json";
import { PressedKeyType } from "./PlayerMovements";

const exhaustState = ["idle", "turbo"] as const;

const { ARROW_LEFT, ARROW_RIGHT } = constants.keyboardKeys;

const resolveAtlas = (animationType: "idle" | "turbo") => {
  return `./assets/exhaust/${animationType}/atlas.json`;
};

type PositionType = { x: number; y: number };

export class Exhaust {
  private app: Application;
  private idleExhaustRight: AnimatedSprite | null = null;
  private idleExhaustLeft: AnimatedSprite | null = null;
  private turboExhaustLeft: AnimatedSprite | null = null;
  private turboExhaustRight: AnimatedSprite | null = null;
  private position: PositionType | null = null;
  private readonly offsetY = 48;
  private readonly offsetX = 25.6;

  constructor(app: Application, position: PositionType | null) {
    this.app = app;
    this.position = position;

    this.init();

    // window.addEventListener("keydown", (e)  => {
    //   switch (e.key.toUpperCase()) {
    //     case ARROW_LEFT:
    //       this.idleExhaustLeft?.textures
    //       break;
    //     case ARROW_RIGHT:
    //       break;
    //   }
    // })
  }

  public async init() {
    this.idleExhaustLeft = await this.createExhaust(atlasNormal);
    this.idleExhaustRight = await this.createExhaust(atlasNormal);
    this.turboExhaustLeft = await this.createExhaust(atlasTurbo);
    this.turboExhaustRight = await this.createExhaust(atlasTurbo);
    console.log(this.idleExhaustLeft.textures);

    // TODO: change this.app to new Container (== PlayerShip) and position accordingly
    // this.app.stage.addChild(this.idleExhaustRight);
    // this.app.stage.addChild(this.idleExhaustLeft);
  }

  private async createExhaust(atlas: any) {
    const spritesheet = new Spritesheet(
      BaseTexture.from(atlas.meta.image),
      atlas
    );

    await spritesheet.parse();
    const animation = new AnimatedSprite(spritesheet.animations.sequence);

    animation.y = this.position!.y + this.offsetY;
    animation.anchor.set(0.5);
    animation.animationSpeed = constants.animation.exhaust.SPEED;
    animation.play();

    return animation;
  }

  public update(x: number, pressedKey: PressedKeyType | null) {
    // if (this.idleExhaustRight) {
    //   this.idleExhaustRight.x = x + this.offsetX;
    // }
    // if (this.idleExhaustLeft) {
    //   this.idleExhaustLeft.x = x - this.offsetX;
    // }

    // console.log(this.turboExhaustLeft);

    switch (pressedKey) {
      case ARROW_LEFT:
        this.app.stage.removeChild(this.turboExhaustRight!);
        this.app.stage.addChild(this.turboExhaustLeft!);
        this.app.stage.removeChild(this.idleExhaustLeft!);
        this.turboExhaustLeft!.x = x - this.offsetX;
        this.idleExhaustRight!.x = x + this.offsetX;
        break;
      case ARROW_RIGHT:
        this.app.stage.removeChild(this.turboExhaustLeft!);
        this.app.stage.addChild(this.turboExhaustRight!);
        this.app.stage.removeChild(this.idleExhaustRight!);
        this.turboExhaustRight!.x = x + this.offsetX;
        this.idleExhaustLeft!.x = x - this.offsetX;
        break;
      default:
        this.app.stage.removeChild(this.turboExhaustLeft!);
        this.app.stage.removeChild(this.turboExhaustRight!);

        this.idleExhaustRight!.x = x + this.offsetX;
        this.idleExhaustLeft!.x = x - this.offsetX;
        this.app.stage.addChild(this.idleExhaustLeft!);
        this.app.stage.addChild(this.idleExhaustRight!);
    }

    // if (pressedKey === ARROW_LEFT) {
    //   this.app.stage.addChild(this.turboExhaustLeft!);
    // }
  }
}
