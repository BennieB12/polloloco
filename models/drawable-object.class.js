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
    if (this instanceof Coin) {
      let scaleFactor = Math.cos((this.rotationAngle * Math.PI) / 180);
      ctx.scale(scaleFactor, 1);
    }
    if (this instanceof Minichicken) {
      ctx.filter = this.randomColor;
    }
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Coin ||
      this instanceof ThrowableObject ||
      this instanceof Bottle ||
      this instanceof Minichicken
    ) {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "blue";
        
        let hitboxX = this.x + this.width * 0.1;
        let hitboxY = this.y + this.height * 0.1;
        let hitboxWidth = this.width * 0.75;
        let hitboxHeight = this.height * 0.9;


        if (this instanceof Coin || this instanceof Bottle) {
          hitboxX = this.x + this.width * 0.2;  
          hitboxY = this.y + this.height * 0.2; 
          hitboxWidth = this.width * 0.6;
          hitboxHeight = this.height * 0.5;
        }

        ctx.rect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
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
