const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
let canvas;
let world;

async function init() {
    canvas = document.querySelector('canvas');
    canvas.setAttribute('width', CANVAS_WIDTH + 'px');
    canvas.setAttribute('height', CANVAS_HEIGHT + 'px');

    world = new World(canvas);
    
    createClouds();
    createCharacter();
    createEnemies(); 

    renderWorld();
    
}


function createClouds() {
    world.clouds = new Cloud(0, 0);
}


function createCharacter() {
    world.character = new Character(0, 0);
    world.character.positionY = world.canvas.height - world.character.height;
}


function createEnemies() {
    for (let e = 1; e <= 3; e++) {
        world.enemies.push(new Chicken(calcRandomNumber(150, world.canvas.width - 50), 300));
        world.enemies[e - 1].positionY = world.canvas.height - world.enemies[e - 1].height;
    }
}


function renderWorld() {
    world.draw();
}