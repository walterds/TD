class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(entities) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        entities.forEach(entity => {
            if (entity.constructor.name === 'Tower') {
                this.drawTower(entity);
            } else if (entity.constructor.name === 'Enemy') {
                this.drawEnemy(entity);
            } else if (entity.constructor.name === 'Projectile') {
                this.drawProjectile(entity);
            }
        });
    }

    drawTower(tower) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(tower.x - 10, tower.y - 10, 20, 20);
    }

    drawEnemy(enemy) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(enemy.x - 10, enemy.y - 10, 20, 20);
    }

    drawProjectile(projectile) {
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

export default Renderer;
