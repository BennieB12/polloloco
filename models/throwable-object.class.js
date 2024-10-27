class ThrowableObject extends MovableObject {
  throwDirection = 1;
  splashPlayed = false;
  currentImage = 0;

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
    this.otherDirection = otherDirection;
    this.world = world;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw(15, 20);
  }

  throw(speedY, speedX) {
    this.speedY = speedY;
    this.speedX = speedX;
    this.applyGravity();
    this.setThrowDirection();
    speedX = speedX * this.throwDirection;
    
    this.throwInterval = setInterval(() => { 
      this.updatePosition(speedX);
      if (this.aboveGround()) {
        this.animateRotation();
      } else if (!this.splashPlayed && this.onGround()) { 
        clearInterval(this.throwInterval);
        this.playSplashAnimation();
        this.splashPlayed = true;
      }
    }, 25);
  }

  animateRotation() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.ROTATE_IMAGES, this.animationSpeed);
    }, 1000 / 60);
  }

  playSplashAnimation() {
    clearInterval(this.rotationInterval);
    this.splashInterval = setInterval(() => {
      this.playAnimation(this.SPLASH_IMAGES, this.animationSpeed);
    }, 1000 / 60);
  }

  setThrowDirection() {
    this.throwDirection = this.otherDirection ? -1 : 1;
  }

  updatePosition(speedX) {
    this.x += speedX;
  }

}
