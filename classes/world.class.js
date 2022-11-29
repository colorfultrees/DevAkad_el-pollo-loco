class World {
    character;
    enemies = [];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
    }

    draw() {
        this.ctx.drawImage(this.character.img, this.character.positionX, this.character.positionY, this.character.width, this.character.height);
        for (let e = 0; e < this.enemies.length; e++) {
            this.ctx.drawImage(this.enemies[e].img, this.enemies[e].positionX, this.enemies[e].positionY, this.enemies[e].width, this.enemies[e].height);
        }
    }
}