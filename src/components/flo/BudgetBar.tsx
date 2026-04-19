import { cn } from '@/lib/utils'

export interface BudgetBarProps {
  emoji: string
  category: string
  spent: number
  limit: number
  className?: string
}

function BudgetBar({ emoji, category, spent, limit, className }: BudgetBarProps) {
  const pct      = Math.min((spent / limit) * 100, 100)
  const isOver   = spent > limit
  const isWarn   = !isOver && pct >= 75

  const fillColour   = isOver ? 'bg-rose' : isWarn ? 'bg-lemon' : 'bg-sage'
  const amountColour = isOver ? 'text-negative' : isWarn ? 'text-warning' : 'text-ink-2'

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-base">{emoji}</span>
          <span className="truncate font-sans text-sm font-medium text-ink">{category}</span>
          {isOver && (
            <span className="flo-badge shrink-0 border border-rose/30 bg-rose-pale text-[0.62rem] text-rose">over</span>
          )}
          {isWarn && !isOver && (
            <span className="flo-badge shrink-0 border border-lemon/40 bg-lemon-pale text-[0.62rem] text-ink-2">near limit</span>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className={cn('flo-amount text-sm', amountColour)}>{fmt(spent)}</span>
          <span className="ml-1 font-sans text-[0.68rem] text-ink-3">/ {fmt(limit)}</span>
        </div>
      </div>

      <div className="flo-progress-track">
        <div className={cn('flo-progress-fill', fillColour)} style={{ width: `${pct}%` }} />
      </div>

      <p className="font-sans text-[0.68rem] text-ink-3">
        {isOver
          ? `You've gone ${Math.round(pct - 100)}% over. Happens to the best of us.`
          : `${Math.round(pct)}% used · ${fmt(limit)} budget`}
      </p>
    </div>
  )
}

export { BudgetBar }
