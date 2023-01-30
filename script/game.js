// const CANVAS_WIDTH = 900;
// const CANVAS_HEIGHT = 600;
let canvas;
let world;
let keyboardListener;
let lastActiveTimestamp = Date.now();
let intervals = [];
let isGameRunning = false;
let isSoundOn = true;
let isMusicOn = true;
let isHelpVisible = false;
let hideControlsInfoDelayId = 0;
let isFullScreenMode = false;
let isTouchDevice = false;


/**
 * Initializing
 */
function init() {
    canvas = document.querySelector('canvas');
    keyboardListener = new Keyboard();
    checkForTouch();
    setFullScreenHandlers();
}


/**
 * Starts the game
 */
function startGame() {
    createWorld();
    renderWorld();
    world.initBackgroundSound();
    activateCanvas();
    initCreationIntervals_Level1();
    isGameRunning = true;
}


/**
 * Creates a random integer within the given range
 * @param {Number} min - The lower limit
 * @param {Number} max - The upper limit
 * @returns Integer
 */
function calcRandomNumber (min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}


function checkForTouch() {
    try {
        document.createEvent('TouchEvent');
        isTouchDevice = true;
    }
    catch { /* no change necessary */ }
}


function setFullScreenHandlers() {
    document.addEventListener('fullscreenchange', exitFullscreenHandler);
    document.addEventListener('webkitfullscreenchange', exitFullscreenHandler);
    document.addEventListener('mozfullscreenchange', exitFullscreenHandler);
    document.addEventListener('MSFullscreenChange', exitFullscreenHandler);
}


function exitFullscreenHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        setParamOnExitFullscreen(false);
    }
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
    toggleBtnsMobile();
}


/**
 * Ends the game and deletes the world object
 */
function endGame() {
    setTimeout(() => {
        world.stopEnemiesAndClouds();
        toggleScreen('startscreen');
        toggleBtnsMobile();
        setTimeout(() => {world = [];}, 500);
    }, 8000);
}


function toggleBtnsMobile() {
    if (isTouchDevice) {
        const btnsMobile = document.getElementById('btns-mobile');
        btnsMobile.classList.toggle('d-none');
    }
}


function toggleScreen(screen) {
    const screens = Array.from(document.querySelectorAll('#content > .screen:not([class=d-none])'));
    screens.forEach(s => s.classList.add('d-none'));
    document.getElementById(screen).classList.remove('d-none');
}


function handleEndscreen(img) {
    endScreen = document.getElementById('endscreen');
    endScreen.style.backgroundImage = `url('${img}')`;
    endScreen.classList.remove('d-none');
}


function toggleHelp() {
    resetActiveElement();

    // console.log('active element:', document.activeElement);

    if (isGameRunning) {
        toggleControlsInfo();
    }
    else {
        toggleHelpScreen();
    }
}


function toggleHelpScreen() {
    const btnHelp = document.querySelector('#btn-help > img');
    if (isHelpVisible) {
        toggleScreen('startscreen');
        isHelpVisible = false;
        btnHelp.src = './icons/help_closed.png';
    }
    else {
        toggleScreen('helpscreen');
        isHelpVisible = true;
        btnHelp.src = './icons/help_open.png';
    }
}


function toggleControlsInfo() {
    const ctrlInfo = document.getElementById('controls-info');
    const btnHelp = document.querySelector('#btn-help > img');
    if (isHelpVisible) {
        ctrlInfo.classList.add('d-none');
        isHelpVisible = false;
        btnHelp.src = './icons/help_closed.png';
        clearTimeout(hideControlsInfoDelayId);
    }
    else {
        ctrlInfo.classList.remove('d-none');
        isHelpVisible = true;
        btnHelp.src = './icons/help_open.png';
        hideControlsInfoDelayId = setTimeout(() => {toggleControlsInfo()}, 10000);
    }
}


function toggleMusic() {
    const btnMusic = document.querySelector('#btn-music > img');
    resetActiveElement();

    if (isMusicOn) {
        isMusicOn = false;
        btnMusic.src = './icons/music_off.png'
        if (isGameRunning) world.stopSound(world.AUDIO.backgroundMusic);
    }
    else {
        isMusicOn = true;
        btnMusic.src = './icons/music_on.png';
        if (isGameRunning) world.startBackgroundMusic();
    }
}


function toggleSoundFx() {
    const btnSoundFx = document.querySelector('#btn-sound-fx > img');
    resetActiveElement();

    if (isSoundOn) {
        isSoundOn = false;
        btnSoundFx.src = 'icons/sound-fx_off.png';
    }
    else {
        isSoundOn = true;
        btnSoundFx.src = 'icons/sound-fx_on.png';
    }
}


function toggleFullscreen() {
    const elem = document.getElementById('content');
    resetActiveElement();
    if (isFullScreenMode) {
        setParamOnExitFullscreen(false);
        document.exitFullscreen();
    }
    else {
        setParamOnExitFullscreen(true);
        elem.requestFullscreen();
    }
}


function setParamOnExitFullscreen(statusFullscreen) {
    const btnFullScreen = document.querySelector('#btn-fullscreen > img');
    isFullScreenMode = statusFullscreen;
    if (statusFullscreen) {
        btnFullScreen.src = 'icons/exit-fullscreen.png';
    }
    else {
        btnFullScreen.src = 'icons/enter-fullscreen.png';
    }
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


function resetActiveElement() {
    document.activeElement.blur();
}