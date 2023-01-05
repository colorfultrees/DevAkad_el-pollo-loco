class World {
    background = {air, clouds: [], landscapeLayer1, landscapeLayer2, landscapeLayer3};
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
        this.background.clouds.forEach(cloud => this.ctx.drawImage(cloud.img,
                                                                   cloud.positionX,
                                                                   cloud.positionY,
                                                                   cloud.width,
                                                                   cloud.height));
        
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