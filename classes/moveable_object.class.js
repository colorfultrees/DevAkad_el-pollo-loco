class MoveableObject {
    positionX = 0;
    positionY = 0;
    img = new Image();

    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    loadImage(imgUrl) {
        this.img.src = imgUrl;
    }

    move(direction) {

    }
}