import { Player, PlayerState } from "../types";

export class HTMLPlayerAdapter implements Partial<Player> {
  constructor(private player: HTMLVideoElement) {
    this.player = player;
  }

  videoState() {
    if (this.player.ended) return PlayerState.ENDED;
    if (
      this.player.seeking ||
      this.player.networkState === HTMLMediaElement.NETWORK_LOADING
    ) {
      return PlayerState.BUFFERING;
    }
    if (this.player.readyState === HTMLMediaElement.HAVE_NOTHING) {
      return PlayerState.UNSTARTED;
    }
    return this.player.paused ? PlayerState.PAUSED : PlayerState.PLAYING;
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }

  seekTo(seconds: number) {
    this.player.fastSeek(seconds);
  }

  getVolume() {
    return this.player.volume;
  }

  setVolume(volume: number) {
    this.player.volume = Math.max(0, Math.min(100, volume)) / 100;
  }

  getCurrentTime() {
    return this.player.currentTime;
  }

  getDuration() {
    return this.player.duration;
  }

  mute(): void {
    this.player.muted = true;
  }

  unmute(): void {
    this.player.muted = false;
  }

  isPlayerReady(): boolean {
    return this.player.readyState >= HTMLMediaElement.HAVE_METADATA;
  }

  getPlayer() {
    return this.player;
  }
}
