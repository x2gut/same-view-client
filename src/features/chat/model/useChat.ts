import useRoomStore from "@/entities/room/model/roomStore";
import { useLocation } from "react-router-dom";
import { onJoinChat, onLeaveChat } from "../api/socket/handlers";
import { chatSocket } from "@/shared/api/socket/socket";
import { ChatEvents } from "@/entities/chat/events";
import useChatSocketEvents from "./useChatSocketEvents";
import { useEffect } from "react";

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

  const joinChat = (roomId: string, username: string) => {
    if (location.pathname.includes("room")) {
      
      if (!chatSocket.connected) {
        chatSocket.connect();
      }

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

  useEffect(() => {
    joinChat(roomId, username);

    return () => {
      onLeave();
    };
  }, [location.pathname]);

  return {
    sendMessage,
    joinChat,
    onLeave,
    location,
  };
};
