import { ArrowRight } from 'lucide-react'

interface LogEntryCardProps {
  onClick: () => void
}

export function LogEntryCard({ onClick }: LogEntryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full flex-col items-start cursor-pointer overflow-hidden rounded-2xl border border-border bg-(--color-card) p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-(--color-sage)" />

      {/* Icon art */}
      <div className="mb-4 mt-1">
        <div className="flex size-10 items-center justify-center rounded-xl bg-(--color-sage-pale)">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <rect x="11" y="9" width="18" height="22" rx="3" fill="white" stroke="#8FB89A" strokeWidth="1.5" />
            <line x1="15" y1="15" x2="25" y2="15" stroke="#8FB89A" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="15" y1="19" x2="22" y2="19" stroke="#B8D4BF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="15" y1="23" x2="23" y2="23" stroke="#B8D4BF" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="28" cy="28" r="7" fill="#8FB89A" />
            <line x1="28" y1="25" x2="28" y2="31" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="28" x2="31" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <h3 className="font-serif text-base font-semibold text-ink">What did you spend on today?</h3>
      <p className="mt-1.5 font-sans text-sm text-ink-3">
        Or earn — no judgement either way. Even that oat milk latte deserves to exist on paper.
      </p>

      <div className="mt-5 flex items-center gap-1 font-sans text-xs font-semibold text-ink-3 transition-colors group-hover:text-ink">
        Add entry <ArrowRight size={11} />
      </div>
    </button>
  )
}
