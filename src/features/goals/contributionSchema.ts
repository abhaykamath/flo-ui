import { z } from 'zod'

export const contributionFormSchema = z.object({
  amount: z.number({ error: "Put a number in here." }).positive("Has to be more than ₹0."),
  note:   z.string().optional(),
})

export type ContributionFormData = z.infer<typeof contributionFormSchema>
