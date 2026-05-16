import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { timeline, people, memories, demoAnswers } from "@/data/mock";
import {
  repeatedQuestions,
  gapCategories,
  trainingFormats,
  trainingSessions,
  trainingScore,
  dayLabels,
  weeklySummary,
  patientFriendly,
  insightsDisclaimer,
} from "@/data/insights";
import {
  Clock,
  Compass,
  BookOpen,
  Search,
  MapPin,
  Sparkle,
  Brain,
  LayoutDashboard,
  GraduationCap,
  TrendingDown,
  TrendingUp,
  Volume2,
  Image as ImageIcon,
  FileText,
  HeartHandshake,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: AppPage,
  head: () => ({ meta: [{ title: "Continuity — Companion" }] }),
});

function AppPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15">
            <span className="h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="text-base font-medium">Continuity</span>
        </Link>
        <span className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <Tabs defaultValue="history">
          <TabsList className="grid w-full grid-cols-4 rounded-full bg-muted/60 p-1">
            <TabsTrigger value="history" className="rounded-full">
              <Clock className="mr-2 h-4 w-4" /> History
            </TabsTrigger>
            <TabsTrigger value="files" className="rounded-full">
              <FileText className="mr-2 h-4 w-4" /> Files
            </TabsTrigger>
            <TabsTrigger value="training" className="rounded-full">
              <GraduationCap className="mr-2 h-4 w-4" /> Memory Training
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="rounded-full">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <HistoryPanel />
          </TabsContent>
          <TabsContent value="files" className="mt-6">
            <FilesPanel />
          </TabsContent>
          <TabsContent value="training" className="mt-6">
            <TrainingPanel />
          </TabsContent>
          <TabsContent value="dashboard" className="mt-6">
            <DashboardPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}


/* ---------------- History (Timeline + AI Insights) ---------------- */

function HistoryPanel() {
  return (
    <div className="space-y-8">
      <AiMemoryInsights />
      <TimelinePanel />
    </div>
  );
}

