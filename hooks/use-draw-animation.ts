"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface StartDrawParams {
  finalNumber: number
  pool: number[]
  speed: number
  duration: number
  onComplete: (value: number) => void
}

export function useDrawAnimation() {
  const [displayValue, setDisplayValue] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [justRevealed, setJustRevealed] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const revealTimeoutRef = useRef<number | null>(null)
  const rollingRef = useRef(false)

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    if (revealTimeoutRef.current !== null) window.clearTimeout(revealTimeoutRef.current)
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const startDraw = useCallback(
    ({ finalNumber, pool, speed, duration, onComplete }: StartDrawParams) => {
      if (rollingRef.current) return
      rollingRef.current = true
      setIsRolling(true)
      setJustRevealed(false)

      const candidates = pool.length > 0 ? pool : [finalNumber]
      setDisplayValue(candidates[Math.floor(Math.random() * candidates.length)])

      intervalRef.current = window.setInterval(() => {
        const next = candidates[Math.floor(Math.random() * candidates.length)]
        setDisplayValue(next)
      }, Math.max(20, speed))

      timeoutRef.current = window.setTimeout(() => {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
        setDisplayValue(finalNumber)
        setIsRolling(false)
        setJustRevealed(true)
        rollingRef.current = false
        onComplete(finalNumber)
        revealTimeoutRef.current = window.setTimeout(() => setJustRevealed(false), 1400)
      }, Math.max(300, duration))
    },
    [],
  )

  const setStatic = useCallback((value: number | null) => {
    if (rollingRef.current) return
    setDisplayValue(value)
    setJustRevealed(false)
  }, [])

  return { displayValue, isRolling, justRevealed, startDraw, setStatic }
}
