class Character extends MovableObject {

  y = 300;
  height = 100;
  width = 60;
  speed = 6;
  energy = 100;
  deadAnimationPlayed = false;
  isPlayingSound = false; 


  IMAGES_WALKING = [
      "img/2_character_pepe/2_walk/W-21.png",
      "img/2_character_pepe/2_walk/W-22.png",
      "img/2_character_pepe/2_walk/W-23.png",
      "img/2_character_pepe/2_walk/W-24.png",
      "img/2_character_pepe/2_walk/W-25.png",
      "img/2_character_pepe/2_walk/W-26.png",
  ];
  
  IMAGES_JUMPING = [
      "img/2_character_pepe/3_jump/J-31.png",
      "img/2_character_pepe/3_jump/J-32.png",
      "img/2_character_pepe/3_jump/J-33.png",
      "img/2_character_pepe/3_jump/J-34.png",
      "img/2_character_pepe/3_jump/J-35.png",
      "img/2_character_pepe/3_jump/J-36.png",
      "img/2_character_pepe/3_jump/J-37.png",
      "img/2_character_pepe/3_jump/J-38.png",
      "img/2_character_pepe/3_jump/J-39.png",
  ];
  
  IMAGES_DEAD = [
      "img/2_character_pepe/5_dead/D-51.png",
      "img/2_character_pepe/5_dead/D-52.png",
      "img/2_character_pepe/5_dead/D-53.png",
      "img/2_character_pepe/5_dead/D-54.png",
      "img/2_character_pepe/5_dead/D-55.png",
      "img/2_character_pepe/5_dead/D-56.png",
      "img/2_character_pepe/5_dead/D-57.png",
  ];
  
  IMAGES_HURT = [
      "img/2_character_pepe/4_hurt/H-41.png",
      "img/2_character_pepe/4_hurt/H-42.png",
      "img/2_character_pepe/4_hurt/H-43.png",
  ];
  
  IMAGES_STAND = [
      'img/2_character_pepe/1_idle/idle/I-1.png',
      'img/2_character_pepe/1_idle/idle/I-2.png',
      'img/2_character_pepe/1_idle/idle/I-3.png',
      'img/2_character_pepe/1_idle/idle/I-4.png',
      'img/2_character_pepe/1_idle/idle/I-4.png',
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
      'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  world;
  WALKING_SOUND = new Audio("audio/walk_right.mp3");

  constructor() {
      super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
      this.loadImages([...this.IMAGES_STAND, ...this.IMAGES_WALKING, ...this.IMAGES_JUMPING, ...this.IMAGES_DEAD, ...this.IMAGES_HURT]);
      this.applyGravity();
      this.startAnimationIntervals();
  }

 
  startAnimationIntervals() {
      setInterval(() => {
          this.handleMovement();
          this.handleAnimation();
      }, 1000 / 20); 
  }


  handleMovement() {
      if (this.isDead()) {
          this.WALKING_SOUND.pause();
          return;
      }

      this.handleDirection();
      this.handleJump();
      this.world.camera_x = -this.x + 80;
  }


  handleDirection() {
      this.WALKING_SOUND.pause();

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.moveRight();
          this.otherDirection = false;
          this.playWalkingSound();
      } else if (this.world.keyboard.LEFT && this.x > 0) {
          this.moveLeft();
          this.otherDirection = true;
          this.playWalkingSound();
      } else {
          this.isPlayingSound = false;
      }
  }

  handleJump() {
      if ((this.world.keyboard.SPACE && !this.aboveGround()) || (this.world.keyboard.UP && !this.aboveGround())) {
          this.jump();
      } else {
          this.playAnimation(this.IMAGES_STAND);
      }
  }

  playWalkingSound() {
      if (!this.isPlayingSound) {
          this.WALKING_SOUND.play().catch(error => {
              console.log("Error playing sound:", error);
          });
          this.isPlayingSound = true;
      }
  }

  handleAnimation() {
      if (this.isDead()) {
          this.playDeadAnimation();
          return;
      }

      this.playMovementAnimation();
  }

  playDeadAnimation() {
      if (!this.deadAnimationPlayed) {
          this.playAnimation(this.IMAGES_DEAD);
          this.deadAnimationPlayed = true;
      } else {
          this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 2]];
      }
      this.WALKING_SOUND.pause();
  }

  playMovementAnimation() {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
          this.playWalkingSound();
      } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
          this.WALKING_SOUND.pause();
      } else if (this.aboveGround()) {
          this.playAnimation(this.IMAGES_JUMPING);
          this.WALKING_SOUND.pause();
      } else {
          this.playAnimation(this.IMAGES_STAND);
          this.WALKING_SOUND.pause(); 
          this.isPlayingSound = false;
      }
  }
}
