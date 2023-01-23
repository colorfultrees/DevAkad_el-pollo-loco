class ColleactableObject extends DrawableObject {
    TYPE = {
        bottle: {
            img: './img/6_salsa_bottle/salsa_bottle.png',
            width: 100,
            height: 100,
            collisionBasis: {offsetXRatio: 0.3, offsetYRatio: 0.3, widthRatio: 0.4, heightRatio: 0.4}
        },
        coin: {
            img: './img/8_coin/coin_2.png',
            width: 130,
            height: 130,
            collisionBasis: {offsetXRatio: 0.15, offsetYRatio: 0.15, widthRatio: 0.72, heightRatio: 0.72}
        }
    }
    type = '';

    constructor(positionX, positionY, type) {
        super(positionX, positionY).loadImage(this.TYPE[type].img);
        this.width = this.TYPE[type].width;
        this.height = this.TYPE[type].height;
        this.collisionBasis = this.TYPE[type].collisionBasis;
        this.getCollisionArea();
        this.type = type;
    }
}