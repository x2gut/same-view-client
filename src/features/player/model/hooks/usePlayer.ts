import { useCallback, useEffect, useRef } from "react";
import useRoomStore from "@/entities/room/model/roomStore";
import { useUserStore } from "@/entities/user/model/userStore";
import usePlayerSocketEvents from "./usePlayerSocketEvents";
import { useVideoStore } from "@/entities/video/model/store";
import {
  emitPauseVideo,
  emitResumeVideo,
  emitSeekTo,
} from "../../api/socket/handlers";
import { Player, PlayerState } from "@/entities/player/model/types";

const usePlayer = (player: Player) => {
  const { roomId } = useRoomStore();
  const { username } = useUserStore();
  const { setTotalDuration, setTimecode, setIsPaused, setIsLoading } =
    useVideoStore();
  usePlayerSocketEvents(player);

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      const currentTime = player?.getCurrentTime();
      if (currentTime) {
        setTimecode(currentTime);
      }
    }, 500);

    setTotalDuration(player.getDuration());

    return () => clearInterval(interval);
  }, [player]);

  const handlePause = () => {
    emitPauseVideo(roomId, username);
    setIsPaused(true);
  };

  const handlePlay = () => {
    emitResumeVideo(roomId, username);
    setIsPaused(false);
  };

  const handleSeek = (seconds: number) => {
    setIsLoading(true);
    emitSeekTo(roomId, seconds, username);
  };

  const handleChangeVolume = (value: number) => {
    player.setVolume(value);
  };

  const handleClickOnPlayer = () => {
    const currentPlayerState = player?.videoState();
    if (
      currentPlayerState === PlayerState.PAUSED ||
      currentPlayerState === PlayerState.UNSTARTED ||
      currentPlayerState === PlayerState.CUED
    ) {
      handlePlay();
    } else {
      handlePause();
    }
  };

  return {
    handlePause,
    handlePlay,
    handleSeek,
    handleClickOnPlayer,
    handleChangeVolume,
  };
};

export default usePlayer;
