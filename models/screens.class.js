class ScreenManager {

isPlayingSound = false;
GAMESTART_SOUND = new Audio("audio/start.mp3");

  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.world = world;
  }

  playStartSound() {
    if (this.GAMESTART_SOUND.paused) {
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
    this.displayScreen(
      "img/9_intro_outro_screens/start/startscreen_1.png",
      "TAP to Start",
      () => {
        this.stopStartSound();
        this.world.startGame();
      }
    );
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
}
