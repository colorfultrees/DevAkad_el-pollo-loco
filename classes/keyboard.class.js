class Keyboard {
    KEYS = {
        LEFT:
            {
                code: 'ArrowLeft',
                status: false
            },
        RIGHT:
            {
                code: 'ArrowRight',
                status: false
            },
        UP:
            {
                code: 'ArrowUp',
                status: false
            },
        SPACE:
            {
                code: 'Space',
                status: false
            }
    };
    // LEFT = 'ArrowLeft';
    // RIGHT = 'ArrowRight';
    // UP = 'ArrowUp';
    // SPACE = 'Space';
    // keyStatus = {left: false, right: false, up: false, space: false};
    

    constructor() {
        this.handleKeyDown();
        this.handleKeyUp();
    }


    // constructor() {
    //     document.addEventListener('keydown', this.handleKeyDown);
    //     document.addEventListener('keyup', this.handleKeyUp);
    // }



    // constructor() {
    //     document.addEventListener('keydown', (event) => {
    //         console.log(`KeyCode in handleKeyDown(): ${event.code}, ${typeof(event.code)}`);

    //         switch (event.code) {
    //             case this.KEYS.LEFT.code:
    //                 this.KEYS.LEFT.status = true;
    //                 this.KEYS.RIGHT.status = false;
    //                 console.log(`I'm moving left. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             case this.KEYS.RIGHT.code:
    //                 this.KEYS.LEFT.status = false;
    //                 this.KEYS.RIGHT.status = true;
    //                 console.log(`I'm moving right. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             case this.KEYS.UP.code:
    //                 this.KEYS.UP.status = true;
    //                 console.log(`I'm jumping. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             case this.KEYS.SPACE.code:
    //                 this.KEYS.SPACE.status = true;
    //                 console.log(`I throw a bottle. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             default:
    //                 console.log("The switch statement in handleKeyDown() didn't work.");
    //         }
    //     });

    //     document.addEventListener('keyup', (event) => {
    //         console.log(`KeyCode in handleKeyUp(): ${event.code}, ${typeof(event.code)}`);

    //         switch (event.code) {
    //             case this.KEYS.LEFT.code:
    //                 this.KEYS.LEFT.status = false;
    //                 console.log(`I stopped moving left. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             case this.KEYS.RIGHT.code:
    //                 this.KEYS.RIGHT.status = false;
    //                 console.log(`I stopped moving right. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             case this.KEYS.UP.code:
    //                 this.KEYS.UP.status = false;
    //                 console.log(`I stopped jumping. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             case this.KEYS.SPACE.code:
    //                 this.KEYS.SPACE.status = false;
    //                 console.log(`I stopped throwing. (${JSON.stringify(this.KEYS)})`);
    //                 break;
    //             default:
    //                 console.log("The switch statement in handleKeyUp() didn't work.");
    //         }
    //     });
    // }


    handleKeyDown() {
        document.addEventListener('keydown', (event) => {
            console.log(`KeyCode in handleKeyDown(): ${event.code}, ${typeof(event.code)}`);

            switch (event.code) {
                case this.KEYS.LEFT.code:
                    this.KEYS.LEFT.status = true;
                    this.KEYS.RIGHT.status = false;
                    world.character.move(-1, )
                    console.log(`I'm moving left. (${JSON.stringify(this.KEYS)})`);
                    break;
                case this.KEYS.RIGHT.code:
                    this.KEYS.LEFT.status = false;
                    this.KEYS.RIGHT.status = true;
                    console.log(`I'm moving right. (${JSON.stringify(this.KEYS)})`);
                    break;
                case this.KEYS.UP.code:
                    this.KEYS.UP.status = true;
                    console.log(`I'm jumping. (${JSON.stringify(this.KEYS)})`);
                    break;
                case this.KEYS.SPACE.code:
                    this.KEYS.SPACE.status = true;
                    console.log(`I throw a bottle. (${JSON.stringify(this.KEYS)})`);
                    break;
                default:
                    console.log("The switch statement in handleKeyDown() didn't work.");
            }
        });
    }


    handleKeyUp() {
        document.addEventListener('keyup', (event) => {
            console.log(`KeyCode in handleKeyUp(): ${event.code}, ${typeof(event.code)}`);

            switch (event.code) {
                case this.KEYS.LEFT.code:
                    this.KEYS.LEFT.status = false;
                    world.character.stopWalking();
                    console.log(`I stopped moving left. (${JSON.stringify(this.KEYS)})`);
                    break;
                case this.KEYS.RIGHT.code:
                    this.KEYS.RIGHT.status = false;
                    world.character.stopWalking();
                    console.log(`I stopped moving right. (${JSON.stringify(this.KEYS)})`);
                    break;
                case this.KEYS.UP.code:
                    this.KEYS.UP.status = false;
                    console.log(`I stopped jumping. (${JSON.stringify(this.KEYS)})`);
                    break;
                case this.KEYS.SPACE.code:
                    this.KEYS.SPACE.status = false;
                    console.log(`I stopped throwing. (${JSON.stringify(this.KEYS)})`);
                    break;
                default:
                    console.log("The switch statement in handleKeyUp() didn't work.");
            }
        });
    }



    // handleKeyDown(event) {
    //     console.log(`KeyCode in handleKeyDown(): ${event.code}, ${typeof(event.code)}`);
    //     console.log(this.LEFT, this.RIGHT, this.UP, this.SPACE);

    //     switch (event.code) {
    //         case this.LEFT:
    //             this.keyStatus.left = true;
    //             this.keyStatus.right = false;
    //             console.log(`I'm moving left. (${this.keyStatus})`);
    //             break;
    //         case this.RIGHT:
    //             this.keyStatus.left = false;
    //             this.keyStatus.right = true;
    //             console.log(`I'm moving right. (${this.keyStatus})`);
    //             break;
    //         case this.UP:
    //             this.keyStatus.up = true;
    //             console.log(`I'm jumping. (${this.keyStatus})`);
    //             break;
    //         case this.SPACE:
    //             this.keyStatus.space = true;
    //             console.log(`I throw a bottle. (${this.keyStatus})`);
    //             break;
    //         default:
    //             console.log("The switch statement in handleKeyDown() didn't work.");
    //     }
    // }


    // handleKeyUp(event) {
    //     console.log(`KeyCode in handleKeyUp(): ${event.code}, ${typeof(event.code)}`);

    //     switch (event.code) {
    //         case this.LEFT:
    //             this.keyStatus.left = false;
    //             console.log(`I stopped moving left.`, this.keyStatus);
    //             break;
    //         case this.RIGHT:
    //             this.keyStatus.right = false;
    //             console.log(`I stopped moving right.`, this.keyStatus);
    //             break;
    //         case this.UP:
    //             this.keyStatus.up = false;
    //             console.log(`I stopped jumping.`, this.keyStatus);
    //             break;
    //         case this.SPACE:
    //             this.keyStatus.space = false;
    //             console.log(`I stopped throwing.`, this.keyStatus);
    //             break;
    //         default:
    //             console.log("The switch statement in handleKeyUp() didn't work.");
    //     }
    // }


// ===========================================================================================

    // handleKeyDown(event) {
    //     console.log(`KeyCode in handleKeyDown(): ${event.code}, ${typeof(event.code)}`);

    //     switch (event.code) {
    //         case this.KEYS.LEFT.code:
    //             this.KEYS.LEFT.status = true;
    //             this.KEYS.RIGHT.status = false;
    //             console.log(`I'm moving left. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         case this.KEYS.RIGHT.code:
    //             this.KEYS.LEFT.status = false;
    //             this.KEYS.RIGHT.status = true;
    //             console.log(`I'm moving right. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         case this.KEYS.UP.code:
    //             this.KEYS.UP.status = true;
    //             console.log(`I'm jumping. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         case this.KEYS.SPACE.code:
    //             this.KEYS.SPACE.status = true;
    //             console.log(`I throw a bottle. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         default:
    //             console.log("The switch statement in handleKeyDown() didn't work.");
    //     }
    // }


    // handleKeyUp(event) {
    //     console.log(`KeyCode in handleKeyUp(): ${event.code}, ${typeof(event.code)}`);

    //     switch (event.code) {
    //         case this.KEYS.LEFT.code:
    //             this.KEYS.LEFT.status = false;
    //             console.log(`I stopped moving left. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         case this.KEYS.RIGHT.code:
    //             this.KEYS.RIGHT.status = false;
    //             console.log(`I stopped moving right. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         case this.KEYS.UP.code:
    //             this.KEYS.UP.status = false;
    //             console.log(`I stopped jumping. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         case this.KEYS.SPACE.code:
    //             this.KEYS.SPACE.status = false;
    //             console.log(`I stopped throwing. (${JSON.stringify(this.KEYS)})`);
    //             break;
    //         default:
    //             console.log("The switch statement in handleKeyUp() didn't work.");
    //     }
    // }
}