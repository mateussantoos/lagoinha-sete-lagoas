import { AnchorHTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

type ButtonProps = {
  text: string;
  onclick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "white" | "black";
  children?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  MotionProps;

export const Button = ({
  text,
  onclick,
  href,
  variant = "primary",
  children,
  className = "",
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
        inline-block px-6 py-2 rounded-full font-(family-name:--font-lato) font-semibold
        transition-transform duration-300 ease-in-out
        hover:-translate-y-1 hover:opacity-90 cursor-pointer
        ${variantClasses}
        ${className}
      `}
      {...props}
    >
      {children ?? text}
    </motion.a>
  );
};
