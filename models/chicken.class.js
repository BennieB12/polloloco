class Chicken extends MovableObject {
    
    y = 320;
    height = 100;
    width = 80;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png') 

        this.x = 400 + Math.random() * 500;
    }

}