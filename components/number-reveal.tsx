"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BINGO_BALL } from "@/lib/bingo"
import { LottieAnimation } from "@/components/lottie-animation"

interface NumberRevealProps {
  displayValue: number | null
  isRolling: boolean
  justRevealed: boolean
  ballSizeClass: string
  lottieEnabled: boolean
}

function numberFontSize(value: number): string {
  const digits = String(value).length
  if (digits >= 3) return "30cqi"
  if (digits === 2) return "40cqi"
  return "48cqi"
}

export function NumberReveal({
  displayValue,
  isRolling,
  justRevealed,
  ballSizeClass,
  lottieEnabled,
}: NumberRevealProps) {
  const ballStyle = BINGO_BALL

  return (
    <div className={cn("relative flex w-full flex-col items-center", ballSizeClass)}>
      <div className="relative aspect-square w-full">
        <motion.div
          animate={
            isRolling
              ? { scale: [1, 1.03, 1] }
              : justRevealed
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
          }
          transition={
            isRolling
              ? { scale: { repeat: Infinity, duration: 0.35, ease: "easeInOut" } }
              : justRevealed
                ? { scale: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } }
                : { duration: 0.2 }
          }
          className="relative aspect-square w-full"
        >
          <div
            className="relative flex h-full w-full items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 28%, ${ballStyle.light}, ${ballStyle.ball} 48%, ${ballStyle.dark} 100%)`,
              boxShadow: justRevealed
                ? `0 0 0 4px ${ballStyle.ball}55, 0 0 36px ${ballStyle.ball}77, 0 14px 40px rgba(0,0,0,0.45), inset -6px -10px 18px ${ballStyle.dark}88`
                : `0 10px 36px rgba(0,0,0,0.4), inset -5px -8px 14px ${ballStyle.dark}66`,
            }}
          >
            <div className="bingo-ball-shine absolute inset-0 rounded-full" aria-hidden="true" />

            {lottieEnabled && justRevealed ? (
              <LottieAnimation
                src="/lottie/confetti.json"
                loop={false}
                className="pointer-events-none absolute -inset-6 z-20 h-[calc(100%+3rem)] w-[calc(100%+3rem)]"
              />
            ) : null}

            {isRolling ? (
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute -top-8 font-heading text-lg tracking-[0.3em] text-accent"
              >
                ...
              </motion.span>
            ) : null}

            <div
              className="relative z-10 flex aspect-square w-[52%] items-center justify-center overflow-hidden rounded-full border-[3px] border-white/40 bg-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.08)]"
              style={{ containerType: "size" }}
            >
              {displayValue === null ? (
                <span className="text-[22cqi] font-heading leading-none text-muted-foreground">
                  Pronto
                </span>
              ) : (
                <span
                  className={cn(
                    "max-w-full truncate text-center font-heading font-normal tabular-nums leading-none transition-[filter,opacity] duration-75",
                    isRolling ? "opacity-60 blur-[2px]" : "opacity-100",
                  )}
                  style={{
                    color: ballStyle.text,
                    fontSize: numberFontSize(displayValue),
                  }}
                >
                  {displayValue}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
