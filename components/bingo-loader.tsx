"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function BingoLoader() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <motion.div
        animate={{ rotate: [0, 360], y: [0, -8, 0] }}
        transition={{
          rotate: { repeat: Infinity, duration: 1.2, ease: "linear" },
          y: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
        }}
        className="relative size-20 drop-shadow-[0_8px_24px_oklch(0_0_0/0.5)]"
      >
        <Image src="/images/bingo-ball.png" alt="Carregando" fill sizes="80px" className="object-contain" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="font-heading text-xl tracking-widest text-accent"
      >
        Preparando o bingo...
      </motion.p>
    </main>
  )
}
