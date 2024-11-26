class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x = 2900;

  constructor(enemies, clouds, backgroundObjects, coins, bottles, endboss) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}