"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BINGO_BALL_STYLES, getBingoLetter } from "@/lib/bingo"

interface NumberGridProps {
  numbers: number[]
  drawnNumbers: number[]
  lastNumber?: number | null
  compact?: boolean
  maxNumber?: number
}

export function NumberGrid({
  numbers,
  drawnNumbers,
  lastNumber,
  compact,
  maxNumber = 75,
}: NumberGridProps) {
  const drawnSet = new Set(drawnNumbers)

  return (
    <div
      className={cn(
        "grid gap-1 sm:gap-1.5",
        compact
          ? "grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))]"
          : "grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))]",
      )}
    >
      {numbers.map((value) => {
        const isDrawn = drawnSet.has(value)
        const isLast = lastNumber === value
        const letter = getBingoLetter(value, maxNumber)
        const ball = BINGO_BALL_STYLES[letter]

        return (
          <motion.div
            key={value}
            layout
            initial={false}
            animate={isLast ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={isLast ? { duration: 0.4, ease: "easeOut" } : undefined}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-lg border-2 text-sm font-bold tabular-nums transition-colors sm:text-base",
              isLast
                ? "z-10 border-accent text-accent-foreground shadow-lg shadow-accent/50"
                : isDrawn
                  ? "border-transparent text-white"
                  : "border-white/10 bg-white/5 text-muted-foreground",
            )}
            style={
              isLast
                ? { background: `linear-gradient(135deg, ${ball.light}, ${ball.ball})` }
                : isDrawn
                  ? { background: `linear-gradient(135deg, ${ball.light}cc, ${ball.ball})` }
                  : undefined
            }
          >
            {isDrawn && !isLast ? (
              <span
                className="absolute inset-0 rounded-lg opacity-30"
                style={{ background: `radial-gradient(circle at 30% 25%, white, transparent 60%)` }}
                aria-hidden="true"
              />
            ) : null}
            <span className="relative">{value}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
