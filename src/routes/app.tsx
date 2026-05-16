import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VoiceOrb } from "@/components/voice-orb";
import { timeline, people, memories, demoAnswers } from "@/data/mock";
import {
  Clock,
  Users,
  Compass,
  BookOpen,
  Mic,
  Search,
  MapPin,
  Sparkle,
} from "lucide-react";

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
        <Tabs defaultValue="voice">
          <TabsList className="grid w-full grid-cols-5 rounded-full bg-muted/60 p-1">
            <TabsTrigger value="voice" className="rounded-full">
              <Mic className="mr-2 h-4 w-4" /> Voice
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-full">
              <Clock className="mr-2 h-4 w-4" /> Today
            </TabsTrigger>
            <TabsTrigger value="people" className="rounded-full">
              <Users className="mr-2 h-4 w-4" /> People
            </TabsTrigger>
            <TabsTrigger value="context" className="rounded-full">
              <Compass className="mr-2 h-4 w-4" /> Context
            </TabsTrigger>
            <TabsTrigger value="memories" className="rounded-full">
              <BookOpen className="mr-2 h-4 w-4" /> Memories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="mt-6">
            <VoicePanel />
          </TabsContent>
          <TabsContent value="timeline" className="mt-6">
            <TimelinePanel />
          </TabsContent>
          <TabsContent value="people" className="mt-6">
            <PeoplePanel />
          </TabsContent>
          <TabsContent value="context" className="mt-6">
            <ContextPanel />
          </TabsContent>
          <TabsContent value="memories" className="mt-6">
            <MemoriesPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ---------------- Voice ---------------- */

function VoicePanel() {
  const [listening, setListening] = useState(false);
  const [exchange, setExchange] = useState<{
    transcript: string;
    answer: string;
    sources: string[];
  } | null>(null);

  const samplePrompts = demoAnswers.map((d) => d.q);

  const handleAsk = (q: string) => {
    const match = demoAnswers.find((d) => d.q === q) ?? demoAnswers[0];
    setListening(true);
    setExchange({ transcript: q, answer: "", sources: [] });
    setTimeout(() => {
      setListening(false);
      setExchange({ transcript: q, answer: match.answer, sources: match.sources });
    }, 1400);
  };

  const toggleOrb = () => {
    if (listening) {
      setListening(false);
      return;
    }
    handleAsk(samplePrompts[0]);
  };

  return (
    <Card className="rounded-3xl border-border/60 p-8">
      <div className="flex flex-col items-center text-center">
        <VoiceOrb listening={listening} onClick={toggleOrb} />
        <p className="mt-6 text-sm text-muted-foreground">
          {listening ? "Listening…" : "Tap to speak, or try a question below."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {samplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleAsk(p)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {exchange && (
        <div className="mt-10 space-y-4">
          <div className="rounded-2xl bg-muted/60 p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              You said
            </div>
            <div className="mt-1 text-base">{exchange.transcript}</div>
          </div>
          <div className="rounded-2xl bg-primary/10 p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
              <Sparkle className="h-3 w-3" /> Continuity
            </div>
            <div className="mt-2 text-base leading-relaxed text-foreground">
              {exchange.answer || (
                <span className="inline-flex gap-1">
                  <Dot /> <Dot delay={150} /> <Dot delay={300} />
                </span>
              )}
            </div>
            {exchange.sources.length > 0 && (
              <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <div className="font-medium text-foreground">Reconstructed from</div>
                <ul className="mt-1 space-y-0.5">
                  {exchange.sources.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary/70"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

/* ---------------- Timeline ---------------- */

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
