import { constants } from "./constants";

const { ARROW_LEFT, ARROW_RIGHT } = constants.keyboardKeys;

type KeyboardKeysType = typeof constants.keyboardKeys;
export type PressedKeyType = KeyboardKeysType[keyof KeyboardKeysType];

export class PlayerMovements {
  private xSpeed: number = 0;
  private keydownListener: (e: KeyboardEvent) => void;
  private keyupListener: (e: KeyboardEvent) => void;
  private pressedKey: PressedKeyType | null = null;

  constructor() {
    this.keydownListener = (e: KeyboardEvent) => this.onKeyDown(e);
    this.keyupListener = (e: KeyboardEvent) => this.onKeyUp(e);
    this.initEventListeners();
  }

  public initEventListeners() {
    window.addEventListener("keydown", this.keydownListener);
    window.addEventListener("keyup", this.keyupListener);
  }

  public destroyEventListeners() {
    window.removeEventListener("keydown", this.keydownListener);
    window.removeEventListener("keyup", this.keyupListener);
  }

  public getXSpeed() {
    return this.xSpeed;
  }

  public getPressedKey() {
    return this.pressedKey;
  }

  private onKeyDown(e: KeyboardEvent) {
    switch (e.key.toUpperCase()) {
      case ARROW_LEFT:
        this.xSpeed = -constants.player.SPEED;
        this.pressedKey = ARROW_LEFT;
        break;
      case ARROW_RIGHT:
        this.xSpeed = constants.player.SPEED;
        this.pressedKey = ARROW_RIGHT;
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    switch (e.key.toUpperCase()) {
      case ARROW_LEFT:
      case ARROW_RIGHT:
        this.xSpeed = 0;
        this.pressedKey = null;
        break;
    }
  }
}
