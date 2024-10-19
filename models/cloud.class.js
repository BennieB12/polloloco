class Cloud extends MovableObject {

    y = 20;
    height = 250;
    width = 500;
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x + Math.random() * 120;
        this.moveClouds();
    }

    moveClouds() {
        setInterval( () => {
                this.x -= 0.3;
        }, 16.667);
    }

}