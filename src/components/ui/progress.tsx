import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ProgressVariant = "sage" | "peach" | "lemon" | "rose" | "lavend"

const fillVariant: Record<ProgressVariant, string> = {
  sage:   "bg-sage",
  peach:  "bg-peach",
  lemon:  "bg-lemon",
  rose:   "bg-rose",
  lavend: "bg-lavend",
}

function Progress({
  className,
  value,
  variant,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant?: ProgressVariant
}) {
  const pct = Math.min(Math.max(value ?? 0, 0), 100)

  let fill: string
  if (variant) {
    fill = fillVariant[variant]
  } else if (pct >= 100) {
    fill = "bg-rose"
  } else if (pct >= 75) {
    fill = "bg-lemon"
  } else {
    fill = "bg-sage"
  }

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-hidden rounded-full bg-paper-3",
        className
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("size-full flex-1 transition-all duration-300", fill)}
        style={{ transform: `translateX(-${100 - pct}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
