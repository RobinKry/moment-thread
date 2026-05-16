export type TimelineItem = {
  id: string;
  time: string;
  title: string;
  summary: string;
  tags: string[];
  location?: string;
};

export type Person = {
  id: string;
  name: string;
  relation: string;
  lastSeen: string;
  context: string;
  initials: string;
  tint: string;
};

export type Memory = {
  id: string;
  type: "conversation" | "event" | "note" | "voice" | "relationship";
  title: string;
  body: string;
  date: string;
  tags: string[];
};

export const timeline: TimelineItem[] = [
  {
    id: "t1",
    time: "08:15",
    title: "Morning medication",
    summary: "Took the blue pill (Levetiracetam) with breakfast. Karim reminded you.",
    tags: ["medication", "routine"],
    location: "Home",
  },
  {
    id: "t2",
    time: "09:40",
    title: "Karim drove you to the hospital",
    summary: "Your brother Karim picked you up at 9:20 and drove you to Saint-Louis Hospital.",
    tags: ["family", "transport"],
    location: "Paris, 10e",
  },
  {
    id: "t3",
    time: "10:30",
    title: "Follow-up with Dr. Lefevre",
    summary: "Neurology follow-up after yesterday's MRI scan. Discussed new memory exercises.",
    tags: ["appointment", "neurology"],
    location: "Saint-Louis Hospital",
  },
  {
    id: "t4",
    time: "11:15",
    title: "Met Emma in the corridor",
    summary: "Emma, your physiotherapist, walked with you and asked about side effects.",
    tags: ["healthcare", "people"],
    location: "Saint-Louis Hospital",
  },
  {
    id: "t5",
    time: "12:30",
    title: "Lunch with Karim",
    summary: "Soup and bread at the small café near the hospital. You talked about Sunday plans.",
    tags: ["family", "meal"],
    location: "Café Lazare",
  },
];

export const people: Person[] = [
  {
    id: "p1",
    name: "Karim",
    relation: "Brother",
    lastSeen: "This morning",
    context: "Drove you to the hospital. Lives 15 minutes away. Always carries your medication list.",
    initials: "K",
    tint: "oklch(0.88 0.05 60)",
  },
  {
    id: "p2",
    name: "Dr. Lefevre",
    relation: "Neurologist",
    lastSeen: "Today, 10:30",
    context: "Following your case for 8 months. Coordinates your MRI and medication.",
    initials: "L",
    tint: "oklch(0.88 0.05 240)",
  },
  {
    id: "p3",
    name: "Emma",
    relation: "Physiotherapist",
    lastSeen: "Yesterday",
    context: "Works on balance exercises with you. Discussed medication side effects.",
    initials: "E",
    tint: "oklch(0.9 0.05 160)",
  },
  {
    id: "p4",
    name: "Sarah",
    relation: "Close friend",
    lastSeen: "3 days ago",
    context: "Met at university. Calls every Sunday evening. Has two children, Lina and Noé.",
    initials: "S",
    tint: "oklch(0.9 0.05 20)",
  },
];

export const memories: Memory[] = [
  {
    id: "m1",
    type: "event",
    title: "MRI scan",
    body: "Routine scan at Saint-Louis Hospital. No new findings reported by the technician.",
    date: "Yesterday",
    tags: ["health", "hospital"],
  },
  {
    id: "m2",
    type: "conversation",
    title: "Call with Sarah",
    body: "Sunday evening call. She told you about Lina's school play next month.",
    date: "3 days ago",
    tags: ["friends", "family"],
  },
  {
    id: "m3",
    type: "note",
    title: "Bring scan results",
    body: "Reminder to bring the printed MRI results to today's appointment with Dr. Lefevre.",
    date: "Yesterday evening",
    tags: ["reminder"],
  },
  {
    id: "m4",
    type: "voice",
    title: "Why am I in the kitchen?",
    body: "You asked Continuity at 7:48 — answer: you were preparing tea before taking your morning medication.",
    date: "Today, 07:48",
    tags: ["voice", "routine"],
  },
  {
    id: "m5",
    type: "relationship",
    title: "Emma — medication side effects",
    body: "Discussed mild dizziness in the mornings. Emma suggested taking the pill after, not before, breakfast.",
    date: "Yesterday",
    tags: ["healthcare"],
  },
];

// Pre-baked context reconstruction answers for the demo
export const demoAnswers: { q: string; sources: string[]; answer: string }[] = [
  {
    q: "Why am I at the hospital?",
    sources: [
      "Yesterday — MRI scan at Saint-Louis Hospital",
      "Today 09:40 — Karim drove you here",
      "Today 10:30 — Follow-up with Dr. Lefevre",
    ],
    answer:
      "You are at Saint-Louis Hospital for your follow-up appointment after yesterday's MRI scan. Your brother Karim brought you here this morning. Your appointment with Dr. Lefevre starts in about 20 minutes.",
  },
  {
    q: "Who is this person?",
    sources: [
      "Relationship — Emma, physiotherapist",
      "Yesterday — discussed medication side effects",
    ],
    answer:
      "This is Emma, your physiotherapist. You see her every week for balance exercises. You last spoke yesterday about mild dizziness from your morning medication.",
  },
  {
    q: "Did I already take my medication?",
    sources: [
      "Today 08:15 — Morning medication logged",
      "Note — Karim confirmed",
    ],
    answer:
      "Yes. You took your morning Levetiracetam at 08:15 with breakfast. Karim was with you and confirmed it. Your next dose is at 20:00.",
  },
  {
    q: "What was I supposed to do?",
    sources: [
      "Note — Bring scan results",
      "Today 10:30 — Appointment with Dr. Lefevre",
    ],
    answer:
      "You were planning to bring the printed MRI results from yesterday to your 10:30 appointment with Dr. Lefevre. They are in the brown folder in your bag.",
  },
];
