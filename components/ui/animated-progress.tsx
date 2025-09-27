"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  className?: string
  showLabel?: boolean
  variant?: "default" | "success" | "warning" | "danger"
}

export function AnimatedProgress({ value, className, showLabel = false, variant = "default" }: AnimatedProgressProps) {
  const variantStyles = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", variantStyles[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
      </div>
      {showLabel && (
        <motion.span
          className="absolute -top-6 right-0 text-xs font-medium text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {Math.round(value)}%
        </motion.span>
      )}
    </div>
  )
}
