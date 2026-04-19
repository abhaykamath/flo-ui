import { useState } from 'react'
import type { Entry } from '@/types/entry'
import type { EntryFormData } from '../entrySchema'
import { getCategoryByKey } from '@/lib/categories'

const STORAGE_KEY = 'flo_entries'

function readFromStorage(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Entry[]) : []
  } catch {
    return []
  }
}

function writeToStorage(entries: Entry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useLocalEntries() {
  const [entries, setEntries] = useState<Entry[]>(readFromStorage)

  function addEntry(data: EntryFormData): Entry {
    const category = getCategoryByKey(data.categoryKey)

    const entry: Entry = {
      id:         crypto.randomUUID(),
      userId:     null,
      type:       data.type,
      amount:     data.amount,
      currency:   'INR',
      category:   category?.label ?? data.categoryKey,
      iconName:   category?.iconName ?? 'MoreHorizontal',
      note:       data.note,
      date:       data.date,
      createdAt:  new Date().toISOString(),
      source:     'manual',
      recurrenceId: null,
      recurrence:   null,
    }

    const updated = [entry, ...entries]
    writeToStorage(updated)
    setEntries(updated)
    return entry
  }

  function deleteEntry(id: string): void {
    const updated = entries.filter(e => e.id !== id)
    writeToStorage(updated)
    setEntries(updated)
  }

  return { entries, addEntry, deleteEntry }
}
