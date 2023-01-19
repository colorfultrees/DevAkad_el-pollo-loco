class Chicken extends MoveableObject {
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    IMAGES_DIE = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor(positionX, positionY) {
        super(positionX, positionY); //.loadImage(this.IMAGES_WALK[0]);

        this.aspectRatio = 1.0206;
        this.width = 124;
        this.height = this.width / this.aspectRatio;
        this.speedX = 3;
        this.healthPoints = 1;
        this.collisionBasis.offsetXRatio = 0;
        this.collisionBasis.offsetYRatio = 0;
        this.collisionBasis.widthRatio = 1;
        this.collisionBasis.heightRatio = 1;
        // this.getCollisionArea(0, 0, 1, 1);

        this.loadImageCache(this.IMAGES_WALK);
        this.loadImageCache(this.IMAGES_DIE);

        this.setHorizMoveIntval(100, 300);
        // this.initHorizontalMovement(world.enemies, -1);

        this.walk(calcRandomNumber(100, 170), this.IMAGES_WALK);
    }
}