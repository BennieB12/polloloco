class Minichicken extends MovableObject {
  y;
  height = 60;
  width = 30;
  energy = 8;
  animationSpeed = 7;
  groundLevel = 360;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  randomColor = `hue-rotate(${Math.random() * 360}deg)`;

  constructor(x, speed) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = x;
    this.speed = speed;
    this.applyGravity();
  }

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

  handleAnimation() {
    this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
  }

  walk() {
    this.startInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
    }, 100);
  }

  jump() {
    this.startInterval(() => {
      if (!this.deadAnimationPlayed) {
        this.jumpHeight = 12 + Math.random() * 3;
        super.jump(this.jumpHeight);
      }
    }, 1000 + Math.random() * 500);
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimationPlayed = true;
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
    this.speed = 0;
    this.startInterval(() => {
      this.remove = true;
    }, 300);
  }

  reset() {
    this.clearAllIntervals();
    this.energy = 8;
  }
}
