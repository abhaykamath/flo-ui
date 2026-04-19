import { useState, useEffect } from "react";
import {
  ArrowRight,
  MoreHorizontal,
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
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { LogEntryCard } from "../components/LogEntryCard";
import { CreateGoalCard } from "../components/CreateGoalCard";
import { LogEntryDialog } from "../components/LogEntryDialog";
import { CreateGoalDialog } from "@/features/goals/components/CreateGoalDialog";
import { ContributeDialog } from "@/features/goals/components/ContributeDialog";
import { GoalsPanel } from "@/features/goals/components/GoalsPanel";
import { useLocalGoals } from "@/features/goals/hooks/useLocalGoals";
import type { GoalFormData } from "@/features/goals/goalSchema";
import { LedgerPanel } from "../components/LedgerPanel";
import { useLocalEntries } from "../hooks/useLocalEntries";
import type { EntryFormData } from "../entrySchema";
import type { Entry } from "@/types/entry";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
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
};

function formatAmount(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount)}`;
}

function formatDateShort(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function dayLabel(ymd: string): string {
  const todayStr = new Date().toISOString().split("T")[0];
  const yesterdayStr = new Date(Date.now() - 86_400_000)
    .toISOString()
    .split("T")[0];
  if (ymd === todayStr) return "Today";
  if (ymd === yesterdayStr) return "Yesterday";
  return formatDateShort(ymd);
}

function RecentEntryRow({ entry }: { entry: Entry }) {
  const Icon = ICON_MAP[entry.iconName] ?? MoreHorizontal;
  const isExpense = entry.type === "expense";

  return (
    <div className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isExpense ? "bg-peach-pale" : "bg-sage-pale",
        )}
      >
        <Icon size={13} className={isExpense ? "text-peach" : "text-sage"} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-medium text-ink">
          {entry.category}
        </p>
        {entry.note && (
          <p className="truncate font-sans text-xs text-ink-3">{entry.note}</p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5">
        <span
          className={cn(
            "font-serif text-sm font-bold",
            isExpense ? "text-peach" : "text-sage",
          )}
        >
          {isExpense ? "−" : "+"}
          {formatAmount(entry.amount)}
        </span>
        <span className="font-sans text-[0.65rem] text-ink-3">
          {dayLabel(entry.date)}
        </span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [contributeGoal, setContributeGoal] = useState<import("@/types/goal").Goal | null>(null);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const { entries, addEntry, deleteEntry } = useLocalEntries();
  const { goals, contributions, addGoal, addContribution, deleteGoal, savedAmountForGoal } = useLocalGoals();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setLedgerOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const recentEntries = entries.slice(0, 5);

  function handleGoalSubmit(data: GoalFormData) {
    const goal = addGoal(data);
    toast(`${goal.emoji ? goal.emoji + " " : ""}${goal.name} created`, {
      description: `Target: ${formatAmount(goal.targetAmount)}`,
    });
  }

  function handleContribute(goalId: string, data: import("@/features/goals/contributionSchema").ContributionFormData) {
    const { contribution, goalCompleted } = addContribution(goalId, data);
    const goal = goals.find(g => g.id === goalId);
    if (goalCompleted && goal) {
      toast(`${goal.emoji ? goal.emoji + " " : ""}${goal.name} complete! 🎉`, {
        description: "You've reached your goal.",
      });
    } else {
      toast(`${formatAmount(contribution.amount)} added`, {
        description: goal ? `toward ${goal.name}` : undefined,
      });
    }
  }

  function handleSubmit(data: EntryFormData) {
    const entry = addEntry(data);

    const title =
      entry.type === "expense"
        ? `${formatAmount(entry.amount)} spent`
        : `${formatAmount(entry.amount)} added`;

    toast(title, {
      description: `${entry.category} · ${formatDateShort(entry.date)}`,
    });
  }

  return (
    <main className="min-h-full w-full px-6 pt-8 pb-16 flo-graph-paper">
      {/* Ledger tab — fixed to right edge */}
      <button
        onClick={() => setLedgerOpen(true)}
        className="fixed right-0 top-3/4 z-40 -translate-y-1/2 flex h-32 w-8 items-center justify-center overflow-hidden rounded-l-xl border border-r-0 border-border bg-paper-2 text-ink-2 shadow-sm transition-all hover:bg-paper-3 hover:text-ink hover:shadow-md"
        aria-label="Open ledger (⌘L)"
      >
        <div className="rotate-90 flex select-none items-center gap-1.5 whitespace-nowrap">
          <span className="font-sans text-xs font-semibold tracking-wider">
            your ledger
          </span>
          <span className="font-mono text-[0.6rem] text-ink-2">⌘+L</span>
        </div>
      </button>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-4">
        {/* ── Action cards — 1 cell each ── */}
        <LogEntryCard onClick={() => setDialogOpen(true)} />
        <CreateGoalCard onClick={() => setGoalDialogOpen(true)} />

        {/* ── Goals — right 2 cols, spans both rows ── */}
        <GoalsPanel
          goals={goals}
          contributions={contributions}
          onCreateGoal={() => setGoalDialogOpen(true)}
          onContribute={setContributeGoal}
          onDeleteGoal={deleteGoal}
        />

        {/* ── Recent entries — left 2 cols, second row ── */}
        <div className="overflow-hidden rounded-2xl border border-border bg-(--color-card) lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
            <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-ink-3">
              Recent entries
            </span>
            {entries.length > 0 && (
              <button
                onClick={() => setLedgerOpen(true)}
                className="flex items-center gap-1 font-sans text-xs font-medium text-ink-2 transition-colors hover:text-ink"
              >
                See all <ArrowRight size={11} />
              </button>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="font-serif text-base font-semibold text-ink">
                Nothing logged yet.
              </p>
              <p className="mt-1 font-sans text-sm text-ink-3">
                Your entries will appear here as you add them.
              </p>
            </div>
          ) : (
            <div className="px-1 py-2">
              {recentEntries.map((entry) => (
                <RecentEntryRow key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </div>

      <LogEntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />

      <CreateGoalDialog
        open={goalDialogOpen}
        onOpenChange={setGoalDialogOpen}
        onSubmit={handleGoalSubmit}
      />

      <ContributeDialog
        open={contributeGoal !== null}
        onOpenChange={(open) => { if (!open) setContributeGoal(null) }}
        goal={contributeGoal}
        savedAmount={contributeGoal ? savedAmountForGoal(contributeGoal.id) : 0}
        onSubmit={handleContribute}
      />

      <LedgerPanel
        open={ledgerOpen}
        onOpenChange={setLedgerOpen}
        entries={entries}
        onDeleteEntry={deleteEntry}
      />
    </main>
  );
}
