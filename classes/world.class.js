class World {
    character;
    enemies = [];
    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw() {
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