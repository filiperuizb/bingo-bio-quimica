"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface HeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-normal leading-tight text-balance text-accent sm:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </motion.header>
  )
}
