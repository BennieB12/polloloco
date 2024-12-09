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
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }

    
  resetLevel() {
    this.enemies.forEach((enemy) => {
      if (enemy.reset) enemy.reset();
    });
    this.coins.forEach((coin) => {
      if (coin.reset) coin.reset();
    });
    this.bottles.forEach((bottle) => {
      if (bottle.reset) bottle.reset();
    });
  }
}

