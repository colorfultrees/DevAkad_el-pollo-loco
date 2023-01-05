// const CANVAS_WIDTH = 900;
// const CANVAS_HEIGHT = 600;
let canvas;
let world;

async function init() {
    canvas = document.querySelector('canvas');
    world = new World(canvas);
    
    createCharacter();
    createEnemies(); 

    renderWorld();
    
}


function createCharacter() {
    world.character = new Character(0, 0);
    world.character.positionY = world.canvas.height - world.character.height;
}


function createEnemies() {
    for (let e = 1; e <= 3; e++) {
        world.enemies.push(new Chicken(100 + (120 * e), 300));
        world.enemies[e - 1].positionY = world.canvas.height - world.enemies[e - 1].height;
    }
}


function renderWorld() {
    world.draw();
}