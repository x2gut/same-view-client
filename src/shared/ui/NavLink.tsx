import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const NavLink = ({
  children,
  to,
  className = "",
  onClick,
}: {
  children: ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={clsx(
        "block hover:bg-accent duration-200 py-2 px-4 rounded-md",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
