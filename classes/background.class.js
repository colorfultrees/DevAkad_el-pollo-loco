class Background extends MoveableObject {
    aspectRatio = 3.5556; // width/height
    height = CANVAS_HEIGHT;
    width = this.height * this.aspectRatio;
    img = new Image();

    constructor (positionX, positionY, imgUrl) {
        super(positionX, positionY);
        this.img.src = imgUrl;
    }
}