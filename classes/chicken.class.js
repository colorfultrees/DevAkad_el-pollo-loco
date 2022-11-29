class Chicken extends MoveableObject {
    // Size
    aspectRatio = 1.0206; // width/height
    width = 124;
    height = this.width / this.aspectRatio;

    constructor(positionX, positionY, imgUrl) {
        super(positionX, positionY, imgUrl);
    }
}