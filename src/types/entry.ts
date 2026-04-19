export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

export type Recurrence = {
  frequency: RecurrenceFrequency
  interval: number
  startDate: string
  endDate?: string
  nextDue: string
}

export type Entry = {
  id: string
  userId: string | null
  type: 'expense' | 'income'
  amount: number
  currency: string
  category: string
  iconName: string
  note?: string
  date: string
  createdAt: string
  source: 'manual' | 'recurring'
  recurrenceId?: string | null
  recurrence?: Recurrence | null
}
