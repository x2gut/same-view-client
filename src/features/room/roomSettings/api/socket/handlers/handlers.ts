import { RoomPermissions } from "@/entities/room/model/type";
import { VideoEvents } from "@/entities/video/model/events";
import { videoSocket } from "@/shared/api/socket/socket";

export const changeRoomPermissons = (
  hostName: string,
  roomId: string,
  permissions: RoomPermissions
) => {
  videoSocket.emit(VideoEvents.CHANGE_ROOM_PERMISSIONS, {
    hostName,
    roomId,
    permissions,
  });
};
