class Statusbar_bottle extends DrawableObject {
  IMAGES = [
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png");
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 75;
    this.width = 220;
    this.height = 50;
    this.setpercentage(1);
  }

  addBottle() {
    if (this.bottles < 5) {
      this.bottles++;
      this.world.statusBarBottle.setpercentage(this.bottles);
      this.bottles.push(this.world.throwableObjects);
    }
  }

  setpercentage(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES[this.resolveImageIndex(bottles)];
    this.img = this.imageCache[path];
  }

  resolveImageIndex(bottles) {
    if (bottles == 5) {
      return 5;
    } else if (bottles == 4) {
      return 4;
    } else if (bottles == 3) {
      return 3;
    } else if (bottles == 2) {
      return 2;
    } else if (bottles == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
