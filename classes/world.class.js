class World {
    background = {air: {}, clouds: [], landscapeLayer: []};
    character;
    enemies = [];
    canvas;
    ctx;
    requAnimId = -1;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw() {
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

        let self = this;
        this.requAnimId = requestAnimationFrame(() => self.draw());
    }

    drawSingleObjectToCanvas(obj) {
        // Mirror the object if it moves opposite its standard direction
        if (obj.isImageMirrored) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0);
            this.ctx.scale(-1, 1);
            obj.positionX = obj.positionX * -1;
        }
        this.ctx.drawImage(obj.img, obj.positionX, obj.positionY, obj.width, obj.height);
        // If the image was drawn mirrored, restore the context
        if (obj.isImageMirrored) {
            obj.positionX = obj.positionX * -1;
            this. ctx.restore();
        }
    }

    drawMultipleObjectsToCanvas(array) {
        array.forEach(object => this.drawSingleObjectToCanvas(object));
    }
}