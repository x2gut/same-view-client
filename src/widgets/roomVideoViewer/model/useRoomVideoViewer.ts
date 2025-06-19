import { useLocation } from "react-router-dom";
import { joinVideoRoom, leaveVideoRoom } from "../api/socket/handlers";
import { useEffect, useState } from "react";
import { videoSocket } from "@/shared/api/socket/socket";

export const useRoomVideoViewer = ({
  roomId,
  youtubeLink,
}: {
  roomId: string;
  youtubeLink: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const joinRoomVideo = (roomId: string) => {
    if (location.pathname.includes("room")) {
      if (!videoSocket.connected) {
        videoSocket.connect();
      }

      joinVideoRoom(roomId);
    }
  };

  const leaveRoomVideo = () => {
    leaveVideoRoom();
  };

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

  return {
    handleIframeLoad,
    isLoading,
    hasError,
  };
};
