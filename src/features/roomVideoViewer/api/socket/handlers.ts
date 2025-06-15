import { VideoEvents } from "@/entities/video/model/events";
import { videoSocket } from "@/shared/api/socket/socket";

export const joinVideoRoom = (roomId: string) => {
  videoSocket.emit(VideoEvents.ON_USER_JOIN, { roomId });
};

export const leaveVideoRoom = () => {
  videoSocket.disconnect();
};
