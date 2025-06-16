import { useEffect, useRef, } from "react";
import useRoomStore from "@/entities/room/model/roomStore";
import { useUserStore } from "@/entities/user/model/userStore";
import { YoutubeControls } from "react-youtube-light";
import {
  emitPauseVideo,
  emitResumeVideo,
  emitSeekTo,
} from "../api/socket/handlers";
import usePlayerSocketEvents from "./usePlayerSocketEvents";
import { useVideoStore } from "@/entities/video/model/store";

const useYoutubePlayer = () => {
  const { roomId } = useRoomStore();
  const { username } = useUserStore();
  const { setTotalDuration, setTimecode, setIsPaused } = useVideoStore();
  const playerControlsRef = useRef<YoutubeControls>(null);
  usePlayerSocketEvents({ playerControlsRef });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = playerControlsRef.current?.getCurrentTime();
      if (currentTime) {
        setTimecode(currentTime);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [setTimecode]);

  const handlePause = () => {
    emitPauseVideo(roomId, username);
    setIsPaused(true)
  };

  const handlePlay = () => {
    emitResumeVideo(roomId, username);
    setIsPaused(false)
  };

  const handleSeek = (seconds: number) => {
    emitSeekTo(roomId, seconds, username);
  };

  const handleChangeVolume = (value: number) => {
    playerControlsRef.current?.setVolume(value);
  };

  const onVideoLoaded = () => {
    const player = playerControlsRef.current.getPlayer();
    const timecode = useVideoStore.getState().timecode;
    const duration = player.getDuration();
    setTotalDuration(duration);

    player.seekTo(timecode, true);

    setTimeout(() => {
      if (player && typeof player.unMute === "function") {
        player.unMute();
        player.pauseVideo();
      }
    }, 500);
  };

  const handleClickOnPlayer = () => {
    const currentPlayerState = playerControlsRef.current?.videoState();
    if (
      currentPlayerState === YT.PlayerState.PAUSED ||
      currentPlayerState === YT.PlayerState.UNSTARTED ||
      currentPlayerState === YT.PlayerState.CUED
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
    playerControlsRef,
    onVideoLoaded,
    handleChangeVolume,
  };
};

export default useYoutubePlayer;
