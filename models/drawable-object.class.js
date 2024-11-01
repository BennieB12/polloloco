class DrawableObject {
  img;
  imageCache = {};
  x = 120;
  y = 288;
  height = 150;
  width = 50;
  rotationAngle = 0;
  offset = {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5
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
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ThrowableObject ||
      this instanceof Minichicken ||
      this instanceof Endboss ||
      this instanceof Coin 
    ) {

      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "blue";

      let hitboxX = this.x + this.offset.left;
      let hitboxY = this.y + this.offset.top;
      let hitboxWidth = this.width - (this.offset.left + this.offset.right);
      let hitboxHeight = this.height - (this.offset.top + this.offset.bottom);

      ctx.rect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
}

}
