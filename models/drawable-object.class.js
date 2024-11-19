/**
 * Represents a drawable object in the game, which can be drawn to a canvas and have various properties like position, size, and visibility.
 * @class DrawableObject
 */
class DrawableObject {
  /**
   * @property {HTMLImageElement} img - The image of the drawable object.
   * @property {Object} imageCache - Cache to store multiple images loaded by the object.
   * @property {number} x - The x-coordinate of the object.
   * @property {number} y - The y-coordinate of the object.
   * @property {number} height - The height of the object.
   * @property {number} width - The width of the object.
   * @property {number} collectedCoins - The number of coins collected by the object.
   * @property {number} bottles - The number of bottles the object has.
   * @property {number} rotationAngle - The rotation angle for the object.
   * @property {boolean} visible - Indicates whether the object is visible.
   * @property {Object} offset - The offset of the object (left, right, top, bottom).
   * @property {Array<string>} LOSE_IMAGES - An array of image paths for the game's "lose" screens.
   */
  img;
  imageCache = {};
  x = 120;
  y = 288;
  height = 150;
  width = 50;
  collectedCoins = 0;
  bottles = 0;
  rotationAngle = 0;
  visible = false;

  LOSE_IMAGES = [
    "img/9_intro_outro_screens/game_over/game over.png",
    "img/9_intro_outro_screens/game_over/you lost.png",
  ];

  /**
   * Creates an instance of a DrawableObject.
   * Initializes position, size, image cache, and offset properties.
   */
  constructor() {
    this.offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }

  /**
   * Adjusts the offset of collectible objects (e.g., Coin, Bottle).
   * @remarks Only collectible objects (Coin, Bottle) are affected by this method.
   */
  adjustCollectibleOffsets() {
    if (this instanceof Coin || this instanceof Bottle) {
      this.setOffset(10, 10, 10, 10);
    }
  }

  /**
   * Loads an image from the specified path and sets it to the `img` property.
   * @param {string} path - The path to the image to be loaded.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images into the `imageCache`.
   * @param {Array<string>} arr - An array of image paths to be loaded into the cache.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object to the canvas with applied transformations and effects.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the object.
   */
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.CoinFlip(ctx);
    this.ColorFilter(ctx);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  /**
   * Applies a coin-flip effect to the object (scaling the object along the x-axis).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used to apply the effect.
   * @remarks This effect is applied only to instances of the Coin class.
   */
  CoinFlip(ctx) {
    if (this instanceof Coin) {
      let scaleFactor = Math.cos((this.rotationAngle * Math.PI) / 180);
      ctx.scale(scaleFactor, 1);
    }
  }

  /**
   * Applies a color filter effect to the object (random color effect).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used to apply the effect.
   * @remarks This effect is applied only to instances of the Minichicken class.
   */
  ColorFilter(ctx) {
    if (this instanceof Minichicken) {
      ctx.filter = this.randomColor;
    }
  }

  /**
   * Sets the offsets (left, right, top, bottom) of the object.
   * @param {number} left - The left offset.
   * @param {number} right - The right offset.
   * @param {number} top - The top offset.
   * @param {number} bottom - The bottom offset.
   */
  setOffset(left, right, top, bottom) {
    this.offset = {
      left: left || this.offset.left,
      right: right || this.offset.right,
      top: top || this.offset.top,
      bottom: bottom || this.offset.bottom,
    };
  }

  /**
   * Draws the hitbox frame for the object, which helps with collision detection.
   * The hitbox is calculated based on the object's size and offset.
   */
  drawFrame(ctx) {
    this.hitboxWidth = this.width * 0.5;
    this.hitboxHeight = this.height * 0.6;
  
    this.hitboxX = this.x + (this.width - this.hitboxWidth) / 2 + this.offset.left / 2;
    this.hitboxY = this.y + (this.height - this.hitboxHeight) / 2 + this.offset.top / 2;
  }
}
