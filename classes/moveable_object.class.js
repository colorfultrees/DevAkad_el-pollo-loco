class MoveableObject {
    positionX = 0;
    positionY = 0;
    img = new Image();

    constructor(positionX, positionY, imgUrl) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.img.src = imgUrl;
    }

    move(direction) {

    }
}