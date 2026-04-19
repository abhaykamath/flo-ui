import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, CalendarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { haptic } from '@/lib/haptics'
import { goalFormSchema, type GoalFormData } from '../goalSchema'

const EMOJI_OPTIONS = ['🚗', '🏠', '✈️', '💻', '📱', '💍', '🎓', '🏖️', '🏋️', '🎸', '🚀', '💰', '🐶', '🎮', '📷', '🛋️']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dateToYMD(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDeadline(ymd: string): string {
  if (!ymd) return 'No deadline'
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function ymdToDate(ymd: string): Date | undefined {
  if (!ymd) return undefined
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d)
}

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

// ─── Step 1 — What are you saving for? ───────────────────────────────────────

interface Step1Props {
  form: ReturnType<typeof useForm<GoalFormData>>
  onNext: () => void
}

function Step1({ form, onNext }: Step1Props) {
  const { register, watch, setValue, formState: { errors } } = form
  const selectedEmoji = watch('emoji')

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-[1.4rem] font-bold tracking-tight text-ink">What are you saving for?</h2>
        <p className="mt-0.5 font-sans text-[0.78rem] text-ink-3">Give it a name — a car, a trip, a rainy day.</p>
      </div>

      {/* Emoji picker */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">
          Pick an emoji <span className="font-normal text-ink-3">— optional</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map(emoji => (
            <button
              key={emoji}
              type="button"
              onClick={() => { haptic('light'); setValue('emoji', selectedEmoji === emoji ? undefined : emoji) }}
              className={cn(
                'flex size-9 items-center justify-center rounded-xl border text-lg transition-all',
                selectedEmoji === emoji
                  ? 'border-lavend bg-(--color-lavend-pale) shadow-sm'
                  : 'border-border bg-paper-2 hover:border-ink-3 hover:bg-white',
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">Goal name</Label>
        <Input
          type="text"
          placeholder="New car, emergency fund…"
          {...register('name')}
          className={cn(errors.name && 'border-rose focus-visible:border-rose focus-visible:ring-rose/20')}
        />
        {errors.name && (
          <p className="font-sans text-[0.72rem] text-rose">{errors.name.message}</p>
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

// ─── Step 2 — How much do you need? ──────────────────────────────────────────

interface Step2Props {
  form: ReturnType<typeof useForm<GoalFormData>>
  onNext: () => void
  onBack: () => void
}

function Step2({ form, onNext, onBack }: Step2Props) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-5">
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
          <h2 className="font-serif text-[1.4rem] font-bold tracking-tight text-ink">How much do you need?</h2>
          <p className="mt-0.5 font-sans text-[0.78rem] text-ink-3">The target you're working toward.</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">Target amount</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl font-bold text-ink-3 select-none">
            ₹
          </span>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            {...register('targetAmount', { valueAsNumber: true })}
            className={cn(
              'h-14 pl-9 font-serif text-xl font-bold text-ink placeholder:font-sans placeholder:text-base placeholder:font-normal',
              errors.targetAmount && 'border-rose focus-visible:border-rose focus-visible:ring-rose/20',
            )}
          />
        </div>
        {errors.targetAmount && (
          <p className="font-sans text-[0.72rem] text-rose">{errors.targetAmount.message}</p>
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

// ─── Step 3 — Anything else? ─────────────────────────────────────────────────

interface Step3Props {
  form: ReturnType<typeof useForm<GoalFormData>>
  onBack: () => void
  isSubmitting: boolean
}

function Step3({ form, onBack, isSubmitting }: Step3Props) {
  const { register, control } = form
  const today = new Date()
  today.setHours(0, 0, 0, 0)

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
          <p className="mt-0.5 font-sans text-[0.78rem] text-ink-3">Both optional — but a note helps later.</p>
        </div>
      </div>

      {/* Note */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">
          Note <span className="font-normal text-ink-3">— optional</span>
        </Label>
        <Input
          type="text"
          placeholder="Honda City, down payment only…"
          {...register('note')}
        />
      </div>

      {/* Deadline */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">
          Deadline <span className="font-normal text-ink-3">— optional</span>
        </Label>
        <Controller
          name="deadline"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'flex h-10 w-full items-center gap-2.5 rounded-xl border border-border bg-white px-4',
                    'font-sans text-sm transition-colors hover:border-ink-3',
                    field.value ? 'text-ink' : 'text-ink-3',
                  )}
                >
                  <CalendarIcon size={15} className="shrink-0 text-ink-3" />
                  {field.value ? formatDeadline(field.value) : 'No deadline'}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-2xl border-border bg-paper p-0 shadow-lg" align="start">
                <Calendar
                  mode="single"
                  selected={ymdToDate(field.value ?? '')}
                  onSelect={(date) => field.onChange(date ? dateToYMD(date) : undefined)}
                  disabled={{ before: today }}
                  className="rounded-2xl"
                />
                {field.value && (
                  <div className="border-t border-border px-3 py-2">
                    <button
                      type="button"
                      onClick={() => field.onChange(undefined)}
                      className="font-sans text-xs text-ink-3 hover:text-ink"
                    >
                      Clear deadline
                    </button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-ink py-3 font-sans text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:shadow-md disabled:opacity-50"
      >
        Create goal
      </button>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface CreateGoalFormProps {
  onSubmit: (data: GoalFormData) => void
}

export function CreateGoalForm({ onSubmit }: CreateGoalFormProps) {
  const [step, setStep]           = useState(1)
  const [stepKey, setStepKey]     = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name:         '',
      emoji:        undefined,
      targetAmount: undefined,
      note:         '',
      deadline:     undefined,
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
    const fields: (keyof GoalFormData)[] = step === 1 ? ['name'] : ['targetAmount']
    const valid = await form.trigger(fields)
    if (valid) { haptic('medium'); advance() }
  }

  const animationClass = direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <StepDots step={step} />

      <div key={stepKey} className={animationClass}>
        {step === 1 && <Step1 form={form} onNext={handleNext} />}
        {step === 2 && <Step2 form={form} onNext={handleNext} onBack={retreat} />}
        {step === 3 && <Step3 form={form} onBack={retreat} isSubmitting={form.formState.isSubmitting} />}
      </div>
    </form>
  )
}
