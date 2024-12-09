class SoundManager {
  static instance;
  audioCache = new Map();
  audioPaths = {
    GAMESTART_SOUND: "audio/start.mp3",
    GAME_OVER_SOUND: "audio/game-over.mp3",
    GAME_WIN_SOUND: "audio/game-win.mp3",
    MENUBUTTON_SOUND: "audio/menu-button.mp3",
    START_SOUND: "audio/startsound.mp3",
    BACKGROUND_SOUND: "audio/background.mp3",
    COIN_SOUND: "audio/get-coin.mp3",
    GET_BOTTLE_SOUND: "audio/get-bottle.mp3",
    SPLASH_SOUND: "audio/splash.mp3",
    DEAD_ENDBOSS_SOUND: "audio/endboss-dead.mp3",
    ENDBOSS_JUMP_SOUND: "audio/minichicken-walk.mp3",
    ENDBOSS_HURT_SOUND: "audio/endboss-hurt.mp3",
    ENDBOSS_ATTACK_SOUND: "audio/endboss-attack.mp3",
    ENDBOSS_START_SOUND: "audio/endboss-start.mp3",
    DEAD_CHICKEN_SOUND: "audio/chicken_dead.mp3",
    MC_DEAD_SOUND: "audio/minichicken-dead.mp3",
    CHICKEN_HURT: "audio/chicken-hurt.mp3",
    WALKING_SOUND: "audio/walk_right.mp3",
    DEAD_SOUND: "audio/char-die.mp3",
    HURT_SOUND: "audio/char-hurt.mp3",
    IDLE_SOUND: "audio/snore-short.mp3",
    LONGIDLE_SOUND: "audio/snore-long.mp3",
    JUMP_SOUND: "audio/jump.mp3",
  };

  isMuted = false;
  globalVolume = 1;
  currentPlayingSound = null;

  constructor() {
    if (SoundManager.instance) {
      return SoundManager.instance;
    }
    SoundManager.instance = this;
  }

  /**
   * @description Loads an audio element and saves it.
   * @param {string} key - key for the audio
   * @returns {HTMLAudioElement} the loaded element.
   */
  getAudio(key) {
    if (this.audioCache.has(key)) {
      return this.audioCache.get(key);
    }
    const path = this.audioPaths[key];
    if (!path) {
      console.error(`Kein Audio-Pfad für ${key} gefunden.`);
      return null;
    }
    const audio = new Audio(path);
    audio.volume = this.globalVolume;
    this.audioCache.set(key, audio);
    return audio;
  }

  /**
   * @description plays a certain sound
   * @param {string} key - key
   * @param {boolean} loop - loop the sound?
   */
  playSound(key, loop = false) {
    if (this.isMuted) return;

    const audio = this.getAudio(key);
    if (audio) {
      audio.loop = loop;
      audio.volume = this.globalVolume;
      audio.play();
    }
  }

  /**
   * @description Stops a Sound.
   * @param {string} key - key for Sounds.
   */
  stopSound(key) {
    const audio = this.getAudio(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0; 
      audio.loop = false;
    }
  }

  /**
   * @description Mutes all Sounds.
   */
  muteAll() {
    this.isMuted = true;
    this.audioCache.forEach((audio) => (audio.muted = true));
  }

  /**
   * @description unmutes all Sounds.
   */
  unmuteAll() {
    this.isMuted = false;
    this.audioCache.forEach((audio) => (audio.muted = false));
  }

  /**
   * @description places the volume for all sounds.
   * @param {number} volume - min(silence) = 0 - max(highest volume) = 1
   */
  setVolume(volume) {
    this.globalVolume = Math.max(0, Math.min(volume, 1));
    this.audioCache.forEach((audio) => {
      audio.volume = this.globalVolume;
    });
  }

  /**
   * @description Stope all Sounds.
   */
  stopAllSounds() {
    this.audioCache.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}
