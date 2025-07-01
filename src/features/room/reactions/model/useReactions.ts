import useReactionStore from "@/entities/reaction/model/store";
import { useEffect, useRef, useState } from "react";

const useReactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState([]);
  const { setReactions } = useReactionStore();

  const handleEmojiSelect = (emoji: string) => {
    setRecentEmojis((prev) => {
      const filtered = prev.filter((e) => e !== emoji);
      return [emoji, ...filtered].slice(0, 3);
    });
    setReactions(emoji);
    setIsOpen(false);
  };

  return {
    isOpen,
    recentEmojis,
    handleEmojiSelect,
    setIsOpen,
  };
};

export default useReactions;
