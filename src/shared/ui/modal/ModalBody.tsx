import { PropsWithChildren } from "react";

interface ModalBodyProps extends PropsWithChildren {
  className?: string;
}

const ModalBody = ({ children, className = "" }: ModalBodyProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default ModalBody;
