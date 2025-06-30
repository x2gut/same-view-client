import useReactionStore from "@/entities/reaction/model/store";
import FloatingReaction from "@/entities/reaction/ui/floatingReaction";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

interface FloatingReactionsProps extends PropsWithChildren {}

const FloatingReactions = ({ children }: FloatingReactionsProps) => {
  const { reactions } = useReactionStore();

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full">{children}</div>

      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {reactions &&
            reactions.map((reaction) => (
              <motion.div
                key={reaction.id}
                initial={{
                  opacity: 1,
                  y: 0,
                }}
                animate={{
                  opacity: 0,
                  y: -150,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  transform: "translateX(-50%)",
                }}
              >
                <FloatingReaction emoji={reaction.emoji} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingReactions;
