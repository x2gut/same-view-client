import { Smile } from "lucide-react";
import { Button } from "@/shared/ui";
import { emojis } from "@/entities/reaction/model/emojis";
import useReactions from "../model/useReactions";
import { useEffect, useRef } from "react";

const ReactionButton = () => {
  const { isOpen, setIsOpen, recentEmojis, handleEmojiSelect } = useReactions();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-2">
      {recentEmojis.length > 0 && (
        <div className="flex gap-1">
          {recentEmojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiSelect(emoji)}
              className="w-8 h-8 flex items-center justify-center hover:bg-accent/30 rounded text-sm cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <Button variant="ghost" size="small" onClick={toggleDropdown}>
        <Smile size={20} />
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-bg border-border rounded-lg shadow-md p-1 flex gap-1 z-10"
        >
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiSelect(emoji)}
              className="w-7 h-7 flex items-center justify-center hover:bg-accent/30 rounded"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionButton;
