class MoveableObject {
    positionX = 0;
    positionY = 0;
    img = new Image();
    imageCache = {};
    aspectRatio = 0; // width/height
    width = 0;
    height = 0;
    currentImage = 0;
    movingDistance = 0; // The distance which the object moves at each step
    horizMoveInterval; // The moving interval in ms
    horizMoveIntervalId = 0;
    walkIntervalId = 0;
    isImageMirrored = false;
    speedY = -1; // Vertical speed - rising: (+), falling: (-)
    acceleration = 5;
    groundPosition = 0;


    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }


    /**
     * Loads an image from the given URL
     * @param {String} imgUrl The URL of the image
     */
    loadImage(imgUrl) {
        this.img.src = imgUrl;
    }


    /**
     * Loads animation images into the given cache
     * @param {Array} urlList The list of image URLs to be loaded
     * @param {Object} imageCache The cache for animation images
     */
    loadImageCache(urlList) {
        urlList.forEach(url => {
            this.imageCache[url] = new Image();
            this.imageCache[url].src = url;
        })
    }


    /**
     * Changes the image in an animation
     * @param {Array} images The URLs of the animation sequence
     */
    playAnimation(images) {
        this.currentImage = this.currentImage % images.length
        this.img = this.imageCache[images[this.currentImage]];
        this.currentImage++;
    }


    applyGravity() {
        let interval = setInterval(() => {
            this.positionY -= this.speedY;
            this.speedY -= this.acceleration;
            if (this.positionY - this.speedY >= this.groundPosition) {
                clearInterval(interval);
                this.positionY = this.groundPosition;
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
        this.positionX = this.positionX + (this.movingDistance * direction);
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

            console.log(`Object: ${this.constructor.name} | Intervals cleared: hor - ${this.horizMoveIntervalId} / walk - ${this.walkIntervalId} | objCategory[${objId}] removed.`);
        }
    }
}