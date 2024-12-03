class SoundManager {
  GAMESTART_SOUND = new Audio("audio/start.mp3");
  audioElements = [];

  registerAudio(audio) {
    this.audioElements.push(audio);
  }

  muteAll() {
    this.audioElements.forEach((audio) => {
      audio.volume = 0;
    });
    this.isMuted = true;
  }

  unmuteAll() {
    this.audioElements.forEach((audio) => {
      audio.volume = 1;
    });
    this.isMuted = false;
  }
}

// GAMESTART_SOUND = new Audio("audio/start.mp3");
// AudioManager.registerAudio(GAMESTART_SOUND);
  