class Statusbar_bottle extends DrawableObject {
  IMAGES = [
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  bottleCount = 100;
  collectedBottles = 0;

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png");
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 75;
    this.width = 220;
    this.height = 50;
    this.setpercentage(1);
  }

  addBottle() {
    if (this.collectedBottles < 5) { 
      this.collectedBottles++;
      this.setpercentage(this.collectedBottles);
    }
  }

  setpercentage(bottleCount) {
    this.bottleCount = bottleCount;
    let path = this.IMAGES[this.resolveImageIndex()]; 
    this.img = this.imageCache[path];
  }
  
  resolveImageIndex() {
    if (this.bottleCount == 5) {
      return 5;
    } else if (this.bottleCount == 4) {
      return 4;
    } else if (this.bottleCount == 3) {
      return 3;
    } else if (this.bottleCount == 2) {
      return 2;
    } else if (this.bottleCount == 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
