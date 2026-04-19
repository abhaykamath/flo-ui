import { useState } from 'react'
import { Target, CheckCircle2, Trash2 } from 'lucide-react'
import { BudgetGoalRing } from '@/components/flo/BudgetGoalRing'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Goal, Contribution, GoalStatus } from '@/types/goal'
import { savedAmountForGoal } from '../hooks/useLocalGoals'

interface GoalsPanelProps {
  goals: Goal[]
  contributions: Contribution[]
  onCreateGoal: () => void
  onContribute: (goal: Goal) => void
  onDeleteGoal: (goalId: string) => void
}

function formatDeadline(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

const FILTERS: { label: string; value: GoalStatus }[] = [
  { label: 'Open',     value: 'open'     },
  { label: 'Complete', value: 'complete' },
]

export function GoalsPanel({ goals, contributions, onCreateGoal, onContribute, onDeleteGoal }: GoalsPanelProps) {
  const [filter, setFilter]               = useState<GoalStatus>('open')
  const [pendingDelete, setPendingDelete] = useState<Goal | null>(null)

  const openGoals     = goals.filter(g => g.status === 'open')
  const completeGoals = goals.filter(g => g.status === 'complete')
  const visible       = filter === 'open' ? openGoals : completeGoals
  const hasAny        = goals.length > 0

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-(--color-card) lg:col-span-2 lg:row-span-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-ink-3">
            Your Goals
          </span>
          <div className="flex items-center gap-1.5">
          {FILTERS.map(({ label, value }) => {
            const count = value === 'open' ? openGoals.length : completeGoals.length
            return (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold transition-all',
                  filter === value
                    ? 'bg-(--color-lavend-pale) text-lavend'
                    : 'text-ink-3 hover:text-ink',
                )}
              >
                {label}
                {count > 0 && (
                  <span className={cn(
                    'flex size-3.5 items-center justify-center rounded-full font-sans text-[0.55rem] font-bold',
                    filter === value ? 'bg-lavend text-paper' : 'bg-paper-3 text-ink-3',
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
          </div>
        </div>

        <button
          onClick={onCreateGoal}
          className="font-sans text-xs font-medium text-ink-2 transition-colors hover:text-ink"
        >
          + New goal
        </button>
      </div>

      {/* Body */}
      {!hasAny ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-(--color-lavend-pale)">
            <Target size={18} className="text-lavend" />
          </div>
          <p className="font-serif text-base font-semibold text-ink">No goals yet.</p>
          <p className="max-w-[200px] font-sans text-sm text-ink-3">
            Something you're working toward? Set a goal and Flo will keep count.
          </p>
          <button
            onClick={onCreateGoal}
            className="mt-1 rounded-full border border-border bg-paper-2 px-4 py-2 font-sans text-xs font-semibold text-ink-2 transition-all hover:border-ink-3 hover:bg-white hover:text-ink"
          >
            Create your first goal
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center">
          <p className="font-serif text-base font-semibold text-ink">
            {filter === 'open' ? 'No open goals.' : 'Nothing completed yet.'}
          </p>
          <p className="font-sans text-sm text-ink-3">
            {filter === 'open'
              ? 'All your goals are complete. Start a new one?'
              : 'Keep going — completed goals will show up here.'}
          </p>
        </div>
      ) : filter === 'open' ? (
        <div className="grid grid-cols-2 gap-4 overflow-y-auto p-4">
          {visible.map(goal => {
            const saved = savedAmountForGoal(goal.id, contributions)
            return (
              <div key={goal.id} className="group relative flex flex-col gap-1">
                <button
                  onClick={() => onContribute(goal)}
                  className="text-left focus-visible:outline-none"
                >
                  <div className="transition-transform group-hover:-translate-y-0.5">
                    <BudgetGoalRing
                      label={goal.name}
                      current={saved}
                      target={goal.targetAmount}
                      emoji={goal.emoji}
                      showCta
                      className="cursor-pointer group-hover:shadow-md"
                    />
                  </div>
                </button>
                {goal.deadline && (
                  <p className="text-center font-sans text-[0.65rem] text-ink-3">
                    by {formatDeadline(goal.deadline)}
                  </p>
                )}
                {goal.note && (
                  <p className="truncate text-center font-sans text-[0.65rem] italic text-ink-3">
                    {goal.note}
                  </p>
                )}
                <button
                  onClick={() => setPendingDelete(goal)}
                  className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-paper text-ink-3 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-rose/10 hover:text-rose"
                  aria-label={`Delete ${goal.name}`}
                >
                  <Trash2 size={11} />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto p-4">
          {visible.map(goal => (
            <div
              key={goal.id}
              className="group flex items-center gap-3 rounded-xl bg-paper-2 px-3.5 py-3"
            >
              {goal.emoji
                ? <span className="text-base leading-none">{goal.emoji}</span>
                : <CheckCircle2 size={15} className="shrink-0 text-sage" />
              }
              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-sm font-medium text-ink">{goal.name}</p>
                {goal.note && (
                  <p className="truncate font-sans text-[0.65rem] text-ink-3">{goal.note}</p>
                )}
              </div>
              <CheckCircle2 size={14} className="shrink-0 text-sage" />
              <button
                onClick={() => setPendingDelete(goal)}
                className="ml-1 flex size-6 items-center justify-center rounded-full text-ink-3 opacity-0 transition-all group-hover:opacity-100 hover:bg-rose/10 hover:text-rose"
                aria-label={`Delete ${goal.name}`}
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={pendingDelete !== null} onOpenChange={(open) => { if (!open) setPendingDelete(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this goal?</DialogTitle>
            <DialogDescription>
              {pendingDelete?.emoji && `${pendingDelete.emoji} `}{pendingDelete?.name}
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-4">
            <p className="font-sans text-sm text-ink-2">
              This will permanently delete the goal and all contributions made toward it. There's no way to undo this.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                className="flex-1 rounded-full border border-border bg-paper-2 py-2.5 font-sans text-sm font-semibold text-ink-2 transition-all hover:bg-paper-3"
              >
                Keep it
              </button>
              <button
                onClick={() => {
                  if (pendingDelete) onDeleteGoal(pendingDelete.id)
                  setPendingDelete(null)
                }}
                className="flex-1 rounded-full bg-rose py-2.5 font-sans text-sm font-semibold text-paper transition-all hover:opacity-90"
              >
                Yes, delete
              </button>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  )
}
