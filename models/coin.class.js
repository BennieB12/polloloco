class Coin extends DrawableObject{

    y = 100 + Math.random() * 200;
    x = 300 + Math.random() * 2000;
    height = 100;
    width = 80;
  
    IMAGES_WALKING = [
      "img/8_coin/coin_1.png",
      "img/8_coin/coin_2.png",

    ];
  
    constructor(angle) {
      super().loadImage("img/8_coin/coin_1.png");
      this.loadImages(this.IMAGES_WALKING);
      this.speed = 0.25 + Math.random() * 0.45;
      this.rotationAngle = angle;
      this.animateRotation();
    }
  
    rotateCoin() {
      this.rotationAngle += 5;
    }

    
    animateRotation() {
      setInterval(() => {
        this.rotateCoin();
      }, 1000 / 60);
    }
  }