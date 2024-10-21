class Character extends MovableObject {
  y = 80;
  height = 180;
  width = 104;
  speed = 4;
  world;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  WALKING_SOUND = new Audio("audio/walk_right.mp3");


  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();

    this.animate();
  }

  animate() {
    setInterval(() => {

      this.WALKING_SOUND.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.WALKING_SOUND.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.WALKING_SOUND.play();

      }

      if (this.world.keyboard.SPACE && !this.aboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 80;

    }, 1000 / 60);

    setInterval(() => {
        if(this.aboveGround()){
          this.playAnimation(this.IMAGES_JUMPING);
        }

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }
}
