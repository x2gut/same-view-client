import { VoiceChatEvents } from "@/entities/voiceChat/model/events";
import { voiceChatSocket } from "@/shared/api/socket/socket";

export const emitVoiceChatJoin = (roomId: string, username: string) => {
  console.log(roomId)
  voiceChatSocket.emit(VoiceChatEvents.USER_JOINED, {
    roomId,
    username,
  });
};

export const emitVoiceChatLeft = () => {
  voiceChatSocket.emit(VoiceChatEvents.USER_LEFT);
};

export const emitGetVoiceChatUsers = (roomId: string) => {
  voiceChatSocket.emit(VoiceChatEvents.GET_USERS, {
    roomId,
  });
};
