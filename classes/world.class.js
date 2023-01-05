class World {
    clouds;
    character;
    enemies = [];
    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw() {
        // Draw the clouds
        this.ctx.drawImage(this.clouds.img,
                           this.clouds.positionX,
                           this.clouds.positionY,
                           this.clouds.width,
                           this.clouds.height);

        // Draw the character
        this.ctx.drawImage(this.character.img,
                           this.character.positionX,
                           this.character.positionY,
                           this.character.width,
                           this.character.height);

        // Draw the enemies
        this.enemies.forEach(enemy => this.ctx.drawImage(enemy.img,
                                                         enemy.positionX,
                                                         enemy.positionY,
                                                         enemy.width,
                                                         enemy.height));

        let self = this;
        requestAnimationFrame(() => self.draw());
    }
}