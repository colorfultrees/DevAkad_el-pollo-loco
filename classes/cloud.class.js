class Cloud extends MoveableObject {
    imgUrls = ['./img/5_background/layers/4_clouds/1.png', './img/5_background/layers/4_clouds/2.png'];
    aspectRatio = 1.7778; // width/height
    width = 0;
    height = 0;
    speed; // The speed in ms at which the cloud moves
    distance = 0.5; // The distance which the cloud moves at each step
    intervalId = 0;

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage(this.imgUrls[Math.round(Math.random())]);
        this.setDimensions();
        this.setSpeed();
        this.setCreationInterval();
    }

    
    setDimensions() {
        this.width = calcRandomNumber(200, 500);
        this.height = this.width / this.aspectRatio;
    }


    setSpeed() {
        this.speed = calcRandomNumber(35, 90);
    }


    setCreationInterval() {
        this.intervalId = setInterval(() => {
                this.move(-1, this.distance);
                this.manageIntervalsClouds();
            }, this.speed);
    }


    manageIntervalsClouds() {
        const posRight = this.positionX + this.width;
        if (posRight < 0) {
            const cloudId = world.background.clouds.findIndex(c => c === this);
            clearInterval(this.intervalId);
            world.background.clouds.splice(cloudId, 1);

            console.log(`cloudInterval(${this.intervalId}) cleared, clouds[${cloudId}] removed.`);
        }
    }
}
