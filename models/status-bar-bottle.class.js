
/**
 * Represents a status bar that displays the number of bottles collected in the game.
 * @extends DrawableObject
 */
class Statusbar_bottle extends DrawableObject {
  /**
   * @property {Array<string>} IMAGES - Array of image paths representing different levels of bottle collection.
   * @property {number} bottles - The current number of bottles collected.
   */

  IMAGES = [
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    " img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Creates an instance of the Statusbar_bottle class.
   * Loads the images for the status bar and sets the initial position, size, and bottle percentage.
   */
  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png");
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 75;
    this.width = 220;
    this.height = 50;
    this.setpercentage(0);
  }

  /**
   * Sets the percentage of bottles collected and updates the status bar image accordingly.
   * @param {number} bottles - The number of bottles collected, which determines the displayed image.
   */
  setpercentage(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES[this.resolveImageIndex(bottles)];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the number of bottles collected.
   * @param {number} bottles - The number of bottles collected.
   * @returns {number} The index of the corresponding image in the `IMAGES` array.
   */
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

  /**
   * Resets the status bar, setting the bottle percentage back to 0.
   */
  reset() {
    this.setpercentage(0);
  }
}