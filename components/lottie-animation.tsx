"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type LottieData = Record<string, unknown>

interface LottieAnimationProps {
  src?: string
  animationData?: LottieData
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export function LottieAnimation({
  src,
  animationData,
  loop = true,
  autoplay = true,
  className,
}: LottieAnimationProps) {
  const [data, setData] = useState<LottieData | null>(animationData ?? null)

  useEffect(() => {
    if (animationData) {
      setData(animationData)
      return
    }
    if (!src) return
    let active = true
    fetch(src)
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (active && json) setData(json)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [src, animationData])

  if (!data) {
    return <div className={cn("pointer-events-none", className)} aria-hidden="true" />
  }

  return (
    <div className={cn("pointer-events-none", className)} aria-hidden="true">
      <Lottie animationData={data} loop={loop} autoplay={autoplay} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
