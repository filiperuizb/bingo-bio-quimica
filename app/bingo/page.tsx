"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Dices, Grid3x3, PartyPopper, RotateCcw, Settings, Trophy } from "lucide-react"
import { getBallSizeClasses, getBingoLetter } from "@/lib/bingo"
import { useBingo } from "@/hooks/use-bingo"
import { useDrawAnimation } from "@/hooks/use-draw-animation"
import { Header } from "@/components/header"
import { FestiveCard } from "@/components/festive-card"
import { NumberReveal } from "@/components/number-reveal"
import { NumberGrid } from "@/components/number-grid"
import { DrawHistory } from "@/components/draw-history"
import { ProgressPanel } from "@/components/progress-panel"
import { ActionButton } from "@/components/action-button"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { ConfettiBurst } from "@/components/confetti-burst"
import { LottieAnimation } from "@/components/lottie-animation"
import { EmptyConfigState } from "@/components/empty-config-state"
import { BingoLoader } from "@/components/bingo-loader"
import { FeedbackToast, useToast } from "@/components/feedback-toast"

export default function BingoPage() {
  const bingo = useBingo()
  const anim = useDrawAnimation()
  const toast = useToast()
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [resetOpen, setResetOpen] = useState(false)

  const { isRolling, setStatic } = anim
  useEffect(() => {
    if (bingo.hydrated && !isRolling) {
      setStatic(bingo.lastNumber)
    }
  }, [bingo.hydrated, bingo.lastNumber, isRolling, setStatic])

  if (!bingo.hydrated) {
    return <BingoLoader />
  }

  if (!bingo.isConfigured || !bingo.settings) {
    return <EmptyConfigState lottieEnabled />
  }

  const settings = bingo.settings
  const ballSizeClass = getBallSizeClasses(settings.numberSize)
  const activeLetter =
    anim.displayValue !== null ? getBingoLetter(anim.displayValue, settings.maxNumber) : null
  const drawDisabled =
    anim.isRolling ||
    bingo.remaining.length === 0 ||
    (settings.blockWhenComplete && bingo.complete)

  const handleDraw = () => {
    if (anim.isRolling || bingo.complete || bingo.remaining.length === 0) return
    const picked = bingo.drawNumber()
    if (picked === null) return
    anim.startDraw({
      finalNumber: picked,
      pool: bingo.remaining,
      speed: settings.animationSpeed,
      duration: settings.revealDuration,
      onComplete: (value) => {
        bingo.commitNumber(value)
        setConfettiTrigger((current) => current + 1)
      },
    })
  }

  const handleReset = () => {
    if (anim.isRolling) return
    if (settings.confirmBeforeReset) {
      setResetOpen(true)
      return
    }
    bingo.resetDraw()
    toast.show("Sorteio reiniciado")
  }

  const confirmReset = () => {
    bingo.resetDraw()
    setResetOpen(false)
    toast.show("Sorteio reiniciado")
  }

  const reveal = (
    <div className="flex flex-col items-center gap-6">
      <NumberReveal
        displayValue={anim.displayValue}
        isRolling={anim.isRolling}
        justRevealed={anim.justRevealed}
        ballSizeClass={ballSizeClass}
        lottieEnabled={settings.lottieEnabled}
        maxNumber={settings.maxNumber}
      />
      <ActionButton
        size="xl"
        variant="accent"
        onClick={handleDraw}
        disabled={drawDisabled}
        className="w-full max-w-md"
      >
        <Dices className="size-8" />
        {anim.isRolling ? "Girando..." : bingo.complete ? "Bingo encerrado!" : "Sortear!"}
      </ActionButton>
      <AnimatePresence>
        {bingo.complete ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bingo-gold-border flex w-full max-w-md flex-col items-center gap-2 rounded-2xl bg-card/90 p-6 text-center"
          >
            {settings.lottieEnabled ? (
              <LottieAnimation src="/lottie/trophy.json" loop className="h-28 w-28" />
            ) : (
              <Trophy className="size-12 text-accent" />
            )}
            <p className="font-heading text-3xl text-accent">BINGO!</p>
            <p className="text-sm text-muted-foreground">
              Todos os {bingo.numbers.length} números foram sorteados. Parabéns!
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ConfettiBurst trigger={confettiTrigger} enabled={settings.confettiEnabled} />

      <Header
        title={settings.title}
        subtitle="Sorteio ao vivo"
        activeLetter={activeLetter}
        actions={
          <>
            <ActionButton variant="outline" onClick={handleReset} disabled={bingo.drawnNumbers.length === 0}>
              <RotateCcw className="size-5" />
              Resetar
            </ActionButton>
            <Link href="/configuracoes" className="cursor-pointer">
              <ActionButton variant="ghost">
                <Settings className="size-5" />
                Config
              </ActionButton>
            </Link>
          </>
        }
      />

      {settings.presentationMode ? (
        <div className="mt-10 flex flex-col items-center gap-8">
          {reveal}
          <div className="w-full max-w-3xl">
            <FestiveCard delay={0.1}>
              <DrawHistory
                drawnNumbers={bingo.drawnNumbers}
                count={settings.historyCount}
                maxNumber={settings.maxNumber}
              />
            </FestiveCard>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <FestiveCard className="flex items-center justify-center py-8">{reveal}</FestiveCard>

          <div className="space-y-6">
            <FestiveCard title="Placar" delay={0.05}>
              <ProgressPanel
                drawnCount={bingo.drawnNumbers.length}
                remainingCount={bingo.remaining.length}
                total={bingo.numbers.length}
                progress={bingo.progress}
                showRemaining={settings.showRemainingCounter}
              />
            </FestiveCard>

            <FestiveCard delay={0.1}>
              <DrawHistory
                drawnNumbers={bingo.drawnNumbers}
                count={settings.historyCount}
                maxNumber={settings.maxNumber}
              />
            </FestiveCard>
          </div>
        </div>
      )}

      {settings.showAllDrawnPanel ? (
        <FestiveCard
          className="mt-6"
          title="Cartela de números"
          description="Acompanhe todos os números do sorteio"
          icon={<Grid3x3 className="size-5" />}
          delay={0.15}
        >
          <NumberGrid
            numbers={bingo.numbers}
            drawnNumbers={bingo.drawnNumbers}
            lastNumber={bingo.lastNumber}
            maxNumber={settings.maxNumber}
          />
        </FestiveCard>
      ) : null}

      {!settings.showAllDrawnPanel && bingo.drawnNumbers.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex items-center justify-center gap-2 text-center font-heading text-lg tracking-wide text-muted-foreground"
        >
          <PartyPopper className="size-5 text-accent" />
          Aperte em sortear para começar.
        </motion.p>
      ) : null}

      <ConfirmDialog
        open={resetOpen}
        title="Resetar o sorteio?"
        description="Todos os números sorteados serão apagados. As configurações do jogo serão mantidas."
        confirmLabel="Resetar sorteio"
        onConfirm={confirmReset}
        onCancel={() => setResetOpen(false)}
      />

      <FeedbackToast message={toast.message} />
    </main>
  )
}
