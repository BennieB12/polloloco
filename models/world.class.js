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
  audioManager = new AudioManager();
  throwableObjects = [];
  gameOver = false;
  gameStarted = false;
  enemyHit = false;
  isMuted = false;
  isPaused = false;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.setScreens();
    this.run();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  setScreens() {
    this.screenManager = new ScreenManager(canvas, this);
  }

  toggleMute() {
    if (this.isMuted) {
      this.audioManager.unmuteAll();
    } else {
      this.audioManager.muteAll();
    }
  }

    run() {
    if (!this.gameStarted && this.gameOver) return;
    this.checkCollision();
    this.character.handleThrow();
    this.checkGameOver();
    requestAnimationFrame(this.run.bind(this));
  }

  draw() {
    this.clearBoard();

    if (this.gameOver) {
      this.freezesreen();
    }
    if (this.isPaused) {
      this.pauseScreen();
    } else if (!this.gameStarted && !this.gameOver) {
      this.titleScreen();
    } else {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.character);
      this.drawObjects();
      this.drawBars();
      this.checkVisibility();
      this.ctx.translate(-this.camera_x, 0);
    }

    this.screenManager.drawUIButtons();

    requestAnimationFrame(() => this.draw());
  }

  pauseScreen() {
    this.ctx.font = "bold 50px Arial";
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    this.ctx.textAlign = "center";
    this.ctx.fillText("PAUSED", this.canvas.width / 2, this.canvas.height / 2);
    return;
  }

  freezesreen() {
  this.ctx.save();
  this.clearBoard();
  this.ctx.globalAlpha = 0.95;
  this.ctx.translate(this.camera_x, 0);
  this.addObjectsToMap(this.level.backgroundObjects);
  this.ctx.translate(-this.camera_x, 0);
  this.ctx.restore();
  return;
  }

  titleScreen() {
    if (!this.startScreenDrawn) {
      this.screenManager.showStartScreen();
    }
    return;
  }

  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.level.enemies.forEach((enemy) => {
        enemy.clearAllIntervals();
      });
    } else {
      this.character.standingTimer = 0;
      this.level.enemies.forEach((enemy) => {
        enemy.animate && enemy.animate();
      });
    }

    this.screenManager.drawUIButtons();
  }

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

  drawObjects() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.remove);
    this.throwableObjects = this.throwableObjects.filter((object) => !object.remove);

    this.addObjectsToMap(this.level.clouds);

    const regularEnemies = this.level.enemies.filter((enemy) => !(enemy instanceof Endboss));
    this.addObjectsToMap(regularEnemies);

    const endboss = this.getEndboss();
    if (endboss) {
      this.addToMap(endboss);
    }

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  flipImage(mo) {
    if (!mo.otherDirection) return;

    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    if (!mo.otherDirection) return;
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  startGame() {
    if (this.gameStarted || this.gameOver) return;
    this.clearBoard();
    this.gameStarted = true;
    this.run();
    this.draw();
    this.clearAllIntervalsForObjects();
    this.getEndboss();
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
    this.character.animate();
  }

  getEndboss() {
    return this.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  clearAllIntervalsForObjects() {
    this.level.enemies.forEach((enemy) => {
      enemy.clearAllIntervals();
    });
    this.character.clearAllIntervals();
  }

  reset() {
    this.world = null;
    this.gameOver = false;
    this.character.reset();
    this.level.replaceObjects();
    this.throwableObjects = [];
    this.statusBarHealth.reset();
    this.statusBarCoin.reset();
    this.statusBarBottle.reset();
    this.statusBarEnemy.reset();
    this.character.resetBottles();
    this.character.resetCoins();
    this.ctx.globalAlpha = 1;
    this.level.enemies.forEach((enemy) => {
      if (enemy.animate) enemy.clearAllIntervals();
    });
    this.level.enemies.forEach((enemy) => {
      if (enemy.animate) enemy.animate();
    });
    this.startGame();
  }

  checkVisibility() {
    this.statusBarEnemy.visible = this.character.x >= 1800 && this.getEndboss().isLiving;
  }

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

    this.throwableObjects.forEach((bottle, bottleIndex) =>
      this.level.enemies.forEach((enemy, enemyIndex) =>
        this.handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex)
      )
    );
  }

  checkCollect(index, item, type) {
    if (this.character.isColliding(item)) {
      if (type === "coin") {
        this.character.collectCoin(index);
      } else if (type === "bottle") {
        this.character.collectBottle(index);
      }
    }
  }

  checkGameOver() {
    if (this.gameOver) return;

    if (this.character.energy <= 0 || !this.getEndboss().isLiving) {
      this.triggerEndGame(() => {
        if (!this.gameOver) {
          if (this.character.energy <= 0) {
            this.screenManager.showLoseScreen();
          } else if (!this.getEndboss().isLiving) {
            this.screenManager.showWinScreen();
          }
        }
      });
    }
  }

  triggerEndGame(callback) {
    setTimeout(() => {
      callback();
      this.endgame();
    }, 1000);
  }

  endgame() {
    this.clearAllIntervalsForObjects();
    this.gameOver = true;
    this.gameStarted = false;
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
      if (
        this.character.isJumping === true &&
        this.character.y + this.character.height - this.character.offset.bottom > enemy.y + enemy.offset.top
      ) {
        enemy.getDamage();
        this.character.jump();
      } else {
        this.character.getDamage();
      }
    }
  }
}
