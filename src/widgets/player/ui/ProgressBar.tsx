import { formatTime } from "@/shared/lib/formatTime";
import { Tooltip } from "@/shared/ui";
import ProgressBar from "@/shared/ui/ProgressBar";
import { FC, useRef, useState } from "react";

interface ProgressBarProps {
  totalDuration: number;
  currentDuration?: number;
  handleSeek?: (seconds: number) => void;
}

const PlayerProgressBar: FC<ProgressBarProps> = ({
  totalDuration,
  currentDuration = 0,
  handleSeek,
}) => {
  const [hoverTime, setHoverTime] = useState(0);
  const [hoverPosition, setHoverPosition] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const percent = totalDuration > 0 ? currentDuration / totalDuration : 0;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const boundaryClient = progressBarRef.current?.getBoundingClientRect();
    if (!boundaryClient) return;

    const hoverX = event.clientX - boundaryClient?.left;
    const percentX = hoverX / boundaryClient?.width;
    const timeAtHover = percentX * totalDuration;

    setHoverTime(timeAtHover);
    setHoverPosition(hoverX);
  };

  const handlePlayerWrapperClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!handleSeek) return;

    const rect = progressBarRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = event.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const seekTime = clickPercent * totalDuration;
    
    handleSeek(seekTime);
  };

  return (
    <Tooltip
      content={formatTime(hoverTime)}
      style={{ left: `${hoverPosition}px` }}
    >
      <div
        className="w-full cursor-pointer"
        ref={progressBarRef}
        onClick={handlePlayerWrapperClick}
        onMouseMove={handleMouseMove}
      >
        <ProgressBar
          className="w-full"
          value={percent * 100}
          animated={false}
        />
      </div>
    </Tooltip>
  );
};

export default PlayerProgressBar;
