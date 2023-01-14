let level1;

function createLevel1() {
    level1 = new Level(2, [0.7, 1.4]);
    level1.createSky('./img/5_background/layers/air.png');
    level1.createLandscape(
        './img/5_background/layers/1_first_layer/full.png',
        './img/5_background/layers/2_second_layer/full.png',
        './img/5_background/layers/3_third_layer/full.png'
    );
    level1.createClouds(0, 10);
    level1.createEnemies(Chicken, 9, 350, level1.background.landscapeLayer[0].width * level1.sceneParts);
    level1.createEnemies(Chick, 5, 350, level1.background.landscapeLayer[0].width * level1.sceneParts);
    level1.createEndboss();
}


// function initHorizontalMovementIntvals_Level1() {
//     level1.background.clouds.forEach(cloud => {
//         cloud.initHorizontalMovement(level1.background.clouds, -1);
//     });
//     level1.enemies.forEach(enemy => {
//         enemy.initHorizontalMovement(level1.enemies, -1);
//     });
// }


function initCreationIntervals_Level1() {
    const minPos = level1.background.landscapeLayer[0].width * level1.sceneParts;
    level1.setIntervalClouds(minPos, 180000);
    level1.setIntervalEnemies(Chicken, 2, minPos, minPos + canvas.width, 25000);
    level1.setIntervalEnemies(Chick, 1, minPos, minPos + canvas.width, 45000);
}