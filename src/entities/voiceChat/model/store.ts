import { create } from "zustand";
import { VoiceChatUser, VoiceSettings } from "./type";

interface VoiceChatProps {
  users: VoiceChatUser[];
  isConnected: boolean;
  voiceSettings: VoiceSettings;
  changeVoiceSetting: (
    key: keyof VoiceSettings,
    value: VoiceSettings[keyof VoiceSettings]
  ) => void;
  toggleIsConnected: () => void;
  addUser: (user: VoiceChatUser) => void;
  removeUser: (username: string) => void;
}

const useVoiceChatStore = create<VoiceChatProps>((set) => ({
  users: [],
  isConnected: false,
  voiceSettings: { isMuted: false, isDeaf: false },
  changeVoiceSetting: (key, value) =>
    set((state) => ({
      voiceSettings: { ...state.voiceSettings, [key]: value },
    })),
  toggleIsConnected: () =>
    set((state) => ({ isConnected: !state.isConnected })),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (username) =>
    set((state) => ({
      users: state.users.filter((user) => user.username !== username),
    })),
}));

export default useVoiceChatStore;
