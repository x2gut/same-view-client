import { VideoEvents } from "@/entities/video/model/events";
import { videoSocket } from "@/shared/api/socket/socket";

export const emitPauseVideo = (roomId: string, username: string) => {
  videoSocket.emit(VideoEvents.VIDEO_PAUSED, { roomId, username });
};

export const emitResumeVideo = (roomId: string, username: string) => {
  videoSocket.emit(VideoEvents.VIDEO_RESUMED, { roomId, username });
};

export const emitSeekTo = (
  roomId: string,
  seconds: number,
  username: string
) => {
  videoSocket.emit(VideoEvents.VIDEO_SEEKED, { roomId, seconds, username });
};
