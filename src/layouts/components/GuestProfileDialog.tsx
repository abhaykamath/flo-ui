import { useMemo } from 'react'
import { Flame, BookOpen, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { Entry } from '@/types/entry'

interface GuestProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  streakCount: number
}

function readEntries(): Entry[] {
  try {
    const raw = localStorage.getItem('flo_entries')
    return raw ? (JSON.parse(raw) as Entry[]) : []
  } catch {
    return []
  }
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// ─── Inner content ────────────────────────────────────────────────────────────

interface GuestProfileContentProps {
  streakCount: number
  entryCount: number
  lastActivity: string | null
  CloseButton: React.ReactNode
}

function GuestProfileContent({
  streakCount,
  entryCount,
  lastActivity,
  CloseButton,
}: GuestProfileContentProps) {
  return (
    <>
      {/* Header band */}
      <div className="relative flex flex-col items-center gap-3 rounded-t-2xl bg-sage-pale px-6 pb-6 pt-8">
        <div className="absolute right-4 top-4">{CloseButton}</div>
        <div className="flex size-16 items-center justify-center rounded-full border-2 border-sage-2 bg-paper font-sans text-2xl font-bold text-sage">
          G
        </div>
        <div className="text-center">
          <p className="font-serif text-[1.15rem] font-bold tracking-[-0.4px] text-ink">
            You're exploring as a guest
          </p>
          <p className="mt-1 font-sans text-[0.78rem] text-ink-3">
            No account yet — and that's totally fine.
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-5">

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-paper-2">
          <div className="flex flex-col items-center gap-1 px-3 py-3">
            <Flame size={14} className="text-lemon" fill="currentColor" />
            <span className="font-sans text-[1rem] font-bold text-ink">{streakCount}</span>
            <span className="font-sans text-[0.68rem] text-ink-3">day streak</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-3">
            <BookOpen size={14} className="text-sage" />
            <span className="font-sans text-[1rem] font-bold text-ink">{entryCount}</span>
            <span className="font-sans text-[0.68rem] text-ink-3">entries</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-3">
            <Clock size={14} className="text-ink-3" />
            <span className="font-sans text-[1rem] font-bold text-ink">
              {lastActivity ? relativeTime(lastActivity) : '—'}
            </span>
            <span className="font-sans text-[0.68rem] text-ink-3">last logged</span>
          </div>
        </div>

        {/* Storage explanation */}
        <div className="mb-3 rounded-xl border border-border bg-paper-2 px-4 py-3.5">
          <p className="font-sans text-[0.8rem] leading-relaxed text-ink-2">
            Everything you've logged lives right here on this device — quietly, privately, going
            nowhere. Think of it as a personal notebook that only your browser can read.
          </p>
          <p className="mt-2 font-sans text-[0.8rem] leading-relaxed text-ink-2">
            The catch: clear your browser data and it disappears. An account keeps it safe.
          </p>
        </div>

        {/* PS note */}
        <p className="mb-5 font-sans text-[0.72rem] italic leading-relaxed text-ink-3">
          P.S. If you know what localStorage is — hi, hello — your entries are tucked away
          under the key{' '}
          <span className="not-italic font-mono text-[0.7rem] bg-paper-3 px-1 py-0.5 rounded text-ink-2">
            flo_entries
          </span>
          . Go ahead and peek.
        </p>

        {/* CTAs */}
        <button
          type="button"
          className="mb-2 w-full rounded-xl bg-ink py-3 font-sans text-[0.85rem] font-semibold text-paper-2 transition-opacity hover:opacity-80"
        >
          Create a free account
        </button>

      </div>
    </>
  )
}

// ─── Dialog wrapper ───────────────────────────────────────────────────────────

export function GuestProfileDialog({ open, onOpenChange, streakCount }: GuestProfileDialogProps) {
  const isMobile = useIsMobile()

  const { entryCount, lastActivity } = useMemo(() => {
    const entries = readEntries()
    const sorted = [...entries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    return {
      entryCount:   entries.length,
      lastActivity: sorted[0]?.createdAt ?? null,
    }
  }, [open])

  const sharedProps = {
    streakCount,
    entryCount,
    lastActivity,
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="gap-0 rounded-t-2xl border-0 bg-paper p-0"
        >
          {/* drag handle */}
          <div className="mx-auto mb-1 mt-3 h-1 w-10 rounded-full bg-paper-3" />
          <div className="max-h-[92vh] overflow-y-auto pb-4">
            <GuestProfileContent
              {...sharedProps}
              CloseButton={
                <SheetClose asChild>
                  <button
                    aria-label="Close"
                    className="flex size-7 items-center justify-center rounded-full bg-paper-2/80 text-ink-2 transition-colors hover:bg-paper-2"
                  >
                    ×
                  </button>
                </SheetClose>
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px] p-0">
        <GuestProfileContent
          {...sharedProps}
          CloseButton={
            <DialogClose asChild>
              <button
                aria-label="Close"
                className="flex size-7 items-center justify-center rounded-full bg-paper-2/80 text-ink-2 transition-colors hover:bg-paper-2"
              >
                ×
              </button>
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
