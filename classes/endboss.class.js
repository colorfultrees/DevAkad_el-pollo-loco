class Endboss extends MoveableObject {
    IMAGES_WALK = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DIE = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    IMAGE_STATUS_ICON = {
        img: new Image(),
        positionX: 0,
        positionY: 0,
        width: 0,
        height: 0
    };
    statusbar = new Statusbar('health', 100);
    moveAlertedIntvalId = 0;
    isAnimPaused = false; // Flag to create a pause between animations
    status = 'alert';

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.IMAGES_WALK[0]);

        this.aspectRatio = 1045/1217;
        this.width = 400;
        this.height = this.width / this.aspectRatio;
        this.healthPoints = 100;
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

        this.speedX = 4;

        this.statusbar.positionX = canvas.width + 100;
        this.IMAGE_STATUS_ICON.img.src = './img/7_statusbars/3_icons/icon_health_endboss.png';
        this.IMAGE_STATUS_ICON.positionX = this.statusbar.positionX;
        this.IMAGE_STATUS_ICON.positionY = this.statusbar.positionY;
        this.IMAGE_STATUS_ICON.width = 65;
        this.IMAGE_STATUS_ICON.height = 65;
        this.controlStatusbarPos();

        this.moveAlerted();

        // TEST
        // this.status = 'attack';
        // this.attack();
        // TEST
    }


    /**
     * Controls the position of the endboss' statusbar
     */
    controlStatusbarPos() {
        intervals.push(
            setInterval(() => {
                if (this.positionX - world.character.positionX < canvas.width - world.character.offsetPosX) {
                    this.statusbar.positionX = canvas.width - this.statusbar.width - 30;
                    this.IMAGE_STATUS_ICON.positionX = this.statusbar.positionX - 15;
                }
                else {
                    this.statusbar.positionX = canvas.width + 100;
                    this.IMAGE_STATUS_ICON.positionX = this.statusbar.positionX;
                }
            }, 1000)
        )
    }


    /**
     * Animates the alerted state
     */
    moveAlerted() {
        this.moveAlertedIntvalId = setInterval(() => {
            if (!this.isAnimPaused) {
                if (this.currentImage > 0 && this.currentImage % this.IMAGES_ALERT.length == 0) {
                    this.isAnimPaused = true;
                    setTimeout(() => {
                        this.isAnimPaused = false;
                        this.playAnimation(this.IMAGES_ALERT);
                    }, calcRandomNumber(200, 700));
                }
                else {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 150);
    }


    attack() {
        let sequCount = 0;
        this.currentImage = 0;
        intervals.push(
            setInterval(() => {
                if (this.status == 'attack') {
                    this.playAnimation(this.IMAGES_ATTACK);

                    console.log(`endboss ATTACK currImg = ${this.currentImage}`);

                    if (this.currentImage >= this.IMAGES_ATTACK.length) {
                        this.currentImage = 0;
                        this.status = 'walk';
                    }
                }
                else if (this.status == 'walk') {
                    this.move(-1);
                    this.playAnimation(this.IMAGES_WALK);
                    sequCount++;

                    console.log(`endboss WALK currImg = ${this.currentImage}`);

                    if (sequCount >= this.IMAGES_WALK.length * 3) {
                        this.currentImage = 0;
                        sequCount = 0;
                        this.status = 'attack';
                    }
                }
            }, 150)
        )
    }


    hurt() {

    }


    die() {

    }
}