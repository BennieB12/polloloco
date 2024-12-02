class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 3;
  currentImage = 0;
  accelaration = 1;
  isJumping = false;
  animationSpeed = 5;
  groundLevel = 320;
  jumpHeight = 12 + Math.random() * 10;
  intervals = [];
  remove = false;
  deadAnimationPlayed = false;
  standingTimer = 0;
  splashAnimation = false;

  startInterval(intervalFunc, intervalTime) {
    // console.log(`starting intervals for: ${this.constructor.name}`);
    const intervalId = setInterval(intervalFunc, intervalTime);
    this.intervals.push(intervalId);
    return intervalId;
  }

  clearAllIntervals() {
    // console.log(`Clearing intervals for: ${this.constructor.name}`);
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }

  applyGravity() {
    if (this.aboveGround() || this.speedY > 0) {
      this.setAcceleration();
      this.isJumping = true;
    } else {
      this.onGround();
    }
    requestAnimationFrame(this.applyGravity.bind(this));
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
    this.speedY = 0;
    this.y = this.groundLevel;
  }


  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }


  getDamage() {
    if (this.isHurt()) {
      return;
    }
  
    if (this instanceof Endboss || this instanceof Character) {
      this.reduceEnergy(20);
      this.isHurt()
      this.updateLastHit();
    } else if (this instanceof Chicken || this instanceof Minichicken) {
      this.reduceEnergy(10);
      // this.isJumping = true;
    }
  
    if (this instanceof Character) {
      this.world.statusBarHealth.setpercentage(this.energy);
    } else if (this instanceof Endboss) {
      this.statusBar.setpercentage(this.energy);
    } else if (this instanceof Chicken || this instanceof Minichicken) {
      this.blinkRed();
    }
  }
  
  

  reduceEnergy(amount) {
    this.energy = Math.max(0, this.energy - amount);
  }

  isHurt() {
    const timePassed = (new Date().getTime() - this.lastHit) / 1000;
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

  jump(speedY = 20) {
    this.speedY = speedY;
    this.isJumping = true;
    this.standingTimer = 0;
  }

  playAnimation(images, speed) {
    if (this.currentImage % speed === 0) {
      let i = Math.floor(this.currentImage / speed) % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
    }
    this.currentImage++;
  }

  checkLevelBegin() {
    if (this instanceof Endboss) {
      if (this.x <= 2350) {
        this.speed = -this.speed;
        this.otherDirection = !this.otherDirection;
        this.moveLeft();
      }
    } else if (this.x <= 0) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }

  checkLevelEnd() {
    if (this.x >= 2900) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }
}
