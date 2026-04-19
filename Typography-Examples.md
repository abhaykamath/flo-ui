# Typography Examples — Flo Design System

> These are the exact typography specimens that must appear in the showcase page, under the "Foundations → Typography" section. Each example shows the token name, rendered text, and implementation.

---

## Font Families

### DM Sans — Body & UI
Used for: all body copy, labels, captions, button text, form elements, navigation, metadata.

```tsx
<p className="font-sans">DM Sans — the workhorse. Reads clean at any size.</p>
```

**Specimen:**
> The quick brown fox jumped over the lazy dog. 1234567890. $62.40 spent on groceries.

Weights in use: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
Italic: 400i (used for jokes, asides, sarcasm copy)

---

### Lora — Display & Serif
Used for: all headings, financial amounts, hero text, pull quotes, italic personality moments.

```tsx
<h2 className="font-serif">Lora — for the moments that matter.</h2>
```

**Specimen:**
> Know where your money *actually* goes. 18 days. $7,500 saved.

Weights in use: 600 (semibold), 700 (bold)
Italic: 500i, 600i, 700i (hero em, quotes, manifesto)

---

## Type Scale Specimens

### Display — `text-display`
**Size:** clamp(3rem, 5.5vw, 4.8rem) · **Weight:** 700 · **Font:** Lora serif · **Letter spacing:** -2px

```tsx
<h1 className="font-serif text-5xl font-bold tracking-tight text-ink">
  Know where your money <em className="italic text-sage">actually goes.</em>
</h1>
```

**Rendered:**
# Know where your money *actually goes.*

Used in: hero section only.

---

### Heading 1 — `text-h1`
**Size:** clamp(2.2rem, 4vw, 3rem) · **Weight:** 700 · **Font:** Lora serif · **Letter spacing:** -1px

```tsx
<h2 className="font-serif text-4xl font-bold tracking-tight text-ink">
  Good software shouldn't cost <em className="italic text-sage">this much.</em>
</h2>
```

Used in: section headings across the page.

---

### Heading 2 — `text-h2`
**Size:** 1.5rem · **Weight:** 700 · **Font:** Lora serif

```tsx
<h3 className="font-serif text-2xl font-bold text-ink">
  Monthly Review
</h3>
```

Used in: card headings, sub-section titles.

---

### Heading 3 — `text-h3`
**Size:** 1rem · **Weight:** 600 · **Font:** DM Sans

```tsx
<h4 className="font-sans text-base font-semibold text-ink">
  Budget Goals
</h4>
```

Used in: feature card titles, dialog headings, list group labels.

---

### Body — `text-body`
**Size:** 1rem · **Weight:** 400 · **Font:** DM Sans · **Line height:** 1.75

```tsx
<p className="font-sans text-base text-ink-2 leading-relaxed">
  A money tracker built by one person with too many spreadsheets and too little patience 
  for subscription paywalls.
</p>
```

---

### Body Small — `text-body-sm`
**Size:** 0.875rem · **Weight:** 400 · **Font:** DM Sans · **Line height:** 1.65

```tsx
<p className="font-sans text-sm text-ink-2 leading-relaxed">
  Log at least once a day. Keep the chain. Miss a day — it's fine, we're not your 
  accountant. But the chain will remind you.
</p>
```

---

### Label — `text-label`
**Size:** 0.75rem · **Weight:** 600 · **Font:** DM Sans

```tsx
<label className="font-sans text-xs font-semibold text-ink-2">
  Category
</label>
```

Used in: form labels, card metadata labels.

---

### Eyebrow — `text-eyebrow`
**Size:** 0.68rem · **Weight:** 600 · **Font:** DM Sans · **Case:** UPPERCASE · **Letter spacing:** 2px

```tsx
<div className="font-sans text-[0.68rem] font-semibold uppercase tracking-[2px] text-ink-3 
                flex items-center gap-2">
  <span className="inline-block w-3.5 h-px bg-current" />
  What Flo does
</div>
```

Used in: section labels above every major heading. Always paired with a short horizontal rule before the text.

---

### Caption — `text-caption`
**Size:** 0.68rem · **Weight:** 500 · **Font:** DM Sans · **Colour:** ink-3

```tsx
<span className="font-sans text-[0.68rem] font-medium text-ink-3">
  just now
</span>
```

Used in: timestamps, transaction dates, metadata, "87% consistency".

---

### Amount — `text-amount`
**Size:** varies by context · **Weight:** 700 · **Font:** Lora serif

```tsx
{/* Large amount — stat card */}
<span className="font-serif text-3xl font-bold text-ink">$7,500</span>

{/* Medium amount — transaction */}
<span className="font-serif text-sm font-bold text-negative">−$62.40</span>

{/* Positive amount */}
<span className="font-serif text-sm font-bold text-positive">+$850.00</span>
```

**Rule:** All financial figures — income, expenses, totals, goals — use Lora serif. This is non-negotiable. It gives numbers weight and personality.

