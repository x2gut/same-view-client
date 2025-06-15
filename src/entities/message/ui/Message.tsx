import { Avatar } from "@/shared/ui";
import { MessageCardProps } from "../model/type";
import { formatDuration } from "@/shared/lib/formatDuration";
import { Bell } from "lucide-react";

const MessageCard = (props: MessageCardProps) => {
  if (props.type === "system") {
    const { message, timestamp } = props;
    return (
      <div
        className={`p-4 mb-3 rounded-lg shadow-sm hover:shadow transition-shadow duration-200`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-4">
            <Bell size={15} strokeWidth={1.75} />
            <p className={`font-semibold`}>System</p>
          </div>
          <p className="text-xs text-gray-400">{formatDuration(timestamp)}</p>
        </div>
        <p className={`leading-relaxed mb-1`}>{message}</p>
      </div>
    );
  } else {
    const { username, senderUsername, timestamp, message } = props;
    const isOwnMessage = username === senderUsername;
    return (
      <div
        className={`p-4 mb-3 rounded-lg shadow-sm hover:shadow transition-shadow duration-200`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-4">
            <Avatar size="sm" />
            <p className={`font-semibold`}>
              {isOwnMessage ? "(You)" : senderUsername}
            </p>
          </div>
          <p className="text-xs text-gray-400">{formatDuration(timestamp)}</p>
        </div>
        <p className={`leading-relaxed mb-1`}>{message}</p>
      </div>
    );
  }
};

export default MessageCard;
