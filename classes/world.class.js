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
        try {
            this.ctx.drawImage(obj.img, obj.positionX, obj.positionY, obj.width, obj.height);
        } catch {
            console.log(obj, obj.img);
            cancelAnimationFrame(this.requAnimId);
        }
        
    }

    drawMultipleObjectsToCanvas(array) {
        array.forEach(object => this.drawSingleObjectToCanvas(object));
    }
}