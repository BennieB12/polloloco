class AudioManager {
    static audioElements = [];
  

    static registerAudio(audio) {
      this.audioElements.push(audio);
    }
  
    static muteAll() {
      this.audioElements.forEach((audio) => {
        audio.volume = 0;
      });
    }
  
    static unmuteAll() {
      this.audioElements.forEach((audio) => {
        audio.volume = 1;
      });
    }
  }
  
  const GAMESTART_SOUND = new Audio("audio/start.mp3");
  AudioManager.registerAudio(GAMESTART_SOUND);
  