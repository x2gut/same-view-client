import { YoutubeControls } from "react-youtube-light";
import { Player, PlayerState } from "../types";

export class YoutubePlayerAdapter implements Player {
  private youtubePlayerControls: YoutubeControls;

  constructor(youtubePlayerControls: YoutubeControls) {
    if (!youtubePlayerControls) {
      throw new Error("YouTube controls must be provided and initialized");
    }
    this.youtubePlayerControls = youtubePlayerControls;
  }

  videoState() {
    const videoState = this.youtubePlayerControls.videoState();

    if (videoState === YT.PlayerState.ENDED) return PlayerState.ENDED;
    if (videoState === YT.PlayerState.BUFFERING) {
      return PlayerState.BUFFERING;
    }
    if (videoState === YT.PlayerState.UNSTARTED) {
      return PlayerState.UNSTARTED;
    }
    if (videoState === YT.PlayerState.CUED) {
      return PlayerState.CUED;
    }
    return videoState === YT.PlayerState.PAUSED
      ? PlayerState.PAUSED
      : PlayerState.PLAYING;
  }

  play() {
    this.youtubePlayerControls.play();
  }

  pause() {
    this.youtubePlayerControls.pause();
  }

  stop() {
    this.youtubePlayerControls.stop();
  }

  seekTo(seconds: number, allowSeekAhead?: boolean) {
    this.youtubePlayerControls.seekTo(seconds, allowSeekAhead);
  }

  getVolume() {
    return this.youtubePlayerControls.getVolume();
  }

  setVolume(volume: number) {
    this.youtubePlayerControls.setVolume(volume);
  }

  getCurrentTime() {
    return this.youtubePlayerControls.getCurrentTime();
  }

  getDuration() {
    return this.youtubePlayerControls.getDuration();
  }

  mute() {
    this.youtubePlayerControls.mute();
  }

  unmute(): void {
    this.youtubePlayerControls.unmute();
  }

  isPlayerReady(): boolean {
    return this.youtubePlayerControls.isPlayerReady();
  }

  loadVideoByUrl(url: string) {
    this.loadVideoByUrl(url);
  }

  getPlayer() {
    return this.youtubePlayerControls.getPlayer();
  }
}
