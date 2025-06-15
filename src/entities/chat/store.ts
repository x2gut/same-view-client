import { create } from "zustand";

interface ChatStore {
  users: string[];
  setUsers: (users: string[]) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  users: [],
  setUsers: (users) =>
    set(() => ({
      users: users,
    })),
}));

export default useChatStore;
