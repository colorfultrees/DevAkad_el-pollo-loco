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
    moveIntvalId = 0;


    constructor(positionX, positionY, isImageMirrored) {
        super(positionX, positionY).loadImage(this.IMAGES_ROTATE[0]);
        this.isImageMirrored = isImageMirrored;
        this.setBasicParams();
        this.setCollisionBasis(0.15, 0.15, 0.72, 0.72);
        this.loadImagesToCache(this.IMAGES_ROTATE, this.IMAGES_SPLASH, this.IMAGES_GROUND);
        this.throw();
    }


    /**
     * Sets the basic parameters
     */
    setBasicParams() {
        this.speedX = 18;
        this.speedY = 45;
        this.aspectRatio = 400 / 400;
        this.width = 80;
        this.height = this.width/this.aspectRatio;
        this.groundPosition = canvas.height - this.height - 53;
    }


    /**
     * Animate the flying bottle
     */
    throw() {
        this.currentImage = 0;
        this.moveIntvalId = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
            this.isImageMirrored ? this.move(-1) : this.move(1);
            if (!this.isAboveGround()) {
                clearInterval(this.moveIntvalId);
                this.loadImage(this.IMAGES_GROUND[Math.round(Math.random())]);
            }
        }, 40);
        setTimeout(() => {this.applyGravity()}, 100);
    }


    /**
     * Animate the smashed bottle
     */
    smash() {
        this.currentImage = 0;
        this.isSmashed = true;
        clearInterval(this.moveIntvalId);
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                const objId = world.throwables.findIndex(b => b === this);
                clearInterval(interval);
                world.throwables.splice(objId, 1);
            }
        }, 70);
        world.playSound(world.AUDIO.bottleSmash, 0.8, false);
    }
}