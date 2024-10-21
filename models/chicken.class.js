class Chicken extends MovableObject {
    y = 320;
    height = 100;
    width = 80;
    

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.25 + Math.random() * 0.25;
        this.x = 400 + Math.random() * 500;
        this.animate();
    }

    animate() {
      setInterval(() => {
        this.moveLeft();
      },1000 / 25);
        setInterval(() => {
          this.playAnimation(this.IMAGES_WALKING);
        }, 200);
      }

}

