import { Application } from "pixi.js";
import {
  ProjectileGroup,
  Asteroid,
  AsteroidGroup,
  Projectile,
  HitCounter,
} from "./";

export class CollisionDetector {
  private app: Application;
  private projectileGroup: ProjectileGroup;
  private asteroidGroup: AsteroidGroup;
  private hitCounter: HitCounter;

  constructor(
    app: Application,
    projectiles: ProjectileGroup,
    asteroids: AsteroidGroup,
    hitCounter: HitCounter
  ) {
    this.app = app;
    this.projectileGroup = projectiles;
    this.asteroidGroup = asteroids;
    this.hitCounter = hitCounter;
  }

  checkCollisions() {
    const asteroids = this.asteroidGroup.asteroids;
    const projectiles = this.projectileGroup.projectiles;
    for (const asteroid of asteroids) {
      for (const projectile of projectiles) {
        if (this.testIsCollision(asteroid, projectile)) {
          asteroid.resetPosition();
          projectile.reset();
          this.hitCounter.incrementHitCount();
        }
      }
    }
  }

  testIsCollision(asteroid: Asteroid, projectile: Projectile) {
    const aBounds = asteroid.getBoundaries();
    const pBounds = projectile.getBoundaries();
    return (
      aBounds.x < pBounds.x + pBounds.width &&
      aBounds.x + aBounds.width > pBounds.x &&
      aBounds.y < pBounds.y + pBounds.height &&
      aBounds.y + aBounds.height > pBounds.y
    );
  }
}
