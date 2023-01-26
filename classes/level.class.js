class Level {
    background = {sky: [], clouds: [], landscapeLayer: []};
    enemies = [];
    collectables = [];
    maxBottles = 0;
    maxCoins = 0;
    endboss = undefined;
    sceneParts = 0; // Number of aligned landscape parts
    parallaxLandscapeLayer = [];


    constructor(sceneParts, parallaxLandscapeLayer, maxBottles, maxCoins) {
        this.sceneParts = sceneParts;
        this.parallaxLandscapeLayer = parallaxLandscapeLayer;
        this.maxBottles = maxBottles;
        this.maxCoins = maxCoins;
    }


    /**
     * Creates the sky
     */
    createSky(imageUrl) {
        let x = 0;
        for (let i = 0; i < this.sceneParts; i++) {
            this.background.sky.push(new Background(x, 0, imageUrl));
            x += this.background.sky[0].width - 1;
        }
    }


    
    
    /**
     * Creates the landscape
     * @param {String} layer1 The image URL of layer 1
     * @param {String} layer2 The image URL of layer 2
     * @param {String} layer3 The image URL of layer 3
     */
    createLandscape(layer1, layer2, layer3) {
        const layer = [layer3, layer2, layer1];
        let x;
        for (let l = 0; l < layer.length; l++) {
            x = 0;
            for (let i = 0; i < this.sceneParts; i++) {
                this.background.landscapeLayer.push(new Background(x, 0, layer[l]));
                x += this.background.landscapeLayer[0].width - 1;
            }
        }
    }

    
    /**
     * Creates the clouds
     * @param {Number} startPos The position of the first cloud formation
     */
    createClouds(startPos, count) {
        for (let c = 0; c < count; c++) {
            const obj = new Cloud(0, 0);
            obj.positionX = calcRandomNumber(-100, 300) + (500 * c) + startPos;
            obj.positionY = calcRandomNumber(0, 50);
            this.background.clouds.push(obj);
            obj.initHorizontalMovement(this.background.clouds, -1);
        }
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
            obj.positionY = canvas.height - obj.height - 55;
            this.enemies.push(obj);
            obj.initHorizontalMovement(this.enemies, -1);
        }
    }


    /**
     * Creates the endboss
     */
    createEndboss() {
        this.endboss = new Endboss(0, 0);
        this.endboss.positionX = this.background.landscapeLayer[0].width * this.sceneParts - this.endboss.width - 100;
        this.endboss.positionY = canvas.height - this.endboss.height - 40;
    }


    /**
     * Create collectable Objects
     */
    createCollectables() {
        const objects = ['bottle', 'coin'];
        const objRemaining = [this.maxBottles, this.maxCoins];
        const objAmount = this.maxBottles + this.maxCoins;
        const startPos = canvas.width * 0.6;
        const endPos = (this.background.landscapeLayer[0].width * this.sceneParts) - (canvas.width * 0.7);
        const dist = (endPos - startPos) / objAmount;
        let currPos = startPos - dist;

        for (let c = 0; c < objAmount; c++) {
            const objId = this.setObjectType(objRemaining);
            const coord = this.setCollectablesPosition(currPos, dist);
            this.collectables.push(new ColleactableObject(coord.posX, coord.posY, objects[objId]))
            objRemaining[objId]--;
            currPos = coord.posX;
        }
    }
    
    
    /**
     * Sets the collectable object type
     */
    setObjectType(objRemaining) {
        if (objRemaining[0] == 0) {
            return 1;
        }
        else if (objRemaining[1] == 0) {
            return 0;
        }
        else {
            return Math.round(Math.random());
        }
    }


    /**
     * Sets the coordinates of the next object
     * @param {Number} currPos The position of the last object
     * @returns Coordinates as object
     */
    setCollectablesPosition(currPos, dist) {
        const posX = currPos + (dist * (calcRandomNumber(80, 110) / 100));
        const posY = (canvas.height / 2) + (canvas.height / 4 * (calcRandomNumber(-170, 30) / 100));
        return {posX: posX, posY: posY};
    }


    /**
     * Initiates an interval to create more clouds
     * @param {Number} startPos The position of the first cloud formation
     * @param {Number} time The interval time
     */
    setIntervalClouds(startPos, time) {
        intervals.push(
            setInterval(() => {
                this.createClouds(startPos, 5);
            }, time)
        );
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
        intervals.push(
            setInterval(() => {
                this.createEnemies(EnemyClass, count, startPos, endPos);
            }, time)
        );
    }
}