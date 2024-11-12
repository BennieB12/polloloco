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

document.getElementById("btnLeft").addEventListener("touchstart", () => keyboard.LEFT = true);
document.getElementById("btnLeft").addEventListener("touchend", () => keyboard.LEFT = false);

document.getElementById("btnRight").addEventListener("touchstart", () => keyboard.RIGHT = true);
document.getElementById("btnRight").addEventListener("touchend", () => keyboard.RIGHT = false);

document.getElementById("btnJump").addEventListener("touchstart", () => keyboard.UP = true);
document.getElementById("btnJump").addEventListener("touchend", () => keyboard.UP = false);

document.getElementById("btnThrow").addEventListener("touchstart", () => keyboard.D = true);
document.getElementById("btnThrow").addEventListener("touchend", () => keyboard.D = false);