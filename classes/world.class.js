class World {
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


    draw() {
        // Move the context relative to the character's position
        this.ctx.translate(this.cameraPos, 0);

        // Draw the sky
        this.drawSingleObjectToCanvas(this.level.background.sky)

        // Draw the clouds
        this.drawMultipleObjectsToCanvas(this.level.background.clouds);

        // Draw the landscape
        this.drawMultipleObjectsToCanvas(this.level.background.landscapeLayer);
        
        // Draw the character
        this.drawSingleObjectToCanvas(this.character);

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
        this.level.background.landscapeLayer[0].positionX += this.character.parallaxLandscapeLayer2 * direction;
        this.level.background.landscapeLayer[1].positionX += this.character.parallaxLandscapeLayer3 * direction;
    }
}