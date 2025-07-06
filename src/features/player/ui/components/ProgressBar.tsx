import useDrag from "@/shared/hooks/useDragging";
import formatTime from "@/shared/lib/formatTime";
import getBoundaryClientPercent from "@/shared/lib/getBoundaryClientPercent";
import { Tooltip } from "@/shared/ui";
import ProgressBar from "@/shared/ui/ProgressBar";
import { FC, useRef, useState } from "react";

interface ProgressBarProps {
  totalDuration: number;
  currentDuration?: number;
  handleSeek?: (seconds: number, emitToServer: boolean) => void;
  setTimecode: (value: number) => void;
}

const PlayerProgressBar: FC<ProgressBarProps> = ({
  totalDuration,
  currentDuration = 0,
  handleSeek,
  setTimecode,
}) => {
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState(0);
  const [hoverPosition, setHoverPosition] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const updateTime = (event: React.MouseEvent<HTMLDivElement>) => {
    const percent = getBoundaryClientPercent(progressBarRef, event.clientX);
    const timeAtHover = totalDuration * (percent / 100);

    setHoverTime(timeAtHover);
    setHoverPosition(percent);
  };

  useDrag(progressBarRef, {
    onDrag: (event) => {
      const percent = getBoundaryClientPercent(progressBarRef, event.clientX);
      const time = totalDuration * (dragPercent / 100);
      setDragPercent(percent);
      handleSeek(time, false);
    },
    onPointerUp: () => {
      if (handleSeek && dragPercent !== null) {
        const time = totalDuration * (dragPercent / 100);
        setTimecode(time);
        handleSeek(time, true);
      }
      setDragPercent(null);
    },
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updateTime(event);
  };

  const handleProgressBarWrapperClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!handleSeek) return;
    const percent = getBoundaryClientPercent(progressBarRef, event.clientX);
    const time = totalDuration * (percent / 100);
    handleSeek(time, true);
  };

  const progressPercent =
    dragPercent !== null
      ? dragPercent
      : totalDuration > 0
      ? (currentDuration / totalDuration) * 100
      : 0;

  return (
    <Tooltip
      content={formatTime(hoverTime)}
      style={{ left: `${hoverPosition}%` }}
    >
      <div
        className="relative w-full cursor-pointer"
        ref={progressBarRef}
        onClick={handleProgressBarWrapperClick}
        onMouseMove={handleMouseMove}
      >
        <ProgressBar
          className="w-full"
          value={progressPercent}
          animated={false}
        />
        <span
          className="block absolute rounded-full bg-blue-500 size-3 top-1/2 -translate-x-2 -translate-y-1/2"
          style={{
            left: `${progressPercent}%`,
          }}
        />
      </div>
    </Tooltip>
  );
};

export default PlayerProgressBar;
