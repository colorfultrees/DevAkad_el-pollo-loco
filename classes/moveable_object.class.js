class MoveableObject extends DrawableObject {
    isImageMirrored = false;
    speedX = 0; // The distance which the object moves at each step
    horizMoveInterval; // The moving interval in ms
    horizMoveIntervalId = 0;
    walkIntervalId = 0;
    speedY = 0; // Vertical speed - rising: (+), falling: (-)
    acceleration = 5;
    groundPosition = 0;
    healthPoints = 0;
    isWalking = false;
    isJumping = false;
    gotHit = false;
    isDead = false;
    isSmashed = false;


    constructor(positionX, positionY) {
        super(positionX, positionY);
    }


    /**
     * Calculates the collision area of an object
     * @param {Number} offsetXRatio Offset from x-coord. of the object
     * @param {Number} offsetYRatio Offset from the y-coord. of the object
     * @param {Number} heightRatio Percentage of the height of the object (0 ... 1)
     * @param {Number} widthRatio Percentage of the width of the object (0 ... 1)
     */
    // getCollisionArea(offsetXRatio, offsetYRatio, widthRatio, heightRatio) {
    //     setInterval(() => {
    //         let mirror = 1;
    //         if (this.isImageMirrored) mirror = -1;
    //         this.collisionArea.x = (mirror * this.positionX) + (this.width * offsetXRatio);
    //         this.collisionArea.y = this.positionY + (this.height * offsetYRatio);
    //         this.collisionArea.width = this.width * widthRatio;
    //         this.collisionArea.height = this.height * heightRatio;
    //     }, 50);
    // }
    


    /**
     * Checks if a collision happens
     * @param {Object} obj The object to be checked for collision
     * @returns Boolean
     */
    isColliding(obj) {
        const thisX = this.getCollisionX(this);
        // console.log(`thisX: ${thisX}`);
        const thisY = this.collisionArea.y;
        const thisWidth = this.collisionArea.width;
        const thisHeight = this.collisionArea.height;
        const objX = this.getCollisionX(obj);
        // console.log(`objX: ${objX}`);
        const objY = obj.collisionArea.y;
        const objHeight = obj.collisionArea.height;
        const objWidth = obj.collisionArea.width;
        return  thisX + thisWidth >= objX &&
                thisX <= objX + objWidth &&
                thisY + thisHeight >= objY &&
                thisY <= objY + objHeight;

        // return this.positionX + this.width >= obj.positionX &&
        //        this.positionX <= obj.positionX + obj.width &&
        //        this.positionY + this.height >= obj.positionY &&
        //        this.positionY <= obj.positionY + obj.height;
    }


    /**
     * Calculates the x-position of the object's collision area depending on the mirroring state
     * @param {Object} obj The object to be checked
     * @returns Number
     */
    getCollisionX(obj) {
        if (obj.isImageMirrored) {
            return obj.positionX + obj.collisionArea.x + obj.positionX;
        }
        else {
            return obj.collisionArea.x;
        }
    }


    /**
     * Changes the image in an animation
     * @param {Array} images The URLs of the animation sequence
     */
    playAnimation(images) {
        this.currentImage = this.currentImage % images.length

        // if (this instanceof Character) {
        //     console.log(`playAnimation_imgUrl: ${images[this.currentImage]}`);
        // }
        

        this.img = this.imageCache[images[this.currentImage]];
        this.currentImage++;
    }


    isAboveGround() {
        return this.positionY - this.speedY < this.groundPosition;
    }


    applyGravity() {
        // let step = 0; // TEST
        let interval = setInterval(() => {
            this.positionY -= this.speedY;
            this.speedY -= this.acceleration;
            // step++; // TEST
            // console.log(`Jumping step ${step}`); // TEST
            if (!this.isAboveGround() || this.isSmashed) {
                clearInterval(interval);
                this.speedY = 0;
                this.positionY = this.groundPosition;
                if (this instanceof Character) {
                    setTimeout(() => {this.isJumping = false;}, 300);
                }
            }
        }, 1000 / 25);
    }


    /**
     * Sets the interval for the horizontal movement of the object
     * @param {Number} fast The shortest interval
     * @param {Number} slow The longest interval
     */
    setHorizMoveIntval(fast, slow) {
        this.horizMoveInterval = calcRandomNumber(fast, slow);
    }


    /**
     * Sets the animation interval for the movement of the object
     * @param {Array} objCategory Array of the respective objects
     * @param {Number} direction The moving direction of the object: -1 = to left, 1 = to right
     */
    initHorizontalMovement(objCategory, direction) {
        this.horizMoveIntervalId = setInterval(() => {
                this.move(direction);
                this.manageMovementIntervals(objCategory);
            }, this.horizMoveInterval);
    }


    /**
     * Animates the walking sequence of the object
     * @param {Number} frequency The frequency of the animated images
     */
    walk(frequency, images) {
        this.walkIntervalId = setInterval(() => {
            this.playAnimation(images);
        }, frequency);
    }


    /**
     * Moves the object with the given interval to the given direction
     * @param {Number} direction The moving direction of the object: -1 = to left, 1 = to right
     */
    move(direction) {
        this.positionX = this.positionX + (this.speedX * direction);
    }


    /**
     * Clears movement intervals of object that passed the left scene border and deletes the respective object from the array
     * @param {Array} objCategory Array of the respective objects
     */
    manageMovementIntervals(objCategory) {
        const posRight = this.positionX + this.width;
        if (posRight < 0) {
            const objId = objCategory.findIndex(c => c === this);
            clearInterval(this.horizMoveIntervalId);
            clearInterval(this.walkIntervalId);
            objCategory.splice(objId, 1);

            // console.log(`Object: ${this.constructor.name} | Intervals cleared: hor - ${this.horizMoveIntervalId} / walk - ${this.walkIntervalId} | objCategory[${objId}] removed.`);
        }
    }


    /**
     * Animates the dying sequence
     */
    die() {
        this.currentImage = 0;
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_DIE);
            if (this.currentImage >= this.IMAGES_DIE.length) {
                clearInterval(interval);
            }
        }, 160);

        if (this instanceof Character) {
            world.playSound(world.AUDIO.gameOver, 1, false);
            
            console.log('GameOver Sound startet');
        }
        else if (this instanceof Endboss) {
            world.playSound(world.AUDIO.win, 1, false);

            console.log('GameWin Sound startet');
        }
    }
}