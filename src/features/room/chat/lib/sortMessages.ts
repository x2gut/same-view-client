import { UserMessage } from "@/entities/message/model/type";

export const sortMessages = (messages: UserMessage[]) => {
  return messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
};
