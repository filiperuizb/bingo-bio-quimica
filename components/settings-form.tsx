"use client"

import { useState } from "react"
import { Sliders, ToggleRight } from "lucide-react"
import type { BingoSettings, NumberSize } from "@/lib/types"
import { FestiveCard } from "@/components/festive-card"
import { ActionButton } from "@/components/action-button"
import { ToggleSwitch } from "@/components/toggle-switch"

interface SettingsFormProps {
  initialSettings: BingoSettings
  onSave: (settings: BingoSettings) => void
}

const sizeOptions: { value: NumberSize; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Grande" },
  { value: "projector", label: "Projetor" },
]

export function SettingsForm({ initialSettings, onSave }: SettingsFormProps) {
  const [form, setForm] = useState<BingoSettings>(initialSettings)

  const update = <K extends keyof BingoSettings>(key: K, value: BingoSettings[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  const handleSubmit = () => {
    onSave(form)
  }

  return (
    <div className="space-y-5">
      <FestiveCard title="Exibição" description="Ajuste o tamanho do número sorteado">
        <div className="grid grid-cols-3 gap-2">
          {sizeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => update("numberSize", option.value)}
              className={
                form.numberSize === option.value
                  ? "cursor-pointer rounded-xl border-2 border-primary bg-primary/15 px-3 py-2.5 text-sm font-semibold text-foreground"
                  : "cursor-pointer rounded-xl border-2 border-border bg-secondary/30 px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </FestiveCard>

      <FestiveCard
        title="Animação do sorteio"
        description="Velocidade e duração do suspense"
        icon={<Sliders className="size-5" />}
      >
        <div className="space-y-5">
          <RangeField
            label="Velocidade da troca de números"
            valueLabel={`${form.animationSpeed} ms`}
            min={30}
            max={200}
            step={10}
            value={form.animationSpeed}
            onChange={(value) => update("animationSpeed", value)}
          />
          <RangeField
            label="Duração até revelar o número"
            valueLabel={`${(form.revealDuration / 1000).toFixed(1)} s`}
            min={800}
            max={5000}
            step={100}
            value={form.revealDuration}
            onChange={(value) => update("revealDuration", value)}
          />
          <RangeField
            label="Quantidade no histórico recente"
            valueLabel={`${form.historyCount}`}
            min={1}
            max={12}
            step={1}
            value={form.historyCount}
            onChange={(value) => update("historyCount", value)}
          />
        </div>
      </FestiveCard>

      <FestiveCard
        title="Preferências"
        description="Ative ou desative recursos do sorteio"
        icon={<ToggleRight className="size-5" />}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <ToggleSwitch
            checked={form.confettiEnabled}
            onChange={(value) => update("confettiEnabled", value)}
            label="Efeito de confete"
            description="Dispara confetes a cada número"
          />
          <ToggleSwitch
            checked={form.lottieEnabled}
            onChange={(value) => update("lottieEnabled", value)}
            label="Animações Lottie"
            description="Animações extras na tela"
          />
          <ToggleSwitch
            checked={form.showAllDrawnPanel}
            onChange={(value) => update("showAllDrawnPanel", value)}
            label="Painel de todos os números"
            description="Mostra a cartela completa no sorteio"
          />
          <ToggleSwitch
            checked={form.showRemainingCounter}
            onChange={(value) => update("showRemainingCounter", value)}
            label="Contador de restantes"
            description="Exibe quantos números faltam"
          />
          <ToggleSwitch
            checked={form.presentationMode}
            onChange={(value) => update("presentationMode", value)}
            label="Modo apresentação"
            description="Layout ampliado para TV ou projetor"
          />
          <ToggleSwitch
            checked={form.confirmBeforeReset}
            onChange={(value) => update("confirmBeforeReset", value)}
            label="Confirmar antes de resetar"
            description="Pede confirmação em ações de reset"
          />
          <ToggleSwitch
            checked={form.blockWhenComplete}
            onChange={(value) => update("blockWhenComplete", value)}
            label="Bloquear ao finalizar"
            description="Impede sortear quando tudo já saiu"
          />
        </div>
      </FestiveCard>

      <ActionButton size="lg" className="w-full" onClick={handleSubmit}>
        Salvar configurações
      </ActionButton>
    </div>
  )
}

function RangeField({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string
  valueLabel: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-foreground">
        <span>{label}</span>
        <span className="tabular-nums text-accent">{valueLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
      />
    </div>
  )
}
