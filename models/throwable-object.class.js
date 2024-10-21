class ThrowableObject extends MovableObject {


    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(100, 150);

    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
        }, 30);

    }

}