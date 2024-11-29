class ScreenManager {
  isPlayingSound = false;
  controlPanelVisible = false;
  startButtonVisible = true;
  GAMESTART_SOUND = new Audio("audio/start.mp3");

  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.world = world;

    this.registerClickEvents();

    this.GAMESTART_SOUND = GAMESTART_SOUND;
    AudioManager.registerAudio(this.GAMESTART_SOUND);
  }

  playStartSound() {
    if (!this.world.isMuted && this.GAMESTART_SOUND.paused) {
      this.GAMESTART_SOUND.loop = true;
      this.GAMESTART_SOUND.play();
    }
  }

  stopStartSound() {
    if (!this.GAMESTART_SOUND.paused) {
      this.GAMESTART_SOUND.pause();
      this.GAMESTART_SOUND.currentTime = 0;
      this.GAMESTART_SOUND.loop = false;
    }
  }

  displayScreen(imageSrc) {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const animateButton = () => {
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.drawUIButtons();

        if (!this.world.gameStarted) {
          requestAnimationFrame(animateButton);
        }
      };

      setTimeout(() => {
        animateButton();
      }, 200);

      this.canvas.addEventListener("click", (event) => {
        if (this.isStartButtonClicked(event)) {
          this.stopStartSound();
          this.world.startGame();
        }
      });
    };
  }
  showStartScreen() {
    if (this.world.gameStarted) return;
    this.playStartSound();
    //  this.drawMuteButton();
    this.displayScreen("img/9_intro_outro_screens/start/startscreen_1.png", () => {
      this.stopStartSound();
    });
  }
  showWinScreen() {
    this.displayScreen(
      "img/9_intro_outro_screens/win/win_2.png"
    );

    this.canvas.addEventListener("click", (event) => {
      if (this.isRestartButtonClicked(event)) {
        this.world.restartGame();
      }
    });
    setTimeout(() => {
      this.drawRestartButton();
    }, 200);
  }

  showLoseScreen() {
    this.displayScreen(
      "img/9_intro_outro_screens/game_over/file.png"
    );

    this.canvas.addEventListener("click", (event) => {
      if (this.isRestartButtonClicked(event)) {
        this.world.restartGame();
      }
    });
    setTimeout(() => {
      this.drawRestartButton();
    }, 200);
  }
  
  drawStartButton() {
    const buttonWidth = 150;
    const buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2;
    const y = this.canvas.height - buttonHeight - 350;
    this.ctx.fillStyle = "rgb(255, 87, 34)";
    this.ctx.roundRect(x, y, buttonWidth, buttonHeight, 15);
    this.ctx.fill();
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 5;
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Start", x + buttonWidth / 2, y + buttonHeight / 2);
    this.ctx.shadowColor = "transparent";
  }
  
  isStartButtonClicked(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    
    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;
    const buttonWidth = 150;
    const buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2;
    const y = this.canvas.height - buttonHeight - 350;

    return (
      clickX >= x &&
      clickX <= x + buttonWidth &&
      clickY >= y &&
      clickY <= y + buttonHeight
    );
  }


  drawRestartButton() {
    const buttonWidth = 150;
    const buttonHeight = 60; 
    const x = (this.canvas.width - buttonWidth) / 2;
    const y = this.canvas.height - buttonHeight - 50; 
  
    const colorValue = Math.floor(Math.abs(Math.sin(Date.now() / 500)) * 255);
    this.ctx.fillStyle = `rgb(255, ${colorValue}, 0)`;
    this.ctx.roundRect(x, y, buttonWidth, buttonHeight, 15);
    this.ctx.fill();
  
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 5;
  
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Restart", x + buttonWidth / 2, y + buttonHeight / 2);
  
    this.ctx.shadowColor = "transparent";
  }

  isRestartButtonClicked(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;
    const buttonWidth = 150;
    const buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2;
    const y = this.canvas.height - buttonHeight - 50;

    return (
      clickX >= x &&
      clickX <= x + buttonWidth &&
      clickY >= y &&
      clickY <= y + buttonHeight
    );
  }



  drawUIButtons() {
    this.drawButton(
      this.canvas.width - 35,
      20,
      "🔊",
      this.world.isMuted ? "rgba(50, 50, 50, 1)" : "rgba(250, 150, 50, 1)"
    );
    this.drawButton(this.canvas.width - 70, 20, "⛶", "rgba(50, 50, 50, 1)");
    
    if (this.world.gameStarted) {
      this.drawPauseButton();
      this.drawButton(this.canvas.width - 105, 20, "?", "rgba(50, 50, 50, 1)");

    }
    if (!this.world.gameStarted) {
      this.drawStartButton();
    }

    if (this.controlPanelVisible) {
      this.drawControlPanel();
    }
  }

  drawButton(x, y, icon, color) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(icon, x, y);
  }

  
  drawControlPanel() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200);

    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "left";
    this.ctx.fillText("controls:", this.canvas.width / 2 - 130, this.canvas.height / 2 - 70);
    this.ctx.fillText("⬅️ ➡️ Move", this.canvas.width / 2 - 130, this.canvas.height / 2 - 40);
    this.ctx.fillText("⬆️ or SPACE Jump", this.canvas.width / 2 - 130, this.canvas.height / 2 - 10);
    this.ctx.fillText("'D' for throw bottle ", this.canvas.width / 2 - 130, this.canvas.height / 2 + 20);
    

    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2 + 60, 20, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("X", this.canvas.width / 2, this.canvas.height / 2 + 60);
  }

  drawPauseButton() {
    this.drawButton(this.canvas.width - 140, 20, this.world.isPaused ? "▶" : "⏸", "rgba(50, 50, 50, 1)");
  }

  drawMuteButton() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width - 35, 20, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.isMuted ? "rgba(50, 50, 50, 1)" : "rgba(150, 110, 50, 0.8)";
    this.ctx.fill();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("🔊", this.canvas.width - 35, 20);
  }

  drawFullscreenButton() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width - 70, 20, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(50, 50, 50, 1)";
    this.ctx.fill();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("⛶", this.canvas.width - 70, 20);
  }

  registerClickEvents() {
    this.canvas.addEventListener("click", (event) => {
      this.rect = this.canvas.getBoundingClientRect();
      this.scaleX = this.canvas.width / this.rect.width;
      this.scaleY = this.canvas.height / this.rect.height;

      this.clickX = (event.clientX - this.rect.left) * this.scaleX;
      this.clickY = (event.clientY - this.rect.top) * this.scaleY;

      this.buttonRadius = 15;
      this.muteButton = { x: this.canvas.width - 35, y: 20 };
      this.fullscreenButton = { x: this.canvas.width - 70, y: 20 };
      this.helpButton = { x: this.canvas.width - 105, y: 20 };
      this.pauseButton = { x: this.canvas.width - 140, y: 20 };

      if (this.controlPanelVisible) {
        this.handleControlPanelClick(this.clickX, this.clickY);
      }

      if (this.isInsideCircle(this.clickX, this.clickY, this.pauseButton.x, this.pauseButton.y, this.buttonRadius)) {
        this.world.togglePause();
      }

      if (this.isInsideCircle(this.clickX, this.clickY, this.helpButton.x, this.helpButton.y, this.buttonRadius)) {
        this.toggleControlPanel();
      } else if (
        this.isInsideCircle(this.clickX, this.clickY, this.muteButton.x, this.muteButton.y, this.buttonRadius)
      ) {
        this.toggleMute();
      } else if (
        this.isInsideCircle(
          this.clickX,
          this.clickY,
          this.fullscreenButton.x,
          this.fullscreenButton.y,
          this.buttonRadius
        )
      ) {
        this.toggleFullscreen();
      }
    });
  }

  isInsideCircle(clickX, clickY, centerX, centerY, radius) {
    return Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2) <= radius;
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
    this.world.isMuted = !this.world.isMuted;
    if (this.world.isMuted) {
      this.world.AudioManager.muteAll();
    } else {
      this.world.AudioManager.unmuteAll();
    }
  }

  handleControlPanelClick(clickX, clickY) {
    const panelX = this.canvas.width / 2 - 150;
    const panelY = this.canvas.height / 2 - 100;
    const buttonX = panelX + 150;
    const buttonY = panelY + 160;
    const buttonRadius = 20;

    if (this.isInsideCircle(clickX, clickY, buttonX, buttonY, buttonRadius)) {
      this.toggleControlPanel();
    }
  }

  toggleControlPanel() {
    this.controlPanelVisible = !this.controlPanelVisible;
    this.drawUIButtons();
  }

}
