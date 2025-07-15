class HUD {
    constructor(game) {
        this.game = game;
        this.playerLife = 100;
        this.gold = 200;
        this.currentWave = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Life: ${this.playerLife}`, 10, 30);
        ctx.fillText(`Gold: ${this.gold}`, 10, 60);
        ctx.fillText(`Wave: ${this.currentWave}`, 10, 90);
    }
}

export default HUD;
