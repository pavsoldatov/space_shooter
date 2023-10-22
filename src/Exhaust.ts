import { AnimatedSprite, Application, Spritesheet, BaseTexture } from "pixi.js";

import { constants } from "./constants";
import { atlasNormal, atlasTurbo } from "./assets";
import { PressedKeyType } from "./";

const { ARROW_LEFT, ARROW_RIGHT } = constants.keyboardKeys;
const { EXHAUST_SPEED } = constants.animation.exhaust;

type Position = { x: number; y: number };
type ExhaustAtlas = typeof atlasNormal | typeof atlasTurbo;

export class Exhaust {
  private app: Application;
  private normalExhaustRight: AnimatedSprite | null = null;
  private normalExhaustLeft: AnimatedSprite | null = null;
  private turboExhaust: AnimatedSprite | null = null;

  private position: Position | null = null;
  private readonly offsetY = 48;
  private readonly offsetX = 25.6;

  constructor(app: Application, position: Position | null) {
    this.app = app;
    this.position = position;

    this.init();
  }

  public async init() {
    const normalExhaust = await this.loadExhaustTexture(atlasNormal);
    const turboExhaust = await this.loadExhaustTexture(atlasTurbo);

    this.normalExhaustLeft = this.createExhaustAnimation(normalExhaust);
    this.normalExhaustRight = this.createExhaustAnimation(normalExhaust);
    this.turboExhaust = this.createExhaustAnimation(turboExhaust);

    this.normalExhaustLeft.zIndex = 3;
    this.normalExhaustRight.zIndex = 3;
    this.turboExhaust.zIndex = 3;

    this.app.stage.addChild(
      this.normalExhaustLeft,
      this.normalExhaustRight,
      this.turboExhaust
    );

    // TODO?: change this.app to new Container (== PlayerShip) and position accordingly
  }

  private async loadExhaustTexture(atlas: ExhaustAtlas) {
    const texture = BaseTexture.from(atlas.meta.image);
    const spritesheet = new Spritesheet(texture, atlas);
    await spritesheet.parse();
    return spritesheet;
  }

  private createExhaustAnimation(spritesheet: Spritesheet<ExhaustAtlas>) {
    const animation = new AnimatedSprite(spritesheet.animations.sequence);
    animation.y = this.position!.y + this.offsetY;
    animation.anchor.set(0.5);
    animation.animationSpeed = EXHAUST_SPEED;
    animation.play();
    return animation;
  }

  private toggleVisibility(turbo: boolean, left: boolean, right: boolean) {
    if (
      !this.turboExhaust ||
      !this.normalExhaustLeft ||
      !this.normalExhaustRight
    ) {
      console.error(`Missing the exhaust`);
      return;
    }

    this.turboExhaust.visible = turbo;
    this.normalExhaustLeft.visible = left;
    this.normalExhaustRight.visible = right;

    turbo ? this.turboExhaust.play() : this.turboExhaust.stop();
    left ? this.normalExhaustLeft.play() : this.normalExhaustLeft.stop();
    right ? this.normalExhaustRight.play() : this.normalExhaustRight.stop();
  }

  public update(x: number, pressedKey: PressedKeyType) {
    if (
      !this.normalExhaustLeft ||
      !this.normalExhaustRight ||
      !this.turboExhaust
    ) {
      console.error("No exhaust in update");
      return;
    }

    switch (pressedKey) {
      case ARROW_LEFT:
        this.toggleVisibility(true, false, true);
        this.normalExhaustRight.x = x + this.offsetX;
        this.turboExhaust.x = x - this.offsetX;
        break;
      case ARROW_RIGHT:
        this.toggleVisibility(true, true, false);
        this.turboExhaust.x = x + this.offsetX;
        this.normalExhaustLeft.x = x - this.offsetX;
        break;
      default:
        this.toggleVisibility(false, true, true);
        this.normalExhaustRight.x = x + this.offsetX;
        this.normalExhaustLeft.x = x - this.offsetX;
    }
  }
}
