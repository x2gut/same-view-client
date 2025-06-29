import useRoomStore from "@/entities/room/model/roomStore";
import { SettingOption } from "@/entities/room/model/type";
import {
  Crown,
  Pause,
  Play,
  SkipForward,
  SquarePlay,
  Users,
} from "lucide-react";

export const useRoomSettings = () => {
  const { setRoomPermission, roomPermissions } = useRoomStore();

  const videoOptions: SettingOption[] = [
    {
      id: "host",
      label: "Only Host",
      icon: Crown,
      iconColor: "text-warning",
      description: "Only the host can change the video",
      recommended: true,
    },
    {
      id: "all",
      label: "All Participants",
      icon: Users,
      iconColor: "text-blue-500",
      description: "Anyone can change the video",
      recommended: false,
    },
  ];

  const playbackOptions: SettingOption[] = [
    {
      id: "host",
      label: "Only Host",
      icon: Crown,
      iconColor: "text-warning",
      description: "Only the host can control playback",
      recommended: true,
    },
    {
      id: "all",
      label: "All Participants",
      icon: Users,
      iconColor: "text-blue-500",
      description: "Anyone can pause, play, and seek",
      recommended: false,
    },
  ];

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
    setRoomPermission,
    videoOptions,
    playbackOptions,
    getVideoSectionIcon,
    getPlaybackSectionIcon,
  };
};
