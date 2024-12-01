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

  replaceObjects() {
    this.coins = [
        new Coin(200 + Math.random() * 2000),
        new Coin(700 + Math.random() * 2000),
        new Coin(1100 + Math.random() * 2000),
        new Coin(1300 + Math.random() * 2000),
        new Coin(1700 + Math.random() * 2000),
    ];

    this.bottles = [
        new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 300 + Math.random() * 176),
        new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 600 + Math.random() * 300),
        new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 900 + Math.random() * 900),
        new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1200 + Math.random() * 1000),
        new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1200 + Math.random() * 1200),
    ];

    this.enemies = [
      new Chicken(600 + Math.random() * 2000),
      new Chicken(800 + Math.random() * 2000),
      new Chicken(1000 + Math.random() * 2000),
      new Chicken(1200 + Math.random() * 2000),
      new Chicken(1400 + Math.random() * 2000),
      new Minichicken(800 + Math.random() * 2000,  4 + Math.random() * 2),
      new Minichicken(1100 + Math.random() * 2000,  4 + Math.random() * 2),
      new Minichicken(1400 + Math.random() * 1000,  4 + Math.random() * 2),
      new Minichicken(1500,  4 + Math.random() * 2),
      // // new Endboss()
    ];
}

 
}