class Cloud extends MovableObject {
  y;
  height = 250;
  width = 500;

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x + Math.random() * 200;
    this.y = y + Math.random() * 50;
    this.moveLeft();
  }
}
