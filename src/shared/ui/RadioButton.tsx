import { ChangeEvent } from "react";

type RadioButtonSize = "small" | "medium" | "large";
type RadioButtonColor = "blue" | "green" | "purple" | "red";

interface RadioButtonProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  size?: RadioButtonSize;
  color?: RadioButtonColor;
}

const RadioButton = ({
  name,
  value,
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "medium",
  color = "blue",
}: RadioButtonProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  const colorClasses = {
    blue: "border-blue-300 text-blue-600 focus:ring-blue-500",
    green: "border-green-300 text-green-600 focus:ring-green-500",
    purple: "border-purple-300 text-purple-600 focus:ring-purple-500",
    red: "border-red-300 text-red-600 focus:ring-red-500",
  };

  const labelSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            ${sizeClasses[size]} 
            ${colorClasses[color]}
            border-2 rounded-full
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:cursor-not-allowed
            transition-all duration-200 ease-in-out
            appearance-none
            ${checked ? "border-current" : "border-gray-300"}
          `}
        />
        {checked && (
          <div
            className={`
            absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
            ${
              size === "small"
                ? "w-2 h-2"
                : size === "medium"
                ? "w-2.5 h-2.5"
                : "w-3 h-3"
            }
            ${
              color === "blue"
                ? "bg-blue-600"
                : color === "green"
                ? "bg-green-600"
                : color === "purple"
                ? "bg-purple-600"
                : "bg-red-600"
            }
            rounded-full
            transition-all duration-200 ease-in-out
          `}
          />
        )}
      </div>
      {label && (
        <span
          className={`ml-2 ${labelSizeClasses[size]} ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default RadioButton;
