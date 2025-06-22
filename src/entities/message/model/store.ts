import { create } from "zustand";
import { Message, SystemMessage, UserMessage } from "./type";

interface MessageStore {
  hasNewMessages: boolean;
  userMessages: UserMessage[];
  systemMessages: SystemMessage[];
  addMessage: (message: Message) => void;
  setHasNewMessages: (value: boolean) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  hasNewMessages: false,
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
  setHasNewMessages: (value) => set({ hasNewMessages: value }),
}));

export default useMessageStore;