Positive amounts: `text-positive` (sage green)
Negative amounts: `text-negative` (#C05050)
Neutral/total: `text-ink`

---

### Sarcasm / Italic aside — `text-sarcasm`
**Size:** 0.72rem · **Weight:** 400 · **Font:** DM Sans italic · **Colour:** ink-3

```tsx
<p className="font-sans text-[0.72rem] italic text-ink-3 mt-1.5">
  Turns out you spend a lot on coffee. Shocking.
</p>
```

Used in: feature card sub-copy, empty states, the occasional wink to the user.

---

### Serif Italic — personality moment
**Font:** Lora italic · Used when Flo gets a bit literary.

```tsx
{/* Pull quote in manifesto */}
<blockquote className="font-serif italic text-base leading-relaxed text-paper/75">
  "Should we add a premium tier with AI insights that tell you buying coffee 
  every day is expensive?"<br/><br/>
  "No."
</blockquote>

{/* User testimonial */}
<p className="font-serif italic text-sm text-ink-2 leading-relaxed">
  "I've kept a 47-day streak. I've also told my therapist. She's proud of me."
</p>
```

---

## Colour + Type Pairings

| Context | Text colour | Background |
|---|---|---|
| Primary body | `text-ink` | `bg-paper` |
| Secondary / muted | `text-ink-2` | `bg-paper` |
| Hint / timestamp | `text-ink-3` | any |
| On dark section | `text-paper` / `text-paper/75` | `bg-ink` |
| Positive amount | `text-positive` (sage) | — |
| Negative amount | `text-negative` (#C05050) | — |
| Eyebrow label | `text-ink-3` | — |
| Badge text — sage | `text-sage` | `bg-sage-pale` |
| Badge text — peach | `text-peach` | `bg-peach-pale` |
| Badge text — lemon | `text-ink` | `bg-lemon-pale` |
| Badge text — lavender | `text-lavend` | `bg-lavend-pale` |
| Badge text — rose | `text-rose` | `bg-rose-pale` |

---

## Typography in Context — Full Showcase Card

This is the exact card that should appear in the showcase page under Typography:

```tsx
<div className="bg-white rounded-2xl border border-border p-8 space-y-8">

  {/* Eyebrow */}
  <div className="font-sans text-[0.68rem] font-semibold uppercase tracking-[2px] text-ink-3 flex items-center gap-2">
    <span className="inline-block w-3.5 h-px bg-ink-3" />
    Typography scale
  </div>

  {/* Display */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">Display — Lora 700</div>
    <h1 className="font-serif text-5xl font-bold tracking-tight text-ink leading-tight">
      Know where your money <em className="italic text-sage">flows.</em>
    </h1>
  </div>

  {/* H1 */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">H1 — Lora 700</div>
    <h2 className="font-serif text-4xl font-bold tracking-tight text-ink">
      Good software shouldn't cost this much.
    </h2>
  </div>

  {/* H2 */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">H2 — Lora 700</div>
    <h3 className="font-serif text-2xl font-bold text-ink">Monthly Review</h3>
  </div>

  {/* H3 */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">H3 — DM Sans 600</div>
    <h4 className="font-sans text-base font-semibold text-ink">Budget Goals</h4>
  </div>

  {/* Body */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">Body — DM Sans 400</div>
    <p className="font-sans text-base text-ink-2 leading-relaxed max-w-md">
      A money tracker built by one person with too many spreadsheets and too little patience for subscription paywalls.
    </p>
  </div>

  {/* Amounts */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-3 uppercase tracking-widest">Amounts — Lora 700</div>
    <div className="flex items-baseline gap-6">
      <span className="font-serif text-3xl font-bold text-ink">$7,500</span>
      <span className="font-serif text-base font-bold text-positive">+$850.00</span>
      <span className="font-serif text-base font-bold text-negative">−$62.40</span>
      <span className="font-serif text-sm font-bold text-ink-3">87%</span>
    </div>
  </div>

  {/* Label + Caption */}
  <div className="flex gap-8">
    <div>
      <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">Label — DM Sans 600</div>
      <label className="font-sans text-xs font-semibold text-ink-2">Food & Dining</label>
    </div>
    <div>
      <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">Caption — DM Sans 500</div>
      <span className="font-sans text-[0.68rem] font-medium text-ink-3">just now · Jun 14</span>
    </div>
  </div>

  {/* Sarcasm copy */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">Sarcasm — DM Sans 400 italic</div>
    <p className="font-sans text-[0.72rem] italic text-ink-3">
      Turns out you spend a lot on coffee. Shocking.
    </p>
  </div>

  {/* Serif italic */}
  <div>
    <div className="text-[0.65rem] text-ink-3 font-medium mb-2 uppercase tracking-widest">Serif Italic — Lora personality</div>
    <p className="font-serif italic text-sm text-ink-2 leading-relaxed">
      "I've kept a 47-day streak. I've also told my therapist. She's proud of me."
    </p>
  </div>

</div>
```

---

## What to Never Do with Type

- ❌ Use DM Sans for headings or financial amounts
- ❌ Use `font-weight: 800` or `900` — Lora tops at 700, DM Sans use max 700
- ❌ Use arbitrary font sizes not in the scale
- ❌ Use pure black (`#000`) for text — always `var(--color-ink)` (#261E16)
- ❌ Use `text-gray-*` — use `text-ink-2` or `text-ink-3`
- ❌ Mix serif and sans in the same UI label or heading
- ❌ Use uppercase DM Sans at sizes above 0.75rem (eyebrows only)
- ❌ Use letter-spacing on body copy
- ❌ Use Lora for buttons, inputs, or navigation
