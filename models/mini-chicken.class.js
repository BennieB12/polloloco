class Minichicken extends MovableObject {
    y = 360;
    x = 700 + Math.random() * 1000;
    height = 60;
    width = 30;
    energy = 4;
    animationSpeed = 1;

    // Original walking images
    IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
      "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    // Add a random color property
    randomColor = `hue-rotate(${Math.random() * 360}deg)`; // Random hue for color variation

    constructor(x) {
      super().loadImage(this.IMAGES_WALKING[0]);
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
        this.playAnimation(this.IMAGES_DEAD, this.animationSpeed);
        this.deadAnimationPlayed = true;
      } else {
        this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length]];
      }
    }
}
