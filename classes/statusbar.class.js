class Statusbar extends DrawableObject {
    TYPE = {
        health: {
            posX: 70,
            posY: 10,
            img: [
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
        ]},

        bottle: {
            posX: 50,
            posY: 45,
            img: [
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
        ]},

        coin: {
            posX: 30,
            posY: 80,
            img: [
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
        ]}
    };
    type = '';


    constructor(type, percent) {
        super();
        this.type = type;
        this.aspectRatio = 595 / 158;
        this.width = 200;
        this.height = this.width / this.aspectRatio;
        this.positionX = this.TYPE[type].posX;
        this.positionY = this.TYPE[type].posY;
        // this.currentImage = 5;
        // this.loadImage(this.TYPE[type].img[this.currentImage]);
        this.loadImageCache(this.TYPE[type].img);
        this.setValue(percent);
    }


    setValue(percent) {
        const maxId = 5;
        this.currentImage = Math.ceil(percent * maxId / 100);
        this.img = this.imageCache[this.TYPE[this.type].img[this.currentImage]];
    }
}