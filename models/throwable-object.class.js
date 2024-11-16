
/**
 * Represents a throwable object, such as a bottle, that can be thrown with specified speed and direction.
 * It handles its own movement, rotation animation, and splash effect when hitting the ground.
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /**
   * @property {number} throwDirection - The direction of the throw (1 for forward, -1 for backward).
   * @property {number} animationSpeed - Speed at which the animation frames change.
   * @property {boolean} remove - Flag to indicate if the object should be removed after splash.
   * @property {number} y - The y-coordinate of the throwable object.
   * @property {number} groundLevel - The level of the ground at which the object stops falling.
   * @property {number} rotationInterval - Interval reference for the rotation animation.
   * @property {Array<string>} ROTATE_IMAGES - Array of image paths for the rotation animation.
   * @property {Array<string>} SPLASH_IMAGES - Array of image paths for the splash animation.
   * @property {Object} world - The game world in which the object exists.
   * @property {number} x - The x-coordinate of the throwable object.
   * @property {number} width - The width of the throwable object.
   * @property {number} height - The height of the throwable object.
   * @property {boolean} splashAnimation - Flag to indicate if the splash animation is playing.
   * @property {number} speedX - Horizontal speed of the throwable object.
   * @property {number} speedY - Vertical speed of the throwable object.
   * @property {boolean} otherDirection - Indicates if the object should be thrown in the opposite direction.
   */
  throwDirection = 1;
  animationSpeed = 3;
  remove = false;
  y;
  groundLevel = 375;
  rotationInterval = null;

  ROTATE_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  SPLASH_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of the ThrowableObject class.
   * Loads images for rotation and splash animations, applies gravity, and sets up initial throw parameters.
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   * @param {boolean} otherDirection - Indicates if the object should be thrown in the opposite direction.
   * @param {Object} world - The game world where the object exists.
   */
  constructor(x, y, otherDirection, world) {
    super();
    this.loadImage(this.ROTATE_IMAGES[1]);
    this.loadImages(this.ROTATE_IMAGES);
    this.loadImages(this.SPLASH_IMAGES);
    this.applyGravity();
    this.throw(15, 10);
    this.otherDirection = otherDirection;
    this.world = world;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;
    this.setOffset(25, 25, 0, 0);
  }

  /**
   * Throws the object with a specified speed in both X and Y directions.
   * Initiates the rotation animation and continuously updates the object's position.
   * @param {number} speedX - The horizontal speed of the throwable object.
   * @param {number} speedY - The vertical speed of the throwable object.
   */
  throw(speedX, speedY) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.animateRotation();
    setInterval(() => {
      this.setThrowDirection();
      this.updatePosition(speedX);
      this.checkGround();
    }, 30);
  }

  /**
   * Checks if the throwable object has hit the ground.
   * If so, stops the object, plays the splash animation, and clears the rotation animation.
   */
  checkGround() {
    if (this.y >= this.groundLevel) {
      this.y = this.groundLevel;
      this.speedY = 0;
      this.speedX = 0;

      if (!this.splashAnimation) {
        this.splashAnimation = true;
        this.playSplashAnimation();

        if (this.rotationInterval) {
          clearInterval(this.rotationInterval);
          this.rotationInterval = null;
        }
      }
    }
  }

  /**
   * Initiates the rotation animation of the throwable object.
   * Continuously plays the rotation animation frames until the splash animation starts.
   */
  animateRotation() {
    if (!this.rotationInterval) {
      this.rotationInterval = setInterval(() => {
        if (!this.splashAnimation) {
          this.playAnimation(this.ROTATE_IMAGES, 1);
        }
      }, 1000 / 60);
    }
  }

  /**
   * Plays the splash animation after the object hits the ground.
   * Continuously plays the splash animation frames until it completes, then removes the object.
   */
  playSplashAnimation() {
    this.currentImage = 0;
    const splashInterval = setInterval(() => {
      if (this.currentImage < this.SPLASH_IMAGES.length * this.animationSpeed) {
        this.playAnimation(this.SPLASH_IMAGES, this.animationSpeed);
      } else {
        clearInterval(splashInterval);
        this.remove = true;
      }
    }, 10);
  }

  /**
   * Sets the throw direction based on whether the object should be thrown in the opposite direction.
   */
  setThrowDirection() {
    this.throwDirection = this.otherDirection ? -1 : 1;
  }

  /**
   * Updates the position of the throwable object based on its horizontal speed and throw direction.
   * @param {number} speedX - The horizontal speed of the throwable object.
   */
  updatePosition(speedX) {
    if (!this.splashAnimation) {
      speedX = speedX * this.throwDirection;
      this.x += speedX;
    }
  }
}