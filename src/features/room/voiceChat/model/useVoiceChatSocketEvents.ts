import { useEffect, useState } from "react";

import { VoiceChatEvents } from "@/entities/voiceChat/model/events";
import useVoiceChatStore from "@/entities/voiceChat/model/store";
import {
  UpdatedUser,
  UserJoinVoiceData,
  UserLefVoiceData,
  VoiceChatUser,
} from "@/entities/voiceChat/model/type";
import { voiceChatSocket } from "@/shared/api/socket/socket";

const useVoiceChatSocketEvents = () => {
  const { addUser, removeUser, setUsers, updateUser } = useVoiceChatStore();

  useEffect(() => {
    voiceChatSocket.on(
      VoiceChatEvents.USER_JOINED,
      (data: UserJoinVoiceData) => {
        addUser({
          username: data.username,
          id: data.id,
          settings: {
            isDeaf: false,
            isMuted: false,
          },
        });
      }
    );

    voiceChatSocket.on(
      VoiceChatEvents.CHANGE_USER_STATUS,
      (data: UpdatedUser) => {
        updateUser(data.updatedUser.username, data.updatedUser.settings);
      }
    );

    voiceChatSocket.on(VoiceChatEvents.USER_LEFT, (data: UserLefVoiceData) => {
      removeUser(data.username);
    });

    voiceChatSocket.on(
      VoiceChatEvents.GET_USERS,
      (data: { users: VoiceChatUser[] }) => {
        setUsers(data.users);
      }
    );

    return () => {
      voiceChatSocket.off(VoiceChatEvents.USER_JOINED);
      voiceChatSocket.off(VoiceChatEvents.USER_LEFT);
      voiceChatSocket.off(VoiceChatEvents.GET_USERS);
      voiceChatSocket.off(VoiceChatEvents.CHANGE_USER_STATUS);
    };
  }, []);
};

export default useVoiceChatSocketEvents;
