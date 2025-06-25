import { useLocation } from "react-router-dom";
import { joinVideoRoom, leaveVideoRoom } from "../api/socket/handlers";
import { useEffect, useState } from "react";
import { videoSocket } from "@/shared/api/socket/socket";
import { useVideoStore } from "@/entities/video/model/store";

export const useRoomVideoViewer = ({
  roomId,
  videoLink,
}: {
  roomId: string;
  videoLink: string;
}) => {
  const { setIsLoading } = useVideoStore();
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
    if (videoLink) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [videoLink]);

  return {
    handleIframeLoad,
    hasError,
  };
};
