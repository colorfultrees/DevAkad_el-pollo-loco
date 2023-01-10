class MoveableObject {
    positionX = 0;
    positionY = 0;
    img = new Image();
    imageCache = {};
    aspectRatio = 0; // width/height
    width = 0;
    height = 0;
    currentImage = 0;
    horizMoveInterval; // The moving interval in ms
    horizMoveIntervalId = 0;

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
     * Sets the speed of the opject in terms of ms of an interval
     * @param {Number} fast The fastest speed value in ms
     * @param {Number} slow The slowest speed value in ms
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
                this.move(direction, this.distance);
                this.manageHorizMoveIntervals(objCategory);
            }, this.horizMoveInterval);
    }


    /**
     * Animates the walking sequence of the object
     * @param {Number} frequency The frequency of the animated images
     */
    walk(frequency) {
        setInterval(() => {
            this.currentImage = this.currentImage % this.IMAGES_WALK.length
            this.img = this.imageCache[this.IMAGES_WALK[this.currentImage]];
            this.currentImage++;
        }, frequency);
    }


    /**
     * Moves the object with the given speed to the given direction
     * @param {Number} direction The moving direction of the object: -1 = to left, 1 = to right
     * @param {Number} distance The distance that the object should move
     */
    move(direction, distance) {
        this.positionX = this.positionX + (distance * direction);
    }


    manageHorizMoveIntervals(objCategory) {
        const posRight = this.positionX + this.width;
        if (posRight < 0) {
            const objId = objCategory.findIndex(c => c === this);
            clearInterval(this.horizMoveIntervalId);
            objCategory.splice(objId, 1);

            console.log(`objInterval(${this.horizMoveIntervalId}) cleared, ${this.constructor.name}, objCategory[${objId}] removed.`);
        }
    }
}