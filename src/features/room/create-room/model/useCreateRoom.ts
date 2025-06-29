import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRoomRequest } from "../api/rest/createRoom";
import { useUserStore } from "@/entities/user/model/userStore";
import { RoomLocalStorage } from "@/entities/room/model/type";
import buildRoute from "@/shared/lib/buildRoute";
import saveRoomToLocalStorage from "../lib/saveRoomToLocalStorage";

interface CreateRoomForm {
  roomName: string;
  username: string;
  password?: string;
}

const useCreateRoom = () => {
  const navigate = useNavigate();
  const { setUsername, setIsOwner } = useUserStore();
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
    setIsOwner(roomData.data.isOwner);

    navigate(buildRoute(String(roomData.data.roomId)), {
      state: {
        roomName: roomData.data.roomName,
        roomKey: roomData.data.roomKey,
      },
    });

    const roomDataToSave = {
      roomId: roomData.data.roomId,
      roomName: roomName,
      roomKey: roomData.data.roomKey,
      isPrivate: roomData.data.isPrivate,
      createdAt: roomData.data.createdAt,
    };

    saveRoomToLocalStorage(roomDataToSave);
  };

  return { createRoom, handleSubmit, register, errors };
};

export default useCreateRoom;
