/**
 * Represents the enemy's status bar in the game, displaying its health visually.
 * Extends the `DrawableObject` class.
 */
class Statusbar_enemy extends DrawableObject {
  /**
   * The current percentage of the status bar (health level).
   * @type {number}
   */
  percentage = 100;

  /**
   * Whether the status bar is visible.
   * @type {boolean}
   */
  visible = false;

  /**
   * Array of image paths representing different health levels of the status bar.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /**
   * Constructs the `Statusbar_enemy` object, initializes its position, dimensions,
   * and loads its images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 535;
    this.y = 35;
    this.width = 180;
    this.height = 50;
    this.setpercentage(100);
  }

  /**
   * Updates the status bar's health level and displays the corresponding image.
   * @param {number} percentage - The health level percentage (0-100).
   */
  setpercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image corresponding to the current percentage.
   * @returns {number} The index of the image in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Resets the status bar to full health (100%).
   */
  reset() {
    this.setpercentage(100);
  }
}
