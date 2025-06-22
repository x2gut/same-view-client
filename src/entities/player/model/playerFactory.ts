import { YoutubeControls } from "react-youtube-light";
import { HTMLPlayerAdapter } from "./adapters/htmlPlayerAdapter";
import { YoutubePlayerAdapter } from "./adapters/youtubePlayerAdapter";
import { PlayersType } from "./types";

class PlayerFactory {
  constructor() {}

  private createHTMLPlayer(element: HTMLVideoElement) {
    return new HTMLPlayerAdapter(element);
  }

  private createYoutubePlayer(element: YoutubeControls) {
    return new YoutubePlayerAdapter(element);
  }

  createAdapter<T extends PlayersType>(
    type: T,
    element: T extends "youtube" ? YoutubeControls : HTMLVideoElement
  ) {
    switch (type) {
      case "youtube":
        return this.createYoutubePlayer(element as YoutubeControls);
      case "html":
        return this.createHTMLPlayer(element as HTMLVideoElement);
    }
  }
}

export default PlayerFactory;