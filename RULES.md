# RULES.md — flo-ui

Strict rules. No exceptions unless explicitly noted. If a rule feels like it conflicts with a task, stop and ask — don't override the rule.

---

## Design Rules

**D1 — Tokens only**
Use CSS variables defined in `index.css` for all colours, radii, shadows, and font families. Never use Tailwind's default colour scale. Never hardcode a hex value in a component file.

**D2 — No inline styles except as last resort**
Tailwind classes cover 99% of cases. If an inline style is truly unavoidable, add a comment directly above it explaining why Tailwind could not handle it. If you find yourself writing inline styles frequently, stop — something is wrong with the approach.

**D3 — No gradients**
Flo does not use gradients. Flat pastels only. If a design calls for visual depth, use background alternation between paper tokens, borders, or shadows — never a gradient.

**D4 — Typography is strict**
- Headings and financial amounts: `font-serif` (Lora)
- Everything else: `font-sans` (DM Sans)
- Never use `font-weight` above 700
- Never use Tailwind's default `text-gray-*` — use `text-(--color-ink-2)` or `text-(--color-ink-3)`
- Never mix serif and sans in the same label or heading

**D5 — Spacing is intentional**
Do not eyeball spacing. Use the Tailwind spacing scale consistently. Padding inside cards: `p-5` or `p-6`. Gap between cards: `gap-4` or `gap-5`. Section padding: `py-16` (mobile) / `py-24` (desktop). If a layout feels off, fix the spacing — don't add margins to compensate for a structural problem.

**D6 — Responsive is not optional**
Every component must work on mobile and desktop. Design mobile-first. Test at 375px and 1280px minimum. Grid columns must collapse sensibly. Modals must be usable on small screens.

**D7 — Shadows are subtle**
Use only the defined shadow tokens: `shadow-sm`, `shadow-md`, `shadow-lg`. Never use arbitrary shadow values. Never use coloured shadows.

---

## Code Rules

**C1 — TypeScript strict mode, always**
No `any`. No `@ts-ignore`. No implicit `any` from untyped function parameters. If a type is complex, define it in `src/types/` and import it. If you don't know the type, stop and figure it out — don't bypass it.

**C2 — No direct Supabase calls**
Never import or call Supabase from a component, hook, or page. All data access goes through `src/api/`. This is not negotiable.

**C3 — No fetch — use Axios**
All HTTP requests use the configured Axios instance from `src/api/client.ts`. Never use `fetch` directly.

**C4 — Query keys are centralised**
All TanStack Query keys are defined in `src/lib/queryKeys.ts`. Never inline a query key as a raw string or array literal in a component. Import it.

**C5 — Zod schemas before forms**
Define the Zod schema before building the form. Derive the TypeScript type from the schema with `z.infer`. Never write a form without a schema.

**C6 — One Zustand store**
All client state lives in `src/store/index.ts`. Never create a second store. Never put server data (anything from TanStack Query) in the store. If unsure whether something belongs in Zustand or TanStack Query, ask.

**C7 — Components are dumb about data**
Components do not fetch their own data. Data arrives via props or a custom hook that wraps a TanStack Query call. The hook lives in the relevant feature folder.

**C8 — shadcn files are untouchable**
Never modify files in `src/components/ui/`. If a shadcn component needs Flo-specific behaviour, wrap it in a new component in `src/components/flo/` and apply tokens there.

**C9 — Named exports only**
No default exports except for page-level route components (React Router convention). Everything else — components, hooks, utilities, types — uses named exports.

**C10 — No magic numbers**
No hardcoded pixel values, timeouts, limits, or thresholds in component logic. Define them as named constants in `src/lib/constants.ts`.

---

## State Rules

**S1 — Server state belongs to TanStack Query**
If it comes from an API, it lives in TanStack Query. Period.

**S2 — UI state belongs to Zustand or local state**
If it's component-local and doesn't need to be shared, use `useState`. If it needs to be shared across multiple components or persist across navigation, use Zustand.

**S3 — Never sync TanStack Query data into Zustand**
Do not copy API response data into the Zustand store. Do not use `useEffect` to mirror server state into client state. This creates two sources of truth and causes bugs.

**S4 — Invalidate after mutations**
After every successful mutation, invalidate the relevant query keys using `queryClient.invalidateQueries`. Never manually update the cache unless there is a specific performance reason and it is documented in a comment.

---

## Feature Rules

**F1 — Features own their internals**
Pages, hooks, components, and types that belong to one feature live inside `src/features/<feature>/`. Only extract to shared locations when two or more features genuinely need the same thing.

**F2 — Guest mode is always considered**
`userId` can be `null`. Every feature that reads or writes entries must handle the guest state — either by reading from localStorage or by showing an appropriate nudge. Never assume a user is authenticated.

**F3 — Entry amount is always positive**
The `type` field ('expense' | 'income') determines direction. Never store a negative amount. Never display a negative amount without deriving it from `type`.

**F4 — Dates are always ISO strings**
`date` is `YYYY-MM-DD`. `createdAt` is a full ISO datetime. Never use JavaScript `Date` objects in state or API payloads — convert to string at the boundary.

---

## Quality Rules

**Q1 — Handle all states**
Every data-dependent component must handle: loading, empty, error, and populated states. A component that only handles the happy path is incomplete.

**Q2 — Empty states are warm**
Empty states are not error states. They are an opportunity to guide the user. Write them in the Flo voice. Never show a generic "No data" message.

**Q3 — Errors are honest**
Error messages tell the user what happened and what they can do. Never show a raw error object or a stack trace. Never show "Something went wrong" without a recovery action.

**Q4 — No console.log in committed code**
Use proper error boundaries and TanStack Query's error handling. Remove all debug logs before considering a task complete.

**Q5 — Layout must be verified**
After building a component or page, visually verify it at mobile (375px) and desktop (1280px) widths before marking it done. If it breaks at either size, fix it.
