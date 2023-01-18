class MoveableObject extends DrawableObject {
    imageCache = {};
    currentImage = 0;
    movingDistance = 0; // The distance which the object moves at each step
    horizMoveInterval; // The moving interval in ms
    // horizMoveIntervalId = 0;
    // walkIntervalId = 0;
    isWalking = false;
    isImageMirrored = false;
    speedY = 0; // Vertical speed - rising: (+), falling: (-)
    acceleration = 5;
    groundPosition = 0;
    collisionBasis = {offsetXRatio: 0, offsetYRatio: 0, widthRatio: 0, heightRatio: 0};
    collisionArea = {x: 0, y: 0, width: 0, height: 0};
    healthPoints = 0;
    gotHit = false;
    isDead = false;


    constructor(positionX, positionY) {
        super(positionX, positionY);
    }


    /**
     * Loads an image from the given URL
     * @param {String} imgUrl The URL of the image
     */
    loadImage(imgUrl) {
        this.img = new Image();
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
     * Calculates the collision area of an object
     */
    getCollisionArea() {
        let mirror = 1;
        if (this.isImageMirrored) mirror = -1;
        this.collisionArea.x = (mirror * this.positionX) + (this.width * this.collisionBasis.offsetXRatio);
        this.collisionArea.y = this.positionY + (this.height * this.collisionBasis.offsetYRatio);
        this.collisionArea.width = this.width * this.collisionBasis.widthRatio;
        this.collisionArea.height = this.height * this.collisionBasis.heightRatio;
    }
    


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

        if (this instanceof Character) {
            console.log(`playAnimation_imgUrl: ${images[this.currentImage]}`);
        }
        

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
            if (!this.isAboveGround()) {
                clearInterval(interval);
                this.positionY = this.groundPosition;
                this.speedY = 0;
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

            // console.log(`Object: ${this.constructor.name} | Intervals cleared: hor - ${this.horizMoveIntervalId} / walk - ${this.walkIntervalId} | objCategory[${objId}] removed.`);
        }
    }
}