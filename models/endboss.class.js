class Endboss extends MovableObject {
  height = 180;
  width = 90;
  energy = 100;
  animationSpeed = 8;
  groundLevel = 250;
  deadAnimationPlayed = false;
  remove = false;
  statusBar;
  isLiving = true;
  soundManager = new SoundManager();

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

   /**
   * Initializes the end boss, setting position, animations, and behaviors.
   */
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
    this.speed = 16;
    this.applyGravity();
    this.setOffset(40, 40, 60, 60);
  }

  /**
   * Updates the end boss's status bar based on its energy.
   */
  updateStatusBar() {
    if (this.statusBar) {
      this.statusBar.setPercentage(this.energy);
    }
  }

  /**
   * Manages all animations for the end boss, including walking, jumping, and dying.
   */
  animate() {
    this.jump();
    this.walk();
    this.startInterval(() => {
      if (this.isDead() && !this.deadAnimationPlayed) {
        // this.soundManager.stopSound("ENDBOSS_HURT_SOUND");
        this.soundManager.playSound("DEAD_ENDBOSS_SOUND");
        this.playDeadAnimation();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT, this.animationSpeed);
        this.soundManager.playSound("ENDBOSS_HURT_SOUND");
        this.soundManager.stopSound("ENDBOSS_ATTACK_SOUND");
      } else if (!this.isJumping) {
        this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
      } else if (this.isJumping) {
        this.handleJumpAnimation();
      }
    }, 1000 / 30);
  }

  /**
   * Handles walking behavior for the end boss.
   */
  walk() {
    this.startInterval(() => {
      this.moveLeft();
      this.checkLevelBegin();
      this.checkLevelEnd();
    }, 100);
  }

  /**
   * Manages the end boss's jump behavior.
   */
  jump() {
    this.startInterval(() => {
      if (!this.deadAnimationPlayed) {
        this.jumpHeight = 20;
        super.jump(this.jumpHeight);
      }
    }, 1500 + Math.random() * 500);
  }

  handleAnimation() {
    if (!this.isJumping) {
      this.playAnimation(this.IMAGES_WALKING, 8);
    } else if (this.isJumping) {
      this.handleJumpAnimation();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT, 8);
    }
  }

  handleJumpAnimation() {
    this.playAnimation(this.IMAGES_ATTACK, 6);
  }



  /**
   * Plays the death animation for the end boss and marks it as no longer living.
   */
  playDeadAnimation() {
    if (!this.deadAnimationPlayed) {
      this.deadAnimationPlayed = true;
      this.speed = 0;
      this.currentImage = 0;

      this.startInterval(() => {
        if (this.currentImage < this.IMAGES_DEAD.length) {
          this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
          this.currentImage++;
        } else {
          this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
          this.isLiving = false;
          clearInterval();
          this.clearAllIntervals();
        }
      }, 1000 / 60);
    }
  }
}
