"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FestiveCardProps {
  children: ReactNode
  className?: string
  delay?: number
  title?: string
  description?: string
  icon?: ReactNode
}

export function FestiveCard({
  children,
  className,
  delay = 0,
  title,
  description,
  icon,
}: FestiveCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={cn(
        "bingo-gold-border bingo-ticket-notch relative overflow-hidden rounded-2xl bg-card/90 p-5 backdrop-blur-sm sm:p-6",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
        aria-hidden="true"
      />

      {title ? (
        <div className="mb-4 flex items-center gap-3">
          {icon ? (
            <span className="flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-secondary text-accent shadow-inner">
              {icon}
            </span>
          ) : null}
          <div>
            <h2 className="font-heading text-xl font-normal tracking-wide text-accent">{title}</h2>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      ) : null}
      {children}
    </motion.section>
  )
}
