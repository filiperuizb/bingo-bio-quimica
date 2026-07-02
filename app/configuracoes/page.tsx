"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BingoLoader } from "@/components/bingo-loader"
import { HelpCircle, Play, RotateCcw, Trash2 } from "lucide-react"
import type { BingoSettings } from "@/lib/types"
import { BINGO_TITLE } from "@/lib/questions"
import { useBingo } from "@/hooks/use-bingo"
import { Header } from "@/components/header"
import { FestiveCard } from "@/components/festive-card"
import { SettingsForm } from "@/components/settings-form"
import { QuestionsList } from "@/components/questions-list"
import { NumberGrid } from "@/components/number-grid"
import { ActionButton } from "@/components/action-button"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { FeedbackToast, useToast } from "@/components/feedback-toast"

type DialogType = "resetDraw" | "clearAll" | null

export default function ConfiguracoesPage() {
  const router = useRouter()
  const bingo = useBingo()
  const toast = useToast()
  const [formKey, setFormKey] = useState(0)
  const [dialog, setDialog] = useState<DialogType>(null)

  if (!bingo.hydrated) {
    return <BingoLoader />
  }

  const initialSettings = bingo.settings ?? bingo.defaultSettings
  const hasDrawn = bingo.drawnNumbers.length > 0

  const handleSave = (settings: BingoSettings) => {
    bingo.saveSettings(settings)
    toast.show("Configurações salvas")
  }

  const handleResetDraw = () => {
    if (initialSettings.confirmBeforeReset) {
      setDialog("resetDraw")
      return
    }
    bingo.resetDraw()
    toast.show("Sorteio resetado")
  }

  const confirmResetDraw = () => {
    bingo.resetDraw()
    setDialog(null)
    toast.show("Sorteio resetado")
  }

  const handleClearAll = () => {
    if (initialSettings.confirmBeforeReset) {
      setDialog("clearAll")
      return
    }
    runClearAll()
  }

  const runClearAll = () => {
    bingo.clearAll()
    setFormKey((value) => value + 1)
    setDialog(null)
    toast.show("Tudo foi limpo")
  }

  const handleStart = () => {
    router.push("/bingo")
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <Header
        title={BINGO_TITLE}
        subtitle="Configurações do sorteio"
        actions={
          <ActionButton variant="accent" onClick={handleStart}>
            <Play className="size-5" />
            Iniciar bingo
          </ActionButton>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <SettingsForm key={formKey} initialSettings={initialSettings} onSave={handleSave} />

        <div className="space-y-6">
          <FestiveCard
            title="Perguntas do bingo"
            description="12 perguntas fixas sobre saúde e exames"
            icon={<HelpCircle className="size-5" />}
            delay={0.1}
          >
            <div className="max-h-[28rem] overflow-y-auto pr-1">
              <QuestionsList />
            </div>
          </FestiveCard>

          <FestiveCard
            title="Cartela"
            description="Números de 1 a 12"
            delay={0.15}
          >
            <NumberGrid
              numbers={bingo.numbers}
              drawnNumbers={bingo.drawnNumbers}
              lastNumber={bingo.lastNumber}
              compact
            />
          </FestiveCard>

          <FestiveCard title="Ações" delay={0.2}>
            <div className="flex flex-col gap-3">
              <ActionButton variant="outline" onClick={handleResetDraw} disabled={!hasDrawn}>
                <RotateCcw className="size-5" />
                Resetar apenas o sorteio
              </ActionButton>
              <ActionButton variant="danger" onClick={handleClearAll}>
                <Trash2 className="size-5" />
                Limpar tudo e recomeçar
              </ActionButton>
            </div>
          </FestiveCard>
        </div>
      </div>

      <ConfirmDialog
        open={dialog === "resetDraw"}
        title="Resetar o sorteio?"
        description="Os números já sorteados serão apagados, mas as configurações serão mantidas."
        confirmLabel="Resetar sorteio"
        onConfirm={confirmResetDraw}
        onCancel={() => setDialog(null)}
      />
      <ConfirmDialog
        open={dialog === "clearAll"}
        title="Limpar tudo?"
        description="Configurações e sorteios serão resetados para o padrão."
        confirmLabel="Limpar tudo"
        onConfirm={runClearAll}
        onCancel={() => setDialog(null)}
      />

      <FeedbackToast message={toast.message} />
    </main>
  )
}
