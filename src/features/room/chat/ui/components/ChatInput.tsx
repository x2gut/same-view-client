import { Button, Input } from "@/shared/ui";
import { useState } from "react";

interface ChatInputProps {
  sendMessage: (message: string) => void;
  handleUserTyping: () => void;
  scrollToBottom: () => void;
}

const ChatInput = ({
  handleUserTyping,
  sendMessage,
  scrollToBottom,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");

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
    <>
      <Input
        className="flex-1"
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setMessage(event.target.value);
          handleUserTyping();
        }}
        value={message}
        placeholder="Send a message"
        containerClassName="flex-1"
        fullWidth
      />
      <Button className="flex-0" onClick={handleSendMessage}>
        Send
      </Button>
    </>
  );
};

export default ChatInput;
