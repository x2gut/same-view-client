import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className="h-screen w-full fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{
          opacity: 0,
          translateY: 25,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        onClick={(event) => event.stopPropagation()}
        className={`rounded-lg shadow-lg bg-card max-w-md w-full max-h-[90vh] overflow-auto ${className}`}
      >
        <div>{children}</div>
      </motion.div>
    </div>,
    document.body
  );
};

export default Modal;
