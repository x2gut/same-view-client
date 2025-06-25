import { RoomCreated } from "@/entities/room/model/type";
import { apiClient } from "@/shared/api/rest/client";

export const createRoomRequest = async (
  roomName: string,
  hostName: string,
  password?: string
): Promise<RoomCreated> => {
  return await apiClient.post("room/new", { roomName, hostName, password });
};
