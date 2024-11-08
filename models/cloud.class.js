class Cloud extends MovableObject {
  height = 250;
  width = 500;
  speed = 0.1;
  interval;

  constructor(imagePath, x, y) {
      super().loadImage(imagePath);
      this.x = x + Math.random() * 100;
      this.y = y + Math.random() * 50;
  }

  startMoving() {
      this.interval = setInterval(() => {
          this.moveLeft();
      }, 1000 / 60);
  }

  stopMoving() {
      clearInterval(this.interval);
  }
}
