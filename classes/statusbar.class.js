class Statusbar extends DrawableObject {
    IMAGES = {
        health: [
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
            './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
        ],

        bottles: [
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
        ],

        coins: [
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
        ]
    };


    constructor(positionX, positionY) {
        super(positionX, positionY);
        this.aspectRatio = 595 / 158;
        this.width = 200;
        this.height = this.width / this.aspectRatio;
    }
}