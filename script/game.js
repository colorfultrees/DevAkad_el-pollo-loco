// const CANVAS_WIDTH = 900;
// const CANVAS_HEIGHT = 600;
let canvas;
let world;
let keyboardListener;
let lastActiveTimestamp = Date.now();
let intervals = [];


/**
 * Initiates the game
 */
function init() {
    canvas = document.querySelector('canvas');
    // canvas.setAttribute('width', CANVAS_WIDTH + 'px');
    // canvas.setAttribute('height', CANVAS_HEIGHT + 'px');

    keyboardListener = new Keyboard();
    // console.log('keyboardListener initiated.');
    // document.addEventListener('keydown', keyboardListener.handleKeyDown);
    // document.addEventListener('keyup', keyboardListener.handleKeyUp);
    // console.log('eventListeners created.');

    createWorld();
    activateCanvas();
    renderWorld();
    world.initBackgroundSound();

    // initHorizontalMovementIntvals_Level1();
    initCreationIntervals_Level1();
}


function createWorld() {
    world = new World(canvas);
    createLevel1();
    world.setLevel(level1);
    world.createCharacter();
    world.createStatusBars();
}


function activateCanvas() {
    const startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
}


function toggleScreen(screen) {
    const screens = Array.from(document.querySelectorAll('#content > *:not([class=d-none])'));
    screens.forEach(s => s.classList.add('d-none'));
    document.getElementById(screen).classList.remove('d-none');
}


function handleEndscreen(img) {
    endScreen = document.getElementById('endscreen');
    endScreen.style.backgroundImage = `url('${img}')`;
    endScreen.classList.remove('d-none');
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