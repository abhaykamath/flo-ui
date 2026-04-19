import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { LogEntryDialog } from '../components/LogEntryDialog'
import { LedgerPanel } from '../components/LedgerPanel'
import { useLocalEntries } from '../hooks/useLocalEntries'
import type { EntryFormData } from '../entrySchema'

function formatAmount(amount: number): string {
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount)}`
}

function formatDateShort(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [ledgerOpen, setLedgerOpen] = useState(false)
  const { entries, addEntry, deleteEntry } = useLocalEntries()

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
    <main className="mx-auto max-w-[1100px] px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
      {/* Ledger tab — fixed to right edge */}
      <button
        onClick={() => setLedgerOpen(true)}
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 flex h-28 w-9 items-center justify-center overflow-hidden rounded-l-xl border border-r-0 border-border bg-paper-2 text-ink-2 shadow-sm transition-all hover:bg-paper-3 hover:text-ink hover:shadow-md"
        aria-label="Open ledger"
      >
        <span className="rotate-90 select-none whitespace-nowrap font-sans text-xs font-semibold tracking-wider">
          your ledger
        </span>
      </button>

      <div className="flex flex-col items-center justify-center gap-6 py-16">

        <button
          onClick={() => setDialogOpen(true)}
          className="group w-full max-w-sm cursor-pointer rounded-2xl border border-dashed border-ink-3/40 bg-paper-2 p-8 text-center transition-all hover:-translate-y-0.5 hover:bg-paper-3 hover:shadow-md"
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
