let canvas;
let world;
let isMuted = false;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

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

/**
 * @description Checks the current orientation of the device and shows the overlay or not.
 */
function checkOrientation() {
  const overlay = document.getElementById("orientation-overlay");
  if (window.innerWidth < window.innerHeight) {
    overlay.classList.add("visible");
  } else {
    overlay.classList.remove("visible");
  }
}

function toggleSound() {
  isMuted = !isMuted;
  updateSoundButton();

}

function updateSoundButton() {
  const soundButton = document.getElementById("soundBtn");
  if (isMuted) {
    soundButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
        <path d="M3 9v6h4l5 5V4l-5 5H3z"/>
        <path d="M15 9C16.5 9 18 10.5 18 12C18 13.5 16.5 15 15 15" stroke="black" stroke-width="2"/>
        <path d="M17 7C19 7 20 8.5 20 10C20 11.5 19 13 17 13" stroke="black" stroke-width="2"/>
        <path d="M3 3L21 21" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  } else {
    soundButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
        <path class="sound-wave" d="M3 9v6h4l5 5V4l-5 5H3z"/>
        <path class="sound-effect" d="M15 9C16.5 9 18 10.5 18 12C18 13.5 16.5 15 15 15" stroke="black" stroke-width="2"/>
        <path class="sound-effect-2" d="M17 7C19 7 20 8.5 20 10C20 11.5 19 13 17 13" stroke="black" stroke-width="2"/>
      </svg>
    `;
  }
}
window.onload = function() {
  updateSoundButton();
};

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

  const fullscreenBtn = document.getElementById("fullscreenBtn");
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
