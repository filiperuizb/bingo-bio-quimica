"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

interface ConfettiBurstProps {
  trigger: number
  enabled: boolean
}

export function ConfettiBurst({ trigger, enabled }: ConfettiBurstProps) {
  useEffect(() => {
    if (!enabled || trigger === 0) return
    const colors = ["#e63946", "#e7ff54", "#4386f9", "#1f7498", "#457b9d", "#ffffff"]
    const end = Date.now() + 1200

    confetti({
      particleCount: 150,
      spread: 90,
      startVelocity: 50,
      origin: { y: 0.5 },
      colors,
      shapes: ["circle", "square"],
    })

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [trigger, enabled])

  return null
}
