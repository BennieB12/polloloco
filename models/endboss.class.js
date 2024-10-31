class Endboss extends MovableObject {
  height = 300;
  width = 100;
  energy = 40;
  animationSpeed = 0.7;
  groundLevel = 140;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
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
    this.x = 2850;
    this.speed = 4;
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
      this.playAnimation(this.IMAGES_WALKING, 3);
    }, 1000 / 60);
    this.playAnimation(this.IMAGES_ATTACK, 3);
    setInterval(() => {
      this.jump(this.jumpHeight);
      if(this.jump()){

      }
    }, 3000);
  }

  checkLevelBegin() {
    if (this.x <= 1800) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }

  checkLevelEnd() {
    if (this.x >= 2850) {
      this.speed = -this.speed;
      this.otherDirection = !this.otherDirection;
      this.moveLeft();
    }
  }
}
