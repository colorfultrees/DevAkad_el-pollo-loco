class Character extends MoveableObject {
    IMAGES_WAIT = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SNOOZE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALK = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMP = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'

    ];
    IMAGES_DIE = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    keyboardListener;
    movingDistance = 7;

    constructor(positionX, positionY, keyboardListener) {
        super(positionX, positionY).loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');

        this.aspectRatio = 0.5083;
        this.width = 244;
        this.height = this.width / this.aspectRatio;

        this.loadImageCache(this.IMAGES_WAIT);
        this.loadImageCache(this.IMAGES_SNOOZE);
        this.loadImageCache(this.IMAGES_WALK);
        this.loadImageCache(this.IMAGES_JUMP);
        this.loadImageCache(this.IMAGES_HURT);
        this.loadImageCache(this.IMAGES_DIE);

        this.keyboardListener = keyboardListener;
        
        this.walk(130);
    }


    stopWalking() {
        this.img = this.imageCache[this.IMAGES_WAIT[0]];
    }


    /**
     * Animates the walking sequence of the object
     * @param {Number} frequency The frequency of the animated images
     */
    walk(frequency) {
        setInterval(() => {
            if ((this.keyboardListener.KEYS.RIGHT.status == true ||
                this.keyboardListener.KEYS.LEFT.status == true) &&
                this.keyboardListener.KEYS.UP.status == false) {
                    if (this.keyboardListener.KEYS.RIGHT.status) {
                        this.move(1);
                    }
                    else if (this.keyboardListener.KEYS.LEFT.status) {
                        this.move(-1);
                    }
                this.currentImage = this.currentImage % this.IMAGES_WALK.length
                this.img = this.imageCache[this.IMAGES_WALK[this.currentImage]];
                this.currentImage++;
            }
        }, frequency);
    }

    jump() {

    }
}