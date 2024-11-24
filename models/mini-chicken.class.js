/**
 * Represents a small chicken enemy in the game.
 * Inherits from `MovableObject`.
 */
class Minichicken extends MovableObject {
  /**
   * Height of the `Minichicken` sprite.
   * @type {number}
   */
  height = 60;

  /**
   * Width of the `Minichicken` sprite.
   * @type {number}
   */
  width = 30;

  /**
   * Initial energy of the `Minichicken`.
   * @type {number}
   */
  energy = 10;

  /**
   * Animation speed for the walking cycle.
   * @type {number}
   */
  animationSpeed = 7;

  /**
   * Ground level for the `Minichicken`.
   * @type {number}
   */
   groundLevel = 365;

  /**
   * Walking animation images.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Image for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Randomized hue adjustment for unique `Minichicken` appearances.
   * @type {string}
   */
  randomColor = `hue-rotate(${Math.random() * 360}deg)`;

  /**
   * Indicates if the dead animation has already been played.
   * @type {boolean}
   */
  deadAnimationPlayed = false;

  /**
   * Flag to mark the `Minichicken` for removal from the game.
   * @type {boolean}
   */
  remove = false;

  /**
   * Creates an instance of `Minichicken`.
   * @param {number} x - The initial horizontal position.
   * @param {number} speed - The speed at which the `Minichicken` moves.
   */
  constructor(x, speed) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.speed = speed;
    this.applyGravity();
    // this.setOffset(0, 0, -10, 0);
  }

  /**
   * Starts the `Minichicken` animation by handling jumping, walking, and playing the respective animations.
   */
  animate() {
    this.clearAllIntervals();
    this.jump();
    this.walk();

    this.startInterval(() => {
      if (!this.isDead()) {
        this.handleAnimation();
      } else if (!this.deadAnimationPlayed) {
        this.playDeadAnimation();
      }
    }, 1000 / 60);
  }

  /**
   * Handles the walking animation of the `Minichicken`.
   */
  handleAnimation() {
    this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
  }

  /**
   * Handles the walking movement of the `Minichicken`.
   */
  walk() {
    this.startInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
    }, 100);
  }

  blinkRed() {
    let blinkTime = 300;
    this.isBlinking = true;
    
    setTimeout(() => {
      this.isBlinking = false;
    }, blinkTime);
  }

  draw(ctx) {
    ctx.save();
    this.ColorFilter(ctx);
    if (this.isBlinking) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  
      const radius = Math.min(this.width, this.height) / 3;
      const centerX = this.x + this.width / 2;
      const centerY = this.y + this.height / 2;
  
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
  
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  /**
   * Handles the jumping logic for the `Minichicken`.
   */
  jump() {
    this.startInterval(() => {
      if (!this.deadAnimationPlayed) {
        this.jumpHeight = 12 + Math.random() * 3;
        super.jump(this.jumpHeight);
      }
    }, 1000 + Math.random() * 500);
  }

  /**
   * Plays the dead animation for the `Minichicken` and marks it for removal.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimationPlayed = true;
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
    this.speed = 0;
    this.startInterval(() => {
      this.remove = true;
    }, 300);
  }

  /**
   * Resets the `Minichicken` to its initial state.
   */
  reset() {
    // this.clearAllIntervals();
    this.energy = 10;
    this.remove = false;
  }

  onGround() {
    this.isJumping = false;
    this.y = this.groundLevel;
    this.speedY = 0;
  }
}

