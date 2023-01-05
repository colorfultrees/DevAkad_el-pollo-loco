class Cloud extends MoveableObject {
    aspectRatio = 1.7778; //width/height
    width = 1000;
    height = this.width / this.aspectRatio;
    img = new Image();

    constructor(positionX, positionY, imgUrl) {
        super(positionX, positionY);
        this.img.src = imgUrl
    }

    float() {

    }
}