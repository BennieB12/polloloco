class Chicken extends MovableObject {
  y = 320;
  x = 900 + Math.random() * 2000;
  height = 100;
  width = 80;
  energy = 8;
  animationSpeed = 1; 

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.25 + Math.random() * 0.45;
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 25);
    setInterval(() => { 
      this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
      this.handleAnimation();
    }, 200);
  }

  handleAnimation() {
    if (this.isDead()) {
      this.playDeadAnimation();
      return;
    }
  }

  playDeadAnimation() {
    if (!this.deadAnimationPlayed) {
      this.playAnimation(this.IMAGES_DEAD, this.animationSpeed);;
      this.deadAnimationPlayed = true;
    } else {
      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length]];
    }
  }
}
