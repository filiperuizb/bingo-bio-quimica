"use client"

import { useState } from "react"
import { Settings2, Sliders, ToggleRight } from "lucide-react"
import type { BingoSettings, NumberSize } from "@/lib/types"
import { isValidMaxNumber } from "@/lib/bingo"
import { FestiveCard } from "@/components/festive-card"
import { ActionButton } from "@/components/action-button"
import { ToggleSwitch } from "@/components/toggle-switch"

interface SettingsFormProps {
  initialSettings: BingoSettings
  hasDrawnNumbers: boolean
  onSave: (settings: BingoSettings, maxChanged: boolean) => void
}

const sizeOptions: { value: NumberSize; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Grande" },
  { value: "projector", label: "Projetor" },
]

export function SettingsForm({ initialSettings, hasDrawnNumbers, onSave }: SettingsFormProps) {
  const [form, setForm] = useState<BingoSettings>(initialSettings)
  const [error, setError] = useState<string | null>(null)

  const update = <K extends keyof BingoSettings>(key: K, value: BingoSettings[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  const maxChanged = form.maxNumber !== initialSettings.maxNumber

  const handleSubmit = () => {
    if (form.title.trim().length === 0) {
      setError("Informe um nome para o evento.")
      return
    }
    if (!isValidMaxNumber(form.maxNumber)) {
      setError("O número final deve ser maior que 1 (e no máximo 1000).")
      return
    }
    setError(null)
    onSave({ ...form, title: form.title.trim() }, maxChanged)
  }

  return (
    <div className="space-y-5">
      <FestiveCard
        title="Dados do jogo"
        description="Defina o título e o intervalo de números"
        icon={<Settings2 className="size-5" />}
      >
        <div className="space-y-4">
          <Field label="Nome do evento">
            <input
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              placeholder="Ex: Bingo de São João"
              className="w-full cursor-text rounded-xl border border-border bg-secondary/40 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
            />
          </Field>
          <Field label="Número final do intervalo" hint="O intervalo começa sempre em 1">
            <input
              type="number"
              min={2}
              max={1000}
              value={form.maxNumber}
              onChange={(event) => update("maxNumber", Number(event.target.value))}
              className="w-full cursor-text rounded-xl border border-border bg-secondary/40 px-4 py-3 text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40"
            />
          </Field>
          {maxChanged && hasDrawnNumbers ? (
            <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">
              Atenção: ao alterar o intervalo, os números já sorteados serão resetados.
            </p>
          ) : null}
          <Field label="Tamanho do número sorteado">
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
          </Field>
        </div>
      </FestiveCard>

      <FestiveCard
        title="Animação do sorteio"
        description="Controle a velocidade e a duração do suspense"
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
            max={20}
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

      {error ? (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
          {error}
        </p>
      ) : null}

      <ActionButton size="lg" className="w-full" onClick={handleSubmit}>
        Salvar configurações
      </ActionButton>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between text-sm font-semibold text-foreground">
        {label}
        {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
      </span>
      {children}
    </label>
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
