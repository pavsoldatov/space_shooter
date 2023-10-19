import { Application, Graphics } from "pixi.js";

class Asteroid {
  asteroid: Graphics;
  app: Application;
  speed: number;
  isFalling: boolean;
  fallDelay: number;

  constructor(app: Application) {
    this.app = app;
    this.asteroid = new Graphics();
    this.asteroid.beginFill(0xff0000);
    this.asteroid.drawCircle(0, 0, 20);

    this.asteroid.x = Math.random() * (app.screen.width - 40) + 20;
    this.asteroid.y = -20;
    this.speed = 1.5;
    this.isFalling = false;
    this.fallDelay = Math.random() * (3000 - 200) + 200;
      // Math.max(Math.random() * 3000, Math.random() * 5000) - 1000;
    app.stage.addChild(this.asteroid);
  }

  private handleFalling(delta: number) {
    this.fallDelay -= delta;
    console.log(this.fallDelay);
    if (this.fallDelay <= 0) {
      this.isFalling = true;
    }
  }

  private handleRemoval(delta: number) {
    this.asteroid.y += this.speed * delta;
    if (this.asteroid.y > this.app.screen.height) {
      this.app.stage.removeChild(this.asteroid);
    }
  }

  update(delta: number) {
    this.isFalling ? this.handleRemoval(delta) : this.handleFalling(delta);
  }
}

export class AsteroidGroup {
  app: Application;
  asteroids: Asteroid[];
  maxAsteroids: number;
  constructor(app: Application, maxAsteroids: number) {
    this.app = app;
    this.asteroids = [];
    this.maxAsteroids = maxAsteroids;
  }

  spawnAsteroid() {
    if (this.asteroids.length < this.maxAsteroids) {
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
