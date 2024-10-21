class Statusbar extends DrawableObject {

  IMAGES = [
      "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = -20;
    this.width = 320;
    this.height = 80;
    this.setpercentage(100);
  }

  setpercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolmageIndex()];
    this.img = this.imageCache[path];
  }

  resolmageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 80) {
      return 3;
    } else if (this.percentage > 60) {
      return 2;
    } else if (this.percentage > 40) {
      return 1;
    } else {
      return 0;
    }
  }
}
