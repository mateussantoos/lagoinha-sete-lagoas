import { AnchorHTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  text: string;
  onclick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "white" | "black";
  children?: ReactNode;
  arrow?: boolean;
  icon?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  MotionProps;

export const Button = ({
  text,
  onclick,
  href,
  variant = "primary",
  children,
  className = "",
  arrow = true,
  icon,
  ...props
}: ButtonProps) => {
  const variantMap: Record<string, string> = {
    primary: "bg-[var(--color-primary)] text-[var(--color-background)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-background)]",
    white: "bg-white text-black",
    black: "bg-black text-white",
  };

  const variantClasses = variantMap[variant] ?? variantMap.primary;

  return (
    <motion.a
      onClick={onclick}
      href={href}
      className={`
        flex items-center w-fit px-6 py-3 rounded-full font-(family-name:--font-lato) font-semibold
        transition-transform duration-300 ease-in-out
        hover:-translate-y-1 hover:opacity-90 cursor-pointer gap-2
        ${variantClasses}
        ${className}
      `}
      {...props}
    >
      {icon && icon}
      {children ?? text}
      {arrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </motion.a>
  );
};
