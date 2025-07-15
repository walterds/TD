class Enemy {
    constructor(x, y, speed, health, resistance, type) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.health = health;
        this.resistance = resistance;
        this.path = null;
        this.pathIndex = 0;
        this.type = type;

        if (this.type === 'troll') {
            this.health = 200;
            this.speed = 30;
        }
    }

    update(deltaTime) {
        if (this.path && this.pathIndex < this.path.length) {
            const target = this.path[this.pathIndex];
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                this.pathIndex++;
            } else {
                this.x += (dx / distance) * this.speed * (deltaTime / 1000);
                this.y += (dy / distance) * this.speed * (deltaTime / 1000);
            }
        }
    }

    takeDamage(damage) {
        this.health -= damage;
    }
}

export default Enemy;
