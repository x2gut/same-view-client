import { useEffect, useState } from "react";

import { VoiceChatEvents } from "@/entities/voiceChat/model/events";
import useVoiceChatStore from "@/entities/voiceChat/model/store";
import {
  UserJoinVoiceData,
  UserLefVoiceData,
  VoiceChatUser,
} from "@/entities/voiceChat/model/type";
import { voiceChatSocket } from "@/shared/api/socket/socket";

const useVoiceChatSocketEvents = () => {
  const { addUser, removeUser, setUsers } = useVoiceChatStore();

  useEffect(() => {
    voiceChatSocket.on(
      VoiceChatEvents.USER_JOINED,
      (data: UserJoinVoiceData) => {
        addUser({
          username: data.username,
          isDeaf: false,
          isMuted: false,
          id: data.id,
        });
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
    };
  }, []);
};

export default useVoiceChatSocketEvents;
