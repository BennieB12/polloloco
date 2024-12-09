/**
 * Represents a coin object in the game.
 * Inherits from `DrawableObject`.
 */
class Coin extends DrawableObject {
  /**
   * The vertical position of the coin, with a small random offset.
   * @type {number}
   */
  y = 200 + Math.random() * 20;

  /**
   * The horizontal position of the coin, randomized on instantiation.
   * @type {number}
   */
  x = 300 + Math.random() * 2000;

  /**
   * The height of the coin.
   * @type {number}
   */
  height = 80;

  /**
   * The width of the coin.
   * @type {number}
   */
  width = 60;

  /**
   * The current rotation angle of the coin.
   * @type {number}
   */
  rotationAngle;

  remove = false;

  /**
   * Creates an instance of `Coin`.
   * Initializes the coin's image and starts the rotation animation.
   * @param {number} angle - The initial rotation angle of the coin.
   */
  constructor(angle) {
    super().loadImage("img/8_coin/coin_1.png");
    this.rotationAngle = angle;
    this.animateRotation();
    this.setOffset(30, 30, 30, 30);
    this.remove = false;
  }

  /**
   * Rotates the coin by increasing its rotation angle.
   * Resets the angle to 0 when it reaches 360 degrees.
   */
  rotateCoin() {
    this.rotationAngle += 5;
    if (this.rotationAngle >= 360) {
      this.rotationAngle = 0;
    }
  }

  /**
   * Starts the rotation animation by updating the rotation angle at 60 FPS.
   */
  animateRotation() {
    setInterval(() => {
      this.rotateCoin();
    }, 1000 / 60);
  }

  reset() {
    this.remove = false;
    this.x = 300 + Math.random() * 2000;
    this.rotationAngle = 0;
  }
}
