class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  speedY = 0;
  accelaration = 5;
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
        this.setAcceleration();
      } else if (this instanceof Minichicken) {
        this.y = 360;
      } else {
        this.isJumping = false;
        this.y = 320;
      }
    }, 1000 / 25);
  }

  setAcceleration() {
    this.y -= this.speedY;
    this.speedY -= this.accelaration;
    return;
  }

  aboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 300;
    }
  }

  isColliding(mo) {
    let offsetX = 40;
    let offsetY = 40;

    if (mo instanceof Chicken || mo instanceof Minichicken) {
      offsetX = 15;
      offsetY = 5;
    }

    return this.checkCollision(mo, offsetX, offsetY);
  }

  checkCollision(mo, offsetX, offsetY) {
    const collidingHorizontally = this.x + this.width - offsetX > mo.x && this.x + offsetX < mo.x + mo.width;

    const collidingVertically = this.y + this.height - offsetY > mo.y && this.y + offsetY < mo.y + mo.height;

    return collidingHorizontally && collidingVertically;
  }

  getDamage() {
    this.reduceEnergy(5);
    this.updateLastHit();
    this.world.statusBarHealth.setpercentage(this.energy);
  }

  reduceEnergy(amount) {
    this.energy -= amount;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  updateLastHit() {
    this.lastHit = new Date().getTime();
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

  jump(speedY = 35) {
    this.speedY = speedY;
    this.isJumping = true;
    if (this.isJumping) {
      this.standingTimer = 0;
    }
  }

  checkLevelBegin() {
    if (this.x <= 0) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
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
