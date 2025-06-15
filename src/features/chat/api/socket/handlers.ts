import { ChatEvents } from "@/entities/chat/events";
import { chatSocket } from "@/shared/api/socket/socket";

export const onJoinChat = (username: string, roomId: string) => {
  chatSocket.emit(ChatEvents.ON_USER_JOIN, { username, roomId });
};

//33

export const onLeaveChat = () => {
  chatSocket.disconnect();
};
