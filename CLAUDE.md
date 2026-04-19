# CLAUDE.md — flo-ui

## Read This First. Every Session.

This is the Flo web application. Before writing any code, read this file completely. Then check `RULES.md`. Then check `FEEDBACK.md` for mistakes made in previous sessions that must not be repeated.

The design system lives at `~/Desktop/flo/design-system`. The `index.css` from that project has been copied into this one. It is the single source of truth for all design tokens. Do not invent tokens. Do not use Tailwind's default colour palette. Do not use arbitrary values unless explicitly permitted.

---

## What This Project Is

A web application for Flo — a financial tracker built with craft and intention. Users log entries (expenses and income), set budgets, track savings goals, and build a daily logging streak. The aesthetic is paper, pastel, warm, indie. Not a SaaS dashboard. Not a fintech app.

Every screen must feel like it was made by someone who cared. Layout precision matters. Spacing matters. Copy matters. Sloppy work is not acceptable.

---

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Server state | TanStack Query |
| Client state | Zustand (one global store) |
| Forms | React Hook Form + Zod |
| HTTP | Axios (API layer only — never call Supabase directly) |
| Language | TypeScript — strict, always |

---

## Project Structure

```
src/
  api/          # Axios instances and all API call functions
  components/
    ui/         # shadcn primitives — never modify these directly
    flo/        # Flo-specific components — built on top of shadcn
    layout/     # Shell, Nav, PageWrapper, etc.
  features/     # Feature folders — each owns its pages, hooks, and types
    entries/
    budgets/
    goals/
    streak/
    settings/
  hooks/        # Shared custom hooks
  lib/          # Utilities, helpers, constants
  store/        # Zustand global store
  types/        # Shared TypeScript types (Entry, User, Budget, etc.)
  routes/       # React Router v7 route definitions
```

When building a new feature, create its folder under `src/features/`. Keep pages, hooks, components, and types that belong to a feature inside that feature folder. Only move something to a shared location if two or more features need it.

---

## Design Tokens — Non-Negotiable

All colours, radii, shadows, and font families are defined as CSS variables in `src/index.css`. Use them. Always.

**In Tailwind classes:** `bg-(--color-paper)`, `text-(--color-ink)`, `border-(--color-border)`
**In inline styles (last resort only):** `style={{ color: 'var(--color-ink)' }}`

Never use:
- `text-gray-500` or any Tailwind default colour
- Arbitrary colour values like `text-[#6E5C48]`
- Hardcoded hex anywhere in component files
- Font families not defined in the token set (`--font-sans`, `--font-serif`)

When you are unsure which token to use — **stop and ask**. Do not guess.

---

## When To Stop And Ask

Stop and ask before proceeding if:
- A design decision is not covered by the design system or this file
- A component requires a layout that doesn't exist yet and you're unsure how to handle it
- You're about to create a new colour, spacing value, or type style not in the token set
- A feature's data shape is unclear
- You're unsure whether something belongs in Zustand vs TanStack Query

Do not make assumptions and continue. Do not leave a TODO comment and move on. Stop. Ask.

---

## State Management Rules

### TanStack Query — server state
Everything that comes from or goes to the API lives in TanStack Query. This includes entries, budgets, goals, user profile, streak data. Use `useQuery` for reads, `useMutation` for writes. Always define query keys in `src/lib/queryKeys.ts`.

### Zustand — client state
One global store at `src/store/index.ts`. Use it only for UI state that needs to persist across components and cannot live in local state — things like: current selected date range, active modal, guest mode flag, selected backend. Do not put server data in Zustand. Do not duplicate TanStack Query data in Zustand.

### Local state
`useState` and `useReducer` are fine for component-local concerns — form steps, open/closed toggles, hover states.

---

## API Layer Rules

All network calls go through `src/api/`. Never call Supabase directly from a component or hook. Never use `fetch` directly — always Axios through the configured instance.

Structure:
```
src/api/
  client.ts       # Axios instance with baseURL, interceptors, auth headers
  entries.ts      # All entry-related API functions
  budgets.ts
  goals.ts
  auth.ts
  user.ts
```

Each API function returns typed data. No `any`. No untyped responses.

---

## Component Rules

- shadcn components in `src/components/ui/` — never modify these files
- Flo components in `src/components/flo/` — always extend shadcn, never replace
- Every Flo component has typed props with JSDoc on anything non-obvious
- Every component handles its loading, empty, and error states
- No component fetches data directly — data comes via props or a custom hook
- Inline styles are banned except in cases where Tailwind genuinely cannot express the style, and must include a comment explaining why

---

## Forms

All forms use React Hook Form + Zod. Define the Zod schema first, derive the TypeScript type from it, then build the form. No uncontrolled inputs outside of RHF. No manual validation logic.

```ts
const entrySchema = z.object({ ... })
type EntryFormData = z.infer<typeof entrySchema>
```

---

## Routing

React Router v7. All routes defined in `src/routes/`. Use loader functions for data that must be present before render. Use TanStack Query inside loaders where appropriate.

---

## Entry Schema (locked)

```ts
type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

type Recurrence = {
  frequency: RecurrenceFrequency
  interval: number
  startDate: string
  endDate?: string
  nextDue: string
}

type Entry = {
  id: string
  userId: string | null
  type: 'expense' | 'income'
  amount: number                // always positive
  currency: string              // 'INR', 'USD', etc.
  category: string
  emoji: string
  note?: string
  date: string                  // YYYY-MM-DD — when it happened
  createdAt: string             // ISO datetime — when it was logged
  source: 'manual' | 'recurring'
  recurrenceId?: string | null  // id of the parent recurring template
  recurrence?: Recurrence | null // only on the template entry itself
}
```

---

## Voice and Copy

Flo's tone: warm, calm, occasionally dry, never corporate. When writing empty states, labels, error messages, or any UI copy — write it as Flo would. Refer to `~/Desktop/flo/design-system/Manifesto.md` for the full brand voice.

- Empty states: warm and human, nudge without pressure
- Errors: honest, never alarming
- Success: quiet, not celebratory unless it's a streak milestone
- Never: "An error has occurred", "No data found", "Operation successful"

---

## What Good Looks Like

A task is done when:
- [ ] Uses only Flo design tokens
- [ ] TypeScript compiles with no errors
- [ ] No `any` types
- [ ] Loading, empty, and error states handled
- [ ] Copy is in the Flo voice
- [ ] Layout is precise — check spacing, alignment, and responsiveness
- [ ] Reads `FEEDBACK.md` and has not repeated a known mistake
