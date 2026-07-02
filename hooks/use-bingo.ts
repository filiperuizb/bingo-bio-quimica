"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { BingoSettings } from "@/lib/types"
import {
  defaultSettings,
  getProgress,
  getRemainingNumbers,
  isConfiguredSettings,
  isGameComplete,
  normalizeSettings,
  pickRandomNumber,
} from "@/lib/bingo"
import { BINGO_NUMEROS } from "@/lib/questions"
import { STORAGE_KEYS, readStorage, removeStorage, writeStorage } from "@/lib/storage"

export function useBingo() {
  const [hydrated, setHydrated] = useState(false)
  const [settings, setSettings] = useState<BingoSettings | null>(null)
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [lastNumber, setLastNumber] = useState<number | null>(null)

  useEffect(() => {
    const storedSettings = readStorage<Partial<BingoSettings> | null>(STORAGE_KEYS.settings, null)
    const storedDrawn = readStorage<number[]>(STORAGE_KEYS.drawnNumbers, [])
    const storedLast = readStorage<number | null>(STORAGE_KEYS.lastNumber, null)
    const normalized = normalizeSettings(storedSettings)
    if (!storedSettings) writeStorage(STORAGE_KEYS.settings, normalized)
    setSettings(normalized)
    setDrawnNumbers(storedDrawn)
    setLastNumber(storedLast)
    setHydrated(true)
  }, [])

  const saveSettings = useCallback((nextSettings: BingoSettings) => {
    writeStorage(STORAGE_KEYS.settings, nextSettings)
    setSettings(nextSettings)
  }, [])

  const remaining = useMemo(() => getRemainingNumbers(drawnNumbers), [drawnNumbers])
  const complete = useMemo(() => isGameComplete(drawnNumbers), [drawnNumbers])
  const progress = useMemo(() => getProgress(drawnNumbers), [drawnNumbers])

  const drawNumber = useCallback((): number | null => {
    if (remaining.length === 0) return null
    return pickRandomNumber(remaining)
  }, [remaining])

  const commitNumber = useCallback((value: number) => {
    setDrawnNumbers((previous) => {
      if (previous.includes(value)) return previous
      const next = [...previous, value]
      writeStorage(STORAGE_KEYS.drawnNumbers, next)
      return next
    })
    writeStorage(STORAGE_KEYS.lastNumber, value)
    setLastNumber(value)
  }, [])

  const resetDraw = useCallback(() => {
    writeStorage(STORAGE_KEYS.drawnNumbers, [])
    removeStorage(STORAGE_KEYS.lastNumber)
    setDrawnNumbers([])
    setLastNumber(null)
  }, [])

  const clearAll = useCallback(() => {
    writeStorage(STORAGE_KEYS.settings, defaultSettings)
    writeStorage(STORAGE_KEYS.drawnNumbers, [])
    removeStorage(STORAGE_KEYS.lastNumber)
    setSettings(defaultSettings)
    setDrawnNumbers([])
    setLastNumber(null)
  }, [])

  return {
    hydrated,
    settings,
    numbers: BINGO_NUMEROS,
    drawnNumbers,
    lastNumber,
    remaining,
    complete,
    progress,
    isConfigured: isConfiguredSettings(settings),
    defaultSettings,
    saveSettings,
    drawNumber,
    commitNumber,
    resetDraw,
    clearAll,
  }
}
