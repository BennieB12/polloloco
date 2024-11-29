let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().then(() => {
    }).catch(err => {
      console.error(err);
    });
  } else {
    document.exitFullscreen().then(() => {
    }).catch(err => {
      console.error(err);
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


document.getElementById("btnFullscreen").addEventListener("touchstart", (e) => {
  e.preventDefault();
});
document.getElementById("btnFullscreen").addEventListener("touchend", (e) => {
  e.preventDefault();
});


document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});
document.getElementById("btnLeft").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});
document.getElementById("btnLeft").addEventListener("touchcancel", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById("btnRight").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.RIGHT = true; 
});
  document.getElementById("btnRight").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});
document.getElementById("btnRight").addEventListener("touchcancel", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById("btnJump").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.UP = true;
});
document.getElementById("btnJump").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.UP = false;
});
document.getElementById("btnJump").addEventListener("touchcancel", (e) => {
  e.preventDefault();
  keyboard.UP = false;
});

document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.D = true;
});
document.getElementById("btnThrow").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.D = false;
});
document.getElementById("btnThrow").addEventListener("touchcancel", (e) => {
  e.preventDefault();
  keyboard.D = false;
});


