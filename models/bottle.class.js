class Bottle extends DrawableObject {
    y = 340;
    x = 300 + Math.random() * 2000;
    height = 100;
    width = 80;
  
    IMAGES_GROUND = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    ];
  
    constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
    }
  
}