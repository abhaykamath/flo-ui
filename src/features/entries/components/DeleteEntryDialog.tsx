import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { haptic } from '@/lib/haptics'

interface DeleteEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  entryLabel?: string
}

export function DeleteEntryDialog({ open, onOpenChange, onConfirm, entryLabel }: DeleteEntryDialogProps) {
  function handleConfirm() {
    haptic('strong')
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove this entry?</DialogTitle>
          <DialogDescription>
            {entryLabel ? `${entryLabel} — ` : ''}Gone for good. Your streak is safe though.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="flex items-center justify-end gap-2.5">
          <DialogClose asChild>
            <button className="rounded-full border border-border bg-paper-2 px-4 py-2 font-sans text-sm font-medium text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink">
              Keep it
            </button>
          </DialogClose>
          <button
            onClick={handleConfirm}
            className="rounded-full bg-rose-pale px-4 py-2 font-sans text-sm font-semibold text-rose transition-colors hover:bg-rose hover:text-paper"
          >
            Remove it
          </button>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
