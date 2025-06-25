import { VideoEvents } from "@/entities/video/model/events";
import { videoSocket } from "@/shared/api/socket/socket";

export const setVideo = (videoUrl: string, roomId: string) => {
  videoSocket.emit(VideoEvents.SET_VIDEO, {
    videoUrl,
    roomId,
  });
};
