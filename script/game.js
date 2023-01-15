const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
let canvas;
let world;
let keyboardListener;
let intervals = [];


/**
 * Initiates the game
 */
function init() {
    canvas = document.querySelector('canvas');
    canvas.setAttribute('width', CANVAS_WIDTH + 'px');
    canvas.setAttribute('height', CANVAS_HEIGHT + 'px');

    keyboardListener = new Keyboard();
    console.log('keyboardListener initiated.');
    // document.addEventListener('keydown', keyboardListener.handleKeyDown);
    // document.addEventListener('keyup', keyboardListener.handleKeyUp);
    // console.log('eventListeners created.');

    world = new World(canvas);
    createLevel1();
    world.setLevel(level1);
    world.createCharacter();

    renderWorld();

    // world.initBackgroundSound(); // ###### ACTIVATE LATER ###########

    // initHorizontalMovementIntvals_Level1();
    initCreationIntervals_Level1();
}


/**
 * Creates the chickens
 */
// function createChickens() {
//     for (let e = 1; e <= 3; e++) {
//         const chicken = new Chicken(0, 0);
//         chicken.positionX = calcRandomNumber(150, canvas.width - 50);
//         chicken.positionY = canvas.height - chicken.height;
//         world.enemies.push(chicken);
//     }
// }


/**
 * Create the chicks
 */
// function createChicks() {
//     for (let e = 1; e <= 2; e++) {
//         const chick = new Chick(0, 0);
//         chick.positionX = calcRandomNumber(150, canvas.width - 50);
//         chick.positionY = canvas.height - chick.height;
//         world.enemies.push(chick);
//     }
// }


/**
 * Renders the gaming scene
 */
function renderWorld() {
    world.draw();
}