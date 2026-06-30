"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { BingoSettings } from "@/lib/types"
import {
  defaultSettings,
  generateNumbers,
  getProgress,
  getRemainingNumbers,
  isConfiguredSettings,
  isGameComplete,
  pickRandomNumber,
} from "@/lib/bingo"
import { STORAGE_KEYS, readStorage, removeStorage, writeStorage } from "@/lib/storage"

export function useBingo() {
  const [hydrated, setHydrated] = useState(false)
  const [settings, setSettings] = useState<BingoSettings | null>(null)
  const [numbers, setNumbers] = useState<number[]>([])
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [lastNumber, setLastNumber] = useState<number | null>(null)

  useEffect(() => {
    const storedSettings = readStorage<BingoSettings | null>(STORAGE_KEYS.settings, null)
    const storedNumbers = readStorage<number[]>(STORAGE_KEYS.numbers, [])
    const storedDrawn = readStorage<number[]>(STORAGE_KEYS.drawnNumbers, [])
    const storedLast = readStorage<number | null>(STORAGE_KEYS.lastNumber, null)
    if (storedSettings) setSettings(storedSettings)
    setNumbers(storedNumbers)
    setDrawnNumbers(storedDrawn)
    setLastNumber(storedLast)
    setHydrated(true)
  }, [])

  const saveGame = useCallback(
    (nextSettings: BingoSettings, options?: { resetDraw?: boolean }) => {
      const nextNumbers = generateNumbers(nextSettings.maxNumber)
      writeStorage(STORAGE_KEYS.settings, nextSettings)
      writeStorage(STORAGE_KEYS.numbers, nextNumbers)
      setSettings(nextSettings)
      setNumbers(nextNumbers)
      if (options?.resetDraw) {
        writeStorage(STORAGE_KEYS.drawnNumbers, [])
        removeStorage(STORAGE_KEYS.lastNumber)
        setDrawnNumbers([])
        setLastNumber(null)
      }
    },
    [],
  )

  const updateSettingsOnly = useCallback((nextSettings: BingoSettings) => {
    writeStorage(STORAGE_KEYS.settings, nextSettings)
    setSettings(nextSettings)
  }, [])

  const remaining = useMemo(
    () => getRemainingNumbers(numbers, drawnNumbers),
    [numbers, drawnNumbers],
  )
  const complete = useMemo(
    () => isGameComplete(numbers, drawnNumbers),
    [numbers, drawnNumbers],
  )
  const progress = useMemo(
    () => getProgress(numbers, drawnNumbers),
    [numbers, drawnNumbers],
  )

  const drawNumber = useCallback((): number | null => {
    if (remaining.length === 0) return null
    const picked = pickRandomNumber(remaining)
    if (picked === null) return null
    return picked
  }, [remaining])

  const commitNumber = useCallback(
    (value: number) => {
      setDrawnNumbers((previous) => {
        if (previous.includes(value)) return previous
        const next = [...previous, value]
        writeStorage(STORAGE_KEYS.drawnNumbers, next)
        return next
      })
      writeStorage(STORAGE_KEYS.lastNumber, value)
      setLastNumber(value)
    },
    [],
  )

  const resetDraw = useCallback(() => {
    writeStorage(STORAGE_KEYS.drawnNumbers, [])
    removeStorage(STORAGE_KEYS.lastNumber)
    setDrawnNumbers([])
    setLastNumber(null)
  }, [])

  const clearAll = useCallback(() => {
    removeStorage(STORAGE_KEYS.settings)
    removeStorage(STORAGE_KEYS.numbers)
    removeStorage(STORAGE_KEYS.drawnNumbers)
    removeStorage(STORAGE_KEYS.lastNumber)
    setSettings(null)
    setNumbers([])
    setDrawnNumbers([])
    setLastNumber(null)
  }, [])

  return {
    hydrated,
    settings,
    numbers,
    drawnNumbers,
    lastNumber,
    remaining,
    complete,
    progress,
    isConfigured: isConfiguredSettings(settings),
    defaultSettings,
    saveGame,
    updateSettingsOnly,
    drawNumber,
    commitNumber,
    resetDraw,
    clearAll,
  }
}
