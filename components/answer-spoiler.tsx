"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnswerSpoilerProps {
  resposta: string
  resetKey?: string | number
  className?: string
  compact?: boolean
}

export function AnswerSpoiler({ resposta, resetKey, className, compact }: AnswerSpoilerProps) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setRevealed(false)
  }, [resetKey])

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Resposta
            </p>
            <p
              className={cn(
                "mt-1 font-heading text-accent",
                compact ? "text-lg" : "text-2xl sm:text-3xl",
              )}
            >
              {resposta}
            </p>
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <EyeOff className="size-3.5" />
              Ocultar de novo
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="hidden"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealed(true)}
            className="group w-full cursor-pointer rounded-xl border border-dashed border-accent/35 bg-secondary/50 px-4 py-4 text-center transition-colors hover:border-accent/60 hover:bg-secondary/70"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-foreground">
              <Eye className="size-4 text-accent" />
              Toque para revelar a resposta
            </span>
            <div
              className="mx-auto mt-3 max-w-[12rem] select-none text-lg font-bold tracking-widest text-transparent blur-[6px]"
              aria-hidden="true"
            >
              {resposta}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
