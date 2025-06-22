import { useState } from "react";
import { Avatar, Input } from "@/shared/ui";

const UsersListDropdown = ({
  users = [],
  onUserClick,
  maxHeight = "300px",
  showSearch = true,
}: {
  users: string[];
  onUserClick?: (userId: string) => void;
  maxHeight?: string;
  showSearch?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //   const handleUserClick = (userId: string) => {
  //     if (onUserClick) {
  //       onUserClick(userId);
  //     }
  //   };

  return (
    <div className="absolute right-0 z-10 w-64 py-1 mt-2 overflow-hidden border bg-card border-accent shadow-lg rounded-md">
      {users.length > 0 && (
        <>
          <div className="flex items-center justify-between px-3 py-2 border-b border-accent">
            <h3 className="text-sm font-medium text-text">Chat Users</h3>
            <span className="text-xs text-text">{users.length} users</span>
          </div>

          {showSearch && (
            <div className="px-3 py-2 border-b border-accent">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"></div>
                <Input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  placeholder="Search user"
                  size_="sm"
                  fullWidth
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto" style={{ maxHeight }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-2 transition-all duration-150 cursor-pointer hover:brightness-150"
                >
                  <Avatar status={"online"} size="sm" />
                  <span className="text-sm truncate text-text">{user}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-text">
                No users found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersListDropdown;
