import {
  Utensils,
  Car,
  ShoppingBag,
  Music,
  HeartPulse,
  Zap,
  Home,
  BookOpen,
  Plane,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react'

export type Category = {
  key: string
  label: string
  icon: LucideIcon
  iconName: string
  entryTypes: ('expense' | 'income')[]
}

export const CATEGORIES: Category[] = [
  { key: 'food',          label: 'Food & Dining',  icon: Utensils,     iconName: 'Utensils',     entryTypes: ['expense'] },
  { key: 'transport',     label: 'Transport',       icon: Car,          iconName: 'Car',          entryTypes: ['expense'] },
  { key: 'shopping',      label: 'Shopping',        icon: ShoppingBag,  iconName: 'ShoppingBag',  entryTypes: ['expense'] },
  { key: 'entertainment', label: 'Entertainment',   icon: Music,        iconName: 'Music',        entryTypes: ['expense'] },
  { key: 'health',        label: 'Health',          icon: HeartPulse,   iconName: 'HeartPulse',   entryTypes: ['expense'] },
  { key: 'utilities',     label: 'Utilities',       icon: Zap,          iconName: 'Zap',          entryTypes: ['expense'] },
  { key: 'housing',       label: 'Housing',         icon: Home,         iconName: 'Home',         entryTypes: ['expense'] },
  { key: 'education',     label: 'Education',       icon: BookOpen,     iconName: 'BookOpen',     entryTypes: ['expense'] },
  { key: 'travel',        label: 'Travel',          icon: Plane,        iconName: 'Plane',        entryTypes: ['expense'] },
  { key: 'salary',        label: 'Salary',          icon: Briefcase,    iconName: 'Briefcase',    entryTypes: ['income'] },
  { key: 'freelance',     label: 'Freelance',       icon: Laptop,       iconName: 'Laptop',       entryTypes: ['income'] },
  { key: 'investment',    label: 'Investment',      icon: TrendingUp,   iconName: 'TrendingUp',   entryTypes: ['income'] },
  { key: 'gift',          label: 'Gift',            icon: Gift,         iconName: 'Gift',         entryTypes: ['income'] },
  { key: 'other',         label: 'Other',           icon: MoreHorizontal, iconName: 'MoreHorizontal', entryTypes: ['expense', 'income'] },
]

export function getCategoriesForType(type: 'expense' | 'income'): Category[] {
  return CATEGORIES.filter(c => c.entryTypes.includes(type))
}

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find(c => c.key === key)
}
