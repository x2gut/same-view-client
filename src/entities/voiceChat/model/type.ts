export type VoiceChatUser = {
  id: string;
  username: string;
  settings: VoiceSettings;
};

export type VoiceChat = {
  startedAt: Date;
};

export type VoiceSettings = {
  isMuted: boolean;
  isDeaf: boolean;
};

export type UserJoinVoiceData = {
  id: string;
  username: string;
  roomId: string;
};

export type UserLefVoiceData = {
  username: string;
};

export type UpdatedUser = {
  updatedUser: VoiceChatUser; 
};
