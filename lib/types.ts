export type NumberSize = "normal" | "large" | "projector"

export interface BingoItem {
  numero: number
  pergunta: string
  resposta: string
}

export interface BingoSettings {
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
  drawnNumbers: number[]
  lastNumber: number | null
}
