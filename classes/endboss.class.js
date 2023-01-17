class Endboss extends MoveableObject {
    IMAGES_WALK = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ]
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ]
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    IMAGES_DIE = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    moveAlertedIntvalId = 0;
    isPaused = false; // Flag to create a pause between animations

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.IMAGES_WALK[0]);

        this.aspectRatio = 1045/1217;
        this.width = 400;
        this.height = this.width / this.aspectRatio;
        this.healthPoints = 5;
        this.collisionBasis.offsetXRatio = 0;
        this.collisionBasis.offsetYRatio = 0;
        this.collisionBasis.widthRatio = 1;
        this.collisionBasis.heightRatio = 1;
        // this.getCollisionArea(0, 0, 1, 1);

        this.loadImageCache(this.IMAGES_WALK);
        this.loadImageCache(this.IMAGES_ALERT);
        this.loadImageCache(this.IMAGES_ATTACK);
        this.loadImageCache(this.IMAGES_HURT);
        this.loadImageCache(this.IMAGES_DIE);

        this.movingDistance = 4.5;

        this.moveAlerted();
    }


    /**
     * Animates the alerted state
     */
    moveAlerted() {
        this.moveAlertedIntvalId = setInterval(() => {
            if (!this.isPaused) {
                if (this.currentImage > 0 && this.currentImage % this.IMAGES_ALERT.length == 0) {
                    this.isPaused = true;
                    setTimeout(() => {
                        this.isPaused = false;
                        this.playAnimation(this.IMAGES_ALERT);
                    }, calcRandomNumber(200, 700));
                }
                else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 150);
    }
}