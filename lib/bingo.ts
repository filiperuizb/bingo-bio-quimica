import type { BingoSettings } from "./types"

export const defaultSettings: BingoSettings = {
  title: "Bingo da Festa",
  maxNumber: 75,
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

export function generateNumbers(max: number): number[] {
  const total = Math.max(1, Math.floor(max))
  return Array.from({ length: total }, (_, index) => index + 1)
}

export function getRemainingNumbers(numbers: number[], drawn: number[]): number[] {
  const drawnSet = new Set(drawn)
  return numbers.filter((value) => !drawnSet.has(value))
}

export function pickRandomNumber(remaining: number[]): number | null {
  if (remaining.length === 0) return null
  const index = Math.floor(Math.random() * remaining.length)
  return remaining[index]
}

export function isGameComplete(numbers: number[], drawn: number[]): boolean {
  return numbers.length > 0 && drawn.length >= numbers.length
}

export function getProgress(numbers: number[], drawn: number[]): number {
  if (numbers.length === 0) return 0
  return Math.min(100, Math.round((drawn.length / numbers.length) * 100))
}

export function isValidMaxNumber(value: number): boolean {
  return Number.isFinite(value) && value > 1 && value <= 1000
}

export function isConfiguredSettings(settings: BingoSettings | null): settings is BingoSettings {
  return !!settings && isValidMaxNumber(settings.maxNumber) && settings.title.trim().length > 0
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

const BINGO_LETTERS = ["B", "I", "N", "G", "O"] as const

export type BingoLetter = (typeof BINGO_LETTERS)[number]

export const BINGO_BALL_STYLES: Record<
  BingoLetter,
  { ball: string; light: string; dark: string; text: string }
> = {
  B: { ball: "#e63946", light: "#ff6b7a", dark: "#b82d38", text: "#ffffff" },
  I: { ball: "#457b9d", light: "#6ba3c7", dark: "#2d5a7b", text: "#ffffff" },
  N: { ball: "#f0ebe3", light: "#ffffff", dark: "#c8c0b4", text: "#1a1a2e" },
  G: { ball: "#2a9d8f", light: "#4ec4b4", dark: "#1d7268", text: "#ffffff" },
  O: { ball: "#e9c46a", light: "#f5d98e", dark: "#c4a035", text: "#1a1a2e" },
}

export function getBingoLetter(number: number, maxNumber: number): BingoLetter {
  if (maxNumber <= 75) {
    if (number <= 15) return "B"
    if (number <= 30) return "I"
    if (number <= 45) return "N"
    if (number <= 60) return "G"
    return "O"
  }
  const segment = maxNumber / 5
  const index = Math.min(4, Math.floor((number - 1) / segment))
  return BINGO_LETTERS[index]
}
