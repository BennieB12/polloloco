class ThrowableObject extends MovableObject {
  throwDirection = 1;
  splashAnimation = false;
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
  }

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

  animateRotation() {
    if (!this.rotationInterval) {
      this.rotationInterval = setInterval(() => {
        if (!this.splashAnimation) {
          this.playAnimation(this.ROTATE_IMAGES, 1);
        }
      }, 1000 / 60);
    }
  }

  playSplashAnimation() {
    this.currentImage = 0;
    const splashInterval = setInterval(() => {
      if (this.currentImage < this.SPLASH_IMAGES.length * this.animationSpeed) {
        this.playAnimation(this.SPLASH_IMAGES, this.animationSpeed);
      } else {
        clearInterval(splashInterval);
        this.remove = true;
      }
    }, 1000 / 60);
  }

  setThrowDirection() {
    this.throwDirection = this.otherDirection ? -1 : 1;
  }

  updatePosition(speedX) {
    if (!this.splashAnimation) {
      speedX = speedX * this.throwDirection;
      this.x += speedX;
    }
  }
}
