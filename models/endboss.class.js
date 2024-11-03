class Endboss extends MovableObject {
  height = 200;
  width = 100;
  energy = 100;
  animationSpeed = 1;
  groundLevel = 240;
  deadAnimationPlayed = false;
  remove = false;
  statusBar;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
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
    this.loadImages([
      ...this.IMAGES_WALKING,
      ...this.IMAGES_DEAD,
      ...this.IMAGES_ALERT,
      ...this.IMAGES_ATTACK,
      ...this.IMAGES_WALKING,
      ...this.IMAGES_HURT,
    ]);
    this.x = 2850;
    this.speed = 2;
    this.applyGravity();
    this.animate();
    this.statusBar = null;
  }

  updateStatusBar() {
    if (this.statusBar) {
      this.statusBar.setPercentage(this.energy);
    }
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

  walk() {
    setInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
    }, 1000 / 60);
  }

  jump() {
    setInterval(() => {
      if (!this.deadAnimationPlayed) {
        super.jump(this.jumpHeight);
      }
    }, 2000 + Math.random() * 100);
    return;
  }

  handleAnimation() {
    if (!this.isJumping) {
      this.playAnimation(this.IMAGES_WALKING, 3);
    } else if (this.isJumping) {
      this.handleJumpAnimation();
    }
  }

  handleJumpAnimation() {
    this.playAnimation(this.IMAGES_ATTACK, 3);
  }

  playDeadAnimation() {
    if (!this.deadAnimationPlayed) {
      this.deadAnimationPlayed = true;
      this.speed = 0;
      let animationIndex = 0;

      const animationInterval = setInterval(() => {
        if (animationIndex < this.IMAGES_DEAD.length) {
          this.img = this.imageCache[this.IMAGES_DEAD[animationIndex]];
          animationIndex++;
        } else {
          clearInterval(animationInterval);
          this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];

          setTimeout(() => {
            this.remove = true;
          }, 1000);
        }
      }, 1000 / 60); 
    }
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
