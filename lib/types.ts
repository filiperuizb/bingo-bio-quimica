export type NumberSize = "normal" | "large" | "projector"

export interface BingoSettings {
  title: string
  maxNumber: number
  animationSpeed: number
  revealDuration: number
  confettiEnabled: boolean
  numberSize: NumberSize
  historyCount: number
  showAllDrawnPanel: boolean
  showRemainingCounter: boolean
  presentationMode: boolean
  confirmBeforeReset: boolean
  blockWhenComplete: boolean
  lottieEnabled: boolean
}

export interface BingoState {
  settings: BingoSettings
  numbers: number[]
  drawnNumbers: number[]
  lastNumber: number | null
}
