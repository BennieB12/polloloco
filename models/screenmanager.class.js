class ScreenManager {
  controlPanelVisible = false;
  startButtonVisible = false;
  restartButtonvisible = false;
  impressumPanelVisible = false;
  policyPanelVisible = false;
  soundManager = new SoundManager();

  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.world = world;
    this.registerClickEvents();
  }

  /**
   * Displays the start screen of the game.
   * Sets up the start screen and handles interactions.
   */
  showStartScreen() {
    this.handleStartScreen();

    const image = new Image();
    image.src = "img/9_intro_outro_screens/start/startscreen_1.png";

    image.onload = () => {
      const animateStartScreen = () => {
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.startRestartbtn("Start");
        this.drawUIButtons();

        if (!this.world.gameStarted) {
          requestAnimationFrame(animateStartScreen);
        }
      };

      setTimeout(animateStartScreen, 100);
      this.canvas.addEventListener("click", (event) => {
        if (this.isStartButtonClicked(event)) {
          this.world.startGame();
          this.soundManager.stopSound("GAMESTART_SOUND");
        }
      });
    };
  }
  /**
   * Displays the win screen of the game.
   * Sets up the win screen and handles interactions.
   */
  showWinScreen() {
    this.handleEndScreen();

    const image = new Image();
    image.src = "img/9_intro_outro_screens/win/win_1.png";

    image.onload = () => {
      const animateWinScreen = () => {
        this.ctx.drawImage(image, 180, 150, this.canvas.width / 2, this.canvas.height / 3);

        this.startRestartbtn("Restart");
        this.drawUIButtons();

        if (!this.world.gameStarted) {
          requestAnimationFrame(animateWinScreen);
        }
      };
      this.soundManager.stopAllSounds();
      setTimeout(animateWinScreen, 1200);
      this.soundManager.playSound("GAME_WIN_SOUND");
        this.canvas.addEventListener("click", (event) => {
          if (this.isRestartButtonClicked(event)) {
            this.world.reset();
            this.soundManager.stopSound("GAME_WIN_SOUND");
            

          }
        });
      };
    }
  
  /**
   * Displays the lose screen of the game.
   * Sets up the lose screen and handles interactions.
   */
  showLoseScreen() {
    this.handleEndScreen();

    const image = new Image();
    image.src = "img/9_intro_outro_screens/game_over/file.png";

    image.onload = () => {
      const animateLoseScreen = () => {
        this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
        this.startRestartbtn("Restart");
        this.drawUIButtons();

        if (!this.world.gameStarted) {
          requestAnimationFrame(animateLoseScreen);
        }
      };

      setTimeout(animateLoseScreen, 1200);
      this.soundManager.stopAllSounds();

      this.soundManager.playSound("GAME_OVER_SOUND");

      this.canvas.addEventListener("click", (event) => {
        if (this.isRestartButtonClicked(event)) {
          this.world.reset();
          this.soundManager.stopSound("GAME_OVER_SOUND");

        }
      });
    };
  }


  /**
   * Handles the setup for the start screen, making the start button visible and the restart button hidden.
   */
  handleStartScreen() {
    this.startButtonVisible = true;
    this.restartButtonVisible = false;
    // this.closeAllPanels();
  }

  /**
   * Handles the setup for the end screens (win or lose).
   * Makes the restart button visible and adjusts the screen opacity.
   */
  handleEndScreen() {
    this.startButtonVisible = false;
    this.restartButtonVisible = true;
    this.closeAllPanels();
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
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(icon, x, y);
  }

  drawPauseButton() {
    this.drawButton(this.canvas.width - 70, 20, this.world.isPaused ? "▶" : "⏸", "rgba(50, 50, 50, 1)");
  }
  drawImpressumButton() {
    this.drawButton(this.canvas.width - 665, 20, "ℹ️", "rgba(50, 50, 50, 1)");
  }
  drawPolicyButton() {
    this.drawButton(this.canvas.width - 700, 20, "D", "rgba(50, 50, 50, 1)");
  }
  drawHelpButton() {
    this.drawButton(this.canvas.width - 35, 20, "?", "rgba(50, 50, 50, 1)");
  }

  startRestartbtn(text) {
    const buttonWidth = 150,
      buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2,
      y = this.canvas.height - buttonHeight - 370;
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

  isButtonClicked(event) {
    const { left, top } = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / this.rect.width,
      scaleY = this.canvas.height / this.rect.height;
    const clickX = (event.clientX - left) * scaleX,
      clickY = (event.clientY - top) * scaleY;
    const buttonWidth = 150,
      buttonHeight = 60;
    const x = (this.canvas.width - buttonWidth) / 2,
      y = this.canvas.height - buttonHeight - 370;
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
    if (this.world.gameStarted) {
      this.drawPauseButton();
      this.drawHelpButton();
    }
    if (this.startButtonVisible && !this.world.gameStarted) {
      this.drawImpressumButton();
      this.drawPolicyButton();
    }
    if (this.impressumPanelVisible) this.drawImpressumPanel();
    if (this.policyPanelVisible) this.drawPolicyPanel();
    if (this.controlPanelVisible) this.drawControlPanel();
  }

  /**
   * Checks if a given point (clickX, clickY) is inside a circle defined by its center (centerX, centerY) and radius.
   *
   * @param {number} clickX - The X-coordinate of the click event.
   * @param {number} clickY - The Y-coordinate of the click event.
   * @param {number} centerX - The X-coordinate of the center of the circle.
   * @param {number} centerY - The Y-coordinate of the center of the circle.
   * @param {number} radius - The radius of the circle.
   * @returns {boolean} True if the click is inside the circle, otherwise false.
   */
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

  /**
   * Draws a background rectangle with a semi-transparent black color and a white border.
   *
   * @param {number} x - The X-coordinate of the top-left corner of the rectangle.
   * @param {number} y - The Y-coordinate of the top-left corner of the rectangle.
   * @param {number} width - The width of the rectangle.
   * @param {number} height - The height of the rectangle.
   */
  drawBackground(x, y, width, height) {
    this.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
  }

  /**
   * Draws multi-line text content on the canvas at the specified position.
   * Each line of the content is drawn with a vertical spacing of 30px.
   *
   * @param {number} x - The X-coordinate of the text's starting position.
   * @param {number} y - The Y-coordinate of the text's starting position.
   * @param {Array<string>} content - An array of strings representing the lines of text to be drawn.
   */
  drawTextContent(x, y, content) {
    if (content) {
      this.ctx.font = "18px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "left";
      let textY = y + 30;
      content.forEach((line, index) => this.ctx.fillText(line, x + 20, textY + index * 30));
    }
  }

  /**
   * Draws a close button as a red circle with a white "X" in the center.
   * The button is positioned relative to the given X and Y coordinates.
   *
   * @param {number} x - The X-coordinate of the top-left corner of the button's area.
   * @param {number} y - The Y-coordinate of the top-left corner of the button's area.
   * @param {number} width - The width of the button area.
   * @param {number} height - The height of the button area.
   */
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

  /**
   * Draws a label centered above the specified position.
   *
   * @param {number} x - The X-coordinate where the label should be centered.
   * @param {number} y - The Y-coordinate where the label should be positioned.
   * @param {number} width - The width of the area where the label should be drawn.
   * @param {string} label - The label text to be drawn.
   */
  drawLabel(x, y, width, label) {
    if (label) {
      this.ctx.font = "22px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.fillText(label, x + width / 2, y - 20);
    }
  }

  /**
   * Draws the Impressum panel with predefined content.
   * The panel includes the title "Imprint" and the contact information for Benjamin Kloss.
   */
  drawImpressumPanel() {
    this.drawPanel(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200, ["Imprint:", "Benjamin Kloss", "Sebastianusstraße 9", "41460 Neuss"], "Imprint");
  }

  /**
   * Draws the Privacy Policy panel with predefined content.
   * The panel includes the title "Privacy Policy".
   */
  drawPolicyPanel() {
    this.drawPanel(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200, ["Privacy Policy"], "Privacy Policy");
  }

  /**
   * Draws the Control panel with predefined content for game controls.
   * The panel includes the title "Controls" and instructions for moving and jumping.
   */
  drawControlPanel() {
    this.drawPanel(this.canvas.width / 2 - 150, this.canvas.height / 2 - 100, 300, 200, ["controls:", "⬅️ ➡️ Move", "⬆️ or SPACE Jump", "'D' for throw bottle"], "Controls");
  }

  /**
   * Calculates the click position on the canvas based on the mouse event.
   * Converts the click coordinates to account for the canvas size and scale.
   *
   * @param {MouseEvent} event - The mouse click event.
   */
  calculateClickPosition(event) {
    this.rect = this.canvas.getBoundingClientRect();
    this.scaleX = this.canvas.width / this.rect.width;
    this.scaleY = this.canvas.height / this.rect.height;

    this.clickX = (event.clientX - this.rect.left) * this.scaleX;
    this.clickY = (event.clientY - this.rect.top) * this.scaleY;
  }

  /**
   * Defines the button positions on the canvas.
   * Positions are defined relative to the canvas width and height.
   */
  defineButtons() {
    this.buttons = {
      help: { x: this.canvas.width - 35, y: 20 },
      pause: { x: this.canvas.width - 70, y: 20 },
      impressum: { x: this.canvas.width - 665, y: 20 },
      policy: { x: this.canvas.width - 700, y: 20 },
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

  /**
   * Handles menu interactions based on the current click position.
   * Toggles the visibility of the Impressum and Policy panels and delegates click handling
   * for each panel if they are visible.
   */
  handleMenu() {
    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.impressum.x, this.buttons.impressum.y, this.buttonRadius)) {
      this.toggleImpressumPanel();
      this.soundManager.playSound("START_SOUND");
    }
    if (this.impressumPanelVisible) {
      this.handleImpressumPanelClicked(this.clickX, this.clickY);
      this.soundManager.playSound("START_SOUND");
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.policy.x, this.buttons.policy.y, this.buttonRadius)) {
      this.togglePolicyPanel();
      this.soundManager.playSound("START_SOUND");
    }
    if (this.policyPanelVisible) {
      this.handlePolicyPanelClicked(this.clickX, this.clickY);
      this.soundManager.playSound("START_SOUND");
    }
  }

  /**
   * Handles interactions with the in-game menu.
   * Delegates control panel click handling, toggles pause state, and toggles the help/control panel visibility.
   */
  handleGameMenu() {
    if (this.controlPanelVisible) {
      this.handleControlPanelClick(this.clickX, this.clickY);
      this.soundManager.playSound("START_SOUND");
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.pause.x, this.buttons.pause.y, this.buttonRadius)) {
      this.world.togglePause();
      this.soundManager.playSound("START_SOUND");
    }

    if (this.isInsideCircle(this.clickX, this.clickY, this.buttons.help.x, this.buttons.help.y, this.buttonRadius)) {
      this.toggleControlPanel();
      this.soundManager.playSound("START_SOUND");
    }
  }

  /**
   * Closes all panels by setting their visibility to false.
   */
  closeAllPanels() {
    this.impressumPanelVisible = false;
    this.policyPanelVisible = false;
    this.controlPanelVisible = false;
  }

  /**
   * Toggles the visibility of the Impressum panel.
   * If the panel is currently visible, it will be hidden.
   * If the panel is not visible, it will be shown and the Policy panel will be hidden.
   */
  toggleImpressumPanel() {
    if (this.impressumPanelVisible) {
      this.impressumPanelVisible = false;
    } else {
      this.impressumPanelVisible = true;
      this.policyPanelVisible = false;
    }
  }

  /**
   * Toggles the visibility of the Policy panel.
   * If the panel is currently visible, it will be hidden.
   * If the panel is not visible, it will be shown and the Impressum panel will be hidden.
   */
  togglePolicyPanel() {
    if (this.policyPanelVisible) {
      this.policyPanelVisible = false;
    } else {
      this.policyPanelVisible = true;
      this.impressumPanelVisible = false;
    }
  }

  /**
   * Toggles the visibility of the control panel and either clears or starts intervals for enemies.
   * If the control panel is shown, it clears all intervals for enemies.
   * If the control panel is hidden, it starts intervals for enemies.
   */
  toggleControlPanel() {
    this.controlPanelVisible = !this.controlPanelVisible;
    this.world.togglePause();
  }

  /**
   * Handles a click event on a panel button by checking if the click is inside a circular area.
   * If the click is inside the circle, the specified toggle function is executed.
   *
   * @param {number} clickX - The X-coordinate of the click event.
   * @param {number} clickY - The Y-coordinate of the click event.
   * @param {number} buttonX - The X-coordinate of the button's center.
   * @param {number} buttonY - The Y-coordinate of the button's center.
   * @param {number} buttonRadius - The radius of the button's clickable area.
   * @param {Function} toggleFunction - The function to call if the click is inside the button's circle.
   */
  handlePanelClick(clickX, clickY, buttonX, buttonY, buttonRadius, toggleFunction) {
    if (this.isInsideCircle(clickX, clickY, buttonX, buttonY, buttonRadius)) {
      toggleFunction.call(this);
    }
  }

  /**
   * Calculates the coordinates for the panel and the button within it.
   *
   * @returns {Object} An object containing the button's X and Y coordinates and its radius.
   */
  panelCoordinates() {
    this.panelX = this.canvas.width / 2 - 150;
    this.panelY = this.canvas.height / 2 - 100;
    this.buttonX = this.panelX + 150;
    this.buttonY = this.panelY + 160;
    this.buttonRadius = 15;

    return { buttonX: this.buttonX, buttonY: this.buttonY, buttonRadius: this.buttonRadius };
  }

  /**
   * Handles a click event by using pre-calculated panel coordinates and the specified toggle function.
   *
   * @param {number} clickX - The X-coordinate of the click event.
   * @param {number} clickY - The Y-coordinate of the click event.
   * @param {Function} toggleFunction - The function to call if the click is inside the panel's button area.
   */
  handlePanelClickByType(clickX, clickY, toggleFunction) {
    let { buttonX, buttonY, buttonRadius } = this.panelCoordinates();
    this.handlePanelClick(clickX, clickY, buttonX, buttonY, buttonRadius, toggleFunction);
  }

  /**
   * Handles a click on the Impressum panel by checking the button's click area and toggling the panel.
   *
   * @param {number} clickX - The X-coordinate of the click event.
   * @param {number} clickY - The Y-coordinate of the click event.
   */
  handleImpressumPanelClicked(clickX, clickY) {
    this.handlePanelClickByType(clickX, clickY, this.toggleImpressumPanel);
  }

  /**
   * Handles a click on the Policy panel by checking the button's click area and toggling the panel.
   *
   * @param {number} clickX - The X-coordinate of the click event.
   * @param {number} clickY - The Y-coordinate of the click event.
   */
  handlePolicyPanelClicked(clickX, clickY) {
    this.handlePanelClickByType(clickX, clickY, this.togglePolicyPanel);
  }

  /**
   * Handles a click on the Control panel by checking the button's click area and toggling the panel.
   *
   * @param {number} clickX - The X-coordinate of the click event.
   * @param {number} clickY - The Y-coordinate of the click event.
   */
  handleControlPanelClick(clickX, clickY) {
    this.handlePanelClickByType(clickX, clickY, this.toggleControlPanel);
  }
}
