class Chick extends MoveableObject {
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGES_DIE = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.setBasicParams();
        this.setCollisionBasis(0, 0, 1, 1);
        this.loadImagesToCache(this.IMAGES_WALK, this.IMAGES_DIE);
        this.setHorizMoveIntval(100, 300);
        this.walk(calcRandomNumber(90, 150), this.IMAGES_WALK);
    }


    /**
     * Sets the basic parameters
     */
    setBasicParams() {
        this.aspectRatio = 1.1238;
        this.width = 70;
        this.height = this.width / this.aspectRatio;
        this.speedX = 6;
        this.healthPoints = 1;
    }
}