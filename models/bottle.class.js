class Bottle extends DrawableObject {
  y = 360;
  x = 300 + Math.random() * 2000;
  height = 60;
  width = 40;

  IMAGES_GROUND = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
  }

  reset() {
      this.x = 300 + Math.random() * 2000;
      this.bottles = 0;
  }
}
