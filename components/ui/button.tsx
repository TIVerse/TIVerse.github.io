"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: LucideIcon;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  className,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 shine-on-hover glow-hover";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#38BDF8] to-[#818CF8] text-white hover:opacity-95 shadow-lg shadow-[#38BDF8]/20",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-lg border border-white/10",
    outline: "border-2 border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-white",
  };

  const Component = href ? motion.a : motion.button;
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto:") || href?.startsWith("tel:");
  const isInternal = href?.startsWith("/");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const prefixedHref = isInternal && basePath && basePath !== "/" ? `${basePath}${href}` : href;

  return (
    <Component
      href={prefixedHref}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseClasses, variants[variant], className)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </Component>
  );
}
