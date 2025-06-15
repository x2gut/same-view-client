import { FC } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
}

const variantStyles = {
  primary: "bg-blue-500 text-white hover:brightness-110 duration-200",
  secondary: "bg-transparent hover:brightness-80 duration-200 border-2 border-[var(--accent)]",
  ghost: "bg-transparent hover:bg-[var(--accent)] duration-200",
};

const sizeStyles = {
  small: "text-sm py-2 px-6",
  medium: "text-base py-3 px-8",
  large: "text-lg py-4 px-10",
};

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        "rounded-md font-medium cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
