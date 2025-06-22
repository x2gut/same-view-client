import { useState } from "react";
import UsersListDropdown from "./UsersListDropdown";
import { ArrowRightFromLine, Users } from "lucide-react";
import useChatStore from "@/entities/chat/store";

const ChatHeader = ({
  setIsChatVisible,
}: {
  setIsChatVisible: (value: boolean) => void;
}) => {
  const { users, usersTyping } = useChatStore();
  const [isUserListVisible, setIsUserListVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsUserListVisible(true);
  };

  const handleMouseLeave = () => {
    setIsUserListVisible(false);
  };

  const TypingIndicator = () => (
    <div className="inline-flex items-center gap-1 ml-2">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  const renderTypingUsers = () => {
    if (usersTyping.length === 0) return null;

    const names = usersTyping.join(", ");

    return (
      <div className="px-5 pb-3 animate-in slide-in-from-top-2 duration-300">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="max-w-[200px] truncate">{names}</span>
            <span className="text-muted font-normal">typing</span>
          </div>
          <TypingIndicator />
        </div>
      </div>
    );
  };

  return (
    <div className="relative border-b border-accent">
      <div className="flex justify-between items-center px-2">
        <button onClick={() => setIsChatVisible(false)} className="p-1 hover:bg-active/30 duration-200 cursor-pointer rounded-md">
          <ArrowRightFromLine size={24} />
        </button>
        <h2 className="block px-5 py-5 text-lg font-medium">Chat</h2>
        <div
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Users size={16} strokeWidth={1.75} />
          <span className="text-sm font-medium">{users.length} / 5</span>
          {isUserListVisible && <UsersListDropdown users={users} />}
        </div>
      </div>

      {renderTypingUsers()}
    </div>
  );
};

export default ChatHeader;
