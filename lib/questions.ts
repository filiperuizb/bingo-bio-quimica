import type { BingoItem } from "./types"

export const BINGO_TITLE = "Bingo da Saúde"

export const BINGO_ITEMS: BingoItem[] = [
  {
    numero: 1,
    pergunta:
      "Praticar exercícios regularmente ajuda a controlar qual doença relacionada ao açúcar no sangue?",
  },
  {
    numero: 2,
    pergunta: "Quanto tempo é recomendado evitar exercícios intensos antes de alguns exames?",
  },
  {
    numero: 3,
    pergunta: "Antes de um exame, devemos parar os medicamentos por conta própria?",
  },
  {
    numero: 4,
    pergunta: "Qual órgão é responsável por metabolizar grande parte dos medicamentos?",
  },
  {
    numero: 5,
    pergunta: "Além dos medicamentos, qual vitamina em excesso pode interferir em alguns exames?",
  },
  {
    numero: 6,
    pergunta: "Qual exame avalia o açúcar no sangue?",
  },
  {
    numero: 7,
    pergunta:
      "Qual medicamento para diabetes, junto com exercício, pode aumentar o risco de queda da glicemia?",
  },
  {
    numero: 8,
    pergunta: "Medicamentos para pressão podem causar qual sintoma durante o exercício?",
  },
  {
    numero: 9,
    pergunta: "Beber água antes da coleta normalmente é:",
  },
  {
    numero: 10,
    pergunta: "O exercício regular ajuda a diminuir o:",
  },
  {
    numero: 11,
    pergunta: "Qual exame do fígado pode aumentar após um exercício intenso?",
  },
  {
    numero: 12,
    pergunta: "Qual é o principal benefício da atividade física para a saúde?",
  },
]

export const BINGO_NUMEROS = BINGO_ITEMS.map((item) => item.numero)

export function getBingoItem(numero: number): BingoItem | undefined {
  return BINGO_ITEMS.find((item) => item.numero === numero)
}
