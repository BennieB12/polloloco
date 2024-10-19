class MovableObject {
    x = 120;
    y  = 288;
    height;
    width;
    img;
    imageCache = {};




  


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

    } 
    
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;   
        });


        
    }

    moveRight () {
        console.log("move Right");
    }

    
    moveLeft() {

    }
}