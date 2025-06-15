import { Button, Input } from "@/shared/ui";
import { FC, useEffect, useRef } from "react";
import { useChat } from "../model/useChat";
import MessageCard from "../../../entities/message/ui/Message";
import ChatHeader from "./ChatHeader";
import useMessageStore from "@/entities/message/model/store";

interface ChatProps {
  roomId: string;
  username: string;
}

const Chat: FC<ChatProps> = ({ roomId, username }) => {
  const { userMessages } = useMessageStore();
  const { sendMessage, joinChat, onLeave, location } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    joinChat(roomId, username);

    return () => {
      onLeave();
    };
  }, [location.pathname]);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleSendMessage = () => {
    sendMessage({
      senderUsername: username,
      message: inputRef.current.value,
      roomId: roomId,
    });
    inputRef.current.value = "";
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <ChatHeader />
      <div
        ref={chatContainerRef}
        style={{
          maxHeight: "calc(100vh - 220px)",
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 #F1F5F9",
        }}
        className="px-5 py-4 overflow-y-auto reflex-grow scroll-smooth"
      >
        {userMessages && userMessages.length > 0 ? (
          userMessages.map((message, index) => (
            <div key={index} className="px-2 mb-4">
              <MessageCard
                senderUsername={message.username}
                username={username}
                message={message.message}
                timestamp={message.timestamp}
                type="user"
              />
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <div className="flex gap-5 py-3 items-center px-2 fixed bottom-0 border-t border-[var(--accent)] w-full">
        <Input
          onKeyDown={handleKeyDown}
          ref={inputRef}
          placeholder="Send a message"
          fullWidth
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
