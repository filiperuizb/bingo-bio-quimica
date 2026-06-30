"use client"

import { motion } from "framer-motion"

const LETTERS = [
  { char: "B", color: "#e63946" },
  { char: "I", color: "#457b9d" },
  { char: "N", color: "#f4f1de" },
  { char: "G", color: "#4386f9" },
  { char: "O", color: "#e9c46a" },
]

export function BingoMarquee({ activeLetter }: { activeLetter?: string | null }) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5" aria-hidden="true">
      {LETTERS.map(({ char, color }, i) => {
        const isActive = activeLetter === char
        return (
          <motion.span
            key={char}
            initial={{ opacity: 0, y: -16 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isActive ? [1, 1.15, 1] : 1,
            }}
            transition={{
              delay: i * 0.08,
              y: { duration: 0.3 },
              scale: isActive
                ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                : { duration: 0.2 },
            }}
            className="flex size-9 items-center justify-center rounded-lg border-2 font-heading text-lg font-normal sm:size-11 sm:text-xl"
            style={{
              color,
              borderColor: `${color}88`,
              background: isActive ? `${color}22` : "rgba(15, 31, 56, 0.85)",
              boxShadow: isActive ? `0 0 20px ${color}66, inset 0 0 12px ${color}33` : undefined,
              textShadow: `0 0 8px ${color}, 0 0 20px ${color}, 0 2px 0 rgba(0,0,0,0.5)`,
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </div>
  )
}
