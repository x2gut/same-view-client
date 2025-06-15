import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const NavLink = ({
  children,
  to,
  className = "",
}: {
  children: ReactNode;
  to: string;
  className?: string;
}) => {
  return (
    <Link
      to={to}
      className={clsx(
        "block hover:bg-[var(--accent)] duration-200 py-2 px-4 rounded-md",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
