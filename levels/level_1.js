let level1;

function createLevel1() {
    level1 = new Level();
    level1.createSky('./img/5_background/layers/air.png');
    level1.createClouds(0);
    level1.createLandscape(
        './img/5_background/layers/1_first_layer/full.png',
        './img/5_background/layers/2_second_layer/full.png',
        './img/5_background/layers/3_third_layer/full.png'
    );
    level1.createEnemies(Chicken, 7, 350, level1.background.landscapeLayer[0].width - 400);
    level1.createEnemies(Chick, 4, 350, level1.background.landscapeLayer[0].width - 400);
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
    level1.setIntervalClouds(canvas.width + world.character.positionX, 180000);
    level1.setIntervalEnemies(Chicken, 2, level1.background.landscapeLayer[0].width, level1.background.landscapeLayer[0].width + 300, 25000);
    level1.setIntervalEnemies(Chick, 1, level1.background.landscapeLayer[0].width, level1.background.landscapeLayer[0].width + 300, 45000);
}