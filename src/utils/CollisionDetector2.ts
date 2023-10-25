import { Application, Rectangle } from "pixi.js";
import { Boss, PlayerShip, ProjectileGroup } from "../";

export class CollisionDetector2 {
  private app: Application;
  private projectileGroup: ProjectileGroup;
  private bossProjectiles: ProjectileGroup;
  private boss: Boss;

  constructor(
    app: Application,
    playerProjectiles: ProjectileGroup,
    bossProjectiles: ProjectileGroup,
    boss: Boss
  ) {
    this.app = app;
    this.projectileGroup = playerProjectiles;
    this.bossProjectiles = bossProjectiles;
    this.boss = boss;
  }

  // Player's projectiles collide with Boss
  checkBossCollisions(player: PlayerShip) {
    const bossBounds = this.boss.boundaries;
    const playerProjectiles = this.projectileGroup.projectiles;
    for (const projectile of playerProjectiles) {
      if (
        this.testIsCollision(bossBounds, projectile.getBoundaries()) &&
        projectile.isActive
      ) {
        this.boss.takeDamage(1);
        projectile.resetTo(player.x, player.x);
      }
    }
  }

  // Boss' projectiles collide with PlayerShip
  checkPlayerCollisions(player: PlayerShip) {
    const bossProjectiles = this.bossProjectiles.projectiles;
    for (const projectile of bossProjectiles) {
      if (
        this.testIsCollision(player.getBoundaries(), projectile.getBoundaries())
      ) {
        const loseEvent = new CustomEvent("playerDefeated");
        this.app.stage.emit(loseEvent.type, loseEvent);
      }
    }
  }

  // Both Boss' and Player's projectiles collide
  checkProjectileCollisions(boss: Boss, player: PlayerShip) {
    const bossProjectiles = this.bossProjectiles.projectiles;
    const playerProjectiles = this.projectileGroup.projectiles;
    for (const bProjectile of bossProjectiles) {
      for (const pProjectile of playerProjectiles) {
        if (
          this.testIsCollision(
            bProjectile.getBoundaries(),
            pProjectile.getBoundaries()
          )
        ) {
          bProjectile.resetTo(boss.x, boss.y);
          pProjectile.resetTo(player.x, player.y);
        }
      }
    }
  }

  testIsCollision(aBounds: Rectangle, bBounds: Rectangle) {
    return (
      aBounds.x < bBounds.x + bBounds.width &&
      aBounds.x + aBounds.width > bBounds.x &&
      aBounds.y < bBounds.y + bBounds.height &&
      aBounds.y + aBounds.height > bBounds.y
    );
  }
}
