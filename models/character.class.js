class Character extends MovableObject {
  y = 240;
  height = 180;
  width = 104;
  speed = 4;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.walk();
  }

  walk() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
            }         
        }, 1000 / 60);
    

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
        
    
    }, 50);
  }

  jump() {}
}
