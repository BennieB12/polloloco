class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHealth = new Statusbar_health();
  statusBarCoin = new Statusbar_coin();
  statusBarBottle = new Statusbar_bottle();
  statusBarEnemy = new Statusbar_enemy();
  throwableObjects = [];
  gameOver = false;
  gameStarted = false;
  isPaused = false;
  soundManager = new SoundManager();

  /**
   * Creates an instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element for drawing.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.setScreens();
    this.run();
    this.draw();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Initializes screen management.
   */
  setScreens() {
    this.screenManager = new ScreenManager(canvas, this, this.soundManager);
  }

  /**
   * Main game loop.
   */
  run() {
    this.checkCollision();
    this.character.handleThrow();
    this.checkGameOver();
    requestAnimationFrame(this.run.bind(this));
  }

  /**
   * Draws the game state on the canvas.
   */
  draw() {
    this.clearBoard();
    if (!this.gameStarted && !this.gameOver) {
      this.titleScreen();
    }
    if (this.gameStarted) {
      this.drawGame();
    }
    if (this.isPaused) {
      this.pauseScreen();
    }
    if (this.gameOver) {
      this.freezescreen();
    }
    this.screenManager.drawUIButtons();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Freezes the screen during game over.
   */
  freezescreen() {
    this.ctx.save();
    this.clearBoard();
    this.ctx.globalAlpha = 0.95;
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.restore();
    return;
  }

  /**
   * Displays the title screen.
   */
  titleScreen() {
    if (!this.startScreenDrawn) this.screenManager.showStartScreen();
  }

  /**
   * Displays the pause screen.
   */
  pauseScreen() {
    this.drawText("PAUSED", 50, "rgba(255, 255, 255, 0.8)", this.canvas.width / 2, this.canvas.height / 2);
  }

  /**
   * Clears the canvas.
   */
  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGame() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.drawObjects();
    this.drawBars();
    this.checkVisibility();
    this.ctx.translate(-this.camera_x, 0);
  }

  drawText(text, fontSize, fillStyle, x, y) {
    this.ctx.font = `bold ${fontSize}px Arial`;
    this.ctx.fillStyle = fillStyle;
    this.ctx.textAlign = "center";
    this.ctx.fillText(text, x, y);
  }

  /**
   * Draws the status bars on the canvas.
   */
  drawBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    if (this.statusBarEnemy.visible) {
      this.addToMap(this.statusBarEnemy);
    }
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws all game objects, including enemies and collectibles.
   */
  drawObjects() {
    this.level.enemies = this.level.enemies.filter(function (enemy) {
      return !enemy.remove;
    });
    this.throwableObjects = this.throwableObjects.filter(function (object) {
      return !object.remove;
    });
    this.addObjectsToMap(this.level.clouds);
    var regularEnemies = this.level.enemies.filter(function (enemy) {
      return !(enemy instanceof Endboss);
    });
    this.addObjectsToMap(regularEnemies);
    var endboss = this.getEndboss();
    if (endboss) {
      this.addToMap(endboss);
    }
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Adds objects to the map for rendering.
   * @param {Array} objects - List of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips an object's image for the opposite direction.
   * @param {Object} mo - The movable object to flip.
   */
  flipImage(mo) {
    if (!mo.otherDirection) return;
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips an object's image back to normal.
   * @param {Object} mo - The movable object to flip back.
   */
  flipImageBack(mo) {
    if (!mo.otherDirection) return;
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  startIntervalsForEnemies() {
    this.level.enemies.forEach((enemy) => enemy.animate && enemy.animate());
  }

  /**
   * Clears all intervals for objects.
   */
  clearAllIntervalsForObjects() {
    this.level.enemies.forEach((enemy) => {
      enemy.clearAllIntervals();
    });
    this.character.clearAllIntervals();
  }

  /**
   * Starts the game if not already started or over.
   */
  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.isPaused = false;
    this.screenManager.startButtonVisible = false;
    this.clearBoard();
    this.clearAllIntervalsForObjects();
    this.getEndboss();
    this.startIntervalsForEnemies();
    this.character.animate();
    this.screenManager.closeAllPanels();
    // this.soundManager.playSound("BACKGROUND_SOUND");
  }

  /**
   * Resets the game to its initial state.
   */
  reset() {
    this.gameOver = false;
    this.world = null;
    this.throwableObjects = [];
    this.statusBarHealth.reset();
    this.statusBarCoin.reset();
    this.statusBarBottle.reset();
    this.statusBarEnemy.reset();
    this.level.replaceObjects();
    this.character.reset();
    this.character.resetBottles();
    this.character.resetCoins();
    this.ctx.globalAlpha = 1;
    this.startGame();
  }

  home() {
    this.gameOver = false;
    this.gameStarted = false;
    this.world = null;
    this.throwableObjects = [];
    this.statusBarHealth.reset();
    this.statusBarCoin.reset();
    this.statusBarBottle.reset();
    this.statusBarEnemy.reset();
    this.level.replaceObjects();
    this.character.reset();
    this.character.resetBottles();
    this.character.resetCoins();
    this.ctx.globalAlpha = 1;
    this.screenManager.controlPanelVisible = false;
    this.screenManager.startButtonVisible = false;
    this.screenManager.restartButtonvisible = false;
    this.screenManager.impressumPanelVisible = false;
    this.screenManager.policyPanelVisible = false;
    this.screenManager.showStartScreen();
  }

  /**
   * Gets the end boss from the level.
   * @returns {Object} The end boss object.
   */
  getEndboss() {
    return this.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  /**
   * Handles collision between a throwable object (bottle) and an enemy.
   * @param {Object} bottle - The throwable bottle object.
   * @param {number} bottleIndex - The index of the throwable bottle.
   * @param {Object} enemy - The enemy object.
   * @param {number} enemyIndex - The index of the enemy.
   */
  handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex) {
    if (bottle.isColliding(enemy)) {
      bottle.splashAnimation = true;
      bottle.groundLevel = bottle.y;
      bottle.playSplashAnimation();
      if (enemy instanceof Endboss) {
        enemy.statusBar = this.statusBarEnemy;
      }
      enemy.getDamage();
    }
  }

  /**
   * Handles collision between the character and an enemy.
   * @param {Object} enemy - The enemy object.
   */
  handleEnemyCollision(enemy) {
    if (this.character.isColliding(enemy)) {
      if (this.character.isJumping === true && this.character.y + this.character.height - this.character.offset.bottom > enemy.y + enemy.offset.top) {
        enemy.getDamage();
        this.character.jump();
      } else {
        this.character.getDamage();
      }
    }
  }

  /**
   * Checks visibility of the enemy status bar.
   */
  checkVisibility() {
    if (this.character.x >= 1800 && this.getEndboss().isLiving) {
      this.statusBarEnemy.visible = true;
      if (this.getEndboss().isJumping) {
        // this.soundManager.playSound("ENDBOSS_ATTACK_SOUND");
      }
    } else if (this.character.x < 1800) {
      this.statusBarEnemy.visible = false;
    }
  }

  /**
   * Checks collisions between objects.
   */
  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (Math.abs(enemy.x - this.character.x) < 300) {
        this.handleEnemyCollision(enemy);
      }

      if (enemy instanceof Endboss) {
        enemy.statusBar = this.statusBarEnemy;
      }
    });
    this.level.coins.forEach((coin, index) => this.checkCollect(index, coin, "coin"));
    this.level.bottles.forEach((bottle, index) => this.checkCollect(index, bottle, "bottle"));
    this.throwableObjects.forEach((bottle, bottleIndex) => this.level.enemies.forEach((enemy, enemyIndex) => this.handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex)));
  }

  /**
   * Handles item collection (coins or bottles).
   * @param {number} index - The index of the item.
   * @param {Object} item - The item object.
   * @param {string} type - The type of the item ('coin' or 'bottle').
   */
  checkCollect(index, item, type) {
    if (this.character.isColliding(item)) {
      if (type === "coin") {
        // this.soundManager.playSound("COIN_SOUND");
        setTimeout(() => {
          // this.soundManager.stopSound("COIN_SOUND");
        }, 200);
        this.character.collectCoin(index);
      } else if (type === "bottle") {
        // this.soundManager.playSound("GET_BOTTLE_SOUND");
        setTimeout(() => {
          // this.soundManager.stopSound("GET_BOTTLE_SOUND");
        }, 200);
        this.character.collectBottle(index);
      }
    }
  }

  /**
   * Checks if the game is over.
   */
  checkGameOver() {
    if (this.gameOver) return;
    if (this.character.energy <= 0 || !this.getEndboss().isLiving) {
      this.gameOver = true;
      this.gameStarted = false;

      if (this.character.energy <= 0) {
        setTimeout(() => {
          this.screenManager.showLoseScreen();
        }, 1000);
      } else if (!this.getEndboss().isLiving) {
        setTimeout(() => {
          this.screenManager.showWinScreen();
        }, 1000);
      }
    }
  }

  /**
   * Toggles the paused state and manages intervals.
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    this.isPaused ? this.level.enemies.forEach((enemy) => enemy.clearAllIntervals()) : this.startIntervalsForEnemies();
    this.isPaused ? this.character.clearAllIntervals() : this.character.animate();
    this.character.standingTimer = 0;
    this.screenManager.drawUIButtons();
  }
}
