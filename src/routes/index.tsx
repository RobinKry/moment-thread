import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceOrb } from "@/components/voice-orb";
import {
  Clock,
  Users,
  Compass,
  BookOpen,
  ShieldCheck,
  Ear,
  Sparkle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Continuity — A voice AI companion for memory continuity" },
      {
        name: "description",
        content:
          "Continuity is a calm voice-first AI companion that helps people with memory impairment reconstruct context, relationships, and the flow of their day.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Accessibility />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15">
          <span className="h-3 w-3 rounded-full bg-primary" />
        </span>
        <span className="text-lg font-medium tracking-tight">Continuity</span>
      </Link>
      <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
        <a href="#features" className="hover:text-foreground">Features</a>
      </nav>
      <Link to="/app">
        <Button className="rounded-full">Open companion</Button>
      </Link>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/60 px-3 py-1 text-xs text-accent-foreground">
          <Sparkle className="h-3 w-3" /> Assistive AI — not a medical device
        </span>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
          Helping people reconnect with the continuity of their lives.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A voice AI companion that reconstructs context, memories, and daily
          continuity for people with memory impairment.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/app">
            <Button size="lg" className="rounded-full">Try the companion</Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Continuity is an assistive tool. It does not diagnose, treat, or replace healthcare professionals.
        </p>
      </div>
      <div className="relative">
        <div className="mx-auto flex aspect-square max-w-md flex-col items-center justify-center rounded-[2rem] bg-gradient-to-b from-primary/10 to-accent/30 p-10 shadow-sm">
          <VoiceOrb listening onClick={() => {}} size={200} />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            "You are at Saint-Louis Hospital for your follow-up appointment.
            Karim brought you here this morning."
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Ear, title: "Voice-first", desc: "Speak naturally. Continuity listens and responds in calm, plain language." },
    { icon: Clock, title: "Daily timeline", desc: "Your day, gently reconstructed from conversations, notes and events." },
    { icon: Users, title: "People you know", desc: "Quickly recall who someone is and when you last spoke." },
    { icon: Compass, title: "Context on demand", desc: "Ask why you are somewhere or what you were doing — and get a clear answer." },
    { icon: BookOpen, title: "Memory logs", desc: "Searchable summaries of your conversations, notes and moments." },
    { icon: ShieldCheck, title: "Privacy by design", desc: "Memories stay yours. Designed for trust, not surveillance." },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="max-w-2xl text-2xl font-medium tracking-tight md:text-3xl">
        Built for clarity, not productivity.
      </h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <Card key={f.title} className="rounded-3xl border-border/60 p-6">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Accessibility() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Card className="rounded-3xl border-border/60 bg-accent/30 p-8 md:p-12">
        <h2 className="max-w-2xl text-2xl font-medium tracking-tight md:text-3xl">
          Designed for the people who need it most.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Large, calm typography. High-contrast colors. Voice as the primary
          interface. Continuity is built around cognitive accessibility — so it
          feels safe to use on a difficult day.
        </p>
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6">
        <span>© {new Date().getFullYear()} Continuity</span>
        <span>Assistive AI · not a medical device</span>
      </div>
    </footer>
  );
}
