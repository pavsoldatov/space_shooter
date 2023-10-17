import { AnimatedSprite, Application, Spritesheet, Assets } from "pixi.js";

import { constants } from "./constants";
import atlasNormal from "./assets/exhaust/normal/atlas.json";
import atlasTurbo from "./assets/exhaust/turbo/atlas.json";
import { PressedKeyType } from "./PlayerMovements";

const { ARROW_LEFT, ARROW_RIGHT } = constants.keyboardKeys;

type Position = { x: number; y: number };
type SpritesheetId = "exhaust-normal" | "exhaust-turbo";
type ExhaustAtlas = typeof atlasNormal | typeof atlasTurbo;

export class Exhaust {
  private app: Application;
  private normalExhaustRight: AnimatedSprite | null = null;
  private normalExhaustLeft: AnimatedSprite | null = null;
  private turboExhaustLeft: AnimatedSprite | null = null;
  private turboExhaustRight: AnimatedSprite | null = null;
  private exhaustState = {
    normal: "exhaust-normal",
    turbo: "exhaust-turbo",
  } as const;
  private position: Position | null = null;
  private readonly offsetY = 48;
  private readonly offsetX = 25.6;

  constructor(app: Application, position: Position | null) {
    this.app = app;
    this.position = position;

    this.init();
  }

  public async init() {
    this.normalExhaustLeft = await this.createExhaust(
      atlasNormal,
      this.exhaustState.normal
    );
    this.normalExhaustRight = await this.createExhaust(
      atlasNormal,
      this.exhaustState.normal
    );
    this.turboExhaustLeft = await this.createExhaust(
      atlasTurbo,
      this.exhaustState.turbo
    );
    this.turboExhaustRight = await this.createExhaust(
      atlasTurbo,
      this.exhaustState.turbo
    );
    console.log(this.normalExhaustLeft.textures);

    // TODO?: change this.app to new Container (== PlayerShip) and position accordingly
  }

  private async createExhaust(
    atlas: ExhaustAtlas,
    spritesheetId: SpritesheetId
  ) {
    // console.log(atlas.meta.image); // TODO?: Get the atlas image from cache if possible (pretty sure it is)

    const texture = await Assets.load(spritesheetId);
    const spritesheet = new Spritesheet(texture, atlas);

    await spritesheet.parse();
    const animation = new AnimatedSprite(spritesheet.animations.sequence);

    animation.y = this.position!.y + this.offsetY;
    animation.anchor.set(0.5);
    animation.animationSpeed = constants.animation.exhaust.SPEED;
    animation.play();

    return animation;
  }

  public update(x: number, pressedKey: PressedKeyType) {
    switch (pressedKey) {
      case ARROW_LEFT:
        this.app.stage.removeChild(this.turboExhaustRight!);
        this.app.stage.addChild(this.turboExhaustLeft!);
        this.app.stage.removeChild(this.normalExhaustLeft!);
        this.turboExhaustLeft!.x = x - this.offsetX;
        this.normalExhaustRight!.x = x + this.offsetX;
        break;
      case ARROW_RIGHT:
        this.app.stage.removeChild(this.turboExhaustLeft!);
        this.app.stage.addChild(this.turboExhaustRight!);
        this.app.stage.removeChild(this.normalExhaustRight!);
        this.turboExhaustRight!.x = x + this.offsetX;
        this.normalExhaustLeft!.x = x - this.offsetX;
        break;
      default:
        this.app.stage.removeChild(this.turboExhaustLeft!);
        this.app.stage.removeChild(this.turboExhaustRight!);

        this.normalExhaustRight!.x = x + this.offsetX;
        this.normalExhaustLeft!.x = x - this.offsetX;
        this.app.stage.addChild(this.normalExhaustLeft!);
        this.app.stage.addChild(this.normalExhaustRight!);
    }
  }
}
