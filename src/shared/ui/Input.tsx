import { clsx } from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix_?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
  size_?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outline" | "ghost";
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      prefix_,
      suffix,
      fullWidth = false,
      size_ = "md",
      variant = "default",
      className,
      inputClassName,
      labelClassName,
      errorClassName,
      hintClassName,
      containerClassName,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-3 text-base",
      lg: "py-3 px-4 text-lg"
    };
    
    // Variant classes
    const variantClasses = {
      default: "border",
      filled: "border border-transparent",
      outline: "border-2 bg-transparent",
      ghost: "border border-transparent bg-transparent hover:bg-gray-50"
    };
    
    // Disabled state
    const disabledClasses = disabled 
      ? "opacity-60 cursor-not-allowed bg-gray-100" 
      : "";

    // Full width
    const widthClasses = fullWidth ? "w-full" : "";

    // Error state
    const errorStateClasses = error 
      ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
      : "focus:border-blue-500 focus:ring-blue-500";

    return (
      <div className={clsx("flex flex-col", containerClassName)}>
        {label && (
          <label 
            className={clsx(
              "mb-1 font-medium", 
              disabled && "opacity-60",
              size_ === "sm" && "text-sm",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        
        <div 
          className={clsx(
            "relative flex items-center",
            widthClasses,
            className
          )}
        >
          {prefix_ && (
            <div className="absolute left-3 flex items-center pointer-events-none">
              {prefix_}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            {...rest}
            className={clsx(
              "rounded-md outline-none transition-colors",
              "focus:ring-2 focus:ring-opacity-20",
              "placeholder:text-[var(--accent)]",
              sizeClasses[size_],
              variantClasses[variant],
              errorStateClasses,
              disabledClasses,
              prefix_ && "pl-8",
              suffix && "pr-8",
              widthClasses,
              inputClassName
            )}
          />
          
          {suffix && (
            <div className="absolute right-3 flex items-center pointer-events-none">
              {suffix}
            </div>
          )}
        </div>
        
        {error && (
          <p className={clsx("mt-1 text-sm text-red-500", errorClassName)}>
            {error}
          </p>
        )}
        
        {!error && hint && (
          <p className={clsx("mt-1 text-sm", hintClassName)}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;