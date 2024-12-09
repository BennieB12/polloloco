/**
 * Represents the playable character in the game.
 * Inherits from `MovableObject`.
 */
class Character extends MovableObject {
  height = 100;
  jumpAnimationPlayed = false;
  y = 320;
  groundLevel = 320;
  width = 60;
  speed = 6;
  energy = 100;
  animationSpeed = 5;
  lastHit = 0;
  isPlayingSound = false;
  isThrowing = false;
  deadAnimationPlayed = false;
  standingTimer = 0;
  world;
  soundManager = new SoundManager();

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

  IMAGES_HURT = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png"];

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

  /**
   * Represents the main character in the game.
   * @class Character
   * @extends MovableObject
   */
  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages([...this.IMAGES_STAND, ...this.IMAGES_STAND_LONG, ...this.IMAGES_WALKING, ...this.IMAGES_JUMPING, ...this.IMAGES_DEAD, ...this.IMAGES_HURT]);
    this.applyGravity();
    this.setOffset(10, 10, 30, 30);
  }

  /**
   * Starts the animation loop, handling movement and animations.
   */
  animate() {
    this.startInterval(() => {
      this.handleMovement();
      this.handleAnimation();
    }, 1000 / 30);
  }

  /**
   * Handles character movement, direction, idle state, and throwing actions.
   */
  handleMovement() {
    if (this.isDead()) {
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

  /**
   * Handles character animations based on the current state (e.g., idle, moving, hurt).
   */
  handleAnimation() {
    if (this.isDead()) {
      this.playDeadAnimation();
      this.deadSound();
      return;
    }
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT, this.animationSpeed);
      this.hurtSound();
      return;
    }
    if (this.isJumping) {
      this.playAnimation(this.IMAGES_JUMPING, this.animationSpeed);
      this.JumpSound();
      return;
    }
    if (this.move()) {
      this.playAnimation(this.IMAGES_WALKING, this.animationSpeed);
      this.moveSound();
    } else if (this.longIdle()) {
      this.playAnimation(this.IMAGES_STAND_LONG, this.animationSpeed);
      this.longIdleSound();
    } else {
      this.playAnimation(this.IMAGES_STAND, this.animationSpeed);
      this.soundManager.stopSound("WALKING_SOUND");
    }
  }

  /**
   * Handles the throwing action for bottles.
   */
  handleThrow() {
    if (this.world.keyboard.D && this.enoughBottles() && !this.isThrowing) {
      this.throwBottle();
      this.isThrowing = true;
    } else if (!this.world.keyboard.D) {
      this.isThrowing = false;
    }
  }

  /**
   * Handles character direction and movement sounds.
   */
  handleDirection() {
    if (this.canMoveRight()) {
      this.moveRight();
      this.otherDirection = false;
    } else if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Handles jumping actions based on keyboard input.
   */
  handleJump() {
    if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isJumping && !this.aboveGround()) {
      this.jump();
    }
  }

  hurtSound() {
    this.soundManager.stopSound("WALKING_SOUND");
    this.soundManager.stopSound("LONGIDLE_SOUND");
    this.soundManager.playSound("HURT_SOUND");
    setTimeout(() => {
      this.soundManager.stopSound("HURT_SOUND");
    }, 400);
    return;
  }

  moveSound() {
    this.soundManager.stopSound("LONGIDLE_SOUND");
    this.soundManager.playSound("WALKING_SOUND");
    return;
  }

  JumpSound() {
    this.soundManager.stopSound("WALKING_SOUND");
    this.soundManager.stopSound("LONGIDLE_SOUND");
    this.soundManager.playSound("JUMP_SOUND");
  }

  longIdleSound() {
    if (this.longIdle()) this.soundManager.playSound("LONGIDLE_SOUND");
    this.soundManager.stopSound("WALKING_SOUND");
    this.soundManager.stopSound("HURT_SOUND");
    this.soundManager.stopSound("JUMP_SOUND");
    return;
  }

  deadSound() {
    this.soundManager.stopSound("LONGIDLE_SOUND");
    this.soundManager.stopSound("WALKING_SOUND");
    this.soundManager.stopSound("HURT_SOUND");
    this.soundManager.stopSound("JUMP_SOUND");
    this.soundManager.playSound("DEAD_SOUND");
    setTimeout(() => {
      this.soundManager.stopSound("DEAD_SOUND");
    }, 1000);
  }

  /**
   * Throws a bottle if available and decreases the bottle count.
   */
  throwBottle() {
    if (this.enoughBottles()) {
      this.bottles--;
      let bottle = new ThrowableObject(this.x, this.y, this.otherDirection);
      this.world.throwableObjects.push(bottle);
      this.world.statusBarBottle.setpercentage(this.bottles);
    }
  }

 /**
   * Collects a bottle and increases the bottle count, up to a maximum of 5.
   * @param {number} index - The index of the bottle to collect in the level's bottle array.
   */
  collectBottle(index) {
    let bottle = this.world.level.bottles[index];
    if (!bottle.remove && this.bottles < 5) {
      bottle.remove = true;
      this.world.soundManager.playSound("GET_BOTTLE_SOUND");
      this.bottles++;
      setTimeout(() => {
        this.world.soundManager.stopSound("GET_BOTTLE_SOUND");
      }, 200);
      this.world.statusBarBottle.setpercentage(this.bottles);
    }
  }

  /**
   * Collects a coin and increases the coin count, up to a maximum of 5.
   * @param {number} index - The index of the coin to collect in the level's coin array.
   */
  collectCoin(index) {
    let coin = this.world.level.coins[index];
    if (!coin.remove && this.collectedCoins < 5) {
      coin.remove = true;
      this.world.soundManager.playSound("COIN_SOUND");
      this.collectedCoins++;
      setTimeout(() => {
        this.world.soundManager.stopSound("COIN_SOUND");
      }, 200);
      this.world.statusBarCoin.setpercentage(this.collectedCoins * 20);
    }
  }

  /**
   * Plays the dead animation once and pauses walking sounds.
   */
  playDeadAnimation() {
    if (!this.deadAnimationPlayed) {
      this.deadAnimationPlayed = true;
      this.playAnimation(this.IMAGES_DEAD, this.animationSpeed);
      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 2]];
      this.clearAllIntervals();
    }
  }

  /**
   * Checks if the character has any bottles left to throw.
   * @returns {boolean} - True if the character has more than 0 bottles, otherwise false.
   */
  enoughBottles() {
    return this.bottles > 0;
  }

  /**
   * Increments the idle timer for the character.
   * @returns {number} - The updated value of the `standingTimer`.
   */
  countIdle() {
    return (this.standingTimer += 1000 / 20);
  }

  /**
   * Sets the camera position to follow the character's starting point.
   * @returns {number} - The updated `camera_x` value for the world.
   */
  startPoint() {
    return (this.world.camera_x = -this.x + 80);
  }

  /**
   * Checks if the character is not moving.
   * @returns {boolean} - True if neither the RIGHT nor LEFT key is pressed, otherwise false.
   */
  notMoving() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} - True if the RIGHT key is pressed and the character is within the level boundary, otherwise false.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} - True if the LEFT key is pressed and the character's position is greater than 0, otherwise false.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Checks if the character is currently moving.
   * @returns {boolean} - True if either the RIGHT or LEFT key is pressed, otherwise false.
   */
  move() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Checks if the character is in a short idle state.
   * @returns {boolean} - True if the `standingTimer` is less than or equal to 5000 milliseconds, otherwise false.
   */
  idle() {
    return this.standingTimer <= 5000;
  }

  /**
   * Checks if the character is in a long idle state.
   * @returns {boolean} - True if the `standingTimer` is greater than 5000 milliseconds, otherwise false.
   */
  longIdle() {
    return this.standingTimer > 5000;
  }

  reset() {
    this.clearAllIntervals();
    this.energy = 100;
    this.x = 80;
    this.standingTimer = 0;
    this.deadAnimationPlayed = false;
    this.isJumping = false;
    this.otherDirection = false;
    this.bottles = 0;
    this.collectedCoins = 0;
    this.animate();
  }
}
