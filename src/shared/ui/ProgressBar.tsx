import { useState, useEffect } from "react";

interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error" | "info";
  showPercentage?: boolean;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
  label?: string;
  className?: string;
  onValueChange?: (value: number) => void;
}

const ProgressBar = ({
  value = 0,
  max = 100,
  size = "md",
  variant = "default",
  showPercentage = false,
  showValue = false,
  animated = true,
  striped = false,
  label,
  className = "",
  onValueChange,
}: ProgressBarProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animated && currentValue !== value) {
      setIsAnimating(true);
      const duration = 500;
      const steps = 30;
      const stepValue = (value - currentValue) / steps;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const newValue = currentValue + stepValue * step;

        if (step >= steps) {
          setCurrentValue(value);
          setIsAnimating(false);
          clearInterval(timer);
          onValueChange?.(value);
        } else {
          setCurrentValue(newValue);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      setCurrentValue(value);
    }
  }, [value, animated, currentValue, onValueChange]);

  const percentage = Math.min(Math.max((currentValue / max) * 100, 0), 100);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const variantClasses = {
    default: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    info: "bg-cyan-500",
  };

  const backgroundVariants = {
    default: "bg-blue-100 dark:bg-blue-900/20",
    success: "bg-green-100 dark:bg-green-900/20",
    warning: "bg-yellow-100 dark:bg-yellow-900/20",
    error: "bg-red-100 dark:bg-red-900/20",
    info: "bg-cyan-100 dark:bg-cyan-900/20",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
            {showValue && (
              <span>
                {Math.round(currentValue)}/{max}
              </span>
            )}
            {showPercentage && (
              <span className="font-medium">{Math.round(percentage)}%</span>
            )}
          </div>
        </div>
      )}

      <div
        className={`
          w-full rounded-full overflow-hidden
          ${sizeClasses[size]}
          ${backgroundVariants[variant]}
          transition-all duration-300
        `}
        role="progressbar"
        aria-valuenow={currentValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        <div
          className={`
            h-full rounded-full ease-out relative overflow-hidden
            ${variantClasses[variant]}
            ${isAnimating ? "transition-all duration-500" : ""}
            ${
              striped
                ? "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px] animate-pulse"
                : ""
            }
          `}
          style={{ width: `${percentage}%` }}
        >
          {animated && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"
              style={{
                animation: isAnimating ? "shimmer 1s ease-in-out" : "none",
              }}
            />
          )}

          {striped && (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  rgba(255,255,255,0.1),
                  rgba(255,255,255,0.1) 10px,
                  transparent 10px,
                  transparent 20px
                )`,
              }}
            />
          )}
        </div>
      </div>

      {isAnimating && (
        <div className="mt-1 flex items-center gap-2">
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
