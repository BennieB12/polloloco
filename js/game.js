let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch(err => {
    });
  } else {
    document.exitFullscreen().catch(err => {
    });
  }
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 38) {
    keyboard.UP = true;
  }

  if (e.keyCode === 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode === 68) {
    keyboard.D = true;
  }

  if (e.keyCode === 27) {
    keyboard.ESC = true;
  }
});


window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    toggleFullScreen();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 38) {
    keyboard.UP = false;
  }

  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode === 68) {
    keyboard.D = false;
  }

  if (e.keyCode === 27) {
    keyboard.ESC = false;
  }
});
