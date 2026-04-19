import { z } from 'zod'

export const goalFormSchema = z.object({
  name:         z.string().min(1, "Give it a name."),
  emoji:        z.string().optional(),
  targetAmount: z.number({ error: "Put a number in here." }).positive("Has to be more than ₹0."),
  note:         z.string().optional(),
  deadline:     z.string().optional(),
})

export type GoalFormData = z.infer<typeof goalFormSchema>
