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

  run() {
    setInterval(() => {
      if (this.gameStarted) {
        this.checkCollision();
        this.checkThrowObjects();
      }
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      this.character.throwBottle();
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
    this.level.coins.forEach((coin, index) => this.checkCollect(index, coin, "coin"));
    this.level.bottles.forEach((bottle, index) => this.checkCollect(index, bottle, "bottle"));
    this.throwableObjects.forEach((bottle, bottleIndex) =>
      this.level.enemies.forEach((enemy, enemyIndex) =>
        this.handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex)
      )
    );
  }

  handleEnemyCollision(enemy) {
    if (this.character.isColliding(enemy)) {
        if (this.character.isJumping && this.character.width + this.character.height < enemy.y + enemy.height) {
            this.damageEnemy(enemy); 
        } else {
            this.character.hit();
        }
        this.statusBarHealth.setpercentage(this.character.energy);
    }
  }




  damageEnemy(enemy) {
    enemy.energy -= 8;
    if (enemy.energy <= 0) {
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }
  }

  checkCollect(index, item, type) {
    if (this.character.isColliding(item)) {
        if (type === "coin") {
            this.collectCoin(index);
        } else if (type === "bottle") {
            this.collectBottle(index);
        }
    }
}

  handleThrowableCollision(bottle, bottleIndex, enemy, enemyIndex) {
    if (bottle.isColliding(enemy)) {
      enemy.energy -= 10;
      if (enemy.energy <= 0) {
        this.level.enemies.splice(enemyIndex, 1);
      }
      this.throwableObjects.splice(bottleIndex, 1);
    }
  }

  collectBottle(index) {
    this.level.bottles.splice(index, 1);
    this.character.bottles++;
    this.statusBarBottle.setpercentage(this.character.bottles);
  }

  collectCoin(index) {
    this.level.coins.splice(index, 1);
    this.statusBarCoin.addCoin();
  }

  draw() {
    if (this.gameOver) return;
    if (!this.gameStarted) {
      this.showStartScreen();
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.clouds);

      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.statusBarHealth);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottle);
      this.ctx.translate(this.camera_x, 0);

      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);
    }

    requestAnimationFrame(() => this.draw());
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



















  showStartScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "bold 60px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Press SPACE to Start", this.canvas.width / 2, this.canvas.height / 2);

    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.gameStarted = true;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
