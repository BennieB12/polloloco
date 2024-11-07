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
  offset = {
    left: 1,
    right: 1,
    top: 1,
    bottom: 1,
  };

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
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Minichicken ||
      this instanceof Coin ||
      this instanceof Bottle
    ) {

      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";
  
      let hitboxWidth = this.width * 0.5;
      let hitboxHeight = this.height * 1.0;
  
      let hitboxX = this.x + (this.width - hitboxWidth) / 2 + this.offset.left / 2;
      let hitboxY = this.y + (this.height - hitboxHeight) / 2 + this.offset.top / 2;
  
      ctx.rect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
      ctx.stroke();
  

      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
  
      let smallerBoundingBoxWidth = this.width / 2;
      let smallerBoundingBoxHeight = this.height / 2;
      

      let smallerBoundingBoxX = this.x + (this.width - smallerBoundingBoxWidth) / 2;
      let smallerBoundingBoxY = this.y + (this.height - smallerBoundingBoxHeight) / 2 + 10;
  
      ctx.rect(smallerBoundingBoxX, smallerBoundingBoxY, smallerBoundingBoxWidth, smallerBoundingBoxHeight);
      ctx.stroke();
    }
  }
}
