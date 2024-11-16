/**
 * Represents a health status bar that displays the health percentage in the game.
 * The status bar updates its image based on the current health percentage.
 * @class Statusbar_health
 * @extends DrawableObject
 */
class Statusbar_health extends DrawableObject {
  /**
   * @property {Array<string>} IMAGES - Array of image paths representing different health levels.
   * @property {number} percentage - The current health percentage.
   */

  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;
  /**
   * Creates an instance of the Statusbar_health class.
   * Loads the images for the health bar and sets the initial position, size, and health percentage to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = -10;
    this.width = 220;
    this.height = 50;
    this.setpercentage(100);
  }

  /**
   * Sets the health percentage and updates the status bar image accordingly.
   * @param {number} percentage - The health percentage, which determines the displayed image.
   */
  setpercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current health percentage.
   * @returns {number} The index of the corresponding image in the `IMAGES` array.
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
   * Resets the health status bar, setting the health percentage back to 100%.
   */
  reset() {
    this.setpercentage(100);
  }
}
