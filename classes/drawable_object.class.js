class DrawableObject {
    positionX = 0;
    positionY = 0;
    img = new Image();
    aspectRatio = 0; // width/height
    width = 0;
    height = 0;

    
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }


    /**
     * Loads an image from the given URL
     * @param {String} imgUrl The URL of the image
     */
    loadImage(imgUrl) {
        this.img = new Image();
        this.img.src = imgUrl;
    }
}