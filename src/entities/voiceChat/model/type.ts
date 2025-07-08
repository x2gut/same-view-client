export type VoiceChatUser = {
  username: string;
  isMuted: boolean;
  isDeaf: boolean;
};

export type VoiceChat = {
  startedAt: Date;
};

export type VoiceSettings = {
  isMuted: boolean;
  isDeaf: boolean;
};
