import { create } from "zustand";

interface RoomStore {
  roomId?: string;
  setRoomId: (roomId: string) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  roomId: undefined,
  setRoomId: (roomId: string) => {
    set({ roomId: roomId });
  },
}));

export default useRoomStore;
