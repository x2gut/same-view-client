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
  return (
    <div className={className}>
      {isVideoPaused ? (
        <Play
          onClick={handleResume}
          className="w-8 h-8 p-1 hover:bg-amber-50/10 rounded-lg duration-200 cursor-pointer"
        />
      ) : (
        <Pause  
          className="w-8 h-8 p-1 hover:bg-amber-50/10 rounded-lg duration-200 cursor-pointer"
          onClick={handlePause}
        />
      )}
    </div>
  );
};

export default PauseButton;
