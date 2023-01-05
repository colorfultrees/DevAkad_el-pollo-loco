class Background extends MoveableObject {
    aspectRatio = 3.5556; // width/height
    height = CANVAS_HEIGHT;
    width = this.height * this.aspectRatio;

    constructor (positionX, positionY) {
        super(positionX, positionY);
    }
}