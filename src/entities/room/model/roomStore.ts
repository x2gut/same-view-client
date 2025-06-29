import { create } from "zustand";
import { RoomPermissions } from "./type";

interface RoomStore {
  roomId?: string;
  roomPermissions: RoomPermissions;
  setRoomPermission: <T extends keyof RoomPermissions>(
    key: T,
    value: RoomPermissions[T]
  ) => void;
  setRoomId: (roomId: string) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  roomId: undefined,
  roomPermissions: {
    video: "host",
    playback: "host",
  },
  setRoomPermission: (key, value) =>
    set((state) => ({
      roomPermissions: {
        ...state.roomPermissions,
        [key]: value,
      },
    })),
  setRoomId: (roomId: string) => {
    set({ roomId: roomId });
  },
}));

export default useRoomStore;
