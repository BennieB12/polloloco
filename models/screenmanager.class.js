class ScreenManager {
  isPlayingSound = false;
  controlPanelVisible = false;
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

  // playStartSound() {
  //   if (this.GAMESTART_SOUND.paused) {
  //     this.GAMESTART_SOUND.loop = true;
  //     this.GAMESTART_SOUND.play();
  //   }
  // }

  stopStartSound() {
    if (!this.GAMESTART_SOUND.paused) {
      this.GAMESTART_SOUND.pause();
      this.GAMESTART_SOUND.currentTime = 0;
      this.GAMESTART_SOUND.loop = false;
    }
  }

  displayScreen(imageSrc, text, callback, delay = 0) {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const textY = this.canvas.height / 2 - 150;
      let colorValue = 255;
      let decreasing = true;

      const animateText = () => {
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

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
        this.ctx.fillText(text, this.canvas.width / 2, textY);

        if (!this.world.gameStarted) {
          requestAnimationFrame(animateText);
        }
      };

      setTimeout(() => {
        animateText();
      }, delay);

      this.canvas.addEventListener("click", callback, { once: true });
    };
  }

  showStartScreen() {
    if (this.world.gameStarted) return;
    this.playStartSound();
    // this.drawMuteButton();
    this.displayScreen("img/9_intro_outro_screens/start/startscreen_1.png", "TAP to Start", () => {
      this.stopStartSound();
      this.world.startGame();
    });
  }

  showWinScreen() {
    this.displayScreen(
      "img/9_intro_outro_screens/win/win_2.png",
      "TAP to Restart",
      this.world.restartGame.bind(this.world),
      1000
    );
  }

  showLoseScreen() {
    this.displayScreen(
      "img/9_intro_outro_screens/game_over/file.png",
      "TAP to Restart",
      this.world.restartGame.bind(this.world),
      1000
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
    this.drawButton(this.canvas.width - 105, 20, "?", "rgba(50, 50, 50, 1)");
    if (this.controlPanelVisible) {
      this.drawControlPanel();
    }
    this.drawPauseButton();
  }


  drawButton(x, y, icon, color) {
    const radius = 15;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.font = `${radius}px Arial`;
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(icon, x, y);
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

  registerClickEvents() {
    this.canvas.addEventListener("click", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
  
      const clickX = (event.clientX - rect.left) * scaleX;
      const clickY = (event.clientY - rect.top) * scaleY;
  
      const buttonRadius = 15;
      const muteButton = { x: this.canvas.width - 35, y: 20 };
      const fullscreenButton = { x: this.canvas.width - 70, y: 20 };
      const helpButton = { x: this.canvas.width - 105, y: 20 };
      const pauseButton = { x: this.canvas.width - 140, y: 20 };
  
      if (this.controlPanelVisible) {
        this.handleControlPanelClick(clickX, clickY);
      }
  
      if (this.isInsideCircle(clickX, clickY, pauseButton.x, pauseButton.y, buttonRadius)) {
        this.world.togglePause();
      }
  
      if (this.isInsideCircle(clickX, clickY, helpButton.x, helpButton.y, buttonRadius)) {
        this.toggleControlPanel();
      } else if (this.isInsideCircle(clickX, clickY, muteButton.x, muteButton.y, buttonRadius)) {
        this.toggleMute();
      } else if (this.isInsideCircle(clickX, clickY, fullscreenButton.x, fullscreenButton.y, buttonRadius)) {
        this.toggleFullscreen();
      }
    });
  }
  

  isInsideCircle(clickX, clickY, centerX, centerY, radius) {
    const distance = Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2);
    return distance <= radius;
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

  drawControlPanel() {
    const panelX = this.canvas.width / 2 - 150;
    const panelY = this.canvas.height / 2 - 100;
    const panelWidth = 300;
    const panelHeight = 200;

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Steuerung:", panelX + 20, panelY + 30);
    this.ctx.fillText("⬅️ ➡️ Bewegung", panelX + 20, panelY + 60);
    this.ctx.fillText("⏎ Springen", panelX + 20, panelY + 90);
    this.ctx.fillText("D Flaschen werfen", panelX + 20, panelY + 120);

    const buttonX = panelX + panelWidth / 2;
    const buttonY = panelY + panelHeight - 40;
    const buttonRadius = 20;

    this.ctx.beginPath();
    this.ctx.arc(buttonX, buttonY, buttonRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("X", buttonX, buttonY);
  }

  drawPauseButton() {
    const symbol = this.world.isPaused ? "▶" : "⏸";
    const color = "rgba(50, 50, 50, 1)";
    this.drawButton(this.canvas.width - 140, 20, symbol, color);
  }
}
