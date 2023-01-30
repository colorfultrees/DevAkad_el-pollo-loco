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
     * Checks if a collision happens
     * @param {Object} obj The object to be checked for collision
     * @returns Boolean
     */
    isColliding(obj) {
        const thisX = this.getCollisionX(this);
        const thisY = this.collisionArea.y;
        const thisWidth = this.collisionArea.width;
        const thisHeight = this.collisionArea.height;
        const objX = this.getCollisionX(obj);
        const objY = obj.collisionArea.y;
        const objHeight = obj.collisionArea.height;
        const objWidth = obj.collisionArea.width;
        return  thisX + thisWidth >= objX &&
                thisX <= objX + objWidth &&
                thisY + thisHeight >= objY &&
                thisY <= objY + objHeight;
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
        this.currentImage = this.currentImage % images.length;
        this.img = this.imageCache[images[this.currentImage]];
        this.currentImage++;
    }


    /**
     * Checks whether the object is above its ground position
     * @returns Boolean
     */
    isAboveGround() {
        return this.positionY - this.speedY < this.groundPosition;
    }


    /**
     * Applys gravity to the object
     */
    applyGravity() {
        let interval = setInterval(() => {
            this.positionY -= this.speedY;
            this.speedY -= this.acceleration;
            if (!this.isAboveGround() || this.isSmashed) {
                clearInterval(interval);
                this.speedY = 0;
                if (!this.isSmashed) this.positionY = this.groundPosition;
                if (this instanceof Character) {
                    setTimeout(() => {this.isJumping = false;}, 200);
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

        world.gameOver(this);
    }
}