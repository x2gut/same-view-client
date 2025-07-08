import { X } from "lucide-react";
import { PropsWithChildren } from "react";

interface ModalHeaderProps extends PropsWithChildren {
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

const ModalHeader = ({
  children,
  onClose,
  showCloseButton = true,
  className = "",
}: ModalHeaderProps) => (
  <div
    className={`flex justify-between items-center p-4 border-b border-accent ${className}`}
  >
    {children}
    {showCloseButton && onClose && (
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-hover focus:outline-none focus:ring-2 focus:ring-active duration-200"
        aria-label="Close"
      >
        <X />
      </button>
    )}
  </div>
);

export default ModalHeader;
