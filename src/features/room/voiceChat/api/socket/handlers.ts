import { VoiceChatEvents } from "@/entities/voiceChat/model/events";
import { VoiceChatUser } from "@/entities/voiceChat/model/type";
import { voiceChatSocket } from "@/shared/api/socket/socket";

export const emitVoiceChatJoin = (roomId: string, username: string) => {
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

export const emitChangeUserStatus = (
  roomId: string,
  user: Omit<VoiceChatUser, "id">
) => {
  voiceChatSocket.emit(VoiceChatEvents.CHANGE_USER_STATUS, {
    roomId,
    user,
  });
};
