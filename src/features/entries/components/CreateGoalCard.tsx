import { ArrowRight } from 'lucide-react'

interface CreateGoalCardProps {
  onClick: () => void
}

export function CreateGoalCard({ onClick }: CreateGoalCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full flex-col items-start cursor-pointer overflow-hidden rounded-2xl border border-border bg-(--color-card) p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-(--color-lavend)" />

      {/* Icon art */}
      <div className="mb-4 mt-1">
        <div className="flex size-10 items-center justify-center rounded-xl bg-(--color-lavend-pale)">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            {/* Outer ring */}
            <circle cx="20" cy="20" r="11" stroke="#C8BEE4" strokeWidth="1.5" fill="none" />
            {/* Progress arc — roughly 65% */}
            <circle
              cx="20" cy="20" r="11"
              stroke="#B4A8D4" strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="44.6 69.1"
              strokeDashoffset="17.3"
              transform="rotate(-90 20 20)"
            />
            {/* Target dot */}
            <circle cx="20" cy="9" r="2" fill="#B4A8D4" />
            {/* Inner label lines */}
            <line x1="16" y1="20" x2="24" y2="20" stroke="#C8BEE4" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="17.5" y1="23" x2="22.5" y2="23" stroke="#C8BEE4" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <h3 className="font-serif text-base font-semibold text-ink">Something you're working towards?</h3>
      <p className="mt-1.5 font-sans text-sm text-ink-3">
        Set a goal and Flo will quietly keep track of how close you're getting.
      </p>

      <div className="mt-5 flex items-center gap-1 font-sans text-xs font-semibold text-ink-3 transition-colors group-hover:text-ink">
        Create goal <ArrowRight size={11} />
      </div>
    </button>
  )
}
