import MessageCard from "@/entities/message/ui/Message";
import useSystemMessages from "../model/useSystemMessages";
import useMessageStore from "@/entities/message/model/store";
import ProgressBar from "@/shared/ui/ProgressBar";
import { AnimatePresence, motion } from "framer-motion";

const SystemMessages = () => {
  const { systemMessages: messages } = useMessageStore();
  const {
    isVisible,
    setIsHovered,
    progress,
    notificationIndex,
    goToNext,
    goToPrevious,
  } = useSystemMessages({ messages });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: `var(--card)`,
            borderColor: "var(--accent)",
          }}
          className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 rounded-md shadow-lg border overflow-hidden max-w-md"
          initial={{
            opacity: 0,
            translateY: -25,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          exit={{
            opacity: 0,
            translateY: -25,
          }}
        >
          <ProgressBar className="w-full" max={85} value={progress} size="sm" />
          <div className="px-3 py-1">
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button
                  onClick={goToPrevious}
                  disabled={notificationIndex === 0}
                  className="w-6 h-6 rounded flex items-center justify-center text-sm hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed mt-1"
                  style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text)",
                  }}
                >
                  ←
                </button>
              )}
              <motion.div
                key={messages[notificationIndex].timestamp}
                initial={{
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="flex-1 min-w-0"
              >
                <MessageCard
                  type="system"
                  message={messages[notificationIndex].message}
                  timestamp={messages[notificationIndex].timestamp}
                />
              </motion.div>

              <div className="flex gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={goToNext}
                    disabled={notificationIndex === messages.length - 1}
                    className="w-6 h-6 rounded flex items-center justify-center text-sm hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed mt-1"
                    style={{
                      backgroundColor: "var(--bg)",
                      color: "var(--text)",
                    }}
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemMessages;
