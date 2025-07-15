import { FC } from "react";
import clsx from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "custom";
  size?: "small" | "medium" | "large";
  isDisabled?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-primary text-white duration-200",
  secondary:
    "bg-transparent hover:brightness-80 duration-200 border-2 border-accent",
  ghost: "bg-transparent hover:bg-accent duration-200",
  custom: "",
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
  onClick,
  isDisabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      onClick={!isDisabled && onClick}
      className={clsx(
        "rounded-md font-medium active:scale-[1.01]",
        variantStyles[variant],
        sizeStyles[size],
        isDisabled
          ? "cursor-not-allowed brightness-50"
          : "cursor-pointer hover:brightness-105",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
