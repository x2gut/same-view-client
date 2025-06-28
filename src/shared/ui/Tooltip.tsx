import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";

interface TooltipProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  content: string;
}

const Tooltip = ({ className, style, children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="w-full relative select-none"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            style={style}
            className={clsx(
              "absolute -top-10 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-xl border border-white/10 transition-all duration-200 ease-out z-20",
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};

export default Tooltip;
