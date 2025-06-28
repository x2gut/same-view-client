import { Tooltip } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Volume1, Volume2, VolumeX, Volume as VolumeIcon } from "lucide-react";
import { RefObject, useRef, useState } from "react";

interface VolumeProps {
  currentVolume?: number;
  changeVolume: (value: number) => void;
}

const Volume = ({ currentVolume = 100, changeVolume }: VolumeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(currentVolume);
  const volumeRef = useRef<HTMLDivElement>(null);

  const getBoundaryClientPercent = <T extends HTMLElement>(
    element: RefObject<T>,
    clientX: number
  ) => {
    const rect = element.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    return percent;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const percent = getBoundaryClientPercent(volumeRef, event.clientX);

    setVolume(percent);
    changeVolume(percent);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const percent = getBoundaryClientPercent(volumeRef, event.clientX);

    if (isDragging) {
      setVolume(percent);
      changeVolume(percent);
    }

    setHoverPosition(percent);
  };

  return (
    <div
      className="flex items-center gap-2 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) setIsDragging(false);
      }}
    >
      <div
        onClick={() => {
          if (volume === 0) {
            setVolume(50);
            changeVolume(50);
          } else {
            setVolume(0);
            changeVolume(0);
          }
        }}
        className="p-1 rounded hover:bg-amber-100/10 transition cursor-pointer flex items-center justify-center"
      >
        {volume === 0 ? (
          <VolumeX />
        ) : volume >= 50 ? (
          <Volume2 />
        ) : volume >= 25 ? (
          <Volume1 />
        ) : (
          <VolumeIcon />
        )}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseUp={() => {
              setIsDragging(false);
            }}
            onMouseDown={() => {
              setIsDragging(true);
            }}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(volume)}
            transition={{ duration: 0.15 }}
            key="volume-slider"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            exit={{ width: 0 }}
            ref={volumeRef}
            onClick={handleClick}
            className="bg-gray-500 h-1 rounded-xl cursor-pointer overflow-visible relative"
          >
            <Tooltip
              className="absolute"
              style={{ left: `${hoverPosition}%` }}
              content={`${hoverPosition.toFixed(0)}%`}
            >
              <div
                style={{ width: `${volume}%` }}
                className="bg-white h-1 rounded-xl transition-all duration-150"
              />
              <div
                style={{ left: `${volume}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white h-3 w-3 rounded-full shadow-md border border-gray-200"
              />
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Volume;
