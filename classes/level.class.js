class Level {
    background = {sky: {}, clouds: [], landscapeLayer: []};
    enemies = [];


    /**
     * Creates the sky
     */
    createSky(imageUrl) {
        this.background.sky = new Background(0, 0, imageUrl);
    }


    /**
     * Creates the clouds
     * @param {Number} startPos The position of the first cloud formation
     */
    createClouds(startPos) {
        for (let c = 0; c < 5; c++) {
            const obj = new Cloud(0, 0);
            obj.positionX = calcRandomNumber(-100, 300) + (500 * c) + startPos;
            obj.positionY = calcRandomNumber(0, 50);
            this.background.clouds.push(obj);
            // obj.initHorizontalMovement(this.background.clouds, -1);
        }
    }


    /**
     * Creates the landscape
     */
    createLandscape(layer1, layer2, layer3) {
        this.background.landscapeLayer.push(new Background(0, 0, layer3));
        this.background.landscapeLayer.push(new Background(0, 0, layer2));
        this.background.landscapeLayer.push(new Background(0, 0, layer1));
    }


    /**
     * Creates the enemies
     * @param {Class} EnemyClass The name of the enemy class
     * @param {Number} count The amount of enemies to be created
     * @param {Number} startPos The nearest possible position of an enemy
     * @param {*} endPos The farthest possible position of an enemy
     */
    createEnemies(EnemyClass, count, startPos, endPos) {
        for (let e = 1; e <= count; e++) {
            const obj = new EnemyClass(0, 0);
            obj.positionX = calcRandomNumber(startPos, endPos);
            obj.positionY = canvas.height - obj.height - 15;
            this.enemies.push(obj);
            // obj.initHorizontalMovement(this.enemies, -1);
        }
    }


    /**
     * Initiates an interval to create more clouds
     * @param {Number} startPos The position of the first cloud formation
     * @param {Number} time The interval time
     */
    setIntervalClouds(startPos, time) {
        setInterval(() => {
            this.createClouds(startPos);
        }, time);
        
    }
    

    /**
     * Initiates an interval to create more enemies
     * @param {Class} EnemyClass The enemy class
     * @param {Number} count The number of new enemies
     * @param {Number} startPos The nearest possible position of the enemies
     * @param {Number} endPos The farthest possible position of the enemies
     * @param {Number} time The interval time
     */
    setIntervalEnemies(EnemyClass, count, startPos, endPos, time) {
        setInterval(() => {
            this.createEnemies(EnemyClass, count, startPos, endPos);
        }, time);
    }
}