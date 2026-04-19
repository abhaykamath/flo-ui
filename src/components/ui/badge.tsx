import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 font-sans text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground",
        secondary:   "bg-secondary text-secondary-foreground",
        outline:     "border-border text-foreground",
        destructive: "bg-destructive/10 text-destructive",
        sage:   "bg-sage-pale   text-sage   border-sage-2/40",
        peach:  "bg-peach-pale  text-peach  border-peach-2/40",
        lemon:  "bg-lemon-pale  text-ink-2  border-lemon-2/40",
        lavend: "bg-lavend-pale text-lavend border-lavend/30",
        rose:   "bg-rose-pale   text-rose   border-rose/30",
        ink:    "bg-ink text-paper",
        paper:  "bg-paper-2 text-ink-2 border-border",
      },
    },
    defaultVariants: {
      variant: "paper",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
