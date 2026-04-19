export type GoalStatus = 'open' | 'complete'

export type Goal = {
  id: string
  userId: string | null
  name: string
  emoji?: string
  note?: string
  targetAmount: number
  currency: string
  deadline?: string   // YYYY-MM-DD — optional
  status: GoalStatus
  createdAt: string
}

export type Contribution = {
  id: string
  goalId: string
  amount: number
  note?: string
  createdAt: string
}
