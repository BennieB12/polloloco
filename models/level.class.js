class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x = 2900;

  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }

  // resetLevel() {
  //   this.enemies = [
  //     new Chicken(600 + Math.random() * 2000),
  //     new Chicken(600 + Math.random() * 2000),
  //     new Chicken(600 + Math.random() * 2000),
  //     new Chicken(600 + Math.random() * 2000),
  //     new Chicken(600 + Math.random() * 2000),
  //     new Minichicken(800 + Math.random() * 2000,  6 + Math.random() * 2),
  //     new Minichicken(1100 + Math.random() * 2000,  6 + Math.random() * 2),
  //     new Minichicken(1400 + Math.random() * 1000,  6 + Math.random() * 2),
  //     new Minichicken(1500,  6 + Math.random() * 2),
  //   ],
    
  //   this.clouds = [
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 100, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 100, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 250, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 400, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 610, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 790, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 942, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 1080, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 1240, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 1470, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 1690, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 1910, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 2040, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 2200, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 2200, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 2400, 0),
  //     new Cloud("img/5_background/layers/4_clouds/1.png", 2600, 0),
  //     new Cloud("img/5_background/layers/4_clouds/2.png", 2700, 0)
  //   ],
    
  //   this.backgroundObjects = [
  //     new BackgroundObject("img/5_background/layers/air.png", -719),
  //     new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
  //     new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
  //     new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
  //     new BackgroundObject("img/5_background/layers/air.png", 0),
  //     new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
  //     new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
  //     new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
  //     new BackgroundObject("img/5_background/layers/air.png", 719),
  //     new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
  //     new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
  //     new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
  //     new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
  //     new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
  //     new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
  //     new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
  //     new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
  //     new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
  //     new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
  //     new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
  //     new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
  //     new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
  //     new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
  //     new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
  //   ],
    
  //   this.coins = [
  //     new Coin(200 + Math.random() * 2000),
  //     new Coin(700 + Math.random() * 2000),
  //     new Coin(1100 + Math.random() * 2000),
  //     new Coin(1300 + Math.random() * 2000),
  //     new Coin(1700 + Math.random() * 2000),
  //   ],
    
  //   this.bottles = [
  //     new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 300 + Math.random() * 176),
  //     new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 600 + Math.random() * 300),
  //     new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 900 + Math.random() * 900),
  //     new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1200 + Math.random() * 1000),
  //     new Bottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1200 + Math.random() * 1200),

  //   ]
  // }
}