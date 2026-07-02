"use client"

import { BINGO_ITEMS } from "@/lib/questions"
import { AnswerSpoiler } from "@/components/answer-spoiler"

export function QuestionsList() {
  return (
    <ol className="space-y-3">
      {BINGO_ITEMS.map((item) => (
        <li
          key={item.numero}
          className="space-y-2 rounded-xl border border-border/60 bg-secondary/30 p-3"
        >
          <div className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 font-heading text-sm tabular-nums text-accent">
              {item.numero}
            </span>
            <p className="text-sm leading-relaxed text-foreground">{item.pergunta}</p>
          </div>
          <AnswerSpoiler resposta={item.resposta} resetKey={item.numero} compact />
        </li>
      ))}
    </ol>
  )
}
