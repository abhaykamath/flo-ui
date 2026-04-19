import { z } from 'zod'

export const entryFormSchema = z.object({
  type:        z.enum(['expense', 'income']),
  amount:      z.number({ error: "Put a number in here." }).positive("Has to be more than ₹0."),
  categoryKey: z.string().min(1, "Pick something, anything."),
  note:        z.string().optional(),
  date:        z.string().min(1, "When did this happen?"),
})

export type EntryFormData = z.infer<typeof entryFormSchema>
