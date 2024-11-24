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
  enemyHit = false;
  isMuted = false;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.screenManager.showStartScreen();
    this.run();
    this.draw();
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (event.clientX - rect.left) * scaleX;
      const clickY = (event.clientY - rect.top) * scaleY;
      const buttonRadius = 15;

      const controlButtonX = canvas.width - 105;
      const controlButtonY = 20;
      if (this.isInsideCircle(clickX, clickY, controlButtonX, controlButtonY, buttonRadius)) {
        this.toggleControlPanel();
        return;
      }

      const muteButtonX = canvas.width - 35;
      const muteButtonY = 20;
      if (this.isInsideCircle(clickX, clickY, muteButtonX, muteButtonY, buttonRadius)) {
        this.toggleMute();
        return;
      }

      const fullscreenButtonX = canvas.width - 70;
      const fullscreenButtonY = 20;
      if (this.isInsideCircle(clickX, clickY, fullscreenButtonX, fullscreenButtonY, buttonRadius)) {
        this.toggleFullscreen();
        return;
      }
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.canvas.requestFullscreen) {
        this.canvas.requestFullscreen();
      } else if (this.canvas.webkitRequestFullscreen) {
        this.canvas.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      AudioManager.muteAll();
    } else {
      AudioManager.unmuteAll();
    }
  }

  isInsideCircle(clickX, clickY, centerX, centerY, radius) {
    const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
    return distance <= radius;
  }

  toggleControlPanel() {
    let panel = document.getElementById("control-panel");
    if (!panel) {
      this.createControlPanel();
      panel = document.getElementById("control-panel");
    }
    if (panel) {
      const isHidden = panel.style.display === "none" || panel.style.display === "";
      panel.style.display = isHidden ? "block" : "none";
    }
  }

  createControlPanel() {
    const existingPanel = document.getElementById("control-panel");
    if (existingPanel) {
      return;
    }

    const panel = document.createElement("div");
    panel.id = "control-panel";
    panel.style.display = "none";
    panel.innerHTML = `
      <h2>Steuerung</h2>
      <ul>
          <li><b>Pfeiltasten:</b> Bewegung</li>
          <li><b>Leertaste:</b> Springen</li>
          <li><b>D:</b> Flaschen werfen</li>
      </ul>
      <button id="close-panel" style="margin-top: 20px; padding: 10px 20px;">Schließen</button>
  `;

    document.body.appendChild(panel);

    const closeButton = document.getElementById("close-panel");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        panel.style.display = "none";
      });
    }
  }

  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
    this.screenManager = new ScreenManager(canvas, this);
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
    this.drawMuteButton();
    this.drawFullscreenButton();
    this.drawControlPanelButton();
    requestAnimationFrame(() => this.draw());
  }

  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawMuteButton() {
    const buttonX = this.canvas.width - 35;
    const buttonY = 20;
    const buttonRadius = 15;

    this.ctx.beginPath();
    this.ctx.arc(buttonX, buttonY, buttonRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.isMuted ? "gray" : "green";
    this.ctx.fillStyle = this.isMuted ? "rgba(50, 50, 50, 1)" : "rgba(150, 110, 50, 8)";
    this.ctx.fill();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("🔊", buttonX, buttonY);
  }

  drawFullscreenButton() {
    const buttonX = this.canvas.width - 70;
    const buttonY = 20;
    const buttonRadius = 15;

    this.ctx.beginPath();
    this.ctx.arc(buttonX, buttonY, buttonRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(50, 50, 50, 1)";
    this.ctx.fill();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("⛶", buttonX, buttonY);
  }

  drawControlPanelButton() {
    const buttonX = this.canvas.width - 105;
    const buttonY = 20;
    const buttonRadius = 15;

    this.ctx.beginPath();
    this.ctx.arc(buttonX, buttonY, buttonRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(50, 50, 50, 1)";
    this.ctx.fill();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("?", buttonX, buttonY);
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
    this.level.enemies.forEach((enemy) => {
      enemy.animate();
    });
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
