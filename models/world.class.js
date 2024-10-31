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
  statusBarEnemy = new Statusbar_Enemy();
  throwableObjects = [];
  gameOver = false;
  gameStarted = false;

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

  clearAllIntervals() {
    for (let i = 0; i < array.length; i++) {
      window.clearInterval(i);
    }
  }

  draw() {
    if (this.gameOver) return;
    if (!this.gameStarted) {
      this.showStartScreen();
    } else {
      this.clearBoard();
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.character);
      this.drawBars();
      this.drawObjects();
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
    this.addToMap(this.statusBarEnemy);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0);
  }

  drawObjects() {
    this.level.enemies = this.level.enemies.filter(enemy => !enemy.remove);
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
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  run() {
    setInterval(() => {
      if (this.gameStarted) {
        this.checkCollision();
        this.character.handleThrow();
      }
    }, 200);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy, enemyIndex) => this.handleEnemyCollision(enemy));
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
      enemy.getDamage();
      if (enemy.energy <= 0) {
        this.level.enemies.splice(enemyIndex, enemy);
      }
      this.throwableObjects.splice(bottleIndex, enemy);
    }
  }

  handleEnemyCollision(enemy) {
    if (this.character.aboveGround() && this.character.isColliding(enemy)) {
      enemy.getDamage();
      this.character.jump();
    } else if (this.character.isColliding(enemy)) {
      this.character.getDamage();
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
    const startImage = new Image();
    startImage.src = "img/9_intro_outro_screens/start/startscreen_1.png";

    startImage.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(startImage, 0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = "bold 60px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Press SPACE to Start", this.canvas.width / 2, this.canvas.height - 200);
    };

    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.startGame();
      }
    });

    this.canvas.addEventListener("click", () => {
      this.startGame();
    });
  }

  startGame() {
    this.gameStarted = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    this.ctx.fillStyle = "#00FF00";
  }
}
