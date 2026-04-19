import { useState } from 'react'
import { Dialog, DialogContent, DialogBody } from '@/components/ui/dialog'
import { QuickLogForm } from '@/components/flo/QuickLogForm'
import type { EntryFormData } from '../entrySchema'

interface LogEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: EntryFormData) => void
}

export function LogEntryDialog({ open, onOpenChange, onSubmit }: LogEntryDialogProps) {
  // Increment on each open so QuickLogForm remounts fresh every time
  const [openCount, setOpenCount] = useState(0)

  function handleOpenChange(val: boolean) {
    if (val) setOpenCount(n => n + 1)
    onOpenChange(val)
  }

  function handleSubmit(data: EntryFormData) {
    onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden">
        <DialogBody className="pt-8">
          <QuickLogForm key={openCount} onSubmit={handleSubmit} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
