import { ReactNode } from "react";

export const CardHeader = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`mb-3 text-center ${className}`}>{children}</div>;
};

export const CardTitle = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={`font-medium mb-1 text-lg ${className}`}>{children}</h3>
  );
};

export const CardDescription = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`text-gray-500 text-sm ${className}`}>{children}</div>;
};

export const CardContent = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`mt-4 pt-4 border-t border-accent ${className}`}>
      {children}
    </div>
  );
};

export const Card = ({
  children,
  className = "",
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outline" | "ghost";
}) => {
  const variantClasses = {
    default: "border border-accent",
    elevated: "border border-accent shadow-md",
    outline: "border border-accent bg-transparent",
    ghost: "bg-gray-50",
  };

  return (
    <div className={`rounded-lg p-6 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};
