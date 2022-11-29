class Character extends MoveableObject {
    // Size
    aspectRatio = 0.5083; //width/height
    width = 244;
    height = this.width / this.aspectRatio;

    constructor(positionX, positionY, imgUrl) {
        super(positionX, positionY, imgUrl);
    }

    jump() {

    }
}