class ThrowableObject extends MovableObject {
  throwDirection = 1;
  hasHit = false;

  ROTATE_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  GROUND_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, otherDirection, world) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.ROTATE_IMAGES);
    this.loadImages(this.GROUND_IMAGES);
    this.otherDirection = otherDirection;
    this.world = world;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw(50, 100);
    this.animateRotation();
}

  throw() {
    this.speedY = 30;
    this.applyGravity();

    this.setThrowDirection();

    let speedX = 20 * this.throwDirection;
    this.throwInterval = setInterval(() => {
      this.updatePosition(speedX);
    }, 30);
  }

  setThrowDirection() {
    this.throwDirection = this.otherDirection ? -1 : 1;
  }

  updatePosition(speedX) {
    this.x += speedX;

    if (this.hasHitGround() || this.hasHitTarget()) {
      this.hasHit = true;
      clearInterval(this.throwInterval);
      this.playSplashAnimation();
    }
  }

  hasHitGround() {
    return this.y >= 300;
  }

  hasHitTarget() {
    for (let i = 0; i < this.world.enemies.length; i++) {
      let enemy = this.world.enemies[i];
      if (this.isColliding(enemy)) {
        enemy.hit();
        return true;
      }
    }
    return false;
  }

  playSplashAnimation() {
    this.clearRotation();
    setInterval(() => {
      this.playAnimation(this.GROUND_IMAGES);
    }, 75);
  }

  animateRotation() {
    this.rotationInterval = setInterval(() => {
      if (!this.hasHit) {
        this.playAnimation(this.ROTATE_IMAGES);
      }
    }, 75);
  }

  clearRotation() {
    clearInterval(this.rotationInterval);
  }
}
