import { Target, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GOAL_RING_SIZE, GOAL_RING_STROKE } from '@/lib/constants'

export interface BudgetGoalRingProps {
  label: string
  current: number
  target: number
  /** Optional emoji shown in the ring center instead of the default target icon */
  emoji?: string
  monthlyRate?: number
  projectedDate?: string
  /** When set, renders a CTA row at the bottom of the card */
  showCta?: boolean
  className?: string
}

const R = (GOAL_RING_SIZE - GOAL_RING_STROKE) / 2
const C = 2 * Math.PI * R

const fmt = (n: number) =>
  `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)}`

function BudgetGoalRing({ label, current, target, emoji, monthlyRate, projectedDate, showCta, className }: BudgetGoalRingProps) {
  const pct    = Math.min(current / target, 1)
  const filled = pct * C

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
          {emoji
            ? <span className="mb-1 text-2xl leading-none">{emoji}</span>
            : <Target size={16} className="mb-1 text-lavend" />
          }
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

      {showCta && (
        <div className="flex items-center gap-1 font-sans text-xs font-semibold text-ink-3 transition-colors group-hover:text-ink">
          Add to goal <ArrowRight size={11} />
        </div>
      )}
    </div>
  )
}

export { BudgetGoalRing }
