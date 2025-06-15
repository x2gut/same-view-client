import { create } from "zustand";
import { Message, SystemMessage, UserMessage } from "./type";

interface MessageStore {
  userMessages: UserMessage[];
  systemMessages: SystemMessage[];
  addMessage: (message: Message) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  userMessages: [],
  systemMessages: [],
  addMessage: (message) => {
    message.type === "system"
      ? set((state) => ({
          systemMessages: [...state.systemMessages, message as SystemMessage],
        }))
      : set((state) => ({
          userMessages: [...state.userMessages, message as UserMessage],
        }));
  },
}));

export default useMessageStore;
