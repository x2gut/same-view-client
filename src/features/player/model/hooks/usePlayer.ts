import { RefObject, useEffect, useRef } from "react";
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
import checkPermissions from "@/shared/lib/checkPermissions";

const usePlayer = (player: Player) => {
  const { roomId, roomPermissions } = useRoomStore();
  const { username, isOwner } = useUserStore();
  const {
    setTotalDuration,
    setTimecode,
    setIsPaused,
    setIsLoading,
    isPaused,
    isFullscreen,
    toggleFullscreen,
  } = useVideoStore();
  usePlayerSocketEvents(player);
  
  useEffect(() => {
    if (!player || isPaused) return;

    const interval = setInterval(() => {
      const currentTime = player?.getCurrentTime();
      if (currentTime) {
        setTimecode(currentTime);
      }
    }, 500);

    setTotalDuration(player.getDuration());

    return () => clearInterval(interval);
  }, [player, isPaused]);

  const handlePause = () => {
    if (!checkPermissions(isOwner, roomPermissions.playback)) return;

    emitPauseVideo(roomId, username);
    setIsPaused(true);
  };

  const handleFullscreen = (containerRef: RefObject<HTMLDivElement>) => {
    toggleFullscreen();
    isFullscreen
      ? document.exitFullscreen()
      : containerRef.current?.requestFullscreen();
  };

  const handlePlay = () => {
    if (!checkPermissions(isOwner, roomPermissions.playback)) return;

    emitResumeVideo(roomId, username);
    setIsPaused(false);
  };

  const handleSeek = (seconds: number, emitToServer: boolean = true) => {
    if (!checkPermissions(isOwner, roomPermissions.playback)) return;

    setIsLoading(true);

    if (emitToServer) {
      emitSeekTo(roomId, seconds, username);
      return;
    }

    player.seekTo(seconds);
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
    handleFullscreen,
  };
};

export default usePlayer;
