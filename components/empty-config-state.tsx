"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"
import { ActionButton } from "@/components/action-button"
import { BingoMarquee } from "@/components/bingo-marquee"
import { LottieAnimation } from "@/components/lottie-animation"

interface EmptyConfigStateProps {
  lottieEnabled?: boolean
}

export function EmptyConfigState({ lottieEnabled = true }: EmptyConfigStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="bingo-gold-border w-full max-w-md overflow-hidden rounded-2xl bg-card/95 p-8 text-center backdrop-blur-sm"
      >
        <BingoMarquee />

        <div className="relative mx-auto my-4 size-32">
          <Image
            src="/images/bingo-ball.png"
            alt="Bola de bingo"
            fill
            sizes="128px"
            className="object-contain drop-shadow-lg"
          />
          {lottieEnabled ? (
            <LottieAnimation
              src="/lottie/stars.json"
              loop
              className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)]"
            />
          ) : null}
        </div>

        <h1 className="font-heading text-3xl font-normal text-accent">Jogo não configurado</h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Defina o título e os números nas configurações antes de sortear.
        </p>
        <Link href="/configuracoes" className="mt-6 inline-block cursor-pointer">
          <ActionButton size="lg" variant="accent">
            <Settings className="size-5" />
            Configurar bingo
          </ActionButton>
        </Link>
      </motion.div>
    </main>
  )
}
