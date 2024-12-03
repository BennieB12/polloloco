
let canvas;
let world;
let keyboard = new Keyboard();

/**
 * @function init
 * @description Initializes the canvas element and creates a new World instance for the game.
 */
function init() {
  checkOrientation();
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
}

function checkOrientation() {
  const overlay = document.getElementById("orientation-overlay");
  if (window.innerWidth < window.innerHeight) {
    overlay.classList.add("visible");
  } else {
    overlay.classList.remove("visible");
  }
}

/**
 * @event DOMContentLoaded
 * @description Waits for the DOM to be fully loaded before initializing the game and setting up event listeners.
 * Handles orientation changes, full-screen toggling, and keyboard and touch events for user interaction.
 */
document.addEventListener("DOMContentLoaded", function () {



  /**
   * @event keydown
   * @description Listens for the "Escape" key to exit fullscreen mode, or the "Enter" key to toggle fullscreen.
   */
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });

// Get the fullscreen button element
const fullscreenBtn = document.getElementById("fullscreenBtn");

// Add event listener to toggle fullscreen when the button is clicked
fullscreenBtn.addEventListener("click", toggleFullScreen);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
  /**
   * @event keydown
   * @description Listens for keydown events to track user input for movement and actions.
   */
  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      toggleFullScreen();
    }
  });

  /**
   * @event keyup
   * @description Listens for keyup events to stop user input for movement and actions.
   */
  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 38) keyboard.UP = false;
    if (e.keyCode === 40) keyboard.DOWN = false;
    if (e.keyCode === 37) keyboard.LEFT = false;
    if (e.keyCode === 39) keyboard.RIGHT = false;
    if (e.keyCode === 32) keyboard.SPACE = false;
    if (e.keyCode === 68) keyboard.D = false;
    if (e.keyCode === 27) keyboard.ESC = false;
  });

  /**
   * @event keydown
   * @description Listens for keydown events to track user input for movement and actions.
   */
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) keyboard.UP = true;
    if (e.keyCode === 40) keyboard.DOWN = true;
    if (e.keyCode === 37) keyboard.LEFT = true;
    if (e.keyCode === 39) keyboard.RIGHT = true;
    if (e.keyCode === 32) keyboard.SPACE = true;
    if (e.keyCode === 68) keyboard.D = true;
    if (e.keyCode === 27) keyboard.ESC = true;
  });

  /**
   * @event touchstart
   * @description Tracks touch events for movement and actions, similar to keyboard inputs.
   */
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
});
