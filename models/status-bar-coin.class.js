
 /**
 * Represents a status bar that displays the percentage of coins collected in the game.
 * The status bar updates its image based on the percentage of coins collected.
 * @class Statusbar_coin
 * @extends DrawableObject
 */
class Statusbar_coin extends DrawableObject {
  /**
   * @property {Array<string>} IMAGES - Array of image paths representing different levels of coin collection.
   * @property {number} percentage - The current percentage of coins collected.
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  percentage = 100;

  /**
   * Creates an instance of the Statusbar_coin class.
   * Loads the images for the status bar and sets the initial position, size, and coin percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 30;
    this.width = 220;
    this.height = 50;
    this.setpercentage(0);
  }

  /**
   * Sets the percentage of coins collected and updates the status bar image accordingly.
   * @param {number} percentage - The percentage of coins collected, which determines the displayed image.
   */
  setpercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current coin collection percentage.
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
   * Resets the status bar, setting the coin percentage back to 0.
   */
  reset() {
    this.setpercentage(0);
  }
}
