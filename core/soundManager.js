class SoundManager {
    constructor() {
        this.music = new Howl({
            src: ['assets/music/background.mp3'],
            loop: true,
            volume: 0.5,
        });

        this.sounds = {
            tower_place: new Howl({
                src: ['assets/sounds/tower_place.wav'],
            }),
            enemy_die: new Howl({
                src: ['assets/sounds/enemy_die.wav'],
            }),
            projectile_hit: new Howl({
                src: ['assets/sounds/projectile_hit.wav'],
            }),
        };
    }

    playMusic() {
        this.music.play();
    }

    playSound(sound) {
        this.sounds[sound].play();
    }
}

export default SoundManager;
