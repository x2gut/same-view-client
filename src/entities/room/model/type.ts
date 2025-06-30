import { LucideIcon } from "lucide-react";

export interface Room {
  isOwner: boolean;
  roomId: string;
  roomName: string;
  hostName: string;
  password?: string;
  roomKey?: string;
  isPrivate: boolean;
  createdAt: Date;
  video?: {
    url?: string;
    timecode?: string;
  };
}

export interface RoomCreated {
  message: string;
  data: Room;
}

export interface RoomJoined {
  data: Room;
}

export type RoomLocalStorage = Pick<
  Room,
  "roomId" | "roomName" | "roomKey" | "isPrivate" | "createdAt"
>;

export type RoomPermissions = {
  video: "host" | "all";
  playback: "host" | "all";
};

export interface SettingOption {
  value: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  description: string;
  recommended: boolean;
}
