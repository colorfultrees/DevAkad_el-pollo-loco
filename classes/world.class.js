class World {
    background = {air: {}, clouds: [], landscapeLayer: []};
    character;
    enemies = [];
    canvas;
    ctx;

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
        requestAnimationFrame(() => self.draw());
    }

    drawSingleObjectToCanvas(obj) {
        this.ctx.drawImage(obj.img, obj.positionX, obj.positionY, obj.width, obj.height);
    }

    drawMultipleObjectsToCanvas(array) {
        array.forEach(object => this.drawSingleObjectToCanvas(object));
    }
}