class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 100;
    width = 150;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

    }
    moveRight () {
        console.log("move Right");
    }

    
    moveLeft() {

    }
}