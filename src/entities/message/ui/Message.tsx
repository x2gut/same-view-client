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
      <div className={`w-full mb-4 ${isOwnMessage ? "flex justify-end" : ""}`}>
        {!isOwnMessage && (
          <div className="mb-1">
            <p className="text-sm font-medium text-gray-600 px-4">
              {senderUsername}
            </p>
          </div>
        )}

        <div className="flex items-end gap-3 max-w-[70%] min-w-0">
          {!isOwnMessage && <Avatar size="sm" className="flex-shrink-0" />}

          <div className="flex flex-col">
            <div
              className={`px-4 py-3 rounded-2xl ${
                isOwnMessage
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              <p className="leading-relaxed break-words break-all w-full overflow-wrap-anywhere">
                {message}
              </p>
            </div>

            <p
              className={`text-xs text-gray-400 mt-1 px-2 ${
                isOwnMessage ? "text-right" : "text-left"
              }`}
            >
              {formatDuration(timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default MessageCard;
