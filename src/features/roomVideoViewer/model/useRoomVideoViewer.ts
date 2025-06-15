import { useLocation } from "react-router-dom";
import { joinVideoRoom, leaveVideoRoom } from "../api/socket/handlers";

export const useRoomVideoViewer = () => {
  const location = useLocation();

  const joinRoomVideo = (roomId: string) => {
    if (location.pathname.includes("room")) {
      joinVideoRoom(roomId);
    }
  };

  const leaveRoomVideo = () => {
    leaveVideoRoom();
  };

  return { joinRoomVideo, leaveRoomVideo };
};
