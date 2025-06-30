import { useState, useEffect } from "react";
import { calcRandomPosition } from "../lib/calcRandomPosition";

const FloatingReaction = ({ emoji }: { emoji: string }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setPosition(calcRandomPosition());
  }, []);

  if (!position) return null;

  return (
    <div
      className="absolute scale-200 "
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {emoji}
    </div>
  );
};

export default FloatingReaction;
