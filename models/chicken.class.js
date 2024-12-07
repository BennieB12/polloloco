/**
 * Represents a normal chicken enemy in the game.
 * Inherits from `MovableObject`.
 */
class Chicken extends MovableObject {
  /**
   * Vertical position of the `Chicken`.
   * @type {number}
   */
  y = 350;

  /**
   * Height of the `Chicken` sprite.
   * @type {number}
   */
  height = 80;

  /**
   * Width of the `Chicken` sprite.
   * @type {number}
   */
  width = 60;
  soundManager = new SoundManager();
  /**
   * Initial energy of the `Chicken`.
   * @type {number}
   */
  energy = 10;

  /**
   * Animation speed for the walking cycle.
   * @type {number}
   */
  animationSpeed = 7;
  otherDirection = false;
  /**
   * Walking animation images.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * Image for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Indicates if the dead animation has already been played.
   * @type {boolean}
   */
  deadAnimationPlayed = false;

  /**
   * Flag to mark the `Chicken` for removal from the game.
   * @type {boolean}
   */
  remove = false;

  /**
   * Creates an instance of `Chicken`.
   * @param {number} x - The initial horizontal position.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.speed = 10 + Math.random() * 2;
    this.setOffset(25, 25, 20, 20);
  }

  /**
   * Starts the `Chicken` animation by handling walking and playing the respective animations.
   */
  animate() {
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
   * Handles the walking movement of the `Chicken`.
   */
  walk() {
    this.startInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
    }, 100);
  }

  /**
   * Handles the walking animation of the `Chicken`.
   */
  handleAnimation() {
    this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
  }

  blinkRed() {
    let blinkTime = 300;
    this.isBlinking = true;
    
    setTimeout(() => {
      this.isBlinking = false;
    }, blinkTime);
  }

  /**
   * Draws a red circle behind the chicken from the center of the object.
   * @param {CanvasRenderingContext2D} ctx - The Chicken context.
   */

  draw(ctx) {
    ctx.save();
  
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
   * Plays the dead animation for the `Chicken` and marks it for removal.
   */
  playDeadAnimation() {
    this.soundManager.playSound("DEAD_CHICKEN_SOUND");
    setTimeout(() => {
      this.soundManager.stopSound("MC_DEAD_SOUND");
    }, 200);
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimationPlayed = true;
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
    this.speed = 0;
    this.startInterval(() => {
      this.remove = true;
      this.clearAllIntervals();
      // this.soundManager.stopSound("DEAD_CHICKEN_SOUND");
    }, 300);
  }

/**
 * Resets the `Chicken` to its initial state.
 */
reset() {
  this.clearAllIntervals();
  this.energy = 20; 
  this.remove = false;
  this.x = 1000 + Math.random() * 200;
  this.y = 350;
  this.speed = 8 + Math.random() * 2;
  this.otherDirection = false;
  this.deadAnimationPlayed = false;
  this.isBlinking = false;
  this.animate();
 
}

}
