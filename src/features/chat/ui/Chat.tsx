import { Button, Input } from "@/shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useChat } from "../model/useChat";
import MessageCard from "../../../entities/message/ui/Message";
import ChatHeader from "./ChatHeader";
import useMessageStore from "@/entities/message/model/store";

interface ChatProps {
  roomId: string;
  username: string;
}

const Chat: FC<ChatProps> = ({ roomId, username }) => {
  const [messageValue, setMessageValue] = useState("");
  const { userMessages } = useMessageStore();
  const { sendMessage, handleUserTyping } = useChat({ roomId, username });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  const handleSendMessage = () => {
    sendMessage({
      senderUsername: username,
      message: messageValue,
      roomId: roomId,
    });
    setMessageValue("");

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
          onChange={(event) => {
            setMessageValue(event.target.value);
            handleUserTyping();
          }}
          value={messageValue}
          placeholder="Send a message"
          fullWidth
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
