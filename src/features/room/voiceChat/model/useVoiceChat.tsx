import { useUserStore } from "@/entities/user/model/userStore";
import useVoiceChatStore from "@/entities/voiceChat/model/store";
import { VoiceChatUser } from "@/entities/voiceChat/model/type";
import { voiceChatSocket } from "@/shared/api/socket/socket";
import { Avatar, Badge } from "@/shared/ui";
import clsx from "clsx";
import { Crown } from "lucide-react";
import { emitVoiceChatJoin } from "../api/socket/handlers";
import useRoomStore from "@/entities/room/model/roomStore";
import useVoiceChatSocketEvents from "./useVoiceChatSocketEvents";
import useWebRTC from "@/shared/hooks/useWebRTC";

const useVoiceChat = () => {
  const {
    users,
    isConnected,
    toggleIsConnected,
    voiceSettings,
    changeVoiceSetting,
    removeUser,
  } = useVoiceChatStore();
  const { username, isOwner } = useUserStore();
  const { roomId } = useRoomStore();
  useVoiceChatSocketEvents();
  const {
    startCaptureSound,
    createOffer,
    exitRoom,
    remoteStreamList,
    toggleMute,
  } = useWebRTC();

  const renderUserBadge = (user: VoiceChatUser) => {
    return (
      <li
        className={clsx(
          "border-border border-2 p-2 rounded-lg hover:border-accent duration-200 flex items-center justify-between mb-3"
        )}
        key={user.username}
      >
        {remoteStreamList.map(({ userId, stream }) => (
          <audio
            className="hidden"
            key={userId}
            muted={voiceSettings.isDeaf}
            autoPlay
            ref={(el) => {
              if (el) el.srcObject = stream;
            }}
          />
        ))}
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

  const handleRecordAudio = async () => {};

  const onVoiceChatConnect = () => {
    if (!voiceChatSocket.connected) {
      voiceChatSocket.connect();
    }
    emitVoiceChatJoin(roomId, username);
    startCaptureSound();

    users.forEach((user) => {
      createOffer(user.id);
    });
  };

  const onVoiceChatDisconnect = () => {
    voiceChatSocket.disconnect();

    removeUser(username);
    exitRoom();
  };

  const handleVoiceChatConnection = () => {
    isConnected ? onVoiceChatDisconnect() : onVoiceChatConnect();
    toggleIsConnected();
  };

  const voiceSettingsActions = {
    handleMute: () => {
      changeVoiceSetting("isMuted", true);
      toggleMute();
    },
    handleUnMute: () => {
      changeVoiceSetting("isMuted", false);
      toggleMute();
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
    handleRecordAudio,
    renderUserBadge,
    users,
    isConnected,
    voiceSettings,
    onVoiceChatConnect,
    voiceSettingsActions,
  };
};

export default useVoiceChat;
