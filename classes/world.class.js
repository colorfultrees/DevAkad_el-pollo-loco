class World {
    background = {air: {}, clouds: [], landscapeLayer: []};
    character;
    enemies = [];
    canvas;
    ctx;
    cameraPos = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw() {
        // Move the context relative to the character's position
        this.ctx.translate(this.cameraPos, 0);

        // Draw the sky
        this.drawSingleObjectToCanvas(this.background.air)

        // Draw the clouds
        this.drawMultipleObjectsToCanvas(this.background.clouds);

        // Draw the landscape
        this.drawMultipleObjectsToCanvas(this.background.landscapeLayer);
        
        // Draw the character
        this.drawSingleObjectToCanvas(this.character);

        // Draw the enemies
        this.drawMultipleObjectsToCanvas(this.enemies);

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
}