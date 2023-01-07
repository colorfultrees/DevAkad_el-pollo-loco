class Cloud extends MoveableObject {
    imgUrls = ['./img/5_background/layers/4_clouds/1.png', './img/5_background/layers/4_clouds/2.png'];
    aspectRatio = 1.7778; // width/height
    width = 0;
    height = 0;
    speed; // The speed in ms at which the cloud moves
    distance = 0.5; // The distance which the cloud moves at each step

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.imgUrls[Math.round(Math.random())]);
        this.width = calcRandomNumber(200, 500);
        this.height = this.width / this.aspectRatio;
        this.speed = calcRandomNumber(35, 90);
        setInterval(() => {
            this.move(-1, this.distance);
        }, this.speed);
    }
}
