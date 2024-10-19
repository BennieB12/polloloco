class BackgroundObject extends MovableObject {
    
    x = 20;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}