import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

interface FloDatePickerProps {
  value: string       // YYYY-MM-DD
  onChange: (value: string) => void
  className?: string
}

function dateToYMD(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDisplay(ymd: string): string {
  if (!ymd) return 'Pick a date'
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

function ymdToDate(ymd: string): Date | undefined {
  if (!ymd) return undefined
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function FloDatePicker({ value, onChange, className }: FloDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-10 w-full items-center gap-2.5 rounded-xl border border-border bg-white px-4',
            'font-sans text-sm text-ink transition-colors',
            'hover:border-ink-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/30 focus-visible:border-sage',
            !value && 'text-ink-3',
            className,
          )}
        >
          <CalendarIcon size={15} className="shrink-0 text-ink-3" />
          {formatDisplay(value)}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto rounded-2xl border-border bg-paper p-0 shadow-lg"
        align="start"
      >
        <Calendar
          mode="single"
          selected={ymdToDate(value)}
          onSelect={(date) => date && onChange(dateToYMD(date))}
          disabled={{ after: new Date() }}
          className="rounded-2xl"
        />
      </PopoverContent>
    </Popover>
  )
}
