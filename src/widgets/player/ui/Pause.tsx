import { Pause, Play } from "lucide-react";

interface PauseButtonProps {
  isVideoPaused: boolean;
  handlePause: () => void;
  handleResume: () => void;
  className?: string;
}

const PauseButton = ({
  isVideoPaused,
  handlePause,
  handleResume,
  className,
}: PauseButtonProps) => {
  // 3
  return (
    <div className={className}>
      {isVideoPaused ? (
        <Play
          onClick={handleResume}
          className="w-7 h-7 p-1 hover:bg-amber-50/10 rounded-lg duration-200 cursor-pointer"
        />
      ) : (
        <Pause
          className="w-7 h-7 p-1 hover:bg-amber-50/10 rounded-lg duration-200 cursor-pointer"
          onClick={handlePause}
        />
      )}
    </div>
  );
};

export default PauseButton;
