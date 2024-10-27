class Endboss extends MovableObject {
  height = 300;
  width = 100;
  energy = 40;
  animationSpeed = 2;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",

  ];


  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];


  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2600;
    this.y = 140;
    this.speed = 9;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
      this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
    }, 1000 / 60);
  }

  checkLevelEnd() {
    if (this.x >= 2700) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }
}
