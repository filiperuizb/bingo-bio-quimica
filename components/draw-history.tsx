"use client"

import { AnimatePresence, motion } from "framer-motion"
import { History } from "lucide-react"
import { BINGO_BALL_STYLES, getBingoLetter } from "@/lib/bingo"

interface DrawHistoryProps {
  drawnNumbers: number[]
  count: number
  maxNumber?: number
}

export function DrawHistory({ drawnNumbers, count, maxNumber = 75 }: DrawHistoryProps) {
  const recent = [...drawnNumbers].reverse().slice(0, Math.max(1, count))

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-accent/80">
        <History className="size-4" />
        <span className="font-heading tracking-wide">Últimos sorteados</span>
      </div>
      {drawnNumbers.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum número sorteado ainda.</p>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          <AnimatePresence initial={false} mode="popLayout">
            {recent.map((value, index) => {
              const letter = getBingoLetter(value, maxNumber)
              const ball = BINGO_BALL_STYLES[letter]
              const isLatest = index === 0

              return (
                <motion.div
                  key={value}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative flex flex-col items-center gap-0.5"
                >
                  <div
                    className="flex items-center justify-center rounded-full font-heading font-normal tabular-nums shadow-lg"
                    style={{
                      width: isLatest ? 52 : 42,
                      height: isLatest ? 52 : 42,
                      fontSize: isLatest ? "1.125rem" : "0.9rem",
                      background: `radial-gradient(circle at 35% 30%, ${ball.light}, ${ball.ball} 50%, ${ball.dark})`,
                      color: ball.text === "#ffffff" ? "#1a2332" : ball.text,
                      boxShadow: isLatest
                        ? `0 0 16px ${ball.ball}88, 0 4px 12px rgba(0,0,0,0.4)`
                        : `0 2px 8px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {value}
                  </div>
                  <span
                    className="font-heading text-[10px] leading-none tracking-widest"
                    style={{ color: ball.ball }}
                  >
                    {letter}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
