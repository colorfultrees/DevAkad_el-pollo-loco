class Chicken extends MoveableObject {
    aspectRatio = 1.0206; // width/height
    width = 124;
    height = this.width / this.aspectRatio;

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}