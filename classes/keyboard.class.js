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
        JUMP:
            {
                code: 'Space',
                status: false
            },
        THROW:
            {
                code: 'KeyD',
                status: false
            }
    };
    

    constructor() {
        this.handleKeyDown();
        this.handleKeyUp();
        this.handleTouchStart();
        this.handleTouchEnd();
    }


    /**
     * Sets the eventlistener for 'keydown' event
     */
    handleKeyDown() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case this.KEYS.LEFT.code:
                    this.KEYS.LEFT.status = true;
                    this.KEYS.RIGHT.status = false;
                    break;
                case this.KEYS.RIGHT.code:
                    this.KEYS.LEFT.status = false;
                    this.KEYS.RIGHT.status = true;
                    break;
                case this.KEYS.JUMP.code:
                    this.KEYS.JUMP.status = true;
                    break;
                case this.KEYS.THROW.code:
                    this.KEYS.THROW.status = true;
                    break;
            }
        });
    }


    /**
     * Sets the eventlistener for 'keyup' event
     */
    handleKeyUp() {
        document.addEventListener('keyup', (event) => {
            lastActiveTimestamp = Date.now();
            switch (event.code) {
                case this.KEYS.LEFT.code:
                    this.KEYS.LEFT.status = false;
                    break;
                case this.KEYS.RIGHT.code:
                    this.KEYS.RIGHT.status = false;
                    break;
                case this.KEYS.JUMP.code:
                    this.KEYS.JUMP.status = false;
                    break;
                case this.KEYS.THROW.code:
                    this.KEYS.THROW.status = false;
                    break;
            }
        });
    }


    /**
     * Obtains the current keyboard status
     * @returns Boolean
     */
    getKeyboardStatus() {
        for (let key in this.KEYS) {
            if (this.KEYS[key].status) return true;
        }
    }


    /**
     * Sets the eventlistener for 'touchstart' for each mobile button
     */
    handleTouchStart() {
        document.getElementById('mbtn-left').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.KEYS.LEFT.status = true;
        });

        document.getElementById('mbtn-right').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.KEYS.RIGHT.status = true;
        });

        document.getElementById('mbtn-jump').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.KEYS.JUMP.status = true;
        });

        document.getElementById('mbtn-throw').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.KEYS.THROW.status = true;
        });
    }


    /**
     * Sets the eventlistener for 'touchend' for each mobile button
     */
    handleTouchEnd() {
        document.getElementById('mbtn-left').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.KEYS.LEFT.status = false;
        });

        document.getElementById('mbtn-right').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.KEYS.RIGHT.status = false;
        });

        document.getElementById('mbtn-jump').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.KEYS.JUMP.status = false;
        });

        document.getElementById('mbtn-throw').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.KEYS.THROW.status = false;
        });
    }
}