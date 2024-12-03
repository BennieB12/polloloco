/**
 * Represents a game level with all its objects, including enemies, clouds, coins, bottles, and background elements.
 */
class Level {
  /**
   * Array of enemies present in the level.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * Array of cloud objects for the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * Array of coin objects for the level.
   * @type {Coin[]}
   */
  coins;

  /**
   * Array of bottle objects for the level.
   * @type {Bottle[]}
   */
  bottles;

  /**
   * Array of background objects for the level.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * The x-coordinate where the level ends.
   * @type {number}
   */
  level_end_x = 2900;

  /**
   * Initializes a new level with its objects.
   * @param {MovableObject[]} enemies - Array of enemy objects.
   * @param {Cloud[]} clouds - Array of cloud objects.
   * @param {BackgroundObject[]} backgroundObjects - Array of background objects.
   * @param {Coin[]} coins - Array of coin objects.
   * @param {Bottle[]} bottles - Array of bottle objects.
   * @param {Endboss} endboss - The final boss for the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles, endboss) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }

  /**
   * Resets and replaces objects in the level with new randomized instances.
   */
  replaceObjects() {
    this.coins = [
      new Coin(200 + Math.random() * 2000),
      new Coin(700 + Math.random() * 2000),
      new Coin(1100 + Math.random() * 2000),
      new Coin(1300 + Math.random() * 2000),
      new Coin(1000 + Math.random() * 2000),
    ];

    this.bottles = [
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 300 + Math.random() * 176),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 600 + Math.random() * 300),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 900 + Math.random() * 900),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1200 + Math.random() * 1000),
      new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1200 + Math.random() * 1200),
    ];

    this.enemies = [
      new Chicken(600 + Math.random() * 1000),
      new Chicken(800 + Math.random() * 1000),
      new Chicken(1000 + Math.random() * 1000),
      new Chicken(1200 + Math.random() * 1000),
      new Chicken(1400 + Math.random() * 1000),
      new Minichicken(800 + Math.random() * 1000, 4 + Math.random() * 2),
      new Minichicken(1100 + Math.random() * 2000, 4 + Math.random() * 2),
      new Minichicken(1000 + Math.random() * 1000, 4 + Math.random() * 2),
      new Minichicken(1500, 4 + Math.random() * 2),
      new Endboss(),
    ];

}
}
