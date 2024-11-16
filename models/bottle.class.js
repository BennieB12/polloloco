/**
 * Represents a bottle object in the game.
 * Inherits from `DrawableObject`.
 */
class Bottle extends DrawableObject {
    /**
     * The vertical position of the bottle.
     * @type {number}
     */
    y = 360;
  
    /**
     * The horizontal position of the bottle, randomized on instantiation.
     * @type {number}
     */
    x = 300 + Math.random() * 2000;
  
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 60;
  
    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 40;
  
    /**
     * Array containing the paths to bottle images when placed on the ground.
     * @type {string[]}
     */
    IMAGES_GROUND = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    ];
  
    /**
     * Creates an instance of `Bottle`.
     * @param {string} imagePath - The path to the bottle's image.
     * @param {number} x - The horizontal position of the bottle.
     */
    constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
    }
  
    /**
     * Resets the bottle's position and state.
     * Randomizes the horizontal position and sets bottle count to 0.
     */
    reset() {
      this.x = 300 + Math.random() * 2000;
      this.bottles = 0;
    }
  }
  