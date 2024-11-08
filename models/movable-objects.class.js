class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  speedY = 3;
  currentImage = 0;
  accelaration = 1;
  energy;
  isJumping = false;
  animationSpeed = 5;
  groundLevel = 320;
  jumpHeight = 12 + Math.random() * 10;
  intervals = [];
  remove = false;
  deadAnimationPlayed = false;
  standingTimer = 0;
  damage;
  splashAnimation = false;

  startInterval(intervalFunc, intervalTime) {
    const intervalId = setInterval(intervalFunc, intervalTime);
    this.intervals.push(intervalId);
    return intervalId;
  }

  clearAllIntervals() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }

  applyGravity() {
    if (this.aboveGround() || this.speedY > 0) {
      this.setAcceleration();
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
    this.y = this.groundLevel;
    this.speedY = 0;
  }

  isColliding(mo) {
    if (this instanceof ThrowableObject) {
        if (this.splashAnimation) return false;
        
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    } else {
        return (
            Math.sqrt(
                Math.pow(this.x + this.width / 2 - (mo.x + mo.width / 2), 2) +
                Math.pow(this.y + this.height / 2 - (mo.y + mo.height / 2), 2)
            ) <
            (this.width / 2 + mo.width / 2) * 0.5 &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y < mo.y
        );
    }
}




  getDamage() {
    if (this instanceof Character && !this.isHurt()) {
      this.reduceEnergy(20);
      this.updateLastHit();
      this.world.statusBarHealth.setpercentage(this.energy);
    } else if (this instanceof Chicken || this instanceof Minichicken) {
      this.reduceEnergy(10);
    } else if (this instanceof Endboss && !this.isHurt()) {
      this.reduceEnergy(20);
      this.updateLastHit();
      this.isHurt();
      this.statusBar.setpercentage(this.energy);
    }
  }

  reduceEnergy(amount) {
    this.energy -= amount;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.8;
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
    if (this.isJumping) {
      this.standingTimer = 0;
    }
  }

  checkLevelBegin() {
    if (this.x > 0) return;
    this.speed = -this.speed;
    this.otherDirection = !this.otherDirection;
    this.moveLeft();
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
    if (this.x <= 1800) {
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
  if (this.x >= 2850) {
    this.speed = -this.speed;
    this.otherDirection = !this.otherDirection;
    this.moveLeft();
  } 
}

}
