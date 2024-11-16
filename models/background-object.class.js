/**
 * Represents a background object in the game.
 * Inherits from `MovableObject`.
 */
class BackgroundObject extends MovableObject {
    /**
     * Width of the background object.
     * @type {number}
     */
    width = 720;
  
    /**
     * Height of the background object.
     * @type {number}
     */
    height = 480;
  
    /**
     * Creates an instance of `BackgroundObject`.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 0; // Background objects are positioned at the top of the canvas.
    }
  }
  