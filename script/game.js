let canvas;
let world;

async function init() {
    canvas = document.querySelector('canvas');
    world = new World(canvas);
    
    createCharacter();
    createEnemies(); 

    setTimeout(() => {renderWorld()}, 100);
    
}


function createCharacter() {
    world.character = new Character(0, 0, './img/2_character_pepe/1_idle/idle/I-1.png');
}


function createEnemies() {
    for (let e = 1; e <= 3; e++) {
        world.enemies.push(new Chicken(100 + (120 * e), 300, './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'));
    }
}


function renderWorld() {
    world.draw();
}