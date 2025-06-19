import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRoomRequest } from "../api/rest/createRoom";
import { buildRoute } from "@/shared/lib/buildRoute";
import { useUserStore } from "@/entities/user/model/userStore";
import { RoomLocalStorage } from "@/entities/room/model/type";

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

    const roomDataToSave = {
      roomId: roomData.data.roomId,
      roomName: roomName,
      roomKey: roomData.data.roomKey,
      isPrivate: roomData.data.isPrivate,
      createdAt: roomData.data.createdAt,
    };

    const rooms: Array<RoomLocalStorage> =
      JSON.parse(localStorage.getItem("rooms")) || [];

    if (rooms.length >= 3) {
      rooms.shift()
    }

    rooms.push(roomDataToSave);
    localStorage.setItem("rooms", JSON.stringify(rooms));
  };

  return { createRoom, handleSubmit, register, errors };
};

export default useCreateRoom;
