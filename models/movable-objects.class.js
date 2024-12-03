/**
 * Represents an object in the game world that can move, jump, and interact with gravity.
 * Extends the `DrawableObject` class.
 */
class MovableObject extends DrawableObject {
  /** @type {boolean} Indicates if the object is facing the other direction. */
  otherDirection = false;

  /** @type {number} The vertical speed of the object. */
  speedY = 3;

  /** @type {number} Index of the current animation image. */
  currentImage = 0;

  /** @type {number} Acceleration rate for vertical movement. */
  accelaration = 1;

  /** @type {boolean} Indicates if the object is currently jumping. */
  isJumping = false;

  /** @type {number} Speed of the animation cycle. */
  animationSpeed = 5;

  /** @type {number} The ground level position for the object. */
  groundLevel = 320;

  /** @type {number} The maximum height the object can jump. */
  jumpHeight = 12 + Math.random() * 10;

  /** @type {number[]} Array of active interval IDs. */
  intervals = [];

  /** @type {boolean} Whether the object should be removed from the game. */
  remove = false;

  /** @type {boolean} Whether the death animation has already been played. */
  deadAnimationPlayed = false;

  /** @type {number} Timer for standing or idle state. */
  standingTimer = 0;

  /** @type {boolean} Indicates if the splash animation is active. */
  splashAnimation = false;

  /**
   * Starts a new interval and stores its ID.
   * @param {Function} intervalFunc - The function to execute at each interval.
   * @param {number} intervalTime - The time (ms) between interval executions.
   * @returns {number} The ID of the created interval.
   */
  startInterval(intervalFunc, intervalTime) {
    const intervalId = setInterval(intervalFunc, intervalTime);
    this.intervals.push(intervalId);
    return intervalId;
  }

  /**
   * Clears all active intervals for the object.
   */
  clearAllIntervals() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }

  /**
   * Applies gravity to the object, updating its vertical position and speed.
   */
  applyGravity() {
    if (this.aboveGround() || this.speedY > 0) {
      this.setAcceleration();
      this.isJumping = true;
    } else {
      this.onGround();
    }
    requestAnimationFrame(this.applyGravity.bind(this));
  }

  /**
   * Updates the object's position based on acceleration.
   */
  setAcceleration() {
    this.y -= this.speedY;
    this.speedY -= this.accelaration;
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} `true` if the object is above the ground, `false` otherwise.
   */
  aboveGround() {
    return this instanceof ThrowableObject || this.y < this.groundLevel;
  }

  /**
   * Resets the object's position to the ground level.
   */
  onGround() {
    this.isJumping = false;
    this.speedY = 0;
    this.y = this.groundLevel;
  }

  /**
   * Determines if this object is colliding with another.
   * @param {MovableObject} mo - The other object to check collision with.
   * @returns {boolean} `true` if colliding, `false` otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Applies damage to the object and updates its state.
   */
  getDamage() {
    if (this.isHurt()) return;

    if (this instanceof Endboss || this instanceof Character) {
      this.reduceEnergy(20);
      this.updateLastHit();
    } else if (this instanceof Chicken || this instanceof Minichicken) {
      this.reduceEnergy(10);
    }

    if (this instanceof Character) {
      this.world.statusBarHealth.setpercentage(this.energy);
    } else if (this instanceof Endboss) {
      this.statusBar.setpercentage(this.energy);
    } else if (this instanceof Chicken || this instanceof Minichicken) {
      this.blinkRed();
    }
  }

  /**
   * Reduces the object's energy by a specified amount.
   * @param {number} amount - The amount of energy to reduce.
   */
  reduceEnergy(amount) {
    this.energy = Math.max(0, this.energy - amount);
  }

  /**
   * Checks if the object is currently hurt.
   * @returns {boolean} `true` if the object is hurt, `false` otherwise.
   */
  isHurt() {
    const timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 0.4;
  }

  /**
   * Updates the timestamp of the last hit taken by the object.
   */
  updateLastHit() {
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} `true` if the object is dead, `false` otherwise.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump with a specified vertical speed.
   * @param {number} [speedY=20] - The speed of the jump.
   */
  jump(speedY = 20) {
    this.speedY = speedY;
    this.isJumping = true;
    this.standingTimer = 0;
  }

  /**
   * Plays an animation from a set of images at a specified speed.
   * @param {string[]} images - The array of image paths.
   * @param {number} speed - The speed of the animation.
   */
  playAnimation(images, speed) {
    if (this.currentImage % speed === 0) {
      let i = Math.floor(this.currentImage / speed) % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
    }
    this.currentImage++;
  }

  /**
   * Checks if the object has reached the beginning of the level.
   */
  checkLevelBegin() {
    if (this.x <= (this instanceof Endboss ? 2350 : 0)) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }

  /**
   * Checks if the object has reached the end of the level.
   */
  checkLevelEnd() {
    if (this.x >= 2900) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }
}
