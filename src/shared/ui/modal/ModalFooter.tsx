import { PropsWithChildren } from "react";

interface ModalFooterProps extends PropsWithChildren {
  className?: string;
}

const ModalFooter = ({ children, className = "" }: ModalFooterProps) => (
  <div
    className={`p-4 border-t border-accent flex justify-end space-x-2 ${className}`}
  >
    {children}
  </div>
);

export default ModalFooter;
