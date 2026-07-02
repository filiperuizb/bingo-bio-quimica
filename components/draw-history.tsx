"use client"

import { AnimatePresence, motion } from "framer-motion"
import { History } from "lucide-react"
import { BINGO_BALL, BINGO_BALL_DRAWN } from "@/lib/bingo"

interface DrawHistoryProps {
  drawnNumbers: number[]
  count: number
}

export function DrawHistory({ drawnNumbers, count }: DrawHistoryProps) {
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
              const isLatest = index === 0
              const ball = isLatest ? BINGO_BALL : BINGO_BALL_DRAWN

              return (
                <motion.div
                  key={value}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center justify-center rounded-full font-heading font-normal tabular-nums shadow-lg"
                  style={{
                    width: isLatest ? 52 : 42,
                    height: isLatest ? 52 : 42,
                    fontSize: isLatest ? "1.125rem" : "0.9rem",
                    background: `radial-gradient(circle at 35% 30%, ${ball.light}, ${ball.ball} 50%, ${ball.dark})`,
                    color: ball.text,
                    boxShadow: isLatest
                      ? `0 0 16px ${ball.ball}88, 0 4px 12px rgba(0,0,0,0.4)`
                      : `0 2px 8px rgba(0,0,0,0.3)`,
                  }}
                >
                  {value}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
