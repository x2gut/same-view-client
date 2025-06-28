export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

export interface Player {
  videoState: () => PlayerState;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number | undefined;
  getCurrentTime: () => number | undefined;
  getDuration: () => number | undefined;
  getPlayer?: () => unknown;
  loadVideoByUrl: (url: string) => void;
  mute: () => void;
  unmute: () => void;
  isPlayerReady: () => boolean;
}

export type PlayersType = "youtube" | "html";
