import type { BingoSettings } from "./types"
import { BINGO_NUMEROS } from "./questions"

export const BINGO_TOTAL = BINGO_NUMEROS.length

export const defaultSettings: BingoSettings = {
  animationSpeed: 80,
  revealDuration: 2200,
  confettiEnabled: true,
  numberSize: "large",
  historyCount: 8,
  showAllDrawnPanel: true,
  showRemainingCounter: true,
  presentationMode: false,
  confirmBeforeReset: true,
  blockWhenComplete: true,
  lottieEnabled: true,
}

export function getRemainingNumbers(drawn: number[]): number[] {
  const drawnSet = new Set(drawn)
  return BINGO_NUMEROS.filter((value) => !drawnSet.has(value))
}

export function pickRandomNumber(remaining: number[]): number | null {
  if (remaining.length === 0) return null
  const index = Math.floor(Math.random() * remaining.length)
  return remaining[index]
}

export function isGameComplete(drawn: number[]): boolean {
  return drawn.length >= BINGO_NUMEROS.length
}

export function getProgress(drawn: number[]): number {
  if (BINGO_NUMEROS.length === 0) return 0
  return Math.min(100, Math.round((drawn.length / BINGO_NUMEROS.length) * 100))
}

export function isConfiguredSettings(settings: BingoSettings | null): settings is BingoSettings {
  return !!settings
}

export function normalizeSettings(stored: Partial<BingoSettings> | null): BingoSettings {
  if (!stored) return defaultSettings
  return { ...defaultSettings, ...stored }
}

export function getBallSizeClasses(size: BingoSettings["numberSize"]): string {
  switch (size) {
    case "normal":
      return "max-w-[16rem] sm:max-w-[18rem]"
    case "projector":
      return "max-w-[28rem] sm:max-w-[38rem]"
    case "large":
    default:
      return "max-w-[20rem] sm:max-w-[24rem]"
  }
}

export const BINGO_BALL = {
  ball: "#4386f9",
  light: "#6ba3ff",
  dark: "#2d5a9d",
  text: "#1a2332",
}

export const BINGO_BALL_DRAWN = {
  ball: "#1f7498",
  light: "#3a9fc4",
  dark: "#155a75",
  text: "#ffffff",
}

export const BINGO_BALL_LAST = {
  ball: "#e7ff54",
  light: "#f5ff8a",
  dark: "#b8cc42",
  text: "#1a2332",
}
