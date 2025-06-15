import { useState } from "react";
import UsersListDropdown from "./UsersListDropdown";
import { Users } from "lucide-react";
import useChatStore from "@/entities/chat/store";

const ChatHeader = () => {
  const { users } = useChatStore();
  const [isUserListVisible, setIsUserListVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsUserListVisible(true);
  };

  const handleMouseLeave = () => {
    setIsUserListVisible(false);
  };

  return (
    <div className="relative flex justify-between px-2 border-b border-[var(--accent)]">
      <h2 className="block px-5 py-5 text-lg font-medium">Chat</h2>
      <div
        className="flex items-center gap-1 text-gray-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Users size={15} strokeWidth={1.75} />
        {users.length} / 5
        {isUserListVisible && <UsersListDropdown users={users} />}
      </div>
    </div>
  );
};

export default ChatHeader;
