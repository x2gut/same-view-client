import { Button, Input } from "@/shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useChat } from "../model/useChat";
import ChatHeader from "./ChatHeader";
import useMessageStore from "@/entities/message/model/store";
import clsx from "clsx";
import MessageCard from "@/entities/message/ui/Message";

interface ChatProps {
  roomId: string;
  username: string;
  setIsChatVisible?: (value: boolean) => void;
}

const Chat: FC<ChatProps> = ({
  roomId,
  username,
  setIsChatVisible,
}) => {
  const [messageValue, setMessageValue] = useState("");
  const { userMessages, systemMessages } = useMessageStore();
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
    <div className="w-full h-[920px] max-lg:h-[410px]">
      <ChatHeader setIsChatVisible={setIsChatVisible} />
      <div
        ref={chatContainerRef}
        style={{
          maxHeight: "calc(100% - 180px)",
          scrollbarWidth: "thin",
        }}
        className="px-5 py-4 overflow-y-auto reflex-grow scroll-smooth w-full scrol chat-scrollbar"
      >
        {systemMessages && systemMessages.length > 0 &&
        systemMessages.map(message => (
          <MessageCard key={message.timestamp} message={message.message} timestamp={message.timestamp} type="system"/>
        ))}
        {userMessages && userMessages.length > 0 && (
          userMessages.map((message) => (
            <div key={message.timestamp} className="px-2 mb-4 w-full overflow-x-hidden">
              <MessageCard
                senderUsername={message.username}
                username={username}
                message={message.message}
                timestamp={message.timestamp}
                type="user"
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-start pt-3 gap-5 items-center px-2 fixed bottom-0 w-full">
        <Input
          className="flex-1"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setMessageValue(event.target.value);
            handleUserTyping();
          }}
          value={messageValue}
          placeholder="Send a message"
          containerClassName="flex-1"
          fullWidth
        />
        <Button className="flex-0" onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
