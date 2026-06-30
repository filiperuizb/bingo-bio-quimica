"use client"

import { motion } from "framer-motion"

interface ProgressPanelProps {
  drawnCount: number
  remainingCount: number
  total: number
  progress: number
  showRemaining: boolean
}

export function ProgressPanel({
  drawnCount,
  remainingCount,
  total,
  progress,
  showRemaining,
}: ProgressPanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Sorteados" value={drawnCount} tone="primary" />
        {showRemaining ? <Stat label="Restantes" value={remainingCount} tone="accent" /> : null}
        <Stat label="Total" value={total} tone="muted" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="font-heading tracking-wide text-accent/80">Progresso</span>
          <span className="tabular-nums text-foreground">{progress}%</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full border border-accent/20 bg-secondary/60 p-0.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ boxShadow: "0 0 12px rgba(231, 255, 84, 0.45)" }}
          />
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "primary" | "accent" | "muted"
}) {
  const toneClass =
    tone === "primary"
      ? "text-primary"
      : tone === "accent"
        ? "text-accent"
        : "text-foreground"
  return (
    <div className="rounded-xl border border-accent/15 bg-secondary/40 p-3 text-center">
      <p className={`font-heading text-4xl font-normal tabular-nums ${toneClass}`}>{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  )
}
