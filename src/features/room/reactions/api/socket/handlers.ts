import { VideoEvents } from "@/entities/video/model/events";
import { videoSocket } from "@/shared/api/socket/socket";

const emitReaction = (roomId: string, emoji: string) => {
  videoSocket.emit(VideoEvents.NEW_REACTION, {
    roomId,
    emoji,
  });
};

export default emitReaction;
