import clsx from "clsx";
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
      className="w-full relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div
          style={style}
          className={clsx(
            "absolute -top-10 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-xl border border-white/10 transition-all duration-200 ease-out z-20",
            className
          )}
        >
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
