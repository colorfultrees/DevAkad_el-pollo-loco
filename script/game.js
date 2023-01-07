const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
let canvas;
let world;


/**
 * Initiates the game
 */
async function init() {
    canvas = document.querySelector('canvas');
    canvas.setAttribute('width', CANVAS_WIDTH + 'px');
    canvas.setAttribute('height', CANVAS_HEIGHT + 'px');

    world = new World(canvas);
    
    createBackground();
    createCharacter();
    createEnemies(); 

    renderWorld();

    // Start the timer for more clouds
    setInterval(() => {
        createClouds(canvas.width + 50);
    }, 180000);
}


/**
 * Creates the background
 */
function createBackground() {
    createSky();
    createClouds(0);
    createLandscape();    
}


/**
 * Creates the sky
 */
function createSky() {
    world.background.air = new Background(0, 0, './img/5_background/layers/air.png');
}


/**
 * Creates the clouds
 * @param {Number} startPos The position of the first cloud formation
 */
function createClouds(startPos) {
    for (let c = 0; c < 5; c++) {
        const posX = calcRandomNumber(-100, 300) + (500 * c) + startPos;
        const posY = calcRandomNumber(0, 50);
        world.background.clouds.push(new Cloud(posX, posY));
    }
}


/**
 * Creates the landscape
 */
function createLandscape() {
    world.background.landscapeLayer.push(new Background(0, 0, './img/5_background/layers/3_third_layer/full.png'));
    world.background.landscapeLayer.push(new Background(0, 0, './img/5_background/layers/2_second_layer/full.png'));
    world.background.landscapeLayer.push(new Background(0, 0, './img/5_background/layers/1_first_layer/full.png'));
}


/**
 * Creates the main character
 */
function createCharacter() {
    world.character = new Character(0, 0);
    world.character.positionY = world.canvas.height - world.character.height;
}


/**
 * Creates the enemies
 */
function createEnemies() {
    for (let e = 1; e <= 3; e++) {
        world.enemies.push(new Chicken(calcRandomNumber(150, world.canvas.width - 50), 300));
        world.enemies[e - 1].positionY = world.canvas.height - world.enemies[e - 1].height;
    }
}


/**
 * Renders the gaming scene
 */
function renderWorld() {
    world.draw();
}