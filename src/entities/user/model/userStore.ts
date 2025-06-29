import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStoreProps {
  username: string;
  isOwner: boolean;
  setUsername: (username: string) => void;
  setIsOwner: (value: boolean) => void;
}

export const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      username: null,
      isOwner: false,
      setIsOwner: (value) => set({ isOwner: value }),
      setUsername: (username) => set({ username: username }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        username: state.username,
        isOwner: state.isOwner,
      }),
    }
  )
);
