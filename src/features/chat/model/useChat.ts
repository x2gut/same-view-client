import useRoomStore from "@/entities/room/model/roomStore";
import { useLocation } from "react-router-dom";
import { onJoinChat, onLeaveChat } from "../api/socket/handlers";
import { chatSocket } from "@/shared/api/socket/socket";
import { ChatEvents } from "@/entities/chat/events";
import useChatSocketEvents from "./useChatSocketEvents";

export const useChat = () => {
  const location = useLocation();
  const { setRoomId } = useRoomStore();
  useChatSocketEvents();

  const joinChat = (roomId: string, username: string) => {
    if (location.pathname.includes("room")) {
      onJoinChat(username, roomId);
      setRoomId(roomId);
    }
  };

  const sendMessage = ({
    message,
    senderUsername,
    roomId,
  }: {
    message: string;
    senderUsername: string;
    roomId: string;
  }) => {
    if (!message) return;

    chatSocket.emit(ChatEvents.NEW_MESSAGE, {
      username: senderUsername,
      message: message,
      roomId: roomId,
    });
  };

  const onLeave = () => {
    onLeaveChat();
  };

  return {
    sendMessage,
    joinChat,
    onLeave,
    location,
  };
};
