class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  speedY = 2;
  currentImage = 0;
  accelaration = 5;
  energy;
  bottles = 1;
  isJumping = false;
  animationSpeed = 5;
  standingTimer = 0;
  groundLevel = 320;
  jumpHeight = 20 + Math.random() * 10;

  applyGravity() {
    setInterval(() => {
      if (this.aboveGround() || this.speedY > 0) {
        this.setAcceleration();
      } else {
        this.onGround();
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
      return this.y < this.groundLevel;
    }
  }

  onGround() {
    this.isJumping = false;
    this.y = this.groundLevel;
    this.speedY = 0;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  getDamage() {
    if (this instanceof Character && !this.isHurt()) {
      this.reduceEnergy(5);
      this.updateLastHit();
      this.world.statusBarHealth.setpercentage(this.energy);
    } else if (this instanceof Chicken || this instanceof Minichicken) {
      this.reduceEnergy(10);
    } else if (this instanceof Endboss) {
      this.reduceEnergy(6);
    }
  }

  reduceEnergy(amount) {
    this.energy -= amount;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.4;
  }

  updateLastHit() {
    this.lastHit = new Date().getTime();
  }

  isDead() {
    return this.energy <= 0;
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

  playAnimation(images, speed) {
    if (this.currentImage % speed === 0) {
      let i = (this.currentImage / speed) % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
    }
    this.currentImage++;
  }
}
