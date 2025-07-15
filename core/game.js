import StateManager from './stateManager.js';
import Renderer from './renderer.js';
import Tower from '../entities/Tower.js';
import Enemy from '../entities/Enemy.js';
import HUD from '../ui/hud.js';
import SoundManager from './soundManager.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stateManager = new StateManager();
        this.renderer = new Renderer(this.ctx);
        this.hud = new HUD(this);
        this.soundManager = new SoundManager();
        this.entities = [];
        this.towerSpots = [];
        this.selectedTower = null;
        this.levelData = null;
        this.lastTime = 0;
        this.loadProgress();
        this.init();
    }

    async init() {
        this.canvas.width = 800;
        this.canvas.height = 600;

        await this.loadLevel('levels/level-1.json');

        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));

        this.startWave();
        this.gameLoop();
    }

    async loadLevel(levelFile) {
        const response = await fetch(levelFile);
        this.levelData = await response.json();
        this.towerSpots = this.levelData.map.towerSpots;
    }

    startWave() {
        const wave = this.levelData.waves[0];
        wave.enemies.forEach(enemyData => {
            for (let i = 0; i < enemyData.count; i++) {
                setTimeout(() => {
                    const enemy = new Enemy(0, 100, 50, 100, 'none', enemyData.type);
                    enemy.path = this.levelData.map.path;
                    this.entities.push(enemy);
                }, i * enemyData.delay);
            }
        });
    }

    handleMouseDown(event) {
        const mouseX = event.clientX - this.canvas.offsetLeft;
        const mouseY = event.clientY - this.canvas.offsetTop;

        // For now, we'll just create a new tower on click
        this.selectedTower = new Tower(mouseX, mouseY, 100, 10, 1000);
    }

    handleMouseMove(event) {
        if (this.selectedTower) {
            this.selectedTower.x = event.clientX - this.canvas.offsetLeft;
            this.selectedTower.y = event.clientY - this.canvas.offsetTop;
        }
    }

    handleMouseUp(event) {
        if (this.selectedTower) {
            const mouseX = event.clientX - this.canvas.offsetLeft;
            const mouseY = event.clientY - this.canvas.offsetTop;

            const spot = this.getTowerSpot(mouseX, mouseY);
            if (spot) {
                this.selectedTower.x = spot.x;
                this.selectedTower.y = spot.y;
                this.entities.push(this.selectedTower);
                this.soundManager.playSound('tower_place');
            }
            this.selectedTower = null;
        }
    }

    getTowerSpot(x, y) {
        for (const spot of this.towerSpots) {
            const distance = Math.sqrt(Math.pow(spot.x - x, 2) + Math.pow(spot.y - y, 2));
            if (distance < 20) {
                return spot;
            }
        }
        return null;
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }



    update(deltaTime) {
        const enemies = this.entities.filter(e => e instanceof Enemy);
        this.entities.forEach(entity => {
            if (entity instanceof Tower) {
                entity.update(deltaTime, enemies, this);
            } else if (entity instanceof Projectile) {
                entity.update(deltaTime, this);
            } else {
                entity.update(deltaTime);
            }
        });

        this.entities = this.entities.filter(e => !e.toRemove);
    }

    removeEntity(entity) {
        entity.toRemove = true;
    }

    saveProgress() {
        const progress = {
            level: this.levelData.level,
            gold: this.hud.gold,
            life: this.hud.playerLife,
        };
        localStorage.setItem('mythological_td_progress', JSON.stringify(progress));
    }

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem('mythological_td_progress'));
        if (progress) {
            this.hud.gold = progress.gold;
            this.hud.playerLife = progress.life;
        }
    }

    draw() {
        this.renderer.draw(this.entities);
        this.hud.draw(this.ctx);
    }
}

window.addEventListener('load', () => {
    new Game();
});
