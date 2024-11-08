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
  }

  draw() {
    if (this.gameOver) return;
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

  checkVisibility() {
    if (this.character.x >= 1800) {
      this.statusBarEnemy.visible = true;
    }
    return;
  }

  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarEnemy);
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
    this.gameOver = false;
    this.gameStarted = true;
    this.startScreenDrawn = false;
    this.clearBoard();
    this.clearAllIntervalsForObjects();
    // this.level.clouds.forEach(cloud => cloud.startMoving());
    this.run();
    this.draw();
    this.GAMESTART_SOUND.pause();
    document.getElementById("startButton").classList.add("d-none");

    if (this.gameStarted) {
      this.level.enemies.forEach((enemy) => {
        enemy.animate();
        this.character.standingTimer = 0;
      });
    }
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

  checkCollision() {
    this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
    this.level.enemies.forEach((enemy) => {
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

  handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex) {
    if (bottle.isColliding(enemy)) {
      bottle.splashAnimation = true;
      bottle.groundLevel = bottle.y;
      bottle.playSplashAnimation();
      enemy.reduceEnergy(10);
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

  checkCollect(index, item, type) {
    if (this.character.isColliding(item)) {
      if (type === "coin") {
        this.character.collectCoin(index);
      } else if (type === "bottle") {
        this.character.collectBottle(index);
      }
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

      const startButton = document.getElementById("startButton");
      startButton.classList.remove("d-none");

      const startGameHandler = () => {
        this.startGame();
      };

      window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
          startGameHandler();
        }
      });

      this.canvas.addEventListener("click", () => {
        startGameHandler();
      });

      startButton.onclick = startGameHandler;
    };
  }

  playStartSound() {
    if (!this.isPlayingSound) {
      this.GAMESTART_SOUND.play();
      this.isPlayingSound = true;
    }
  }

  showEndScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "bold 60px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2 - 50);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Click to Restart", this.canvas.width / 2, this.canvas.height / 2 + 30);

    this.canvas.removeEventListener("click", this.restartGame.bind(this));
    this.canvas.addEventListener("click", this.restartGame.bind(this), { once: true });
  }
  restartGame() {
    this.gameOver = true;
    this.gameStarted = false;
    this.character.otherDirection = false;
    this.throwableObjects = [];
    this.startScreenDrawn = true;
    this.character.standingTimer = 0;
    this.character.x = 80;
    this.character.energy = 100;
    this.character.resetCoins();
    this.character.resetBottles();
    this.statusBarHealth.reset();
    this.statusBarBottle.reset();
    this.statusBarCoin.reset();
    this.statusBarEnemy.reset();
    this.level.resetLevel();
    // this.level.clouds.forEach((cloud) => cloud.stopMoving());
    this.startGame();
  }

  checkGameOver() {
    if (this.character.energy <= 0 && !this.gameOver) {
      this.gameOver = true;
      this.gameStarted = false;
      this.showEndScreen();
    }
  }
}
