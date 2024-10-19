class Chicken extends MovableObject {
    y = 320;
    height = 100;
    width = 80;
    

    IMAGES_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_WALKING);
        this.speed = 0.25 + Math.random() * 0.25;
        this.x = 400 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
          let i = this.currentImage % this.IMAGES_CHICKEN_WALKING.length;
          let path = this.IMAGES_CHICKEN_WALKING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
        }, 200);
      }

}

