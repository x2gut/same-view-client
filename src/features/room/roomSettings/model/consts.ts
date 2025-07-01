import { SettingOption } from "@/entities/room/model/type";
import { Crown, ThumbsDown, ThumbsUp, Users } from "lucide-react";

export const videoOptions: SettingOption<"video">[] = [
  {
    value: "host",
    label: "Only Host",
    icon: Crown,
    iconColor: "text-warning",
    description: "Only the host can change the video",
    recommended: true,
  },
  {
    value: "all",
    label: "All Participants",
    icon: Users,
    iconColor: "text-blue-500",
    description: "Anyone can change the video",
    recommended: false,
  },
];

export const playbackOptions: SettingOption<"playback">[] = [
  {
    value: "host",
    label: "Only Host",
    icon: Crown,
    iconColor: "text-warning",
    description: "Only the host can control playback",
    recommended: true,
  },
  {
    value: "all",
    label: "All Participants",
    icon: Users,
    iconColor: "text-blue-500",
    description: "Anyone can pause, play, and seek",
    recommended: false,
  },
];

export const reactionsOptions: SettingOption<"reactions">[] = [
  {
    value: "enabled",
    label: "Enabled",
    icon: ThumbsUp,
    iconColor: "text-warning",
    description: "Only the host can control playback",
    recommended: true,
  },
  {
    value: "disabled",
    label: "Disabled",
    icon: ThumbsDown,
    iconColor: "text-blue-500",
    description: "Anyone can pause, play, and seek",
    recommended: false,
  },
];
