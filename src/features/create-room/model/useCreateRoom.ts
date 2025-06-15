import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRoomRequest } from "../api/rest/createRoom";
import { buildRoute } from "@/shared/lib/buildRoute";
import { useUserStore } from "@/entities/user/model/userStore";

interface CreateRoomForm {
  roomName: string;
  username: string;
  password?: string;
}

const useCreateRoom = () => {
  const navigate = useNavigate();
  const { setUsername } = useUserStore();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateRoomForm>();

  const createRoom = async ({
    roomName,
    username,
    password,
  }: {
    roomName: string;
    username: string;
    password?: string;
  }) => {
    const roomData = await createRoomRequest(roomName, username, password);
    setUsername(username);

    navigate(buildRoute(String(roomData.data.roomId)), {
      state: {
        roomName: roomData.data.roomName,
        roomKey: roomData.data.roomKey,
      },
    });
  };

  return { createRoom, handleSubmit, register, errors };
};

export default useCreateRoom;
