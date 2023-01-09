class Cloud extends MoveableObject {
    imgUrls = ['./img/5_background/layers/4_clouds/1.png', './img/5_background/layers/4_clouds/2.png'];
    distance = 0.5; // The distance which the cloud moves at each step

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.imgUrls[Math.round(Math.random())]);
        this.aspectRatio = 1.7778;
        this.setDimensions();
        this.setSpeed(35, 90);
        this.initHorizontalMovement(world.background.clouds ,-1);
    }

    
    setDimensions() {
        this.width = calcRandomNumber(200, 500);
        this.height = this.width / this.aspectRatio;
    }
}
