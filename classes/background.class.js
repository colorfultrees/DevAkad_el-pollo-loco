class Background extends MoveableObject {
    aspectRatio = 3840/1080;
    height = CANVAS_HEIGHT;
    width = this.height * this.aspectRatio;

    constructor (positionX, positionY, imgUrl) {
        super(positionX, positionY).loadImage(imgUrl);
    }
}