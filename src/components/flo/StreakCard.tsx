import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DayStatus = 'done' | 'miss' | 'today' | 'future'

export interface StreakCardProps {
  current: number
  best: number
  consistency: number
  weekData: DayStatus[]
  milestone?: string
  className?: string
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const dayStyles: Record<DayStatus, string> = {
  done:   'bg-sage text-white',
  miss:   'bg-rose-pale text-rose border border-rose/20',
  today:  'bg-lemon text-ink ring-2 ring-lemon/40',
  future: 'bg-paper-3 text-ink-3',
}

function StreakCard({ current, best, consistency, weekData, milestone, className }: StreakCardProps) {
  return (
    <div className={cn('flo-streak-section rounded-2xl p-6 space-y-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flo-eyebrow mb-2">Daily habit</div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold text-ink">{current}</span>
            <span className="font-sans text-sm text-ink-2">day streak</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-lemon/40 bg-lemon-pale px-3 py-1.5">
          <Flame size={14} className="text-lemon" fill="currentColor" />
          <span className="font-sans text-xs font-semibold text-ink-2">{current}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {weekData.map((status, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full font-sans text-[0.65rem] font-semibold transition-all',
                dayStyles[status],
              )}
            >
              {status === 'done' ? '✓' : status === 'miss' ? '×' : status === 'today' ? '•' : ''}
            </div>
            <span className="font-sans text-[0.6rem] font-medium text-ink-3">{DAY_LABELS[i]}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 border-t border-border pt-1">
        <div>
          <p className="font-sans text-[0.68rem] font-medium text-ink-3">Best streak</p>
          <p className="font-serif text-lg font-bold text-ink">{best} days</p>
        </div>
        <div>
          <p className="font-sans text-[0.68rem] font-medium text-ink-3">Consistency</p>
          <p className="font-serif text-lg font-bold text-ink">{Math.round(consistency * 100)}%</p>
        </div>
        {milestone && (
          <div className="ml-auto">
            <p className="max-w-[160px] font-sans text-[0.72rem] italic leading-snug text-ink-2">
              {milestone}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export { StreakCard }
