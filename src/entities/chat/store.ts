import { create } from "zustand";

interface ChatStore {
  isChatVisible: boolean;
  users: string[];
  usersTyping: string[];
  setUsersTyping: (user: string) => void;
  setUsers: (users: string[]) => void;
  toggleChatVisible: () => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  isChatVisible: true,
  toggleChatVisible: () =>
    set((state) => ({ isChatVisible: !state.isChatVisible })),
  users: [],
  setUsers: (users) =>
    set(() => ({
      users: users,
    })),
  usersTyping: [],
  setUsersTyping: (user) => {
    const { usersTyping } = get();
    if (usersTyping.includes(user)) {
      return;
    }
    set((state) => ({ usersTyping: [...state.usersTyping, user] }));

    setTimeout(() => {
      set((state) => ({
        usersTyping: state.usersTyping.filter((u) => u !== user),
      }));
    }, 1000);
  },
}));

export default useChatStore;
