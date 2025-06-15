import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStoreProps {
  username: string;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username) => set({ username: username }),
    }),
    {
      name: "username",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ username: state.username }),
    }
  )
);
