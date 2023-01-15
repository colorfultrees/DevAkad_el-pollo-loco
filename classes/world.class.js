class World {
    AUDIO = {
        background_music: new Audio('./audio/background-music_1.wav'),
        rooster: new Audio('./audio/rooster.wav')
    }
    character;
    level;
    canvas;
    ctx;
    cameraPos = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }


    /**
     * Creates the main character
     */
    createCharacter() {
        const startPosX = 100;
        this.character = new Character(startPosX, 0, keyboardListener);
        this.character.positionY = canvas.height - this.character.height;
        // world.setCameraPos(-startPosX);
    }


    setLevel(level) {
        this.level = level;
    }


    initBackgroundSound() {
        // Start the background music
        this.playSound(this.AUDIO.background_music, 0.25, true)

        // Start the loop for the rooster crow
        setInterval(() => {
            setTimeout(() => {
                this.playSound(this.AUDIO.rooster, 0.75, false);
            }, calcRandomNumber(0, 15000));
        }, 20000);
    }


    draw() {
        // Move the context relative to the character's position
        this.ctx.translate(this.cameraPos, 0);

        // Draw the sky
        this.drawMultipleObjectsToCanvas(this.level.background.sky);

        // Draw the clouds
        this.drawMultipleObjectsToCanvas(this.level.background.clouds);

        // Draw the landscape
        this.drawMultipleObjectsToCanvas(this.level.background.landscapeLayer);
        
        // Draw the character
        this.drawSingleObjectToCanvas(this.character);

        // Draw the endboss
        this.drawSingleObjectToCanvas(this.level.endboss);

        // Draw the enemies
        this.drawMultipleObjectsToCanvas(this.level.enemies);

        // Reset the context's position
        this.ctx.translate(-this.cameraPos, 0);

        let self = this;
        requestAnimationFrame(() => self.draw());
    }

    drawSingleObjectToCanvas(obj) {
        this.mirrorImage(obj);
        this.ctx.drawImage(obj.img, obj.positionX, obj.positionY, obj.width, obj.height);
        this.resetMirroring(obj);
    }


    mirrorImage(obj) {
        if (obj.isImageMirrored) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0);
            this.ctx.scale(-1, 1);
            obj.positionX = obj.positionX * -1;
        }
    }


    resetMirroring(obj) {
        if (obj.isImageMirrored) {
            obj.positionX = obj.positionX * -1;
            this. ctx.restore();
        }
    }


    drawMultipleObjectsToCanvas(array) {
        array.forEach(object => this.drawSingleObjectToCanvas(object));
    }


    setCameraPos(pos) {
        this.cameraPos = pos;
    }


    moveBackground(direction) {
        for (let l = 0; l < 2; l++) {
            for (let i = 0; i < world.level.sceneParts; i++) {
                this.level.background.landscapeLayer[(l * 2) + i].positionX += this.level.parallaxLandscapeLayer[l] * direction;
            }            
        }
    }


    /**
     * Starts playing a sound
     * @param {Object} sound The Audio object to be played
     * @param {Number} volume The value of the audio's volume
     * @param {Boolean} isLooping Flag to set the sound playing in a loop
     */
    playSound(sound, volume, isLooping) {
        sound.volume = volume;
        sound.loop = isLooping;
        sound.play();
    }


    /**
     * Stops playing a sound and resets it to its start
     * @param {Object} sound The Audio object to be played
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}