class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  speedY = 0;
  accelaration = 4;
  energy;
  lastHit = 0;
  bottles = 1;
  isJumping = false;
  animationSpeed = 5;
  standingTimer = 0;
  deadAnimationPlayed = false;

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      } else {
        this.isJumping = false;
        this.y = 320;
      }
    }, 1000 / 25);
  }

  aboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 300;
    }
  }

  isColliding(mo) {
    let offsetX = 30;
    let offsetY = 40;

    if (mo instanceof Chicken || mo instanceof Minichicken) {
        offsetX = 10;
        offsetY = 0;
    }

    return (
        this.x + this.width - offsetX > mo.x &&
        this.y + this.height - offsetY > mo.y &&
        this.x + offsetX < mo.x + mo.width &&
        this.y + offsetY < mo.y + mo.height
    );
  }


  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.4;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 35;
    this.isJumping = true;
    if (this.isJumping === true) {
      this.standingTimer = 0;
    }
  }

  throwBottle() {
    if (this.bottles > 0) {
      this.bottles--;
      let bottle = new ThrowableObject(this.x, this.y, this.otherDirection);
      this.world.throwableObjects.push(bottle);
      this.world.statusBarBottle.setpercentage(this.bottles);
    }
  }

  playAnimation(images, speed) {
    if (this.currentImage % speed === 0) {
      let i = (this.currentImage / speed) % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
    }
    this.currentImage++;
  }
}
