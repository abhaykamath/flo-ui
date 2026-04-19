import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogBody } from '@/components/ui/dialog'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIsMobile } from '@/hooks/useIsMobile'
import { haptic } from '@/lib/haptics'
import { cn } from '@/lib/utils'
import { contributionFormSchema, type ContributionFormData } from '../contributionSchema'
import type { Goal } from '@/types/goal'

interface ContributeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal: Goal | null
  savedAmount: number
  onSubmit: (goalId: string, data: ContributionFormData) => void
}

function ContributeForm({
  goal,
  savedAmount,
  onSubmit,
}: {
  goal: Goal
  savedAmount: number
  onSubmit: (data: ContributionFormData) => void
}) {
  const remaining = Math.max(goal.targetAmount - savedAmount, 0)

  const fmt = (n: number) =>
    `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)}`

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: { amount: undefined, note: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Goal header */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          {goal.emoji && <span className="text-xl leading-none">{goal.emoji}</span>}
          <h2 className="font-serif text-[1.4rem] font-bold tracking-tight text-ink">{goal.name}</h2>
        </div>
        <p className="font-sans text-[0.78rem] text-ink-3">
          {fmt(savedAmount)} saved · {fmt(remaining)} to go
        </p>
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">How much are you putting in?</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-serif text-xl font-bold text-ink-3 select-none">
            ₹
          </span>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            autoFocus
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

      {/* Note */}
      <div className="space-y-1.5">
        <Label className="font-sans text-xs font-semibold text-ink-2">
          Note <span className="font-normal text-ink-3">— optional</span>
        </Label>
        <Input
          type="text"
          placeholder="March savings, bonus…"
          {...register('note')}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-ink py-3 font-sans text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:shadow-md disabled:opacity-50"
      >
        Add to goal
      </button>
    </form>
  )
}

export function ContributeDialog({ open, onOpenChange, goal, savedAmount, onSubmit }: ContributeDialogProps) {
  const isMobile = useIsMobile()

  function handleSubmit(data: ContributionFormData) {
    if (!goal) return
    haptic('success')
    onSubmit(goal.id, data)
    onOpenChange(false)
  }

  const content = goal ? (
    <ContributeForm goal={goal} savedAmount={savedAmount} onSubmit={handleSubmit} />
  ) : null

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" showCloseButton={false} className="gap-0 rounded-t-2xl border-0 bg-paper p-0">
          <div className="mx-auto mb-2 mt-3 h-1 w-10 rounded-full bg-paper-3" />
          <div className="max-h-[88vh] overflow-y-auto px-6 pb-10 pt-3">{content}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogBody className="pt-8">{content}</DialogBody>
      </DialogContent>
    </Dialog>
  )
}
