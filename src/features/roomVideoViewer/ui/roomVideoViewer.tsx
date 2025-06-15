import YoutubePlayer from "@/widgets/player/ui/YoutubePlayer";
import { Youtube, YoutubeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRoomVideoViewer } from "../model/useRoomVideoViewer";

const RoomVideoViewer = ({
  youtubeLink,
  roomId,
}: {
  youtubeLink?: string;
  roomId: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { joinRoomVideo, leaveRoomVideo } = useRoomVideoViewer();

  useEffect(() => {
    joinRoomVideo(roomId);

    return () => leaveRoomVideo();
  }, [location.pathname]);

  useEffect(() => {
    if (youtubeLink) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [youtubeLink]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-1 overflow-hidden rounded-lg shadow-inner">
      {youtubeLink ? (
        <div className="relative w-full h-full min-h-64">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-4 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
                <p className="text-gray-600">Loading video...</p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="p-6 text-center bg-white rounded-lg shadow-sm">
                <div className="flex justify-center mb-3 text-red-500">
                  <Youtube className="text-4xl" />
                </div>
                <h6 className="text-lg font-medium text-gray-900">
                  Unable to load video
                </h6>
                <p className="mt-2 text-sm text-gray-500">
                  There was a problem loading the video. Please check the URL
                  and try again.
                </p>
              </div>
            </div>
          )}
          <YoutubePlayer src={youtubeLink} onVideoReady={handleIframeLoad} />
        </div>
      ) : (
        <div className="max-w-sm p-8 text-center rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <YoutubeIcon className="text-6xl text-[var(--accent)]" />
          </div>
          <h6 className="text-xl font-medium">No video playing</h6>
          <p className="text-[var(--accent)] text-sm mt-3 mb-4">
            Use the input below to add a YouTube link
          </p>
          <div className="mt-2 text-xs text-[var(--accent)]">
            Supported formats: YouTube links
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomVideoViewer;
