import { Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOAL_RING_SIZE, GOAL_RING_STROKE } from '@/lib/constants'

export interface BudgetGoalRingProps {
  label: string
  current: number
  target: number
  monthlyRate?: number
  projectedDate?: string
  className?: string
}

const R = (GOAL_RING_SIZE - GOAL_RING_STROKE) / 2
const C = 2 * Math.PI * R

function BudgetGoalRing({ label, current, target, monthlyRate, projectedDate, className }: BudgetGoalRingProps) {
  const pct    = Math.min(current / target, 1)
  const filled = pct * C

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className={cn('flo-card flex flex-col items-center gap-4 p-6', className)}>
      <div className="relative">
        <svg width={GOAL_RING_SIZE} height={GOAL_RING_SIZE} viewBox={`0 0 ${GOAL_RING_SIZE} ${GOAL_RING_SIZE}`} className="-rotate-90">
          <circle cx={GOAL_RING_SIZE / 2} cy={GOAL_RING_SIZE / 2} r={R} fill="none" stroke="var(--color-paper-3)" strokeWidth={GOAL_RING_STROKE} />
          <circle
            cx={GOAL_RING_SIZE / 2} cy={GOAL_RING_SIZE / 2} r={R}
            fill="none" stroke="var(--color-lavend)" strokeWidth={GOAL_RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${C}`}
            // SVG presentation attributes can't use Tailwind — transition must be inline
            style={{ transition: 'stroke-dasharray 600ms ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Target size={16} className="mb-1 text-lavend" />
          <p className="font-serif text-xl font-bold leading-none text-ink">{Math.round(pct * 100)}%</p>
        </div>
      </div>

      <div className="space-y-1 text-center">
        <h4 className="font-sans text-sm font-semibold text-ink">{label}</h4>
        <p className="font-sans text-[0.72rem] text-ink-3">
          <span className="font-serif text-sm font-bold text-ink">{fmt(current)}</span> of {fmt(target)}
        </p>
        {monthlyRate && (
          <p className="font-sans text-[0.68rem] text-ink-3">+{fmt(monthlyRate)}/mo</p>
        )}
        {projectedDate && (
          <p className="font-sans text-[0.68rem] italic text-sage">On track for {projectedDate}</p>
        )}
      </div>
    </div>
  )
}

export { BudgetGoalRing }
