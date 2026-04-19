import { useState } from 'react'
import { Dialog, DialogContent, DialogBody } from '@/components/ui/dialog'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/useIsMobile'
import { haptic } from '@/lib/haptics'
import { CreateGoalForm } from './CreateGoalForm'
import type { GoalFormData } from '../goalSchema'

interface CreateGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: GoalFormData) => void
}

export function CreateGoalDialog({ open, onOpenChange, onSubmit }: CreateGoalDialogProps) {
  const [openCount, setOpenCount] = useState(0)
  const isMobile = useIsMobile()

  function handleOpenChange(val: boolean) {
    if (val) setOpenCount(n => n + 1)
    onOpenChange(val)
  }

  function handleSubmit(data: GoalFormData) {
    haptic('success')
    onSubmit(data)
    onOpenChange(false)
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="gap-0 rounded-t-2xl border-0 bg-paper p-0"
        >
          <div className="mx-auto mb-2 mt-3 h-1 w-10 rounded-full bg-paper-3" />
          <div className="max-h-[88vh] overflow-y-auto px-6 pb-10 pt-3">
            <CreateGoalForm key={openCount} onSubmit={handleSubmit} />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogBody className="pt-8">
          <CreateGoalForm key={openCount} onSubmit={handleSubmit} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
