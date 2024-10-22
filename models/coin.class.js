class Coin extends DrawableObject{

    y = 100 + Math.random() * 200;
    x = 300 + Math.random() * 2000;
    height = 100;
    width = 80;
  
    
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