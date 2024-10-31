class Chicken extends MovableObject {
  y = 340;
  height = 80;
  width = 60;
  energy = 8;
  animationSpeed = 1;
  deadAnimationPlayed = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x, speed) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = speed;
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.handleAnimation();
      } else if (!this.deadAnimationPlayed) {
        this.playDeadAnimation();
      }
    }, 100);
  }

  handleAnimation() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
  }

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.deadAnimationPlayed = true;
    this.img = this.imageCache[this.IMAGES_DEAD[0]];
    this.remove();
  }

}
