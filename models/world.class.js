class World {
  character = new Character();
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
  isPlayingSound = false;
  GAMESTART_SOUND = new Audio("audio/start.mp3");
  enemyHit = false;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.showStartScreen();
    this.run();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
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

    if (!this.gameStarted) {
      if (!this.startScreenDrawn) {
        this.showStartScreen();
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

    requestAnimationFrame(() => this.draw());
  }

  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.gameStarted = true;
    this.gameOver = false;
    this.startScreenDrawn = false;
    this.clearBoard();
    this.clearAllIntervalsForObjects();
    this.addEndbossToLevel();
    this.level.clouds.forEach((cloud) => cloud.startMoving());
    this.run();
    this.draw();
    this.GAMESTART_SOUND.pause();

    if (this.gameStarted) {
      this.level.enemies.forEach((enemy) => {
        enemy.animate();
        this.character.standingTimer = 0;
      });
    }
  }

  addEndbossToLevel() {
    this.level.enemies = this.level.enemies.filter((enemy) => !(enemy instanceof Endboss));
    this.endboss.reset();
    this.level.enemies.push(this.endboss);
  }
  

  clearAllIntervalsForObjects() {
    this.character.clearAllIntervals();
    this.level.enemies.forEach((enemy) => enemy.clearAllIntervals());
    this.throwableObjects.forEach((throwable) => throwable.clearAllIntervals());
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
        this.gameOver = true;
        this.gameStarted = false;
        setTimeout(() => this.showLoseScreen(), 500);
      } else if (this.endboss && !this.endboss.isLiving) {
        this.gameOver = true;
        this.gameStarted = false;
        setTimeout(() => this.showWinScreen(), 500);
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

  restartGame() {
    this.clearBoard();
    this.level.resetLevel();
    this.throwableObjects = [];
    this.character.reset();
    this.endboss.reset(); 
    this.statusBarHealth.reset();
    this.statusBarBottle.reset();
    this.statusBarCoin.reset();
    this.statusBarEnemy.reset();
    this.level.clouds.forEach((cloud) => cloud.stopMoving());
    this.startGame();
  }

  playStartSound() {
    if (!this.isPlayingSound) {
      this.GAMESTART_SOUND.play();
      this.isPlayingSound = true;
    }
  }

  showStartScreen() {
    if (this.gameStarted) return;

    const startImage = new Image();
    startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";
    this.playStartSound();

    startImage.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(startImage, 0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = "bold 60px Arial";
      this.ctx.textAlign = "center";
      const textY = 100;

      let colorValue = 255;
      let decreasing = true;

      const animateText = () => {
        this.ctx.clearRect(0, textY - 60, this.canvas.width, 80);
        this.ctx.drawImage(startImage, 0, 0, this.canvas.width, this.canvas.height);

        if (decreasing) {
          colorValue -= 2;
          if (colorValue <= 0) {
            colorValue = 0;
            decreasing = false;
          }
        } else {
          colorValue += 2;
          if (colorValue >= 255) {
            colorValue = 255;
            decreasing = true;
          }
        }

        this.ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        this.ctx.fillText("TAP to Start", this.canvas.width / 2, textY);

        if (!this.gameStarted) {
          requestAnimationFrame(animateText);
        }
      };

      animateText();

      const startGameHandler = () => {
        this.startGame();
      };
      this.canvas.addEventListener("click", startGameHandler, { once: true });
    };
  }
  
  showWinScreen() {
    const winImage = new Image();
    winImage.src = "img/9_intro_outro_screens/win/win_2.png";

    winImage.onload = () => {
      this.ctx.drawImage(winImage, 0, 0, this.canvas.width, this.canvas.height);

      const textY = this.canvas.height / 2 - 150;
      let colorValue = 255;
      let decreasing = true;

      const animateText = () => {
        this.ctx.drawImage(winImage, 0, 0, this.canvas.width, this.canvas.height);

        if (decreasing) {
          colorValue -= 2;
          if (colorValue <= 0) {
            colorValue = 0;
            decreasing = false;
          }
        } else {
          colorValue += 2;
          if (colorValue >= 255) {
            colorValue = 255;
            decreasing = true;
          }
        }

        this.ctx.font = "bold 60px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        this.ctx.fillText("TAP to Restart", this.canvas.width / 2, textY);
        if (!this.gameStarted) {
          requestAnimationFrame(animateText);
        }
      };
      setTimeout(() => {
        animateText();
      }, 1000);
      this.canvas.addEventListener("click", this.restartGame.bind(this), { once: true });
    };
  }


  showLoseScreen() {
    const loseImage = new Image();
    loseImage.src = "img/9_intro_outro_screens/game_over/file.png";

    loseImage.onload = () => {
      this.ctx.drawImage(loseImage, 0, 0, this.canvas.width, this.canvas.height);

      const textY = this.canvas.height / 2 - 150;
      let colorValue = 255;
      let decreasing = true;

      const animateText = () => {
        this.ctx.drawImage(loseImage, 0, 0, this.canvas.width, this.canvas.height);

        if (decreasing) {
          colorValue -= 2;
          if (colorValue <= 0) {
            colorValue = 0;
            decreasing = false;
          }
        } else {
          colorValue += 2;
          if (colorValue >= 255) {
            colorValue = 255;
            decreasing = true;
          }
        }

        this.ctx.font = "bold 60px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        this.ctx.fillText("TAP to Restart", this.canvas.width / 2, textY);
        if (!this.gameStarted) {
          requestAnimationFrame(animateText);
        }
      };
      setTimeout(() => {
        animateText();
      }, 1000);
      this.canvas.addEventListener("click", this.restartGame.bind(this), { once: true });
    };
  }
}
