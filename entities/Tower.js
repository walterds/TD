import Projectile from './Projectile.js';

class Tower {
    constructor(x, y, range, damage, fireRate) {
        this.x = x;
        this.y = y;
        this.range = range;
        this.damage = damage;
        this.fireRate = fireRate;
        this.cooldown = 0;
    }

    update(deltaTime, enemies, game) {
        if (this.cooldown > 0) {
            this.cooldown -= deltaTime;
        }

        if (this.canFire()) {
            const target = this.findTarget(enemies);
            if (target) {
                this.fire(target, game);
            }
        }
    }

    canFire() {
        return this.cooldown <= 0;
    }

    fire(target, game) {
        this.cooldown = this.fireRate;
        const projectile = new Projectile(this.x, this.y, 200, this.damage, target);
        game.entities.push(projectile);
    }

    findTarget(enemies) {
        for (const enemy of enemies) {
            const distance = Math.sqrt(Math.pow(enemy.x - this.x, 2) + Math.pow(enemy.y - this.y, 2));
            if (distance <= this.range) {
                return enemy;
            }
        }
        return null;
    }
}

export default Tower;
