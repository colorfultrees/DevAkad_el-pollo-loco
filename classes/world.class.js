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
        // Draw the air
        this.ctx.drawImage(
            this.background.air.img, this.background.air.positionX, this.background.air.positionY,
            this.background.air.width, this.background.air.height);

        // Draw the clouds
        this.background.clouds.forEach(cloud => this.ctx.drawImage(
            cloud.img, cloud.positionX, cloud.positionY, cloud.width, cloud.height));

        // Draw the landscape
        this.background.landscapeLayer.forEach(landscape => this.ctx.drawImage(
            landscape.img, landscape.positionX, landscape.positionY, landscape.width, landscape.height));
        
        // Draw the character
        this.ctx.drawImage(
            this.character.img, this.character.positionX, this.character.positionY,
            this.character.width, this.character.height);

        // Draw the enemies
        this.enemies.forEach(enemy => this.ctx.drawImage(
            enemy.img, enemy.positionX, enemy.positionY, enemy.width, enemy.height));

        let self = this;
        requestAnimationFrame(() => self.draw());
    }
}