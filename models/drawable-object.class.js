class DrawableObject {
  img;
  imageCache = {};
  x = 120;
  y = 288;
  height = 150;
  width = 50;
  currentImage = 0;
  rotationAngle = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotationAngle * Math.PI / 180);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }


  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
