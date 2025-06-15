import { useForm } from "react-hook-form";
import { joinRoomRequest } from "../api/rest/joinRoom";
import { useNavigate } from "react-router-dom";
import { RoomJoined } from "@/entities/room/model/type";
import { BaseApiError } from "@/shared/api/rest/exceptions/base-exception";
import toast from "react-hot-toast";
import { buildRoute } from "@/shared/lib/buildRoute";
import { useUserStore } from "@/entities/user/model/userStore";
import { useVideoStore } from "@/entities/video/model/store";
import { chatSocket, videoSocket } from "@/shared/api/socket/socket";

const useJoinRoom = () => {
  const { handleSubmit, register } = useForm();
  const { setUsername } = useUserStore();
  const { setVideoUrl } = useVideoStore();
  const navigate = useNavigate();

  const joinRoom = async ({
    roomKey,
    username,
    password,
  }: {
    roomKey: string;
    username: string;
    password?: string;
  }): Promise<RoomJoined> => {
    try {
      const roomData = await joinRoomRequest(roomKey, username, password);

      videoSocket.connect();
      chatSocket.connect();

      navigate(buildRoute(roomData.data.roomId), {
        state: {
          roomKey: roomData.data.roomKey,
          roomName: roomData.data.roomName,
          password: password,
        },
      });

      setUsername(username);
      setVideoUrl(roomData.data.video.url);

      return roomData;
    } catch (error) {
      if (error instanceof BaseApiError) {
        if (error.statusCode === 401) toast.error("Invalid password");
        else if (error.statusCode === 404) toast.error("Room not found");
      }
    }
  };

  return { joinRoom, handleSubmit, register };
};

export default useJoinRoom;
