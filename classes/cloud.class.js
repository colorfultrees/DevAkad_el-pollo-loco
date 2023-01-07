class Cloud extends MoveableObject {
    aspectRatio = 1.7778; // width/height
    width = 500;
    height = this.width / this.aspectRatio;
    imgUrls = ['./img/5_background/layers/4_clouds/1.png', './img/5_background/layers/4_clouds/2.png'];

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.imgUrls[Math.round(Math.random())]);
    }
}