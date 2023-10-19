import { Application, Graphics } from "pixi.js";

class Asteroid {
  private asteroid: Graphics;
  private app: Application;
  private speed: number;
  private isFalling: boolean;
  private fallDelay: number;
  private radius: number;

  constructor(app: Application) {
    this.app = app;
    this.radius = 20; // should be ship's width / 2 ???
    this.asteroid = new Graphics();
    this.asteroid.beginFill(0xff0000);
    this.asteroid.drawCircle(0, 0, this.radius);
    //! An asteroid's width cannot be less than that of the ship (its diameter).

    this.asteroid.x =
      Math.random() * (app.screen.width - 56) + 56; // 56 is 1/2 of ship's width
    this.asteroid.y = -this.radius;
    this.speed = 1 + Math.random();
    this.isFalling = false;
    this.fallDelay = Math.random() * (3000 - 200) + 200;
    app.stage.addChild(this.asteroid);
  }

  private spawn(delta: number) {
    this.fallDelay -= delta;
    if (this.fallDelay <= 0) {
      this.isFalling = true;
    }
  }

  private fall(delta: number) {
    this.asteroid.y += this.speed * delta;
    if (this.asteroid.y > this.app.screen.height) {
      this.app.stage.removeChild(this.asteroid);
    }
  }

  update(delta: number) {
    this.isFalling ? this.fall(delta) : this.spawn(delta);
  }
}

export class AsteroidGroup {
  app: Application;
  asteroids: Asteroid[];
  quantity: number;

  constructor(app: Application, quantity: number) {
    this.app = app;
    this.asteroids = [];
    this.quantity = quantity;
  }

  spawnAsteroid() {
    if (this.asteroids.length < this.quantity) {
      const asteroid = new Asteroid(this.app);
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
