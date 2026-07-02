"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BINGO_BALL, BINGO_BALL_DRAWN, BINGO_BALL_LAST } from "@/lib/bingo"

interface NumberGridProps {
  numbers: number[]
  drawnNumbers: number[]
  lastNumber?: number | null
  compact?: boolean
}

export function NumberGrid({ numbers, drawnNumbers, lastNumber, compact }: NumberGridProps) {
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
        const ball = isLast ? BINGO_BALL_LAST : isDrawn ? BINGO_BALL_DRAWN : null

        return (
          <motion.div
            key={value}
            layout
            initial={false}
            animate={isLast ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={isLast ? { duration: 0.4, ease: "easeOut" } : undefined}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-lg border-2 text-sm font-bold tabular-nums sm:text-base",
              isLast
                ? "z-10 border-accent text-accent-foreground shadow-lg shadow-accent/40"
                : isDrawn
                  ? "border-transparent text-white"
                  : "border-white/10 bg-white/5 text-muted-foreground",
            )}
            style={
              ball
                ? { background: `linear-gradient(135deg, ${ball.light}, ${ball.ball})` }
                : undefined
            }
          >
            <span className="relative" style={ball ? { color: ball.text } : undefined}>
              {value}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
