class MovableObject {
    x = 120;
    y  = 288;
    height;
    width;
    img;




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