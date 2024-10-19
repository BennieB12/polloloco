let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    
    console.log("my character is",world.character);
}

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) {
        keyboard.UP = true;
    } else if (e.keyCode === 40) {
        keyboard.DOWN = true;
    } else if (e.keyCode === 37) {
      keyboard.LEFT = true;
    } else if (e.keyCode === 39) {
      keyboard.RIGHT = true;
    } else if (e.keyCode === 32) {
        keyboard.SPACE = true;
      }
  });

  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 38) {
        keyboard.UP = false;
    } else if (e.keyCode === 40) {
        keyboard.DOWN = false;
    } else if (e.keyCode === 37) {
        keyboard.LEFT = false;
    } else if (e.keyCode === 39) {
      keyboard.RIGHT = false;
    } else if (e.keyCode === 32) {
        keyboard.SPACE = false;
      }
  });

