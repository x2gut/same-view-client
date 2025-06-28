import { useVideoStore } from "@/entities/video/model/store";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenButtonProps {
  toggleFullscreen: () => void;
}

const FullscreenButton = ({ toggleFullscreen }: FullscreenButtonProps) => {
  const { isFullscreen } = useVideoStore();

  return (
    <button
      className="p-2 hover:bg-amber-50/10 rounded-md cursor-pointer"
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </button>
  );
};

export default FullscreenButton;
