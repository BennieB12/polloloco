class Level {
  enemies;
  clouds;
  coins;
  backgroundObjects;
  level_end_x = 2100;

  constructor(enemies, clouds, backgroundObjects, coins) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
