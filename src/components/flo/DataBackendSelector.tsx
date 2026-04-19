import { type ElementType } from 'react'
import { Cloud, Sheet } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Backend = 'sheets' | 'cloud'

export interface DataBackendSelectorProps {
  value: Backend | null
  onChange: (v: Backend) => void
  className?: string
}

const options: {
  id: Backend
  label: string
  sub: string
  icon: ElementType
  iconColour: string
  bg: string
}[] = [
  {
    id:          'sheets',
    label:       'Google Sheets',
    sub:         'Your data, your spreadsheet. Full control.',
    icon:        Sheet,
    iconColour:  'text-sage',
    bg:          'bg-sage-pale',
  },
  {
    id:          'cloud',
    label:       'Flo Cloud',
    sub:         'Synced across devices. Still yours.',
    icon:        Cloud,
    iconColour:  'text-lavend',
    bg:          'bg-lavend-pale',
  },
]

function DataBackendSelector({ value, onChange, className }: DataBackendSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {options.map((opt) => {
        const Icon       = opt.icon
        const isSelected = value === opt.id

        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              'relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all',
              isSelected
                ? 'border-ink bg-white shadow-md'
                : 'border-border bg-paper-2 hover:border-ink-3 hover:bg-white',
            )}
          >
            <div className={cn('flo-emoji-icon text-base', opt.bg)}>
              <Icon size={18} className={opt.iconColour} />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-ink">{opt.label}</p>
              <p className="mt-0.5 font-sans text-[0.72rem] leading-snug text-ink-3">{opt.sub}</p>
            </div>
            {isSelected && (
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-sage" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export { DataBackendSelector }
