import { useState } from 'react'
import type { Goal, GoalStatus, Contribution } from '@/types/goal'
import type { GoalFormData } from '../goalSchema'
import type { ContributionFormData } from '../contributionSchema'

const GOALS_KEY         = 'flo_goals'
const CONTRIBUTIONS_KEY = 'flo_contributions'

function readGoals(): Goal[] {
  try {
    const raw = localStorage.getItem(GOALS_KEY)
    if (!raw) return []
    const goals = JSON.parse(raw) as Array<Omit<Goal, 'status'> & { status: string }>
    // Migrate legacy 'active'/'completed'/'abandoned' statuses
    return goals.map(g => ({
      ...g,
      status: (g.status === 'complete' || g.status === 'completed' ? 'complete' : 'open') as GoalStatus,
    }))
  } catch {
    return []
  }
}

function readContributions(): Contribution[] {
  try {
    const raw = localStorage.getItem(CONTRIBUTIONS_KEY)
    return raw ? (JSON.parse(raw) as Contribution[]) : []
  } catch {
    return []
  }
}

function writeGoals(goals: Goal[]): void {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
}

function writeContributions(contributions: Contribution[]): void {
  localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(contributions))
}

export function savedAmountForGoal(goalId: string, contributions: Contribution[]): number {
  return contributions
    .filter(c => c.goalId === goalId)
    .reduce((sum, c) => sum + c.amount, 0)
}

export function useLocalGoals() {
  const [goals, setGoals]                     = useState<Goal[]>(readGoals)
  const [contributions, setContributions]     = useState<Contribution[]>(readContributions)

  function addGoal(data: GoalFormData): Goal {
    const goal: Goal = {
      id:           crypto.randomUUID(),
      userId:       null,
      name:         data.name,
      emoji:        data.emoji,
      note:         data.note,
      targetAmount: data.targetAmount,
      currency:     'INR',
      deadline:     data.deadline,
      status:       'open',
      createdAt:    new Date().toISOString(),
    }

    const updated = [goal, ...goals]
    writeGoals(updated)
    setGoals(updated)
    return goal
  }

  function deleteGoal(goalId: string): void {
    const updatedGoals = goals.filter(g => g.id !== goalId)
    const updatedContributions = contributions.filter(c => c.goalId !== goalId)
    writeGoals(updatedGoals)
    writeContributions(updatedContributions)
    setGoals(updatedGoals)
    setContributions(updatedContributions)
  }

  function addContribution(goalId: string, data: ContributionFormData): { contribution: Contribution; goalCompleted: boolean } {
    const contribution: Contribution = {
      id:        crypto.randomUUID(),
      goalId,
      amount:    data.amount,
      note:      data.note,
      createdAt: new Date().toISOString(),
    }

    const updatedContributions = [contribution, ...contributions]
    writeContributions(updatedContributions)
    setContributions(updatedContributions)

    // Auto-complete the goal if saved amount has reached the target
    const goal          = goals.find(g => g.id === goalId)
    const totalSaved    = savedAmountForGoal(goalId, updatedContributions)
    const goalCompleted = !!goal && goal.status === 'open' && totalSaved >= goal.targetAmount

    if (goalCompleted) {
      const updatedGoals = goals.map(g =>
        g.id === goalId ? { ...g, status: 'complete' as const } : g,
      )
      writeGoals(updatedGoals)
      setGoals(updatedGoals)
    }

    return { contribution, goalCompleted }
  }

  return { goals, contributions, addGoal, addContribution, deleteGoal, savedAmountForGoal: (goalId: string) => savedAmountForGoal(goalId, contributions) }
}
