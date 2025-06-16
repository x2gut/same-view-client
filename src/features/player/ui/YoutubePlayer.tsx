import { useEffect, useState } from "react";
import { YoutubeFrame } from "react-youtube-light";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useVideoStore } from "@/entities/video/model/store";
import { formatTime } from "@/shared/lib/formatTime";
import useYoutubePlayer from "../model/useYoutubePlayer";
import { PauseButton, PlayerProgressBar, Volume } from "./components";

const YoutubePlayer = ({
  src,
  onVideoReady,
}: {
  src: string;
  onVideoReady: () => void;
}) => {
  const { totalDuration, timecode, isPaused } = useVideoStore();
  const {
    onVideoLoaded,
    handleClickOnPlayer,
    playerControlsRef,
    handleSeek,
    handlePause,
    handlePlay,
    handleChangeVolume,
  } = useYoutubePlayer();
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowCenterIcon, setShouldShowCenterIcon] = useState(false);

  useEffect(() => {
    setShouldShowCenterIcon(true);

    const timeout = setTimeout(() => {
      setShouldShowCenterIcon(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [isPaused]);

  return (
    <div className="relative w-full h-full">
      <YoutubeFrame
        hideControls
        ref={playerControlsRef}
        containerClassNames="w-full h-full"
        src={src}
        onVideoReady={() => {
          onVideoLoaded();
          onVideoReady();
        }}
      />
      <AnimatePresence>
        {shouldShowCenterIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.25 }}
            className="p-5 bg-gray-900/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-20"
          >
            {!isPaused ? (
              <Play className="w-16 h-16" />
            ) : (
              <Pause className="w-16 h-16" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="absolute inset-0 z-10"
        onClick={handleClickOnPlayer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div
        className={`absolute inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-out ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative p-4 space-y-3">
          <PlayerProgressBar
            handleSeek={handleSeek}
            totalDuration={totalDuration}
            currentDuration={timecode}
          />
          <div className="flex gap-20 items-center">
            <PauseButton
              handlePause={handlePause}
              handleResume={handlePlay}
              isVideoPaused={isPaused}
              className="text-white"
            />
            <div>
              {`${formatTime(timecode)}`}{" "}
              <span className="text-gray-400">{`/ ${formatTime(
                totalDuration
              )}`}</span>
            </div>
            <Volume changeVolume={handleChangeVolume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
