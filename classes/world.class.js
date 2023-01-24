class World {
    AUDIO = {
        backgroundMusic:    new Audio('./audio/background-music_1.wav'),
        rooster:            new Audio('./audio/rooster.wav'),
        walking:            new Audio('./audio/walk-on-sand.wav'),
        jump:               new Audio('./audio/jump_1.wav'),
        hurt:               new Audio('./audio/got-hurt_1.mp3'),
        bonusHp:            new Audio('./audio/get-bonus-hp.mp3'),
        collectCoin:        new Audio('./audio/collect-coin.mp3'),
        collectBottle:      new Audio('./audio/collect-bottle.mp3'),
        gameOver:           new Audio('./audio/game-over_4.mp3'),
        win:                new Audio('./audio/win_2.mp3'),
        chickenAlarm:       new Audio('./audio/chicken-single-alarm-call.wav'),
        bottleSmash:        new Audio('./audio/bottle-smash_2.mp3')
    }
    character;
    level;
    // statusbars = [];
    statusbars = {};
    throwables = [];
    canvas;
    ctx;
    cameraPos = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.checkCollision();
    }


    /**
     * Creates the main character
     */
    createCharacter() {
        const startPosX = 100;
        this.character = new Character(startPosX, 0, keyboardListener);
        
        
        // this.character.positionY = -150;
        // this.character.groundPosition = canvas.height - this.character.height;
        this.character.positionY = canvas.height - this.character.height - 40;
        this.character.groundPosition = this.character.positionY;
        this.character.applyGravity();
        // this.currentImage = 4;
        setTimeout(() => {
            this.character.playInitAnim = false;
            this.character.loadImage(this.character.IMAGES_WAIT[0]);
        }, 100);
        

        // world.setCameraPos(-startPosX);
    }


    setLevel(level) {
        this.level = level;
    }


    initBackgroundSound() {
        // Start the background music
        this.playSound(this.AUDIO.backgroundMusic, 0.25, true)

        // Start the loop for the rooster crow
        intervals.push(
            setInterval(() => {
                setTimeout(() => {
                    this.playSound(this.AUDIO.rooster, 0.75, false);
                }, calcRandomNumber(0, 15000));
            }, 20000)
        );
    }


    createStatusBars() {
        // this.statusbars.push(new Statusbar('health'));
        // this.statusbars.push(new Statusbar('bottle'));
        // this.statusbars.push(new Statusbar('coin'));
        this.statusbars['health'] = new Statusbar('health', 100);
        this.statusbars['bottle'] = new Statusbar('bottle', 0);
        this.statusbars['coin'] = new Statusbar('coin', 0);
    }


    /**
     * Reduces health points of an object
     * @param {Object} obj The object whose health points should be reduced
     * @param {Number} hp The amount of health points the object loses
     */
    looseHealthPoints(obj, hp) {
        if (obj.healthPoints - hp >= 0) {
            obj.healthPoints -= hp;
        }
        else {
            obj.healthPoints = 0;
        }

        // console.log(`${obj.constructor.name} HP = ${obj.healthPoints}`);
    }


    /**
     * Increases health points of an object
     * @param {Object} obj The object whose health points should be increased
     * @param {Number} hp The amount of health points the object gains
     */
    gainHealthPoints(obj, hp) {
        if (obj.isDead) return;

        if (obj.healthPoints + hp <= 100) {
            obj.healthPoints += hp;
        }
        else {
            obj.healthPoints = 100;
        }

        // console.log(`${obj.constructor.name} HP = ${obj.healthPoints}`);
    }


    /**
     * Manages the collision of an object
     * @param {Object} obj The object to be analysed
     * @param {Number} hp The amount of health points the object loses upon collision
     * @param {Object} statBar The statusbar of the object's health points
     */
    objCollides(obj, hp, statBar) {
        this.looseHealthPoints(obj, hp);
        statBar.setValue(obj.healthPoints);

        if (obj.healthPoints <= 0) {
            this.clearAllIntervals();
            obj.isDead = true;
            this.stopMainSounds();
            obj.die();
        }
        else {
            obj.gotHit = true;
            obj.hurt();
        }
    }


    /**
     * Manages the collision of the character with an enemy
     * @param {Number} hp The amount of health points the character loses upon collision
     */
    // characterCollides(hp) {
    //     this.looseHealthPoints(this.character, hp);
    //     this.statusbars.health.setValue(this.character.healthPoints);

    //     if (this.character.healthPoints <= 0) {
    //         this.clearAllIntervals();
    //         this.character.isDead = true;
    //         this.stopMainSounds();
    //         this.character.die();
    //     }
    //     else {
    //         this.character.gotHit = true;
    //         this.character.hurt();
    //     }
    // }


    /**
     * Manages the hit of the endboss by a bottle
     */
    // endbossHit() {
    //     this.looseHealthPoints(this.level.endboss, 20);
    //     this.level.endboss.statusbar.setValue(this.level.endboss.healthPoints);

    //     if (this.level.endboss.healthPoints <= 0) {
    //         this.clearAllIntervals();
    //         this.level.endboss.isDead = true;
    //         this.stopMainSounds();
    //         this.level.endboss.die();

    //         console.log(`Endboss died (HP ${this.level.endboss.healthPoints}!`);
    //     }
    //     else {
    //         this.level.endboss.gotHit = true;
    //         this.level.endboss.hurt();
            
    //         console.log(`Endboss hit by bottle (HP ${this.level.endboss.healthPoints}!`);
    //     }

    // }


    /**
     * Deactivates an enemy object
     * @param {Object} enemy The enemy object to be deactivated
     */
    deactivateEnemy(enemy) {
        clearInterval(enemy.horizMoveIntervalId);
        clearInterval(enemy.walkIntervalId);
        enemy.isDead = true;
    }


    removeDeadEnemy() {
        const objId = this.level.enemies.findIndex(obj => obj.isDead);
        this.level.enemies.splice(objId, 1);

        // console.log(`ID ${objId} removed from [enemies]`);
    }


    checkCollision() {
        intervals.push(
            setInterval(() => {
                this.character.getCollisionArea();
                this.level.enemies.forEach((enemy) => {
                    // console.log(`Collision check: ${enemy.constructor.name}`);
                    enemy.getCollisionArea();
                    if (this.character.isColliding(enemy)) {
                        if (this.character.isJumping && this.character.speedY <= 0 && !enemy.isDead) {
                            this.deactivateEnemy(enemy);

                            // console.log(`${enemy.constructor.name} ID ${this.level.enemies.findIndex(obj => obj.isDead)} died`);

                            enemy.img = enemy.imageCache[enemy.IMAGES_DIE[0]];
                            this.playSound(this.AUDIO.chickenAlarm, 0.5, false);
                            setTimeout(() => {
                                this.removeDeadEnemy();
                            }, 1500);
                            // console.log(`Character jumps into ${enemy.constructor.name}`);
                        }
                        else if (!enemy.isDead && !this.character.isAboveGround() && !this.character.gotHit) {
                            if (enemy instanceof Chicken) {
                                // this.characterCollides(5);
                                this.objCollides(this.character, 5, this.statusbars.health);
                            }
                            else if (enemy instanceof Chick && !this.character.isJumping) {
                                this.deactivateEnemy(enemy);
                                this.removeDeadEnemy();
                                this.gainHealthPoints(this.character, 5);
                                this.statusbars.health.setValue(this.character.healthPoints);
                                this.playSound(this.AUDIO.bonusHp, 1, false);
                            }
                            
                            // console.log(`Character walks into ${enemy.constructor.name}`);
                        }
                    }
                })
                this.level.endboss.getCollisionArea();
                if (this.character.isColliding(this.level.endboss)) {
                    // this.characterCollides(8);
                    this.objCollides(this.character, 8, this.statusbars.health);
                    // console.log(`Character collides with endboss!`);
                }
                this.level.collectables.forEach((collectable, id) => { // TODO: check if use of id is sufficient to remove the object
                    if (this.character.isColliding(collectable)) {
                        if (collectable.type == 'bottle') {
                            this.character.counterBottles++;
                            this.statusbars.bottle.setValue(100 / this.level.maxBottles * this.character.counterBottles);
                        }
                        if (collectable.type == 'coin') {
                            this.character.counterCoins++;
                            this.statusbars.coin.setValue(100 / this.level.maxCoins * this.character.counterCoins);
                        }
                        this.level.collectables.splice(id, 1);
                    }
                })
                this.throwables.forEach((throwable) => {
                    throwable.getCollisionArea();
                    if (throwable.positionY != throwable.groundPosition && this.level.endboss.isColliding(throwable) && !this.level.endboss.gotHit) {
                        throwable.smash();
                        // this.endbossHit();
                        this.objCollides(this.level.endboss, 20, this.level.endboss.statusbar);
                    }
                });
            }, 100)
        );
    }


    draw() {
        // Move the context relative to the character's position
        this.ctx.translate(this.cameraPos, 0);

        // Draw the sky
        this.drawMultipleObjectsToCanvas(this.level.background.sky);

        // Draw the clouds
        this.drawMultipleObjectsToCanvas(this.level.background.clouds);

        // Draw the landscape
        this.drawMultipleObjectsToCanvas(this.level.background.landscapeLayer);

        // Draw the collectables
        this.drawMultipleObjectsToCanvas(this.level.collectables);
        
        // Draw the character
        this.drawSingleObjectToCanvas(this.character);

        // Draw the endboss
        this.drawSingleObjectToCanvas(this.level.endboss);

        // Draw the enemies
        this.drawMultipleObjectsToCanvas(this.level.enemies);

        // Draw throwables
        this.drawMultipleObjectsToCanvas(this.throwables);

        // Reset the context's position
        this.ctx.translate(-this.cameraPos, 0);

        // Draw the statusbars
        this.drawMultipleObjectsToCanvas(Object.values(this.statusbars));
        this.drawSingleObjectToCanvas(this.level.endboss.statusbar);
        this.drawSingleObjectToCanvas(this.level.endboss.IMAGE_STATUS_ICON);

        let self = this;
        requestAnimationFrame(() => self.draw());
    }


    drawSingleObjectToCanvas(obj) {
        this.mirrorImage(obj);
        this.ctx.drawImage(obj.img, obj.positionX, obj.positionY, obj.width, obj.height);
        this.drawRect(obj);
        this.resetMirroring(obj);
    }


    mirrorImage(obj) {
        if (obj.isImageMirrored) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0);
            this.ctx.scale(-1, 1);
            obj.positionX = obj.positionX * -1;
        }
    }


    resetMirroring(obj) {
        if (obj.isImageMirrored) {
            obj.positionX = obj.positionX * -1;
            this. ctx.restore();
        }
    }


    drawMultipleObjectsToCanvas(array) {
        array.forEach(object => this.drawSingleObjectToCanvas(object));
    }


    setCameraPos(pos) {
        this.cameraPos = pos;
    }


    moveBackground(direction) {
        for (let l = 0; l < 2; l++) {
            for (let i = 0; i < world.level.sceneParts; i++) {
                this.level.background.landscapeLayer[(l * 2) + i].positionX += this.level.parallaxLandscapeLayer[l] * direction;
            }            
        }
    }


    /**
     * Starts playing a sound
     * @param {Object} sound The Audio object to be played
     * @param {Number} volume The value of the audio's volume
     * @param {Boolean} isLooping Flag to set the sound playing in a loop
     */
    playSound(sound, volume, isLooping) {
        sound.volume = volume;
        sound.loop = isLooping;
        sound.play();
    }


    /**
     * Stops playing a sound and resets it to its start
     * @param {Object} sound The Audio object to be played
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }


    /**
     * Stops all sounds and resets them to start
     */
    stopMainSounds() {
        this.stopSound(this.AUDIO.backgroundMusic);
        this.AUDIO.backgroundMusic.currentTime = 0;
        this.stopSound(this.AUDIO.walking);
        this.AUDIO.walking.currentTime = 0;
    }


    /**
     * Clears all intervals
     */
    clearAllIntervals() {
        intervals.forEach(interval => clearInterval(interval));
    }


    // ++++++++ TEST ++++++++++++++
    drawRect(obj) {
        if (obj instanceof Character || obj instanceof Chicken || obj instanceof Chick | obj instanceof Endboss) {
            this.ctx.beginPath();
            // this.ctx.rect(obj.positionX, obj.positionY, obj.width, obj.height); // FOR TESTING
            this.ctx.rect(obj.collisionArea.x, obj.collisionArea.y, obj.collisionArea.width, obj.collisionArea.height);
            this.ctx.stroke();
        }
    }
    // ++++++++ TEST ++++++++++++++
}