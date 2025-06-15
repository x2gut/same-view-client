import React, { useId } from "react";

interface SwitchProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  labelPosition?: "left" | "right";
  activeColor?: string;
  inactiveColor?: string;
  id?: string;
}

const Switch = ({
  isChecked,
  onChange,
  className = "",
  disabled = false,
  size = "md",
  label,
  labelPosition = "right",
  activeColor = "bg-blue-600",
  inactiveColor = "bg-gray-200",
  id: externalId,
}: SwitchProps) => {
  // Generate unique id for accessibility if not provided
  const generatedId = useId();
  const id = externalId || `switch-${generatedId}`;

  // Size variants
  const sizeClasses = {
    sm: {
      container: "w-8 h-4",
      circle: "w-3 h-3",
      circlePosition: "left-0.5 top-0.5",
      labelPadding: "mx-1.5 text-sm",
    },
    md: {
      container: "w-11 h-6",
      circle: "w-4 h-4",
      circlePosition: "left-2 top-1",
      labelPadding: "mx-2 text-base",
    },
    lg: {
      container: "w-14 h-7",
      circle: "w-5 h-5",
      circlePosition: "left-1 top-1",
      labelPadding: "mx-2.5 text-base",
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <div
      className={`inline-flex items-center cursor-pointer${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      onClick={() => !disabled && onChange(!isChecked)}
    >
      {label && labelPosition === "left" && (
        <label
          htmlFor={id}
          className={`${sizeClasses[size].labelPadding} ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          aria-checked={isChecked}
        />
        <div
          className={`
            ${sizeClasses[size].container} 
            ${isChecked ? activeColor : inactiveColor} 
            rounded-full 
            peer 
            ${!disabled ? "cursor-pointer" : "cursor-not-allowed"} 
            transition-colors duration-200 ease-in-out
            peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50
          `}
        />
        <span
          className={`
            absolute 
            ${sizeClasses[size].circlePosition} 
            ${sizeClasses[size].circle} 
            bg-white 
            rounded-full 
            transition-transform duration-200 ease-in-out 
            ${isChecked ? "translate-x-full" : "-translate-x-1"}
            shadow-sm
          `}
        />
      </div>

      {label && labelPosition === "right" && (
        <label
          htmlFor={id}
          className={`${sizeClasses[size].labelPadding} ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;
