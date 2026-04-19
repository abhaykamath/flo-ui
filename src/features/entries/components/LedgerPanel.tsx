import { useState, useMemo } from 'react'
import { toast } from 'sonner'
import {
  ChevronLeft, ChevronRight, Trash2, X,
  MoreHorizontal, Utensils, Car, ShoppingBag, Music, HeartPulse,
  Zap, Home, BookOpen, Plane, Briefcase, Laptop, TrendingUp, Gift,
  type LucideIcon,
} from 'lucide-react'
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet'
import { DeleteEntryDialog } from './DeleteEntryDialog'
import type { Entry } from '@/types/entry'
import { cn } from '@/lib/utils'
import { haptic } from '@/lib/haptics'

const ICON_MAP: Record<string, LucideIcon> = {
  Utensils, Car, ShoppingBag, Music, HeartPulse, Zap, Home, BookOpen,
  Plane, Briefcase, Laptop, TrendingUp, Gift, MoreHorizontal,
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatAmount(amount: number): string {
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(Math.abs(amount))}`
}

function dayLabel(ymd: string): string {
  const todayStr = new Date().toISOString().split('T')[0]
  const yesterdayStr = new Date(Date.now() - 86_400_000).toISOString().split('T')[0]
  if (ymd === todayStr) return 'Today'
  if (ymd === yesterdayStr) return 'Yesterday'
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// ─── Entry row ────────────────────────────────────────────────────────────────

interface EntryRowProps {
  entry: Entry
  onDelete: () => void
}

function EntryRow({ entry, onDelete }: EntryRowProps) {
  const Icon = ICON_MAP[entry.iconName] ?? MoreHorizontal
  const isExpense = entry.type === 'expense'

  return (
    <div className="group flex items-center gap-3 rounded-xl bg-paper px-3.5 py-2.5 transition-colors hover:bg-white">
      <div className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full',
        isExpense ? 'bg-peach-pale' : 'bg-sage-pale',
      )}>
        <Icon size={13} className={isExpense ? 'text-peach' : 'text-sage'} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-medium text-ink">{entry.category}</p>
        {entry.note && (
          <p className="truncate font-sans text-xs text-ink-3">{entry.note}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className={cn(
          'font-serif text-sm font-bold',
          isExpense ? 'text-peach' : 'text-sage',
        )}>
          {isExpense ? '−' : '+'}{formatAmount(entry.amount)}
        </span>
        <button
          onClick={() => { haptic('light'); onDelete() }}
          aria-label="Delete entry"
          className="flex size-7 items-center justify-center rounded-full text-ink-3 opacity-0 transition-all hover:bg-rose-pale hover:text-rose group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  )
}

// ─── LedgerPanel ─────────────────────────────────────────────────────────────

export interface LedgerPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entries: Entry[]
  onDeleteEntry: (id: string) => void
}

export function LedgerPanel({ open, onOpenChange, entries, onDeleteEntry }: LedgerPanelProps) {
  const now = new Date()
  const [viewYear, setViewYear]   = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [toDelete, setToDelete]   = useState<Entry | null>(null)

  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth()

  function prevMonth() {
    haptic('light')
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (isCurrentMonth) return
    haptic('light')
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const grouped = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`
    const filtered = entries.filter(e => e.date.startsWith(prefix))
    const map: Record<string, Entry[]> = {}
    for (const e of filtered) {
      if (!map[e.date]) map[e.date] = []
      map[e.date].push(e)
    }
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a))
  }, [entries, viewYear, viewMonth])

  function handleConfirmDelete() {
    if (toDelete) {
      onDeleteEntry(toDelete.id)
      toast('Entry removed', {
        description: `${formatAmount(toDelete.amount)} on ${toDelete.category}`,
      })
      setToDelete(null)
    }
  }

  const entryLabel = toDelete
    ? `${formatAmount(toDelete.amount)} on ${toDelete.category}`
    : undefined

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="flex flex-col gap-0 bg-paper-2 p-0 sm:max-w-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6 sm:py-5">
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">your ledger</h2>
              <p className="font-sans text-xs text-ink-3">everything you've logged</p>
            </div>
            <SheetClose asChild>
              <button
                aria-label="Close ledger"
                className="flex size-9 items-center justify-center rounded-full bg-paper-3 text-ink-2 transition-colors hover:text-ink"
              >
                <X size={13} />
              </button>
            </SheetClose>
          </div>

          {/* Month nav */}
          <div className="flex items-center justify-between border-b border-border px-4 py-2 sm:px-6">
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              className="flex size-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-sans text-sm font-semibold text-ink">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              disabled={isCurrentMonth}
              aria-label="Next month"
              className="flex size-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Entries */}
          <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4">
            {grouped.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="font-serif text-lg font-semibold text-ink">Nothing here yet.</p>
                <p className="mt-1.5 font-sans text-sm text-ink-3">
                  Log something and it'll show up right here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {grouped.map(([date, dayEntries]) => {
                  const net = dayEntries.reduce(
                    (sum, e) => e.type === 'income' ? sum + e.amount : sum - e.amount,
                    0,
                  )
                  return (
                    <div key={date}>
                      <div className="mb-2 flex items-center justify-between px-1">
                        <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-ink-3">
                          {dayLabel(date)}
                        </span>
                        <span className={cn(
                          'font-sans text-xs font-semibold',
                          net >= 0 ? 'text-sage' : 'text-peach',
                        )}>
                          {net >= 0 ? '+' : '−'}{formatAmount(Math.abs(net))}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayEntries.map(entry => (
                          <EntryRow
                            key={entry.id}
                            entry={entry}
                            onDelete={() => setToDelete(entry)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <DeleteEntryDialog
        open={toDelete !== null}
        onOpenChange={open => { if (!open) setToDelete(null) }}
        onConfirm={handleConfirmDelete}
        entryLabel={entryLabel}
      />
    </>
  )
}
