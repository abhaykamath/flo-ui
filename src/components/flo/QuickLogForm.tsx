import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, TrendingDown, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FloDatePicker } from './FloDatePicker'
import { cn } from '@/lib/utils'
import { entryFormSchema, type EntryFormData } from '@/features/entries/entrySchema'
import { getCategoriesForType, type Category } from '@/lib/categories'
import { haptic } from '@/lib/haptics'

export interface QuickLogFormProps {
  onSubmit: (data: EntryFormData) => void
  defaultType?: 'expense' | 'income'
}

const today = new Date().toISOString().split('T')[0]

// ─── Step dots ────────────────────────────────────────────────────────────────

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[1, 2, 3].map(s => (
        <div
          key={s}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            s === step ? 'w-5 bg-ink' : s < step ? 'w-1.5 bg-ink-3' : 'w-1.5 bg-paper-3',
          )}
        />
      ))}
    </div>
  )
}

// ─── Step 1 — How much? ───────────────────────────────────────────────────────

interface Step1Props {
  form: ReturnType<typeof useForm<EntryFormData>>
  onNext: () => void
}

function Step1({ form, onNext }: Step1Props) {
  const { register, watch, setValue, formState: { errors } } = form
  const selectedType = watch('type')

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-[1.4rem] font-bold tracking-tight text-ink">How much?</h2>
        <p className="mt-0.5 font-sans text-[0.78rem] text-ink-3">Enter the amount to log.</p>
      </div>

      {/* Type toggle */}
      <div className="flex rounded-full border border-border bg-paper-2 p-1">
        {([
          { t: 'expense', label: 'Expense', Icon: TrendingDown },
          { t: 'income',  label: 'Income',  Icon: TrendingUp  },
        ] as const).map(({ t, label, Icon }) => (
          <button
            key={t}
            type="button"
            onClick={() => { haptic('light'); setValue('type', t); setValue('categoryKey', '') }}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 font-sans text-sm font-semibold transition-all duration-200',
              selectedType === t
                ? t === 'expense'
                  ? 'bg-peach-pale text-peach shadow-sm'
                  : 'bg-sage-pale text-sage shadow-sm'
                : 'text-ink-3 hover:text-ink-2',
            )}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">Amount</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl font-bold text-ink-3 select-none">
            ₹
          </span>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            {...register('amount', { valueAsNumber: true })}
            className={cn(
              'h-14 pl-9 font-serif text-xl font-bold text-ink placeholder:font-sans placeholder:text-base placeholder:font-normal',
              errors.amount && 'border-rose focus-visible:border-rose focus-visible:ring-rose/20',
            )}
          />
        </div>
        {errors.amount && (
          <p className="font-sans text-[0.72rem] text-rose">{errors.amount.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-full bg-ink py-3 font-sans text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:shadow-md"
      >
        Continue →
      </button>
    </div>
  )
}

// ─── Step 2 — What was it for? ────────────────────────────────────────────────

interface Step2Props {
  form: ReturnType<typeof useForm<EntryFormData>>
  onSelect: (key: string) => void
  onBack: () => void
}

function Step2({ form, onSelect, onBack }: Step2Props) {
  const { watch, formState: { errors } } = form
  const selectedType        = watch('type')
  const selectedCategoryKey = watch('categoryKey')
  const categories          = getCategoriesForType(selectedType)

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onBack}
          className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink-2 transition-colors hover:bg-paper-3"
          aria-label="Back"
        >
          <ChevronLeft size={15} />
        </button>
        <div>
          <h2 className="font-serif text-[1.4rem] font-bold tracking-tight text-ink">What was it for?</h2>
          <p className="mt-0.5 font-sans text-[0.78rem] text-ink-3">
            Pick a category — it'll take you straight to the next step.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {categories.map((cat: Category) => {
          const Icon       = cat.icon
          const isSelected = selectedCategoryKey === cat.key
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onSelect(cat.key)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3.5 py-2 font-sans text-sm font-medium transition-all duration-150',
                isSelected
                  ? selectedType === 'expense'
                    ? 'border-peach bg-peach-pale text-peach shadow-sm'
                    : 'border-sage bg-sage-pale text-sage shadow-sm'
                  : 'border-border bg-paper-2 text-ink-2 hover:border-ink-3 hover:bg-white hover:text-ink',
              )}
            >
              <Icon size={14} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {errors.categoryKey && (
        <p className="font-sans text-[0.72rem] text-rose">{errors.categoryKey.message}</p>
      )}
    </div>
  )
}

// ─── Step 3 — Anything else? ─────────────────────────────────────────────────

interface Step3Props {
  form: ReturnType<typeof useForm<EntryFormData>>
  onBack: () => void
  isSubmitting: boolean
}

function Step3({ form, onBack, isSubmitting }: Step3Props) {
  const { register, control, formState: { errors } } = form

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onBack}
          className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink-2 transition-colors hover:bg-paper-3"
          aria-label="Back"
        >
          <ChevronLeft size={15} />
        </button>
        <div>
          <h2 className="font-serif text-[1.4rem] font-bold tracking-tight text-ink">Anything else?</h2>
          <p className="mt-0.5 font-sans text-[0.78rem] text-ink-3">Both fields are optional — but a note helps later.</p>
        </div>
      </div>

      {/* Note */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">
          Note <span className="font-normal text-ink-3">— optional</span>
        </Label>
        <Input
          type="text"
          placeholder="Morning coffee, petrol top-up…"
          {...register('note')}
        />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">Date</Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <FloDatePicker value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.date && (
          <p className="font-sans text-[0.72rem] text-rose">{errors.date.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-ink py-3 font-sans text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:shadow-md disabled:opacity-50"
      >
        Log entry
      </button>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function QuickLogForm({ onSubmit, defaultType = 'expense' }: QuickLogFormProps) {
  const [step, setStep]           = useState(1)
  const [stepKey, setStepKey]     = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const form = useForm<EntryFormData>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      type:        defaultType,
      amount:      undefined,
      categoryKey: '',
      note:        '',
      date:        today,
    },
  })

  function advance() {
    setDirection('forward')
    setStepKey(k => k + 1)
    setStep(s => s + 1)
  }

  function retreat() {
    setDirection('back')
    setStepKey(k => k + 1)
    setStep(s => s - 1)
  }

  async function handleNext() {
    const fields: (keyof EntryFormData)[] = step === 1 ? ['type', 'amount'] : ['categoryKey']
    const valid = await form.trigger(fields)
    if (valid) { haptic('medium'); advance() }
  }

  function handleCategorySelect(key: string) {
    haptic('medium')
    form.setValue('categoryKey', key, { shouldValidate: true })
    setTimeout(advance, 160)
  }

  const animationClass = direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <StepDots step={step} />

      <div key={stepKey} className={animationClass}>
        {step === 1 && <Step1 form={form} onNext={handleNext} />}
        {step === 2 && <Step2 form={form} onSelect={handleCategorySelect} onBack={retreat} />}
        {step === 3 && <Step3 form={form} onBack={retreat} isSubmitting={form.formState.isSubmitting} />}
      </div>
    </form>
  )
}
