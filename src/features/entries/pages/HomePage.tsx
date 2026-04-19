import { useState, useEffect } from 'react'
import {
  Plus, ArrowRight, MoreHorizontal,
  Utensils, Car, ShoppingBag, Music, HeartPulse,
  Zap, Home, BookOpen, Plane, Briefcase, Laptop, TrendingUp, Gift,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { LogEntryDialog } from '../components/LogEntryDialog'
import { LedgerPanel } from '../components/LedgerPanel'
import { useLocalEntries } from '../hooks/useLocalEntries'
import type { EntryFormData } from '../entrySchema'
import type { Entry } from '@/types/entry'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  Utensils, Car, ShoppingBag, Music, HeartPulse, Zap, Home, BookOpen,
  Plane, Briefcase, Laptop, TrendingUp, Gift, MoreHorizontal,
}

function formatAmount(amount: number): string {
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount)}`
}

function formatDateShort(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function dayLabel(ymd: string): string {
  const todayStr = new Date().toISOString().split('T')[0]
  const yesterdayStr = new Date(Date.now() - 86_400_000).toISOString().split('T')[0]
  if (ymd === todayStr) return 'Today'
  if (ymd === yesterdayStr) return 'Yesterday'
  return formatDateShort(ymd)
}

function RecentEntryRow({ entry }: { entry: Entry }) {
  const Icon = ICON_MAP[entry.iconName] ?? MoreHorizontal
  const isExpense = entry.type === 'expense'

  return (
    <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-paper-2">
      <div className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full',
        isExpense ? 'bg-peach-pale' : 'bg-sage-pale',
      )}>
        <Icon size={13} className={isExpense ? 'text-peach' : 'text-sage'} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-medium text-ink">{entry.category}</p>
        {entry.note && <p className="truncate font-sans text-xs text-ink-3">{entry.note}</p>}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span className={cn(
          'font-serif text-sm font-bold',
          isExpense ? 'text-peach' : 'text-sage',
        )}>
          {isExpense ? '−' : '+'}{formatAmount(entry.amount)}
        </span>
        <span className="font-sans text-[0.65rem] text-ink-3">{dayLabel(entry.date)}</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [ledgerOpen, setLedgerOpen] = useState(false)
  const { entries, addEntry, deleteEntry } = useLocalEntries()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'l' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setLedgerOpen(open => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const recentEntries = entries.slice(0, 5)

  function handleSubmit(data: EntryFormData) {
    const entry = addEntry(data)

    const title = entry.type === 'expense'
      ? `${formatAmount(entry.amount)} spent`
      : `${formatAmount(entry.amount)} added`

    toast(title, {
      description: `${entry.category} · ${formatDateShort(entry.date)}`,
    })
  }

  return (
    <main
      className="min-h-full w-full px-6 pt-8 pb-16"
      style={{
        // Graph-paper background — Tailwind cannot express multi-layer gradients with background-size
        backgroundImage: 'linear-gradient(rgba(42,33,24,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(42,33,24,.03) 1px,transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Ledger tab — fixed to right edge */}
      <button
        onClick={() => setLedgerOpen(true)}
        className="fixed right-0 top-3/4 z-40 -translate-y-1/2 flex h-32 w-8 items-center justify-center overflow-hidden rounded-l-xl border border-r-0 border-border bg-paper-2 text-ink-2 shadow-sm transition-all hover:bg-paper-3 hover:text-ink hover:shadow-md"
        aria-label="Open ledger (⌘L)"
      >
        <div className="rotate-90 flex select-none items-center gap-1.5 whitespace-nowrap">
          <span className="font-sans text-xs font-semibold tracking-wider">your ledger</span>
          <span className="font-mono text-[0.6rem] text-ink-2">⌘+L</span>
        </div>
      </button>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-4">

        {/* ── Left col (entries) ── */}
        <div className="flex flex-col gap-4 lg:col-span-2">

          {/* Log entry card */}
          <button
            onClick={() => setDialogOpen(true)}
            className="group w-full cursor-pointer rounded-2xl border border-dashed border-ink-3/40 bg-paper-2/80 p-8 text-center transition-all hover:-translate-y-0.5 hover:bg-paper-2 hover:shadow-md"
          >
            <div className="mb-5 text-3xl">✏️</div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-ink">What did you spend on today?</h3>
              <p className="font-sans text-sm text-ink-3">
                Or earn. No judgement either way.<br />
                Even that oat milk latte deserves to exist on paper.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-1.5 text-ink-2">
              <Plus size={13} />
              <span className="font-sans text-sm font-medium">Log an entry</span>
            </div>
          </button>

          {/* Recent entries */}
          <div className="overflow-hidden rounded-2xl border border-border bg-paper-2/80">
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-ink-3">
                Recent entries
              </span>
              {entries.length > 0 && (
                <button
                  onClick={() => setLedgerOpen(true)}
                  className="flex items-center gap-1 font-sans text-xs font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  See all <ArrowRight size={11} />
                </button>
              )}
            </div>

            {entries.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="font-serif text-base font-semibold text-ink">Nothing logged yet.</p>
                <p className="mt-1 font-sans text-sm text-ink-3">
                  Your entries will appear here as you add them.
                </p>
              </div>
            ) : (
              <div className="px-1 py-2">
                {recentEntries.map(entry => (
                  <RecentEntryRow key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right col (coming soon) ── */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-3/30 bg-paper-2/50 py-20 text-center">
            <div className="text-2xl">🔭</div>
            <p className="font-serif text-base font-semibold text-ink">Analytics coming soon.</p>
            <p className="max-w-[220px] font-sans text-sm text-ink-3">
              Spend breakdowns, budget tracking, and goal progress — all here, soon.
            </p>
          </div>
        </div>

      </div>

      <LogEntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      <LedgerPanel
        open={ledgerOpen}
        onOpenChange={setLedgerOpen}
        entries={entries}
        onDeleteEntry={deleteEntry}
      />
    </main>
  )
}
