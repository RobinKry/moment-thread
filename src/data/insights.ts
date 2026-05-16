export type RepeatedQuestion = {
  q: string;
  count: number;
  category: "people" | "places" | "appointments" | "medication" | "actions" | "schedule";
  trend: number[]; // by day, most recent last
};

export type GapCategory = {
  label: string;
  key: RepeatedQuestion["category"];
  share: number; // 0-100
};

export type TrainingFormat = {
  format: "voice" | "text" | "visual";
  successRate: number; // 0-100
  sessions: number;
  remembered: number;
};

export type TrainingSession = {
  id: string;
  date: string;
  topic: string;
  format: TrainingFormat["format"];
  score: number; // 0-100
  remembered: boolean;
};

export const repeatedQuestions: RepeatedQuestion[] = [
  {
    q: "Why am I at the hospital?",
    count: 5,
    category: "appointments",
    trend: [5, 4, 3, 3, 2, 1, 1],
  },
  {
    q: "Who is Emma?",
    count: 3,
    category: "people",
    trend: [2, 3, 3, 2, 2, 1, 1],
  },
  {
    q: "What was I doing before this?",
    count: 4,
    category: "actions",
    trend: [3, 4, 4, 3, 3, 2, 2],
  },
  {
    q: "Did I take my medication?",
    count: 2,
    category: "medication",
    trend: [3, 2, 2, 1, 1, 1, 0],
  },
  {
    q: "When is my next appointment?",
    count: 2,
    category: "schedule",
    trend: [1, 2, 2, 2, 1, 1, 1],
  },
];

export const gapCategories: GapCategory[] = [
  { label: "Appointments", key: "appointments", share: 34 },
  { label: "People", key: "people", share: 26 },
  { label: "Recent actions", key: "actions", share: 18 },
  { label: "Daily schedule", key: "schedule", share: 12 },
  { label: "Medication", key: "medication", share: 6 },
  { label: "Places", key: "places", share: 4 },
];

export const trainingFormats: TrainingFormat[] = [
  { format: "voice", successRate: 78, sessions: 9, remembered: 7 },
  { format: "visual", successRate: 65, sessions: 8, remembered: 5 },
  { format: "text", successRate: 52, sessions: 6, remembered: 3 },
];

export const trainingSessions: TrainingSession[] = [
  { id: "ts1", date: "Today", topic: "Hospital appointment", format: "voice", score: 84, remembered: true },
  { id: "ts2", date: "Today", topic: "Emma — physiotherapist", format: "visual", score: 72, remembered: true },
  { id: "ts3", date: "Yesterday", topic: "Morning medication", format: "voice", score: 80, remembered: true },
  { id: "ts4", date: "Yesterday", topic: "Karim's phone number", format: "text", score: 48, remembered: false },
  { id: "ts5", date: "2 days ago", topic: "Sunday call with Sarah", format: "voice", score: 70, remembered: true },
  { id: "ts6", date: "3 days ago", topic: "MRI scan procedure", format: "visual", score: 60, remembered: false },
];

export const trainingScore = 72;

export const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];

export const weeklySummary = {
  patientName: "Jean",
  text: "This week, Jean frequently needed support remembering appointments and people. The most repeated memory was the Saint-Louis Hospital appointment. Voice-based training appeared more effective than text-based review. Consider reviewing upcoming appointments every morning and keeping relationship reminders easily accessible.",
  topRepeated: "Saint-Louis Hospital appointment",
  strongest: "Medication routine",
  weakest: "Appointments & people",
  action:
    "Review tomorrow's appointments together each morning, and add short voice reminders for the people Jean will meet.",
};

export const patientFriendly =
  "You asked about your hospital appointment several times this week. That's okay — practising it with short voice reminders seems to help you remember it better.";

export const insightsDisclaimer =
  "These insights are assistive memory support and are not a medical diagnosis.";

// Structured payload that a future call to OpenAI could consume.
// Prompt sketch:
// "Analyze this patient's memory interaction history. Identify repeated
// questions, frequent memory gap categories, improvement trends, best
// support format, and caregiver recommendations. Do not provide medical
// diagnosis. Use gentle, assistive language."
export function buildInsightsPayload() {
  return {
    repeatedQuestions,
    gapCategories,
    trainingFormats,
    trainingSessions,
    trainingScore,
  };
}