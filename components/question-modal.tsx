"use client"

import { AnimatePresence, motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { ActionButton } from "@/components/action-button"
import { AnswerSpoiler } from "@/components/answer-spoiler"
import { BINGO_BALL } from "@/lib/bingo"

interface QuestionModalProps {
  open: boolean
  numero: number | null
  pergunta: string | null
  resposta: string | null
  onClose: () => void
}

export function QuestionModal({
  open,
  numero,
  pergunta,
  resposta,
  onClose,
}: QuestionModalProps) {
  const ball = BINGO_BALL

  return (
    <AnimatePresence>
      {open && numero !== null && pergunta ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.4, 0.64, 1] }}
            className="bingo-gold-border w-full max-w-lg rounded-2xl bg-card/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="flex size-16 items-center justify-center rounded-full font-heading text-3xl tabular-nums shadow-lg"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${ball.light}, ${ball.ball} 50%, ${ball.dark})`,
                  color: ball.text,
                }}
              >
                {numero}
              </div>

              <div className="flex items-center gap-2 text-accent">
                <HelpCircle className="size-5" />
                <span className="font-heading text-lg tracking-wide">Pergunta</span>
              </div>

              <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">
                {pergunta}
              </p>

              {resposta ? (
                <AnswerSpoiler resposta={resposta} resetKey={numero} className="mt-1" />
              ) : null}

              <ActionButton size="lg" variant="accent" className="mt-2 w-full max-w-xs" onClick={onClose}>
                Continuar
              </ActionButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
