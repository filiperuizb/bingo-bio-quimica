"use client"

import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type Variant = "primary" | "accent" | "outline" | "danger" | "ghost"
type Size = "md" | "lg" | "xl"

interface ActionButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-primary to-primary/80 text-primary-foreground border-b-4 border-primary/60 shadow-[0_6px_0_#8b1a2b,0_8px_24px_rgba(0,0,0,0.4)] hover:brightness-110 active:border-b-2 active:shadow-[0_2px_0_#8b1a2b] active:translate-y-1",
  accent:
    "bg-gradient-to-b from-accent to-accent/80 text-accent-foreground border-b-4 border-accent/60 shadow-[0_6px_0_#b8cc42,0_8px_24px_rgba(0,0,0,0.4)] hover:brightness-110 active:border-b-2 active:shadow-[0_2px_0_#b8cc42] active:translate-y-1",
  outline:
    "border-2 border-accent/40 bg-secondary/60 text-foreground hover:bg-secondary hover:border-accent/60",
  danger:
    "bg-destructive/20 text-destructive border-2 border-destructive/50 hover:bg-destructive/30",
  ghost: "bg-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
}

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-14 px-7 text-base gap-2.5 rounded-2xl",
  xl: "h-[4.5rem] px-10 text-2xl gap-3 rounded-2xl uppercase tracking-wider",
}

export function ActionButton({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-heading font-normal tracking-wide outline-none transition-[filter,transform,box-shadow] focus-visible:ring-4 focus-visible:ring-ring/50 cursor-pointer disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:translate-y-0 disabled:border-b-4 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
