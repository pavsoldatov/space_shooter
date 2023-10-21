import { Application, Assets, Sprite, Texture } from "pixi.js";

import { limitInRange } from "./utils.ts";

export class Asteroid extends Sprite {
  private app: Application;
  private readonly baseRotation: number = 0.01;
  private readonly rotationMod: number = 0.02;
  private rotationSpeed: number = 0;
  private radius: number = 20;
  private speed: number = 0;

  constructor(app: Application, texture: Texture) {
    super(texture);
    this.app = app;
    this.radius = texture.width / 2; // should approximate ship's width / 2
    this.anchor.set(0.5);
    this.scale.set(0.75, 0.75);
    this.y = -this.radius;

    app.stage.addChild(this);
    this.resetPosition();
  }

  getBoundaries() {
    return this.getBounds();
  }

  getPosition(): { x: number; y: number; radius: number } {
    return { x: this.x, y: this.y, radius: this.radius };
  }

  resetPosition() {
    this.speed = limitInRange(1 + Math.random(), 0.5, 1.5);
    this.x = limitInRange(
      Math.random() * this.app.screen.width,
      56 + this.radius,
      this.app.screen.width - (56 + this.radius)
    );
    this.y = 0 - this.radius * 2;

    this.rotationSpeed = limitInRange(
      this.baseRotation + (Math.random() * this.rotationMod),
      this.baseRotation,
      this.baseRotation + this.rotationMod
    );
  }

  update(delta: number) {
    this.y += this.speed * delta;
    this.rotation += this.rotationSpeed;
    if (this.y > this.app.screen.height) {
      this.resetPosition();
    }
  }
}

export class AsteroidGroup {
  private app: Application;
  asteroids: Asteroid[];
  private quantity: number = 2;
  private texture: Texture | null = null;

  constructor(app: Application) {
    this.app = app;
    this.asteroids = [];

    this.loadTexture();
  }

  async loadTexture() {
    this.texture = await Assets.load("asteroid");
  }

  spawnAsteroid() {
    if (this.texture && this.asteroids.length < this.quantity) {
      const asteroid = new Asteroid(this.app, this.texture);
      this.asteroids.push(asteroid);
    }
  }

  update(delta: number) {
    this.spawnAsteroid();
    for (const asteroid of this.asteroids) {
      asteroid.update(delta);
    }
  }
}
