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
  checkMute();
  applySavedVolume();
  
}


window.addEventListener("resize", checkOrientation);


function applySavedVolume() {
  const savedVolume = localStorage.getItem("globalVolume");
  const volume = savedVolume !== null ? parseFloat(savedVolume) : 1;
  world.soundManager.setVolume(volume);
  const volumeSlider = document.getElementById("volumeSlider");
  if (volumeSlider) {
    volumeSlider.value = volume;
  }
}

function checkMute() {
  const savedMuteStatus = localStorage.getItem("isMuted");
  if (savedMuteStatus !== null) {
    world.soundManager.isMuted = savedMuteStatus === "true";
    const soundIcon = document.getElementById("soundIcon");
    if (world.soundManager.isMuted) {
      soundIcon.textContent = "🔇";
      world.soundManager.muteAll();
    } else {
      soundIcon.textContent = "🔊";
      world.soundManager.unmuteAll();
    }
  }
}
/**
 * connected to the world and enables to go back to homescreen
 */
function reloadCanvas() {
  world.home();
}


/**
 * Connected to World and MuteButton to toggle Sound and Buttontext.
 */
function toggleSound() {
  world.soundManager.isMuted = !world.soundManager.isMuted;
  const soundIcon = document.getElementById("soundIcon");

  if (world.soundManager.isMuted) {
    soundIcon.textContent = "🔇";
    world.soundManager.muteAll();
  } else {
    soundIcon.textContent = "🔊";
    world.soundManager.unmuteAll();
  }

  localStorage.setItem("isMuted", world.soundManager.isMuted);
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


/**
 * @description Passt die Lautstärke basierend auf dem Sliderwert an.
 * @param {number} value - Der neue Lautstärkewert von 0 bis 1.
 */
function adjustVolume(value) {
  const volume = parseFloat(value);
  world.soundManager.setVolume(volume);

  localStorage.setItem("globalVolume", volume);
}

/**
 * @event DOMContentLoaded
 * @description Waits for the DOM to be fully loaded before initializing the game and setting up event listeners.
 * Handles orientation changes, full-screen toggling, and keyboard and touch events for user interaction.
 */
document.addEventListener("DOMContentLoaded", function () {
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
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

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
  document.getElementById("btnLeft").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    },
    { passive: false }
  );
  document.getElementById("btnLeft").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    },
    { passive: false }
  );
  document.getElementById("btnLeft").addEventListener(
    "touchcancel",
    (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    },
    { passive: false }
  );
  
  document.getElementById("btnRight").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    },
    { passive: false }
  );
  document.getElementById("btnRight").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    },
    { passive: false }
  );
  document.getElementById("btnRight").addEventListener(
    "touchcancel",
    (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    },
    { passive: false }
  );
  
  document.getElementById("btnJump").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.UP = true;
    },
    { passive: false }
  );
  document.getElementById("btnJump").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.UP = false;
    },
    { passive: false }
  );
  document.getElementById("btnJump").addEventListener(
    "touchcancel",
    (e) => {
      e.preventDefault();
      keyboard.UP = false;
    },
    { passive: false }
  );
  
  document.getElementById("btnThrow").addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keyboard.D = true;
    },
    { passive: false }
  );
  document.getElementById("btnThrow").addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keyboard.D = false;
    },
    { passive: false }
  );
  document.getElementById("btnThrow").addEventListener(
    "touchcancel",
    (e) => {
      e.preventDefault();
      keyboard.D = false;
    },
    { passive: false }
  );
});