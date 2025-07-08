import { useUserStore } from "@/entities/user/model/userStore";
import useVoiceChatStore from "@/entities/voiceChat/model/store";
import { VoiceChatUser } from "@/entities/voiceChat/model/type";
import useVoice from "@/shared/hooks/useVoice";
import { Avatar, Badge } from "@/shared/ui";
import clsx from "clsx";
import { Crown } from "lucide-react";

const useVoiceChat = () => {
  const {
    users,
    isConnected,
    toggleIsConnected,
    voiceSettings,
    changeVoiceSetting,
    addUser,
    removeUser,
  } = useVoiceChatStore();
  const { username, isOwner } = useUserStore();
  const { startRecordingAudio, stopRecordingAudio, isTalking } = useVoice();

  const renderUserBadge = (user: VoiceChatUser) => {
    return (
      <li
        className={clsx(
          "border-border border-2 p-2 rounded-lg hover:border-accent duration-200 flex items-center justify-between mb-3",
          isTalking && "border-success"
        )}
        key={user.username}
      >
        <div className="flex items-center gap-3">
          <Avatar size="sm" status="online" />
          {user.username}
        </div>
        <div>
          {isOwner && username === user.username ? (
            <Crown className="text-warning" />
          ) : (
            username === user.username && (
              <Badge outline shape="pill" size="lg">
                You
              </Badge>
            )
          )}
        </div>
      </li>
    );
  };

  const handleVoiceChatConnection = () => {
    isConnected
      ? removeUser(username)
      : addUser({ username, isMuted: false, isDeaf: false });
    toggleIsConnected();
  };

  const voiceSettingsActions = {
    handleMute: () => {
      changeVoiceSetting("isMuted", true);
    },
    handleUnMute: () => {
      changeVoiceSetting("isMuted", false);
    },
    handleDeaf: () => {
      changeVoiceSetting("isDeaf", true);
    },
    handleUnDeaf: () => {
      changeVoiceSetting("isDeaf", false);
    },
  };

  return {
    handleVoiceChatConnection,
    startRecordingAudio,
    stopRecordingAudio,
    renderUserBadge,
    users,
    isConnected,
    voiceSettings,
    voiceSettingsActions,
  };
};

export default useVoiceChat;
