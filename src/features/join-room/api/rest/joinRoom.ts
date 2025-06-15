import { RoomJoined } from "@/entities/room/model/type";
import { apiClient } from "@/shared/api/rest/client";

export const joinRoomRequest = async (
  roomKey: string,
  username: string,
  password?: string
): Promise<RoomJoined> => {
  return await apiClient.get(`room/key/${roomKey}`, {
    username: username,
    password: password,
  });
};
