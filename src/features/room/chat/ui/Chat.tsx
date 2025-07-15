import { FC, useEffect, useRef } from "react";
import { useChat } from "../model/useChat";
import ChatHeader from "./components/ChatHeader";
import useMessageStore from "@/entities/message/model/store";
import MessageCard from "@/entities/message/ui/Message";
import ChatInput from "./components/ChatInput";
import { sortMessages } from "../lib/sortMessages";

interface ChatProps {
  roomId: string;
  username: string;
  setIsChatVisible?: (value: boolean) => void;
}

const Chat: FC<ChatProps> = ({ roomId, username, setIsChatVisible }) => {
  const { userMessages, systemMessages } = useMessageStore();
  const { sendMessage, handleUserTyping } = useChat({ roomId, username });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sortedMessages = sortMessages(userMessages);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  return (
    <div className="w-full max-w-md h-[920px] max-lg:h-[410px] max-lg:max-w-full">
      <ChatHeader setIsChatVisible={setIsChatVisible} />

      {systemMessages.length > 0 && (
        <div className="px-5 py-2 bg-bg border-b border-border">
          <div className="flex flex-wrap gap-2 text-sm">
            {systemMessages.slice(-2).map((message) => (
              <MessageCard
                type="system"
                message={message.message}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </div>
      )}

      <div
        ref={chatContainerRef}
        style={{
          maxHeight:
            systemMessages.length > 0
              ? "calc(100% - 280px)"
              : "calc(100% - 220px)",
          scrollbarWidth: "thin",
        }}
        className="px-5 py-4 overflow-y-auto flex-grow scroll-smooth w-full chat-scrollbar"
      >
        {sortedMessages &&
          sortedMessages.length > 0 &&
          sortedMessages.map((message, index) => {
            const nextMessage = userMessages[index + 1];
            const isLast =
              !nextMessage || nextMessage.username !== message.username;

            return (
              <div className={`${!isLast && "pl-11"}`}>
                <MessageCard
                  key={message.timestamp}
                  type="user"
                  message={message.message}
                  timestamp={message.timestamp}
                  username={username}
                  senderUsername={message.username}
                  isLastMessage={isLast}
                />
              </div>
            );
          })}
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
