class Character extends MovableObject {
  y = 320;
  height = 100;
  width = 60;
  speed = 6;
  energy = 100;
  lastHit = 0;
  isPlayingSound = false;
  isThrowing = false;
  deadAnimationPlayed = false;

  world;
  WALKING_SOUND = new Audio("audio/walk_right.mp3");

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
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_STAND_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages([
      ...this.IMAGES_STAND,
      ...this.IMAGES_STAND_LONG,
      ...this.IMAGES_WALKING,
      ...this.IMAGES_JUMPING,
      ...this.IMAGES_DEAD,
      ...this.IMAGES_HURT,
    ]);
    this.applyGravity();
    this.animate();
  }

  animate() {
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
    this.startPoint();

    if (this.notMoving()) {
      this.countIdle();
    } else {
      this.standingTimer = 0;
    }
    this.handleThrow();
  }

  handleAnimation() {
    if (this.isDead()) {
      this.playDeadAnimation();
      return;
    }
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT, this.animationSpeed);
      this.WALKING_SOUND.pause();
      return;
    }
    if (this.aboveGround()) {
      const jumpAnimationSpeed = 3;
      this.playAnimation(this.IMAGES_JUMPING, jumpAnimationSpeed);
      this.WALKING_SOUND.pause();
      return;
    }

    if (this.move()) {
      this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
      this.playWalkingSound();
    } else if (this.longIdle()) {
      this.playAnimation(this.IMAGES_STAND_LONG, this.animationSpeed);
    } else {
      this.playAnimation(this.IMAGES_STAND, this.animationSpeed);
    }
  }

  handleThrow() {
    if (this.world.keyboard.D && this.enoughBottles() && !this.isThrowing) {
      this.throwBottle();
      this.isThrowing = true;
    } else if (!this.world.keyboard.D) {
      this.isThrowing = false;
    }
  }

  handleDirection() {
    this.WALKING_SOUND.pause();
    if (this.canMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
      this.playWalkingSound();
    } else if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.playWalkingSound();
    } else {
      this.noSound();
    }
  }

  handleJump() {
    if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.aboveGround() && !this.isJumping) {
      this.isJumping = true;
      this.jump();
      this.playAnimation(this.IMAGES_JUMPING, this.animationSpeed);
    }
  }

  throwBottle() {
    if (this.enoughBottles()) {
      this.bottles--;
      let bottle = new ThrowableObject(this.x, this.y, this.otherDirection);
      this.world.throwableObjects.push(bottle);
      this.world.statusBarBottle.setpercentage(this.bottles);
    }
  }

  collectBottle(index) {
    this.world.level.bottles.splice(index, 1);
    this.bottles++;
    this.world.statusBarBottle.setpercentage(this.bottles);
  }

  collectCoin(index) {
    this.world.level.coins.splice(index, 1);
    this.world.statusBarCoin.addCoin();
  }

  playDeadAnimation() {
    if (!this.deadAnimationPlayed) {
      this.deadAnimationPlayed = true;
      this.playAnimation(this.IMAGES_DEAD, this.animationSpeed);

      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 2]];

      setTimeout(() => {
        this.world.showEndScreen();
        this.world.gameOver = true;
      }, 3000);

      this.WALKING_SOUND.pause();
    }
  }

  playWalkingSound() {
    if (this.noSound()) {
      this.WALKING_SOUND.play();
      this.isPlayingSound = true;
    }
  }

  enoughBottles() {
    return this.bottles > 0;
  }

  countIdle() {
    return (this.standingTimer += 1000 / 20);
  }

  startPoint() {
    return (this.world.camera_x = -this.x + 80);
  }

  notMoving() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  noSound() {
    return !this.isPlayingSound;
  }

  move() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  idle() {
    this.standingTimer <= 5000;
  }

  longIdle() {
    return this.standingTimer > 5000;
  }
}
