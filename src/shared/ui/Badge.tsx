import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light";
  size?: "sm" | "md" | "lg";
  shape?: "default" | "rounded" | "pill";
  dot?: boolean;
  dotOnly?: boolean;
  outline?: boolean;
  /** Optional icon to show before text */
  icon?: ReactNode;
  /** Optional icon to show after text */
  trailingIcon?: ReactNode;
  /** Makes the badge a counter with number */
  count?: number;
  /** Truncates large numbers (e.g., 1000 to 999+) */
  max?: number;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  shape = "default",
  dot = false,
  dotOnly = false,
  outline = false,
  icon,
  trailingIcon,
  count,
  max,
  onClick,
  className = "",
}: BadgeProps) => {
  // Determine content based on props
  const content =
    count !== undefined ? (max && count > max ? `${max}+` : count) : children;

  // Base style classes
  const baseClasses = "inline-flex items-center justify-center font-medium";

  // Size classes
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 leading-none",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-2.5 py-1.5",
  };

  // Shape classes
  const shapeClasses = {
    default: "rounded",
    rounded: "rounded-md",
    pill: "rounded-full",
  };

  // Variant color classes
  const variantClasses = {
    primary: outline
      ? "bg-transparent text-blue-600 border border-blue-600"
      : "bg-[var(--accent)]",
    secondary: outline
      ? "bg-transparent text-gray-600 border border-gray-600"
      : "bg-[var(--accent)] text-gray-800",
    success: outline
      ? "bg-transparent text-green-600 border border-green-600"
      : "bg-green-100 text-green-800",
    danger: outline
      ? "bg-transparent text-red-600 border border-red-600"
      : "bg-red-100 text-red-800",
    warning: outline
      ? "bg-transparent text-amber-600 border border-amber-600"
      : "bg-amber-100 text-amber-800",
    info: outline
      ? "bg-transparent text-cyan-600 border border-cyan-600"
      : "bg-cyan-100 text-cyan-800",
    dark: outline
      ? "bg-transparent text-gray-800 border border-gray-800"
      : "bg-[var(--accent)] text-gray-100",
    light: outline
      ? "bg-transparent text-gray-400 border border-gray-400"
      : "bg-[var(--accent)] text-gray-700",
  };

  // Dot styles
  const dotColorClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    danger: "bg-red-600",
    warning: "bg-amber-600",
    info: "bg-cyan-600",
    dark: "bg-gray-800",
    light: "bg-gray-400",
  };

  const dotSizeClasses = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
  };

  // Interactive styles
  const interactiveClasses = onClick
    ? "cursor-pointer hover:opacity-80 transition-opacity"
    : "";

  return (
    <span
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${shapeClasses[shape]}
        ${variantClasses[variant]}
        ${interactiveClasses}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {dotOnly ? (
        <span
          className={`
            inline-block rounded-full
            ${dotColorClasses[variant]}
            ${dotSizeClasses[size]}
          `}
        />
      ) : (
        <>
          {dot && (
            <span
              className={`
                inline-block rounded-full mr-1.5
                ${dotColorClasses[variant]}
                ${dotSizeClasses[size]}
              `}
            />
          )}

          {icon && <span className="mr-1">{icon}</span>}

          {content}

          {trailingIcon && <span className="ml-1">{trailingIcon}</span>}
        </>
      )}
    </span>
  );
};

export default Badge;
