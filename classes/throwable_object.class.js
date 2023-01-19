class ThrowableObject extends MoveableObject {
    IMAGES_ROTATE = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    IMAGES_GROUND = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.IMAGES_ROTATE[0]);
        this.speedX = 8;
        this.speedY = 20;
        this.aspectRatio = 400 / 400;
        this.width = 100;
        this.height = this.width/this.aspectRatio;
        this.groundPosition = canvas.height - 20;
        this.collisionBasis.offsetXRatio = 0.15;
        this.collisionBasis.offsetYRatio = 0.15;
        this.collisionBasis.widthRatio = 0.72;
        this.collisionBasis.heightRatio = 0.72;
        this.loadImageCache(this.IMAGES_ROTATE);
        this.loadImageCache(this.IMAGES_SPLASH);
        this.loadImageCache(this.IMAGES_GROUND);
        this.throw();
    }


    throw() {
        this.currentImage = 0;
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
            if (!this.isAboveGround()) {
                clearInterval(interval);
                this.currentImage = 0;
                this.speedY = 0;
                this.loadImage(this.IMAGES_GROUND[Math.round(Math.random())]);
            }
        }, 90);
        setTimeout(() => {this.applyGravity()}, 100);
    }
}