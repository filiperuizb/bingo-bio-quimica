"use client"

import { motion } from "framer-motion"

const FLOATING_BALLS = [
  { color: "#1f7498", size: 48, top: "8%", left: "4%", delay: 0 },
  { color: "#4386f9", size: 36, top: "15%", right: "6%", delay: 1.2 },
  { color: "#1f7498", size: 42, bottom: "20%", left: "3%", delay: 0.6 },
  { color: "#1a5f7a", size: 32, bottom: "12%", right: "5%", delay: 1.8 },
  { color: "#4386f9", size: 28, top: "45%", left: "1%", delay: 2.4 },
  { color: "#1f7498", size: 34, top: "60%", right: "2%", delay: 0.9 },
]

export function BingoBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bingo-felt-bg">
      {FLOATING_BALLS.map((ball, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden rounded-full opacity-[0.18] sm:block"
          style={{
            width: ball.size,
            height: ball.size,
            top: ball.top,
            left: ball.left,
            right: ball.right,
            bottom: ball.bottom,
            background: `radial-gradient(circle at 35% 30%, ${ball.color}bb, ${ball.color}55)`,
            boxShadow: `inset -4px -4px 8px ${ball.color}33`,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: ball.delay,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
