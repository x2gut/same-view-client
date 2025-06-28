import { Button, Input } from "@/shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useChat } from "../model/useChat";
import ChatHeader from "./components/ChatHeader";
import useMessageStore from "@/entities/message/model/store";
import MessageCard from "@/entities/message/ui/Message";
import ChatInput from "./components/ChatInput";

interface ChatProps {
  roomId: string;
  username: string;
  setIsChatVisible?: (value: boolean) => void;
}

const Chat: FC<ChatProps> = ({ roomId, username, setIsChatVisible }) => {
  const { userMessages, systemMessages } = useMessageStore();
  const { sendMessage, handleUserTyping } = useChat({ roomId, username });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const commonMessages = [...userMessages, ...systemMessages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  return (
    <div className="w-full h-[920px] max-lg:h-[410px]">
      <ChatHeader setIsChatVisible={setIsChatVisible} />
      <div
        ref={chatContainerRef}
        style={{
          maxHeight: "calc(100% - 220px)",
          scrollbarWidth: "thin",
        }}
        className="px-5 py-4 overflow-y-auto reflex-grow scroll-smooth w-full scrol chat-scrollbar"
      >
        {commonMessages &&
          commonMessages.length > 0 &&
          commonMessages.map((message) => (
            <div key={message.timestamp}>
              {message.type === "system" ? (
                <MessageCard
                  message={message.message}
                  timestamp={message.timestamp}
                  type="system"
                />
              ) : (
                <MessageCard
                  type="user"
                  senderUsername={message.username}
                  username={username}
                  timestamp={message.timestamp}
                  message={message.message}
                />
              )}
            </div>
          ))}
      </div>
      <div className="flex justify-start pt-3 gap-5 items-center px-2 fixed bottom-0 w-full">
        <ChatInput
          handleUserTyping={handleUserTyping}
          scrollToBottom={scrollToBottom}
          sendMessage={(message) =>
            sendMessage({
              message: message,
              senderUsername: username,
              roomId: roomId,
            })
          }
        />
      </div>
    </div>
  );
};

export default Chat;
