class ThrowableObject extends MovableObject {
  throwDirection = 1;
  splashAnimation = false;
  animationSpeed = 1;
  y;

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
    this.loadImage(this.ROTATE_IMAGES[0]);
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
      this.splashAnimation = true;
      this.playSplashAnimation();
      this.speedY = 0;
      this.y = this.groundLevel + 40; 
    } else {
      this.splashAnimation = false;
      this.animateRotation();
    }
  }

  animateRotation() {
    setInterval(() => {
      this.playAnimation(this.ROTATE_IMAGES, 1);
    }, 1000 / 80);
  }

  playSplashAnimation() {
    setInterval(() => {
      this.playAnimation(this.SPLASH_IMAGES, 1);
    }, 1000 / 80);
  }

  setThrowDirection() {
    this.throwDirection = this.otherDirection ? -1 : 1;
  }

  updatePosition(speedX) {
    speedX = speedX * this.throwDirection;
    this.x += speedX;
  }
}
