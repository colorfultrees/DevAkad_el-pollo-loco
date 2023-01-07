class Character extends MoveableObject {
    aspectRatio = 0.5083; // width/height
    width = 244;
    height = this.width / this.aspectRatio;

    constructor(positionX, positionY) {
        super(positionX, positionY).loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
    }

    jump() {

    }
}