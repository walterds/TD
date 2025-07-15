class Projectile {
    constructor(x, y, speed, damage, target) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.target = target;
    }

    update(deltaTime, game) {
        if (this.target) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                this.target.takeDamage(this.damage);
                game.soundManager.playSound('projectile_hit');
                game.removeEntity(this);
            } else {
                this.x += (dx / distance) * this.speed * (deltaTime / 1000);
                this.y += (dy / distance) * this.speed * (deltaTime / 1000);
            }
        }
    }
}

export default Projectile;
