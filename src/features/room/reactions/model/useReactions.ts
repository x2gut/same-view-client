import useReactionStore from "@/entities/reaction/model/store";
import { useEffect, useState } from "react";
import emitReaction from "../api/socket/handlers";
import useRoomStore from "@/entities/room/model/roomStore";
import { videoSocket } from "@/shared/api/socket/socket";
import { VideoEvents } from "@/entities/video/model/events";

const useReactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState([]);
  const { setReactions } = useReactionStore();
  const { roomId, roomPermissions } = useRoomStore();

  const handleEmojiSelect = (emoji: string) => {
    setRecentEmojis((prev) => {
      const filtered = prev.filter((e) => e !== emoji);
      return [emoji, ...filtered].slice(0, 3);
    });
    setIsOpen(false);
    if (roomPermissions.reactions === "disabled") return;
    emitReaction(roomId, emoji);
  };

  useEffect(() => {
    videoSocket.on(VideoEvents.NEW_REACTION, (data: { emoji: string }) => {
      setReactions(data.emoji);

      return () => videoSocket.off(VideoEvents.NEW_REACTION);
    });
  }, []);

  return {
    isOpen,
    recentEmojis,
    handleEmojiSelect,
    setIsOpen,
  };
};

export default useReactions;
