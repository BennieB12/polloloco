class World {
    
    character = new Character();

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud(),
        new Cloud(),
    ];

    backgroundObjects =[
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png')
    ]

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);



        self = this;
        requestAnimationFrame(function () {
            self.draw();
          });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        }); 

    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}
