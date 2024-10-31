class Minichicken extends MovableObject {
  y;
  height = 60;
  width = 30;
  energy = 4;
  animationSpeed = 1;
  groundLevel = 360;
  deadAnimationPlayed = false;
  remove = false;

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
    this.animate();
  }

  animate() {
    this.jump();
    this.walk();
    setInterval(() => {
      if (!this.isDead()) {
        this.handleAnimation();
      } else if (!this.deadAnimationPlayed) {
        this.playDeadAnimation();
      }
    }, 100);
  }

  handleAnimation() {
    this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
  }

  walk() {
    setInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
    }, 1000 / 60);
  }

  jump() {
    setInterval(() => {
      if (!this.remove) {
        super.jump(this.jumpHeight);
      }
    }, 1800 + Math.random() * 100);
    return;
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimationPlayed = true;
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
    setInterval(() => {
      this.remove = true;
    }, 1000);
  }
}
