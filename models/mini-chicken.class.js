class Minichicken extends MovableObject {
  y;
  height = 60;
  width = 30;
  energy = 4;
  animationSpeed = 1;
  groundLevel = 360;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  randomColor = `hue-rotate(${Math.random() * 360}deg)`;

  constructor(x, speed) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.speed = speed;
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
    }, 1000 / 60);

    setInterval(() => {
      this.jump(this.jumpHeight);
    }, 800 + Math.random());

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
      this.handleAnimation();
    }, 100);
  }

  handleAnimation() {
    if (this.isDead()) {
      this.playDeadAnimation();
      return;
    }
  }

  playDeadAnimation() {
    if (!this.deadAnimationPlayed) {
      this.playAnimation(this.IMAGES_DEAD, this.animationSpeed);
      this.deadAnimationPlayed = true;
    } else {
      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length]];
    }
  }
}
