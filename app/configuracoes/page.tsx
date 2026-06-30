"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BingoLoader } from "@/components/bingo-loader"
import { Grid3x3, Play, RotateCcw, Trash2 } from "lucide-react"
import type { BingoSettings } from "@/lib/types"
import { useBingo } from "@/hooks/use-bingo"
import { Header } from "@/components/header"
import { FestiveCard } from "@/components/festive-card"
import { SettingsForm } from "@/components/settings-form"
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

  const handleSave = (settings: BingoSettings, maxChanged: boolean) => {
    bingo.saveGame(settings, { resetDraw: maxChanged })
    toast.show(maxChanged && hasDrawn ? "Configurações salvas e sorteio resetado" : "Configurações salvas")
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
    if (!bingo.isConfigured) {
      toast.show("Salve as configurações antes de iniciar")
      return
    }
    router.push("/bingo")
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <Header
        title="Configurações do Bingo"
        subtitle="Defina o jogo antes de sortear"
        actions={
          <ActionButton variant="accent" onClick={handleStart}>
            <Play className="size-5" />
            Iniciar bingo
          </ActionButton>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <SettingsForm
          key={formKey}
          initialSettings={initialSettings}
          hasDrawnNumbers={hasDrawn}
          onSave={handleSave}
        />

        <div className="space-y-6">
          <FestiveCard
            title="Números do bingo"
            description={
              bingo.numbers.length > 0
                ? `Intervalo de 1 a ${bingo.numbers.length}`
                : "Salve para gerar os números"
            }
            icon={<Grid3x3 className="size-5" />}
            delay={0.1}
          >
            {bingo.numbers.length > 0 ? (
              <div className="max-h-[22rem] overflow-y-auto pr-1">
                <NumberGrid
                  numbers={bingo.numbers}
                  drawnNumbers={bingo.drawnNumbers}
                  lastNumber={bingo.lastNumber}
                  compact
                  maxNumber={initialSettings.maxNumber}
                />
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Os números aparecerão aqui após salvar as configurações.
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <Legend className="bg-secondary/40 border-border" label="Disponível" />
              <Legend className="bg-primary border-primary/50" label="Sorteado" />
              <Legend className="bg-accent border-accent" label="Último" />
            </div>
          </FestiveCard>

          <FestiveCard title="Ações" delay={0.2}>
            <div className="flex flex-col gap-3">
              <ActionButton variant="outline" onClick={handleResetDraw} disabled={!hasDrawn}>
                <RotateCcw className="size-5" />
                Resetar apenas o sorteio
              </ActionButton>
              <ActionButton variant="danger" onClick={handleClearAll} disabled={!bingo.isConfigured}>
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
        description="Configurações, números e sorteios serão removidos. Esta ação não pode ser desfeita."
        confirmLabel="Limpar tudo"
        onConfirm={runClearAll}
        onCancel={() => setDialog(null)}
      />

      <FeedbackToast message={toast.message} />
    </main>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`size-3.5 rounded-md border ${className}`} />
      {label}
    </span>
  )
}
