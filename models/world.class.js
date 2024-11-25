class World {
  character = new Character();
  // audiomanager = new AudioManager();
  endboss = new Endboss();
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
    this.endboss.world = this;
    this.screenManager = new ScreenManager(canvas, this);
    // this.audiomanager = new AudioManager();
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
  
    if (this.isPaused) {
      this.ctx.font = "bold 50px Arial";
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      this.ctx.textAlign = "center";
      this.ctx.fillText("PAUSED", this.canvas.width / 2, this.canvas.height / 2);
      return;
    }
  
    if (!this.gameStarted) {
      if (!this.startScreenDrawn) {
        this.screenManager.showStartScreen();
        this.startScreenDrawn = true;
      }
    } else {
      this.clearBoard();
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.character);
      this.checkVisibility();
      this.drawObjects();
      this.drawBars();
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
      console.log("Game Paused");
    } else {
      console.log("Game Resumed");
      this.run();
    }
  }

  drawBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    if (this.statusBarEnemy.visible && this.endboss.isLiving) {
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
    this.addObjectsToMap(this.level.enemies);
    if (this.level.endboss && this.level.endboss.isLiving) {
      this.addToMap(this.level.endboss);
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
    this.clearBoard();
    this.draw();
    this.run();
    this.level.clouds.forEach((cloud) => cloud.startMoving());
    this.gameStarted = true;
    this.gameOver = false;
    this.startScreenDrawn = false;
    this.character.standingTimer = 0;
    // this.clearAllIntervalsForObjects();
    if (!this.isPaused) {
      this.level.enemies.forEach((enemy) => {
        enemy.animate();
      });
    }
    // this.addEndbossToLevel();
  }

  // addEndbossToLevel() {
  //   this.level.enemies = this.level.enemies.filter((enemy) => !(enemy instanceof Endboss));
  //   this.endboss.reset();
  //   this.level.enemies.push(this.endboss);
  // }

  // clearAllIntervalsForObjects() {
  //   this.character.clearAllIntervals();
  //   this.level.enemies.forEach((enemy) => enemy.clearAllIntervals());
  //   this.throwableObjects.forEach((throwable) => throwable.clearAllIntervals());
  // }

  restartGame() {
    this.character.reset();
    // this.endboss.reset();
    // this.level.enemies.forEach((enemy) => enemy.clearAllIntervals());
    this.level.enemies.forEach((enemy) => enemy.reset && enemy.reset());
    this.throwableObjects.forEach((object) => object.reset && object.reset());
    this.statusBarHealth.reset();
    this.statusBarBottle.reset();
    this.statusBarCoin.reset();
    this.statusBarEnemy.reset();
    this.level.clouds.forEach((cloud) => cloud.stopMoving());
    this.startGame();
  }

  run() {
    if (this.gameStarted && !this.gameOver) {
      this.checkCollision();
      this.character.handleThrow();
      this.checkGameOver();
      requestAnimationFrame(this.run.bind(this));
    }
  }

  checkVisibility() {
    if (this.character.x >= 1800 && this.endboss.isLiving) {
      this.statusBarEnemy.visible = true;
    } else {
      this.statusBarEnemy.visible = false;
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      this.handleEnemyCollision(enemy);

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
    if (!this.gameOver) {
      if (this.character.energy <= 0) {
        setTimeout(() => {
          this.gameOver = true;
          this.gameStarted = false;
          this.screenManager.showLoseScreen();
        }, 1000);
      } else if (this.endboss && !this.endboss.isLiving) {
        setTimeout(() => {
          this.gameOver = true;
          this.gameStarted = false;
          this.screenManager.showWinScreen();
        }, 1000);
      }
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
