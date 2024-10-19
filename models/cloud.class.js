class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x + Math.random() * 200;
        this.moveLeft();
    }
}