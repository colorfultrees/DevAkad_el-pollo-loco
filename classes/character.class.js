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
    offsetPosX = 0;
    playInitAnim = true;
    hasThrownBottle = false;
    counterBottles = 0;
    counterCoins = 0;

    constructor(positionX, positionY, keyboardListener) {
        super(positionX, positionY).loadImage(this.IMAGES_WAIT[0]);
        this.setBasicParams(positionX);
        this.setCollisionBasis(0.15, 0.45, 0.55, 0.55);
        this.loadImagesToCache(this.IMAGES_WAIT, this.IMAGES_SNOOZE, this.IMAGES_WALK, this.IMAGES_JUMP, this.IMAGES_HURT, this.IMAGES_DIE);

        this.keyboardListener = keyboardListener;

        this.initMovementIntvals();
    }


    /**
     * Sets the basic parameters
     */
    setBasicParams(posX) {
        this.aspectRatio = 0.5083;
        this.width = 220;
        this.height = this.width / this.aspectRatio;
        this.offsetPosX = posX;
        this.speedX = 8;
        this.healthPoints = 100;
    }


    /**
     * Initiates the movement intervals
     */
    initMovementIntvals() {
        this.setHorizMoveIntval();
        this.walk();
        this.jump();
        this.throwBottle();
        setTimeout(() => {
            this.waitAndSnooze();
            lastActiveTimestamp = Date.now();
        }, 10000);
    }


    /**
     * Resets the character to its waiting position
     */
    reset() {
        this.currentImage = 0;
        this.loadImage(this.IMAGES_WAIT[0]);
        lastActiveTimestamp = Date.now();
    }


    /**
     * Animates the waiting and snoozing sequences
     */
    waitAndSnooze() {
        // intervals.push(
            // setInterval(() => {
            setStopableInterval(() => {
                if (!this.keyboardListener.getKeyboardStatus() && !this.gotHit) {
                    let now = Date.now();
                    if (now - lastActiveTimestamp > 4000 && now - lastActiveTimestamp <= 8000) {
                        this.playAnimation(this.IMAGES_WAIT);
                    }
                    else if (now - lastActiveTimestamp > 8000) {
                        this.playAnimation(this.IMAGES_SNOOZE);
                    }
                }
            }, 180)
        // );
    }


    /**
     * Sets the interval for the horizontal movement
     */
    setHorizMoveIntval() {
        // intervals.push(
            // setInterval(() => {
            setStopableInterval(() => {
                const maxCameraPosX = (world.level.background.landscapeLayer[0].width * world.level.sceneParts) - canvas.width + this.offsetPosX;
                const maxPosX = (world.level.background.landscapeLayer[0].width * world.level.sceneParts) - this.offsetPosX - this.width;
                if (this.keyboardListener.KEYS.RIGHT.status) {
                    this.controlRightMovement(maxCameraPosX, maxPosX);
                }
                else if (this.keyboardListener.KEYS.LEFT.status) {
                    this.controlLeftMovement(maxCameraPosX);
                }
            }, 55)
        // );
    }
    
    
    /**
     * Controls the movement to the right
     * @param {Number} maxCameraPosX The farthest right camera position
     * @param {Number} maxPosX The farthest right character position
     */
    controlRightMovement(maxCameraPosX, maxPosX) {
        this.isImageMirrored = false;
        if (this.positionX <= maxPosX) {
            this.move(1);
        }
        if (this.positionX <= maxCameraPosX) {
            world.setCameraPos(-this.positionX + this.offsetPosX);
            world.moveBackground(1);
        }
    }
    
    
    /**
     * Controls the movement to the left
     * @param {Number} maxCameraPosX The farthest right camera position
     */
    controlLeftMovement(maxCameraPosX) {
        this.isImageMirrored = true;
        if (this.positionX > this.offsetPosX) {
            this.move(-1);
            if (this.positionX <= maxCameraPosX) {
                world.setCameraPos(-this.positionX + this.offsetPosX);
                world.moveBackground(-1);
            }
        }
    }


    /**
     * Animates the walking sequence
     * @param {Number} frequency The frequency of the animated images
     */
    walk() {
        // intervals.push(
            // setInterval(() => {
            setStopableInterval(() => {
                if ((this.keyboardListener.KEYS.RIGHT.status ||
                    this.keyboardListener.KEYS.LEFT.status) &&
                    !this.isAboveGround() && !this.gotHit) {
                        this.isWalking = true;
                        this.playAnimation(this.IMAGES_WALK);
                        world.playSound(world.AUDIO.walking, 1, false);
                }
                else if (this.isWalking) {
                    this.stopWalking();
                }
            }, 115)
        // );
    }
    
    
    /**
     * Stops the walking animation
    */
    stopWalking() {
        this.isWalking = false;
        this.reset();
        world.stopSound(world.AUDIO.walking);
    }


    /**
     * Controls the "jump" function
     */
    jump() {
        // intervals.push(
            // setInterval(() => {
            setStopableInterval(() => {
                if ((this.keyboardListener.KEYS.JUMP.status && !this.isAboveGround()) && !this.isJumping || this.playInitAnim) {
                    this.isJumping = true;
                    this.currentImage = 2;
                    this.animateJump();
                    this.speedY = 50;
                    setTimeout(() => {this.applyGravity()}, 100);
                    if (!this.playInitAnim) world.playSound(world.AUDIO.jump, 1, false);
                }
            }, 50)
        // );
    }


    /**
     * Animates the jump sequence
    */
   animateJump() {
       let interval = setInterval(() => {
           this.playAnimation(this.IMAGES_JUMP);
           if (!this.isAboveGround()) {
               clearInterval(interval);
               this.speedY = 0;
               this.reset();
           }
       }, 90);
    }


    /**
     * Animates the hurting sequence
     */
    hurt() {
        this.currentImage = 0;
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
            if (this.currentImage >= this.IMAGES_HURT.length || this.isAboveGround()) {
                clearInterval(interval);
                setTimeout(() => {
                    this.gotHit = false;
                    this.reset();
                }, 200);
            }
        }, 90);
        world.playSound(world.AUDIO.hurt, 1, false);
    }


    /**
     * Initiates the throw of a bottle
     */
    throwBottle() {
        // intervals.push(
            // setInterval(() => {
            setStopableInterval(() => {
                if (this.keyboardListener.KEYS.THROW.status && !this.hasThrownBottle && this.counterBottles > 0) {
                    this.updateBottleParams();
                    if (!this.isWalking && !this.isJumping) this.reset();
                    this.handleBottleThrowing();
                }
            }, 50)
        // );
    }


    /**
     * Manages the bottles
     */
    updateBottleParams() {
        this.hasThrownBottle = true;
        this.counterBottles--;
        world.statusbars.bottle.setValue(100 / world.level.maxBottles * this.counterBottles);
    }


    /**
     * Handles the throwing of a bottle
     */
    handleBottleThrowing() {
        const startX = this.positionX + (this.width / 2);
        const startY = this.positionY + (this.height / 3);
        world.throwables.push(new ThrowableObject(startX, startY, this.isImageMirrored));
        setTimeout(() => {this.hasThrownBottle = false;}, 500);
    }
}