function TimelinePanel() {
  return (
    <Card className="rounded-3xl border-border/60 p-6 md:p-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-medium">Today</h2>
          <p className="text-sm text-muted-foreground">
            A gentle reconstruction of your day so far.
          </p>
        </div>
      </div>
      <ol className="relative space-y-5 border-l border-border/70 pl-6">
        {timeline.map((item) => (
          <li key={item.id} className="relative">
            <span className="absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-primary" />
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-medium text-foreground">{item.time}</span>
              {item.location && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {item.location}
                </span>
              )}
            </div>
            <div className="mt-1 text-base font-medium">{item.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full text-[10px] font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ---------------- AI Memory Insights ---------------- */

function AiMemoryInsights() {
  const topGap = gapCategories[0];
  const bestFormat = [...trainingFormats].sort(
    (a, b) => b.successRate - a.successRate
  )[0];
  const topRepeat = repeatedQuestions[0];

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
              <Brain className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-medium">AI Memory Insights</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Patterns the app noticed from your recent calls and training.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Repeated questions */}
        <Card className="rounded-3xl border-border/60 p-5">
          <CardHeading
            icon={<TrendingUp className="h-4 w-4" />}
            title="Repeated questions"
            hint="Most asked this week"
          />
          <ul className="mt-4 space-y-3">
            {repeatedQuestions.slice(0, 4).map((r) => (
              <li key={r.q} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-foreground">"{r.q}"</p>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {r.category}
                  </p>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  {r.count}×
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        {/* Frequent memory gaps */}
        <Card className="rounded-3xl border-border/60 p-5">
          <CardHeading
            icon={<Compass className="h-4 w-4" />}
            title="Frequent memory gaps"
            hint={`Most confusion: ${topGap.label.toLowerCase()}`}
          />
          <div className="mt-4 space-y-3">
            {gapCategories.slice(0, 5).map((g) => (
              <div key={g.key}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{g.label}</span>
                  <span className="text-muted-foreground">{g.share}%</span>
                </div>
                <Progress value={g.share} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </Card>

        {/* Improvement trend */}
        <Card className="rounded-3xl border-border/60 p-5">
          <CardHeading
            icon={<TrendingDown className="h-4 w-4" />}
            title="Improvement trend"
            hint={`"${topRepeat.q}" is fading`}
          />
          <TrendChart values={topRepeat.trend} labels={dayLabels} />
          <p className="mt-3 text-xs text-muted-foreground">
            The hospital appointment memory was repeated{" "}
            {topRepeat.trend[0]} times on Monday and{" "}
            {topRepeat.trend[topRepeat.trend.length - 1]} times today. Repeated
            training seems to be reducing the confusion.
          </p>
        </Card>

        {/* Best support format */}
        <Card className="rounded-3xl border-border/60 p-5">
          <CardHeading
            icon={<Volume2 className="h-4 w-4" />}
            title="Best support format"
            hint={`${bestFormat.format} works best`}
          />
          <div className="mt-4 space-y-3">
            {trainingFormats.map((f) => (
              <div key={f.format}>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 capitalize text-foreground">
                    <FormatIcon format={f.format} />
                    {f.format}
                  </span>
                  <span className="text-muted-foreground">
                    {f.successRate}% remembered
                  </span>
                </div>
                <Progress value={f.successRate} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Voice explanations seem to help most — {bestFormat.remembered} of{" "}
            {bestFormat.sessions} voice memories were marked remembered.
          </p>
        </Card>
      </div>

      <Disclaimer />
    </section>
  );
}

function CardHeading({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
      {hint && (
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

function FormatIcon({ format }: { format: "voice" | "text" | "visual" }) {
  if (format === "voice") return <Volume2 className="h-3.5 w-3.5" />;
  if (format === "visual") return <ImageIcon className="h-3.5 w-3.5" />;
  return <FileText className="h-3.5 w-3.5" />;
}

function TrendChart({ values, labels }: { values: number[]; labels: string[] }) {
  const max = Math.max(1, ...values);
  return (
    <div className="mt-3 flex h-24 items-end gap-2">
      {values.map((v, i) => {
        const h = Math.max(6, Math.round((v / max) * 100));
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-md bg-primary/70"
              style={{ height: `${h}%` }}
              title={`${labels[i]}: ${v}`}
            />
            <span className="text-[10px] text-muted-foreground">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="flex items-start gap-2 rounded-2xl border border-dashed border-border/70 bg-muted/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      {insightsDisclaimer}
    </p>
  );
}

/* ---------------- Memory Training ---------------- */

function TrainingPanel() {
  const remembered = trainingSessions.filter((s) => s.remembered).length;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">Memory training</h2>
        <p className="text-sm text-muted-foreground">
          Short exercises to gently rehearse what matters most.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-3xl border-border/60 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Training score
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-medium">{trainingScore}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <Progress value={trainingScore} className="mt-3 h-2" />
        </Card>
        <Card className="rounded-3xl border-border/60 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Sessions this week
          </p>
          <div className="mt-1 text-3xl font-medium">
            {trainingSessions.length}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {remembered} marked as remembered
          </p>
        </Card>
        <Card className="rounded-3xl border-border/60 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Best format
          </p>
          <div className="mt-1 text-2xl font-medium capitalize">
            {trainingFormats[0].format}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {trainingFormats[0].successRate}% remembered
          </p>
        </Card>
      </div>

      <Card className="rounded-3xl border-border/60 p-6">
        <h3 className="text-sm font-medium">Recent sessions</h3>
        <ul className="mt-4 divide-y divide-border/60">
          {trainingSessions.map((s) => (
            <li key={s.id} className="flex items-center gap-3 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                <FormatIcon format={s.format} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{s.topic}</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {s.date} · {s.format}
                </div>
              </div>
              <div className="w-28">
                <Progress value={s.score} className="h-1.5" />
                <div className="mt-1 text-right text-[11px] text-muted-foreground">
                  {s.score}%
                </div>
              </div>
              <Badge
                variant={s.remembered ? "secondary" : "outline"}
                className="rounded-full text-[10px]"
              >
                {s.remembered ? "Remembered" : "Needs review"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */

function DashboardPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          A weekly view of memory patterns — for caregivers and for you.
        </p>
      </div>

      <Card className="rounded-3xl border-border/60 p-6">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary">
            <HeartHandshake className="h-4 w-4" />
          </span>
          <h3 className="text-base font-medium">Caregiver Feedback Summary</h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground">
          {weeklySummary.text}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <MiniStat
            label="Top repeated memory"
            value={weeklySummary.topRepeated}
          />
          <MiniStat
            label="Strongest category"
            value={weeklySummary.strongest}
            tone="positive"
          />
          <MiniStat
            label="Weakest category"
            value={weeklySummary.weakest}
            tone="watch"
          />
          <MiniStat
            label="Recommended action"
            value={weeklySummary.action}
          />
        </div>
      </Card>

      <Card className="rounded-3xl border-border/60 bg-primary/5 p-6">
        <div className="flex items-center gap-2 text-primary">
          <Sparkle className="h-4 w-4" />
          <h3 className="text-sm font-medium uppercase tracking-wide">
            A note for {weeklySummary.patientName}
          </h3>
        </div>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {patientFriendly}
        </p>
      </Card>

      <Disclaimer />
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "watch";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        tone === "positive"
          ? "border-emerald-500/20 bg-emerald-500/5"
          : tone === "watch"
          ? "border-amber-500/20 bg-amber-500/5"
          : "border-border/60 bg-card"
      )}
    >
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  );
}

/* ---------------- Files ---------------- */

type PatientFile = {
  id: string;
  name: string;
  kind: "document" | "photo" | "voice" | "note";
  category: "Medical" | "People" | "Daily" | "Memories";
  updated: string;
  size: string;
  summary: string;
};

const patientFiles: PatientFile[] = [
  {
    id: "f1",
    name: "Saint-Louis discharge summary.pdf",
    kind: "document",
    category: "Medical",
    updated: "Yesterday",
    size: "412 KB",
    summary: "Follow-up scan results and next appointment with Dr. Martin.",
  },
  {
    id: "f2",
    name: "Daily medication list.pdf",
    kind: "document",
    category: "Medical",
    updated: "3 days ago",
    size: "88 KB",
    summary: "Morning and evening doses, with photos of each pill.",
  },
  {
    id: "f3",
    name: "Family — Sarah & the kids.jpg",
    kind: "photo",
    category: "People",
    updated: "Last week",
    size: "2.1 MB",
    summary: "Sarah, your daughter, with Léo and Mia at the park.",
  },
  {
    id: "f4",
    name: "Karim — voice note.m4a",
    kind: "voice",
    category: "People",
    updated: "Today, 09:12",
    size: "1:24",
    summary: "Karim explaining he'll pick you up after the appointment.",
  },
  {
    id: "f5",
    name: "Morning routine.txt",
    kind: "note",
    category: "Daily",
    updated: "Today",
    size: "1 KB",
    summary: "Wake up, medication, breakfast, short walk in the garden.",
  },
  {
    id: "f6",
    name: "Anniversary in Lyon.jpg",
    kind: "photo",
    category: "Memories",
    updated: "2 weeks ago",
    size: "3.4 MB",
    summary: "You and Marie celebrating 40 years together.",
  },
];

function FileKindIcon({ kind }: { kind: PatientFile["kind"] }) {
  if (kind === "photo") return <ImageIcon className="h-4 w-4" />;
  if (kind === "voice") return <Volume2 className="h-4 w-4" />;
  if (kind === "note") return <BookOpen className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function FilesPanel() {
  const categories = ["Medical", "People", "Daily", "Memories"] as const;
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-medium">Files</h2>
        <p className="text-sm text-muted-foreground">
          Documents, photos and voice notes Continuity can pull from during a call.
        </p>
      </div>
      <div className="space-y-6">
        {categories.map((cat) => {
          const items = patientFiles.filter((f) => f.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat}>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground/80">{cat}</h3>
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((f) => (
                  <Card key={f.id} className="rounded-2xl border-border/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground/70">
                        <FileKindIcon kind={f.kind} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{f.name}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          {f.updated} · {f.size}
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {f.summary}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- People ---------------- */

function PeoplePanel() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-medium">People in your life</h2>
        <p className="text-sm text-muted-foreground">
          Who they are, and the last time you connected.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {people.map((p) => (
          <Card key={p.id} className="rounded-3xl border-border/60 p-5">
            <div className="flex items-center gap-4">
              <div
                className="grid h-12 w-12 place-items-center rounded-full text-lg font-medium text-foreground/80"
                style={{ backgroundColor: p.tint }}
              >
                {p.initials}
              </div>
              <div>
                <div className="text-base font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.relation}</div>
              </div>
              <div className="ml-auto text-right text-[11px] text-muted-foreground">
                <div>Last seen</div>
                <div className="text-foreground">{p.lastSeen}</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.context}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Context ---------------- */

function ContextPanel() {
  const [selected, setSelected] = useState(demoAnswers[0]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
      <Card className="rounded-3xl border-border/60 p-5">
        <h3 className="text-sm font-medium text-foreground">Ask a question</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Continuity reconstructs an answer from your recent moments.
        </p>
        <div className="mt-4 space-y-2">
          {demoAnswers.map((d) => (
            <button
              key={d.q}
              onClick={() => setSelected(d)}
              className={
                "w-full rounded-2xl border px-4 py-3 text-left text-sm transition " +
                (selected.q === d.q
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground")
              }
            >
              {d.q}
            </button>
          ))}
        </div>
      </Card>

      <Card className="rounded-3xl border-border/60 p-6">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          Retrieved memories
        </div>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {selected.sources.map((s) => (
            <li key={s}>· {s}</li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl bg-primary/10 p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
            <Sparkle className="h-3 w-3" /> Synthesized response
          </div>
          <p className="mt-2 text-base leading-relaxed text-foreground">
            {selected.answer}
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Memories ---------------- */

function MemoriesPanel() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return memories;
    return memories.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.body.toLowerCase().includes(s) ||
        m.tags.some((t) => t.toLowerCase().includes(s))
    );
  }, [q]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-medium">Memory logs</h2>
          <p className="text-sm text-muted-foreground">
            Conversations, notes, events and relationship updates.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search memories…"
            className="rounded-full pl-9"
          />
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((m) => (
          <Card key={m.id} className="rounded-2xl border-border/60 p-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
                {m.type}
              </span>
              <span>{m.date}</span>
            </div>
            <div className="mt-1 text-base font-medium">{m.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">
            No memories match "{q}".
          </div>
        )}
      </div>
    </div>
  );
}

export default AppPage;
