import useRoomStore from "@/entities/room/model/roomStore";
import { useLocation } from "react-router-dom";
import { chatSocket } from "@/shared/api/socket/socket";
import { ChatEvents } from "@/entities/chat/events";
import useChatSocketEvents from "./useChatSocketEvents";
import { useEffect } from "react";
import useDebounce from "@/shared/hooks/useDebounce";

export const useChat = ({
  roomId,
  username,
}: {
  roomId: string;
  username: string;
}) => {
  const location = useLocation();
  const { setRoomId } = useRoomStore();
  useChatSocketEvents();

  const handleUserTyping = useDebounce(() => {
    chatSocket.emit(ChatEvents.USER_IS_TYPING, {
      roomId,
      username,
    });
  }, 200);

  const joinChat = (roomId: string, username: string) => {
    if (location.pathname.includes("room")) {
      if (!chatSocket.connected) {
        chatSocket.connect();
      }

      chatSocket.emit(ChatEvents.ON_USER_JOIN, { username, roomId });
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
    chatSocket.disconnect();
  };

  useEffect(() => {
    joinChat(roomId, username);

    return () => {
      onLeave();
    };
  }, [location.pathname]);

  return {
    sendMessage,
    joinChat,
    handleUserTyping,
    onLeave,
    location,
  };
};
