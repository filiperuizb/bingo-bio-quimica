"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ToggleSwitchProps {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  description?: string
}

export function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/30 p-4 text-left outline-none transition-colors hover:bg-secondary/50 focus-visible:ring-4 focus-visible:ring-ring/50 disabled:cursor-not-allowed"
    >
      <span className="space-y-0.5">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        {description ? (
          <span className="block text-xs text-muted-foreground">{description}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors",
          checked ? "bg-primary" : "bg-muted",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={cn(
            "size-5 rounded-full bg-background shadow",
            checked ? "ml-auto" : "ml-0",
          )}
        />
      </span>
    </button>
  )
}
