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

  const handleProgressBarWrapperClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!handleSeek) return;

    handleSeek(hoverTime);
  };

  return (
    <Tooltip
      content={formatTime(hoverTime)}
      style={{ left: `${hoverPosition}px` }}
    >
      <div
        className="relative w-full cursor-pointer"
        ref={progressBarRef}
        onClick={handleProgressBarWrapperClick}
        onMouseMove={handleMouseMove}
      >
        <ProgressBar
          className="w-full"
          value={percent * 100}
          animated={false}
        />
        <span
          className="block absolute rounded-full bg-blue-500 size-3 top-1/2 -translate-x-2 -translate-y-1/2"
          style={{
            left: `${percent * 100}%`,
          }}
        ></span>
      </div>
    </Tooltip>
  );
};

export default PlayerProgressBar;
