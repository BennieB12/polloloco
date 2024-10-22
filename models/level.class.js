class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x = 2100;

  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
