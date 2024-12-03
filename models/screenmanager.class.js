class ScreenManager {
  isPlayingSound = false;
  controlPanelVisible = false;
  startButtonVisible = false;
  restartButtonvisible = false;
  impressumPanelVisible = false;
  policyPanelVisible = false;
  GAMESTART_SOUND = new Audio("audio/start.mp3");

  /**
   * @param {HTMLCanvasElement} canvas - The canvas element where screens are drawn.
   * @param {World} world - The game world instance.
  */
  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.world = world;
    this.registerClickEvents();
  }

  /**
   * Displays a screen with the specified image.
   * @param {string} imageSrc - Path to the image to display.
  */
  displayScreen(imageSrc) {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      setTimeout(() => {
        this.animateButton(image);
      }, 200);

      this.canvas.addEventListener("click", (event) => {
        if (this.isStartButtonClicked(event)) {
          this.world.startGame();
        }
      });
    };
  }

  /**
   * Animates the button and screen display.
   * @param {HTMLImageElement} image - Image object to be displayed.
  */
  animateButton(image) {
    this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

    if (!this.world.gameStarted) {
      this.handleButtonsVisibility();
      requestAnimationFrame(() => this.animateButton(image));
    }

    this.drawUIButtons();
  }

  handleButtonsVisibility() {
    if (this.startButtonVisible) {
      this.drawStartButton();
      this.drawImpressumButton();
      this.drawPolicyButton();
    } else {
      this.drawRestartButton();
    }
  }

  /**
   * Shows the start screen.
  */
  showStartScreen() {
    this.startButtonVisible = true;
    this.restartButtonvisible = false;
    this.world.level.enemies.forEach((enemy) => {
      enemy.stopAnimations && enemy.stopAnimations();
    });
    this.displayScreen("img/9_intro_outro_screens/start/startscreen_1.png", () => {});
  }

  /**
   * Shows the win screen.
  */
  showWinScreen() {
    this.startButtonVisible = false;
    this.restartButtonvisible = true;
    this.world.ctx.globalAlpha = 0.95;
    this.displayScreen("img/9_intro_outro_screens/win/win_2.png");
    this.drawUIButtons();
    this.canvas.addEventListener("click", (event) => {
      if (isButtonClicked(event)) {
        this.world.reset();
      }
    });
    this.delayedAction();
  }

  /**
   * Shows the lose screen.
  */
  showLoseScreen() {
    this.world.ctx.globalAlpha = 0.95;
    this.startButtonVisible = false;
    this.restartButtonvisible = true;
    this.displayScreen("img/9_intro_outro_screens/game_over/file.png");
    this.drawUIButtons();
    this.canvas.addEventListener("click", (event) => {
      if (this.isButtonClicked(event)) {
        this.world.reset();
      }
    });
    this.delayedAction();
  }

  /**
   * Handles the delayed action (showing restart button).
  */
  delayedAction() {
    setTimeout(this.drawRestartButton, 200);
  }

  /**
   * Draws a circular button on the canvas.
   * @param {number} x - X position of the button.
   * @param {number} y - Y position of the button.
   * @param {string} icon - Icon to display on the button.
   * @param {string} color - Color of the button.
  */
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

  /**
   * Draws the start or restart button.
   * @param {string} text - Button text ("Start" or "Restart").
  */
  startRestartbtn(text) {
    const buttonWidth = 150;
    const buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2;
    const y = this.canvas.height - buttonHeight - 370;

    this.ctx.fillStyle = "rgba(50, 50, 50, 1)";
    this.ctx.roundRect(x, y, buttonWidth, buttonHeight, 15);
    this.ctx.fill();

    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 5;

    this.ctx.font = "bold 24px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(text, x + buttonWidth / 2, y + buttonHeight / 2);

    this.ctx.shadowColor = "transparent";
  }

  drawStartButton() {
    this.startRestartbtn("Start");
  }

  drawRestartButton() {
    this.startRestartbtn("Restart");
  }

  /**
   * Checks if a button is clicked based on the event.
   * @param {MouseEvent} event - The click event.
   * @returns {boolean} - True if button is clicked, false otherwise.
  */
  isButtonClicked(event) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;
    const buttonWidth = 150;
    const buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2;
    const y = this.canvas.height - buttonHeight - 370;

    return clickX >= x && clickX <= x + buttonWidth && clickY >= y && clickY <= y + buttonHeight;
  }

  isStartButtonClicked(event) {
    return this.isButtonClicked(event);
  }

  isRestartButtonClicked(event) {
    return this.isButtonClicked(event);
  }

  /**
   * Draws the UI buttons on the screen.
  */
  drawUIButtons() {
    this.drawMuteButton();

    if (this.impressumPanelVisible) {
      this.drawImpressumPanel();
    }
    if (this.policyPanelVisible) {
      this.drawPolicyPanel();
    }

    if (this.world.gameStarted) {
      this.drawPauseButton();
      this.drawHelpButton();
    }

    if (this.controlPanelVisible) {
      this.drawControlPanel();
    }
  }

  drawPauseButton() {
    this.drawButton(this.canvas.width - 105, 20, this.world.isPaused ? "▶" : "⏸", "rgba(50, 50, 50, 1)");
  }

  drawImpressumButton() {
    this.drawButton(this.canvas.width - 140, 20, "ℹ️", "rgba(50, 50, 50, 1)");
  }

  drawPolicyButton() {
    this.drawButton(this.canvas.width - 180, 20, "D", "rgba(50, 50, 50, 1)");
  }

  drawMuteButton() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width - 35, 20, 15, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.world.isMuted ? "rgba(50, 50, 50, 1)" : "rgba(150, 110, 50, 0.8)";
    this.ctx.fill();
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("🔊", this.canvas.width - 35, 20);
  }

  drawHelpButton() {
    this.drawButton(this.canvas.width - 70, 20, "?", "rgba(50, 50, 50, 1)");
  }


  /**
   * Draws a panel (e.g., impressum, policy) on the canvas.
   * @param {number} x - X position of the panel.
   * @param {number} y - Y position of the panel.
   * @param {number} width - Width of the panel.
   * @param {number} height - Height of the panel.
   * @param {string[]} content - Content to display inside the panel.
   * @param {string} label - Label of the panel.
  */
  drawPanel(x, y, width, height, content, label) {
    this.drawBackground(x, y, width, height);
    this.drawTextContent(x, y, content);
    this.drawCloseButton(x, y, width, height);
    this.drawLabel(x, y, width, label);
  }

  drawBackground(x, y, width, height) {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(x, y, width, height);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
  }

  drawTextContent(x, y, content) {
    if (content) {
      this.ctx.font = "18px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "left";
      let textY = y + 30;
      content.forEach((line, index) => {
        this.ctx.fillText(line, x + 20, textY + index * 30);
      });
    }
  }

  drawCloseButton(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.arc(x + width / 2, y + height / 2 + 60, 20, 0, 2 * Math.PI);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("X", x + width / 2, y + height / 2 + 60);
  }

  drawLabel(x, y, width, label) {
    if (label) {
      this.ctx.font = "22px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText(label, x + width / 2, y - 20);
    }
  }

  drawImpressumPanel() {
    this.drawPanel(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200, ["Imprint:", "Benjamin Kloss", "Sebastianusstraße 9", "41460 Neuss"], "Impressum");
  }

  drawPolicyPanel() {
    this.drawPanel(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200, ["Privacy Policy"], "Privacy Policy");
  }

  drawControlPanel() {
    this.drawPanel(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200, ["controls:", "⬅️ ➡️ Move", "⬆️ or SPACE Jump", "'D' for throw bottle"], "Controls");
  }

  isInsideCircle(clickX, clickY, centerX, centerY, radius) {
    return Math.sqrt((clickX - centerX) ** 2 + (clickY - centerY) ** 2) <= radius;
  }

  /**
   * Registers click events on the canvas to handle button interactions.
  */
  registerClickEvents() {
    this.canvas.addEventListener("click", (event) => {
      this.calculateClickPosition(event);
      this.buttonRadius = 15;
      this.defineButtons();
      this.handleButtonClicks();
    });
  }

  calculateClickPosition(event) {
    this.rect = this.canvas.getBoundingClientRect();
    this.scaleX = this.canvas.width / this.rect.width;
    this.scaleY = this.canvas.height / this.rect.height;

    this.clickX = (event.clientX - this.rect.left) * this.scaleX;
    this.clickY = (event.clientY - this.rect.top) * this.scaleY;
  }

  defineButtons() {
    this.buttons = {
      mute: { x: this.canvas.width - 35, y: 20 },
      help: { x: this.canvas.width - 70, y: 20 },
      pause: { x: this.canvas.width - 105, y: 20 },
      impressum: { x: this.canvas.width - 140, y: 20 },
      policy: { x: this.canvas.width - 180, y: 20 },
    };
  }

  /**
   * Handles button clicks for UI actions like mute, help, etc.
  */
  handleButtonClicks() {
    this.handleMenu();
    if (this.world.gameStarted) {
      this.handleGameMenu();
    }
  }

  handleMenu() {
    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.mute.x, this.buttons.mute.y, this.buttonRadius)) {
      this.world.toggleMute();
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.impressum.x, this.buttons.impressum.y, this.buttonRadius)) {
      this.toggleImpressumPanel();
    }
    if (this.impressumPanelVisible) {
      this.handleImpressumPanelClicked(this.clickX, this.clickY);
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.policy.x, this.buttons.policy.y, this.buttonRadius)) {
      this.togglePolicyPanel();
    }
    if (this.policyPanelVisible) {
      this.handlePolicyPanelClicked(this.clickX, this.clickY);
    }
  }

  handleGameMenu() {
    if (this.controlPanelVisible) {
      this.handleControlPanelClick(this.clickX, this.clickY);
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.pause.x, this.buttons.pause.y, this.buttonRadius)) {
      this.world.togglePause();
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.help.x, this.buttons.help.y, this.buttonRadius)) {
      this.toggleControlPanel();
    }
  }

  /**
   * Toggles the visibility of the impressum panel.
  */
  toggleImpressumPanel() {
    this.impressumPanelVisible = !this.impressumPanelVisible;
  }

  /**
   * Toggles the visibility of the privacy policy panel.
  */
  togglePolicyPanel() {
    this.policyPanelVisible = !this.policyPanelVisible;
  }

  toggleControlPanel() {
    this.controlPanelVisible = !this.controlPanelVisible;
  }

  handlePanelClick(clickX, clickY, buttonX, buttonY, buttonRadius, toggleFunction) {
    if (this.isInsideCircle(clickX, clickY, buttonX, buttonY, buttonRadius)) {
      toggleFunction.call(this);
    }
  }

  panelCoordinates() {
    let panelX = this.canvas.width / 2 - 150;
    let panelY = this.canvas.height / 2 - 100;
    let buttonX = panelX + 150;
    let buttonY = panelY + 160;
    let buttonRadius = 15;
    return { buttonX, buttonY, buttonRadius };
  }

  handlePanelClickByType(clickX, clickY, toggleFunction) {
    let { buttonX, buttonY, buttonRadius } = this.panelCoordinates();
    this.handlePanelClick(clickX, clickY, buttonX, buttonY, buttonRadius, toggleFunction);
  }

  handleImpressumPanelClicked(clickX, clickY) {
    this.handlePanelClickByType(clickX, clickY, this.toggleImpressumPanel);
  }

  handlePolicyPanelClicked(clickX, clickY) {
    this.handlePanelClickByType(clickX, clickY, this.togglePolicyPanel);
  }

  handleControlPanelClick(clickX, clickY) {
    this.handlePanelClickByType(clickX, clickY, this.toggleControlPanel);
  }
}
