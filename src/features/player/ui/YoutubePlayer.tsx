import { useEffect, useRef, useState } from "react";
import { YoutubeControls, YoutubeFrame } from "react-youtube-light";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useVideoStore } from "@/entities/video/model/store";
import { formatTime } from "@/shared/lib/formatTime";
import { PauseButton, PlayerProgressBar, Volume } from "./components";
import { YoutubePlayerAdapter } from "@/entities/player/model/adapters/youtubePlayerAdapter";
import usePlayer from "../model/hooks/usePlayer";
import FullscreenButton from "./components/fullscreenButton";

const YoutubePlayer = ({
  src,
  onVideoReady,
}: {
  src: string;
  onVideoReady: () => void;
}) => {
  const { totalDuration, isPaused, timecode } = useVideoStore();
  const youtubePlayerControls = useRef<YoutubeControls>(null);
  const [youtubePlayerAdapter, setYoutubePlayerAdapter] =
    useState<YoutubePlayerAdapter | null>(null);

  const {
    handleClickOnPlayer,
    handleSeek,
    handlePause,
    handlePlay,
    handleChangeVolume,
    handleFullscreen,
  } = usePlayer(youtubePlayerAdapter);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowCenterIcon, setShouldShowCenterIcon] = useState(false);
  const youtubeContainerRef = useRef<HTMLDivElement | null>(null);

  const handleVideoReady = () => {
    if (!youtubePlayerControls.current) {
      return;
    }
    const adapter = new YoutubePlayerAdapter(youtubePlayerControls.current);
    setYoutubePlayerAdapter(adapter);
    onVideoReady();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          handleSeek(timecode - 10);
          break;
        case "ArrowRight":
          event.preventDefault();
          handleSeek(timecode + 10);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSeek]);

  useEffect(() => {
    setShouldShowCenterIcon(true);

    const timeout = setTimeout(() => {
      setShouldShowCenterIcon(false);
    }, 250);

    return () => clearTimeout(timeout);
  }, [isPaused]);

  return (
    <div className="relative w-full h-full z-0" ref={youtubeContainerRef}>
      <YoutubeFrame
        hideControls
        ref={youtubePlayerControls}
        containerClassNames="absolute w-full h-full z-0"
        src={src}
        onVideoReady={handleVideoReady}
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
        className="absolute inset-0"
        onClick={handleClickOnPlayer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div
        className={`absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out z-[9998] ${
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
            <div className="ml-auto">
              <FullscreenButton
                toggleFullscreen={() => {
                  handleFullscreen(youtubeContainerRef);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
