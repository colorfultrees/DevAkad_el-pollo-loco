let level1;


/**
 * Creates all elements for level 1
 */
function createLevel1() {
    level1 = new Level(2, [0.7, 1.4], 10, 10);
    level1.createSky('./img/5_background/layers/air.png');
    level1.createLandscape(
        './img/5_background/layers/1_first_layer/full.png',
        './img/5_background/layers/2_second_layer/full.png',
        './img/5_background/layers/3_third_layer/full.png'
    );
    level1.createClouds(0, 10);
    level1.createEnemies(Chicken, 11, 350, level1.background.landscapeLayer[0].width * level1.sceneParts);
    level1.createEnemies(Chick, 5, 350, level1.background.landscapeLayer[0].width * level1.sceneParts);
    level1.createEndboss();
    level1.createCollectables();
}


/**
 * Initiates the intervals to create new objects
 */
function initCreationIntervals_Level1() {
    const minPos = level1.background.landscapeLayer[0].width * level1.sceneParts;
    level1.setIntervalClouds(minPos, 180000);
    level1.setIntervalEnemies(Chicken, 2, minPos, minPos + canvas.width, 25000);
    level1.setIntervalEnemies(Chick, 1, minPos, minPos + canvas.width, 45000);
}