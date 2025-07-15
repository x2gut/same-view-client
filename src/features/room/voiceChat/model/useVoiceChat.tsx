import { useUserStore } from "@/entities/user/model/userStore";
import useVoiceChatStore from "@/entities/voiceChat/model/store";
import { VoiceChatUser } from "@/entities/voiceChat/model/type";
import { voiceChatSocket } from "@/shared/api/socket/socket";
import { Avatar, Badge } from "@/shared/ui";
import clsx from "clsx";
import { Crown, MicOff, HeadphoneOff } from "lucide-react";
import {
  emitChangeUserStatus,
  emitVoiceChatJoin,
  emitVoiceChatLeft,
} from "../api/socket/handlers";
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
          <span>{user.username}</span>
          <div className="flex items-center gap-1">
            {user.settings?.isMuted && (
              <MicOff size={16} className="text-muted" />
            )}
            {user.settings?.isDeaf && (
              <HeadphoneOff size={16} className="text-muted" />
            )}
          </div>
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
    emitVoiceChatLeft();

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
      emitChangeUserStatus(roomId, {
        username: username,
        settings: {
          isMuted: true,
          isDeaf: voiceSettings.isDeaf,
        },
      });
    },
    handleUnMute: () => {
      changeVoiceSetting("isMuted", false);
      emitChangeUserStatus(roomId, {
        username: username,
        settings: {
          isMuted: false,
          isDeaf: voiceSettings.isDeaf,
        },
      });
      toggleMute();
    },
    handleDeaf: () => {
      changeVoiceSetting("isDeaf", true);
      emitChangeUserStatus(roomId, {
        username: username,
        settings: {
          isMuted: voiceSettings.isMuted,
          isDeaf: true,
        },
      });
    },
    handleUnDeaf: () => {
      changeVoiceSetting("isDeaf", false);
      emitChangeUserStatus(roomId, {
        username: username,
        settings: {
          isMuted: voiceSettings.isMuted,
          isDeaf: false,
        },
      });
    },
  };

  return {
    handleVoiceChatConnection,
    renderUserBadge,
    users,
    isConnected,
    voiceSettings,
    onVoiceChatConnect,
    voiceSettingsActions,
  };
};

export default useVoiceChat;
