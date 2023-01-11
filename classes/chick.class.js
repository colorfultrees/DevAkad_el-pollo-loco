class Chick extends MoveableObject {
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGES_DIE = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    movingDistance = 2.5;

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.aspectRatio = 1.1238;
        this.width = 80;
        this.height = this.width / this.aspectRatio;

        this.loadImageCache(this.IMAGES_WALK);
        this.loadImageCache(this.IMAGES_DIE);

        this.setHorizMoveIntval(100, 300);
        this.initHorizontalMovement(world.enemies, -1);

        this.walk(calcRandomNumber(90, 150));
    }
}