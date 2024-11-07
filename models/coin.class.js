class Coin extends DrawableObject {
  y = 200 + Math.random() * 20;
  x = 300 + Math.random() * 2000;
  height = 80;
  width = 60;

  constructor(angle) {
    super().loadImage("img/8_coin/coin_1.png");
    this.rotationAngle = angle;
    this.animateRotation();
  }

  rotateCoin() {
    this.rotationAngle += 5;
    if (this.rotationAngle >= 360) {
      this.rotationAngle = 0;
    }
  }

  animateRotation() {
    setInterval(() => {
      this.rotateCoin();
    }, 1000 / 60);
  }

}
