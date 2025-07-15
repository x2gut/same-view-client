import { Avatar } from "@/shared/ui";
import { Bell } from "lucide-react";
import formatDuration from "@/shared/lib/formatDuration";
import clsx from "clsx";

export type MessageCardProps =
  | {
      type: "system";
      message: string;
      timestamp: string;
    }
  | {
      type: "user";
      username: string;
      senderUsername: string;
      message: string;
      timestamp: string;
      isLastMessage: boolean;
    };

const MessageCard = (props: MessageCardProps) => {
  if (props.type === "system") {
    const { message, timestamp } = props;
    return (
      <div className="w-full mb-3 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Bell size={12} strokeWidth={1.5} />
          <span>{message}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{formatDuration(timestamp)}</span>
        </div>
      </div>
    );
  } else {
    const { username, senderUsername, timestamp, message, isLastMessage } =
      props;
    const isOwnMessage = username === senderUsername;
    return (
      <div className={`w-full mb-4 ${isOwnMessage ? "flex justify-end" : ""}`}>
        <div className="flex items-end gap-3 max-w-[70%] min-w-0">
          {!isOwnMessage && isLastMessage && (
            <Avatar name={senderUsername} size="sm" className="flex-shrink-0" />
          )}

          <div className="flex flex-col">
            <div
              className={`px-4 py-3 rounded-2xl ${
                isOwnMessage
                  ? clsx(
                      "bg-blue-500 text-white",
                      isLastMessage && "rounded-br-md"
                    )
                  : clsx(
                      "bg-gray-100 text-gray-800",
                      isLastMessage && "rounded-bl-md"
                    )
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
              {isLastMessage && formatDuration(timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default MessageCard;
