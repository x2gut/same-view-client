import useRoomStore from "@/entities/room/model/roomStore";
import { RoomPermissions } from "@/entities/room/model/type";
import { Heart, Pause, Play, SkipForward, SquarePlay } from "lucide-react";
import { changeRoomPermissons } from "../api/socket/handlers/handlers";
import { useUserStore } from "@/entities/user/model/userStore";
import { useEffect } from "react";
import { videoSocket } from "@/shared/api/socket/socket";
import { VideoEvents } from "@/entities/video/model/events";

export const useRoomSettings = () => {
  const { username, isOwner } = useUserStore();
  const { setRoomPermission, roomPermissions, roomId } = useRoomStore();

  const handleChangeRoomPermission = <T extends keyof RoomPermissions>(
    key: T,
    value: RoomPermissions[T]
  ) => {
    if (!isOwner) return;
    const newRoomPermission = {
      ...roomPermissions,
      [key]: value,
    };
    changeRoomPermissons(username, roomId, newRoomPermission);
  };

  useEffect(() => {
    videoSocket.on(
      VideoEvents.CHANGE_ROOM_PERMISSIONS,
      (data: { hostName: string; permissions: RoomPermissions }) => {
        Object.entries(data.permissions).forEach(([key, value]) => {
          setRoomPermission(key as keyof RoomPermissions, value);
        });
      }
    );

    return () => {
      videoSocket.off(VideoEvents.CHANGE_ROOM_PERMISSIONS);
    };
  }, []);

  const getReactionsIcon = () => (
    <div className="p-2 bg-error/20 rounded-md">
      <Heart className="text-error" size={20} />
    </div>
  );

  const getVideoSectionIcon = () => (
    <div className="p-2 bg-error/20 rounded-md">
      <SquarePlay className="text-error" size={20} />
    </div>
  );

  const getPlaybackSectionIcon = () => (
    <div className="p-2 bg-blue-500/20 rounded-md">
      <div className="flex items-center gap-1">
        <Play className="text-blue-500" size={16} />
        <Pause className="text-blue-500" size={16} />
        <SkipForward className="text-blue-500" size={16} />
      </div>
    </div>
  );

  return {
    roomPermissions,
    handleChangeRoomPermission,
    getVideoSectionIcon,
    getPlaybackSectionIcon,
    getReactionsIcon,
  };
};
