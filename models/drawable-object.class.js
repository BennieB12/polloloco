class DrawableObject {
  img;
  imageCache = {};
  x = 120;
  y = 288;
  height = 150;
  width = 50;
  collectedCoins = 0;
  bottles = 0;
  rotationAngle = 0;
  visible = false;

  LOSE_IMAGES =[
    'img/9_intro_outro_screens/game_over/game over.png',
    'img/9_intro_outro_screens/game_over/you lost.png'
  ];

  constructor() {
    this.offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }


  adjustCollectibleOffsets() {
    if (this instanceof Coin || this instanceof Bottle) {
      this.setOffset(10, 10, 10, 10);
    }
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.CoinFlip(ctx);
    this.ColorFilter(ctx);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  CoinFlip(ctx) {
    if (this instanceof Coin) {
      let scaleFactor = Math.cos((this.rotationAngle * Math.PI) / 180);
      ctx.scale(scaleFactor, 1);
    }
  }

  ColorFilter(ctx) {
    if (this instanceof Minichicken) {
      ctx.filter = this.randomColor;
    }
  }

  setOffset(left, right, top, bottom) {
    this.offset = {
      left: left || this.offset.left,
      right: right || this.offset.right,
      top: top || this.offset.top,
      bottom: bottom || this.offset.bottom,
    };
  }

  drawFrame(ctx) {
    this.hitboxWidth = this.width * 0.5;
    this.hitboxHeight = this.height * 0.6;
  
    this.hitboxX = this.x + (this.width - this.hitboxWidth) / 2 + this.offset.left / 2;
    this.hitboxY = this.y + (this.height - this.hitboxHeight) / 2 + this.offset.top / 2;
  }

}
