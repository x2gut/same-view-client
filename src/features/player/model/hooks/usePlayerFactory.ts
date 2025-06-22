import PlayerFactory from "@/entities/player/model/playerFactory";
import { PlayersType } from "@/entities/player/model/types";
import { YoutubeControls } from "react-youtube-light";
import { YoutubePlayerAdapter } from "@/entities/player/model/adapters/youtubePlayerAdapter";
import { HTMLPlayerAdapter } from "@/entities/player/model/adapters/htmlPlayerAdapter";

const usePlayerFactory = () => {
  const playerFactory = new PlayerFactory();

  function player(type: "youtube", element: YoutubeControls): YoutubePlayerAdapter;
  function player(type: "html", element: HTMLVideoElement): HTMLPlayerAdapter;

  function player(type: PlayersType, element: YoutubeControls | HTMLVideoElement) {
    return playerFactory.createAdapter(type, element);
  }

  return { player };
};

export default usePlayerFactory;
