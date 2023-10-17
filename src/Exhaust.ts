import {
  AnimatedSprite,
  Application,
  BaseTexture,
  Sprite,
  Spritesheet,
} from "pixi.js";

import { constants } from "./constants";
import atlasNormal from "./assets/exhaust/normal/atlas.json";
import atlasTurbo from "./assets/exhaust/turbo/atlas.json";
import { PressedKeyType } from "./PlayerMovements";

const exhaustState = ["normal", "turbo"] as const;

const resolveAtlas = (animationType: "normal" | "turbo") => {
  return `./assets/exhaust/${animationType}/atlas.json`;
};

export class Exhaust {
  private app: Application;
  private exhaustRight: AnimatedSprite | null = null;
  private exhaustLeft: AnimatedSprite | null = null;
  private position: { x: number; y: number } | null = null;
  private readonly offsetY = 48;
  private readonly offsetX = 25.6;
  private isTurbo: boolean = false;

  constructor(app: Application, position: { x: number; y: number } | null) {
    this.app = app;
    this.position = position;

    this.init();
  }

  public async init() {
    this.exhaustLeft = await this.createExhaust(atlasNormal);
    this.exhaustRight = await this.createExhaust(atlasNormal);

    this.app.stage.addChild(this.exhaustRight);
    this.app.stage.addChild(this.exhaustLeft);
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
    if (this.exhaustRight) this.exhaustRight.x = x + this.offsetX;
    if (this.exhaustLeft) this.exhaustLeft.x = x - this.offsetX;
  }
}
