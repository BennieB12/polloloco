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
  startScreenDrawn = false;
  enemyHit = false;
  isMuted = false;
  isPaused = false;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.screenManager.showStartScreen();
    this.run();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
    this.screenManager = new ScreenManager(canvas, this);
  }

  toggleMute() {
    if (this.isMuted) {
      this.audioManager.unmuteAll();
    } else {
      this.audioManager.muteAll();
    }
  }

  draw() {
    if (this.gameOver) {
      this.ctx.save();
      this.clearBoard();
      this.ctx.globalAlpha = 0.95;
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
      this.ctx.restore();
      return;
    }

    this.clearBoard();

    if (this.isPaused) {
      this.ctx.font = "bold 50px Arial";
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.textAlign = "center";
      this.ctx.fillText("PAUSED", this.canvas.width / 2, this.canvas.height / 2);
    } else if (!this.gameStarted) {
      if (!this.startScreenDrawn) {
        this.screenManager.showStartScreen();
        this.startScreenDrawn = true;
      }
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
      this.draw();
      this.run();
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
    if (this.gameStarted && !this.gameOver) return;
    this.gameOver = false;
    this.gameStarted = true;
    this.startScreenDrawn = false;
    this.clearBoard();
    this.draw();
    this.run();
    this.clearAllIntervalsForObjects();
    this.level.replaceObjects();
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
    this.character.reset();
    this.throwableObjects = [];
    this.statusBarHealth.reset();
    this.statusBarCoin.reset();
    this.statusBarBottle.reset();
    this.statusBarEnemy.reset();
    this.character.resetBottles();
    this.character.resetCoins();
  }


  restartGame() {
    this.reset();
    this.startGame();
  }

  run() {
    if (!this.gameStarted || this.gameOver) return;

    this.checkCollision();
    this.character.handleThrow();
    this.checkGameOver();

    requestAnimationFrame(this.run.bind(this));
  }

  checkVisibility() {
    if (this.character.x >= 1800 && this.getEndboss().isLiving) {
      this.statusBarEnemy.visible = true;
    } else {
      this.statusBarEnemy.visible = false;
    }
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

    const endboss = this.getEndboss();

    if (this.character.energy <= 0) {
      setTimeout(() => {
        this.gameOver = true;
        this.gameStarted = false;
        this.isPaused = false;
        this.screenManager.showLoseScreen();
      }, 1000);
    } else if (endboss && !endboss.isLiving) {
      setTimeout(() => {
        this.gameOver = true;
        this.gameStarted = false;
        this.isPaused = false;
        this.screenManager.showWinScreen();
      }, 1000);
    }
  }

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
