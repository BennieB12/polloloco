class Bottle extends DrawableObject {
  y = 370;
  x = 300 + Math.random() * 2000;
  height = 50;
  width = 36;

  IMAGES_GROUND = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.setOffset(0, 0, 0, 0);
  }

  reset() {
      this.x = 300 + Math.random() * 2000;
      this.bottles = 0;
  }
}
