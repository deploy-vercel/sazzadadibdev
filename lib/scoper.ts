/**
 * Rule-based project scoping used by the on-page Scoper demo.
 * Everything runs in the browser — no network, no model. It turns four short
 * answers into a draft blueprint the visitor can download or email.
 */

export type ScoperAnswers = {
  idea: string;
  audience: string;
  mustHaves: string;
  integrations: string;
};

export type Blueprint = {
  title: string;
  summary: string;
  goals: string[];
  features: string[];
  stack: { layer: string; choice: string; why: string }[];
  flows: string[];
  timeline: { week: string; focus: string }[];
};

export const scoperQuestions: { key: keyof ScoperAnswers; prompt: string; placeholder: string }[] = [
  {
    key: "idea",
    prompt: "Describe what you want to build — one sentence is plenty.",
    placeholder: "I want to build a…",
  },
  {
    key: "audience",
    prompt: "Who's going to use it day to day? Customers, your team, admins — whoever comes to mind.",
    placeholder: "e.g. patients and clinic staff",
  },
  {
    key: "mustHaves",
    prompt: "What are the two or three things it absolutely must do on day one?",
    placeholder: "e.g. describe symptoms by voice, book a doctor, get a report",
  },
  {
    key: "integrations",
    prompt: "Anything it needs to plug into? Payments, an existing system, AI, email — or “nothing yet”.",
    placeholder: "e.g. an LLM, voice AI, Stripe",
  },
];

const has = (text: string, ...words: string[]) => words.some((w) => new RegExp(`\\b${w}`, "i").test(text));

function splitList(text: string) {
  return text
    .split(/,|;|\n|\band\b|\+/i)
    .map((s) => s.trim().replace(/^[-•*]\s*/, ""))
    .filter((s) => s.length > 2)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
}

function titleFrom(idea: string) {
  const cleaned = idea
    .replace(/^(i\s+(want|need|would like)\s+to\s+(build|make|create)\s+)|^(we\s+(want|need)\s+)/i, "")
    .replace(/^(an?|the)\s+/i, "")
    .replace(/[.!?]+$/, "")
    .trim();
  const short = cleaned.split(/\s+/).slice(0, 7).join(" ");
  return short.charAt(0).toUpperCase() + short.slice(1);
}

export function buildBlueprint(a: ScoperAnswers): Blueprint {
  const all = `${a.idea} ${a.audience} ${a.mustHaves} ${a.integrations}`;
  const isBooking = has(all, "book", "reserv", "appoint", "hotel", "schedul", "calendar");
  const isCommerce = has(all, "shop", "store", "ecommerce", "e-commerce", "cart", "sell", "product");
  const isAI = has(all, "ai", "llm", "gpt", "gemini", "chat", "summar", "generat", "assistant");
  const isSaaS = has(all, "saas", "subscription", "tenant", "plan", "billing", "workspace");
  const needsPayments = has(all, "pay", "stripe", "checkout", "billing", "subscription", "invoice");
  const hasStaff = has(all, "admin", "staff", "team", "manager", "employee", "front-desk", "front desk");
  const relational = isBooking || isCommerce || isSaaS || needsPayments;

  const mustHaves = splitList(a.mustHaves);
  const audience = a.audience.trim() || "your users";

  const features = [
    ...mustHaves,
    "Accounts & sign-in" + (hasStaff ? " with role-based access" : ""),
    ...(hasStaff ? ["Admin dashboard for day-to-day operations"] : []),
    ...(needsPayments ? ["Secure payments and receipts"] : []),
    ...(isBooking ? ["Availability that can't double-book"] : []),
    ...(isAI ? ["AI feature with rate limits, logging, and graceful fallbacks"] : []),
    "Transactional email",
    "Mobile-first responsive UI",
  ].filter((f, i, arr) => arr.findIndex((x) => x.toLowerCase() === f.toLowerCase()) === i);

  const stack: Blueprint["stack"] = [
    { layer: "Frontend", choice: "Next.js + TypeScript + Tailwind CSS", why: "Fast pages, SEO out of the box, one typed codebase." },
    {
      layer: "Backend",
      choice: relational || hasStaff ? "Node.js API (Express) with validation at every route" : "Next.js route handlers",
      why: relational || hasStaff ? "Clear boundaries for business rules and roles." : "Keeps a small product in one deployable.",
    },
    {
      layer: "Data",
      choice: relational ? "PostgreSQL" : "MongoDB",
      why: relational ? "Bookings, orders and money want transactions and constraints." : "Flexible documents while the shape settles.",
    },
    ...(needsPayments
      ? [{ layer: "Payments", choice: "Stripe (or a local gateway)", why: "Hosted checkout, webhooks for every edge case." }]
      : []),
    ...(isAI ? [{ layer: "AI", choice: "LLM API behind a server route", why: "Keys stay server-side; usage is metered and logged." }] : []),
    { layer: "Hosting", choice: "Vercel (or Docker) + Git", why: "Preview deploys and boring, repeatable releases." },
  ];

  const flows = [
    `A first-time visitor understands the value in seconds and gets to “${mustHaves[0] ?? "the core action"}” without signing up first where possible.`,
    `${audience.charAt(0).toUpperCase() + audience.slice(1)} sign in and land on what needs their attention today.`,
    ...(hasStaff ? ["Staff manage records, resolve issues, and see an audit trail of changes."] : []),
    ...(needsPayments ? ["Checkout → confirmation email with receipt → status visible in the account."] : []),
    ...(isAI ? ["The AI step shows progress, can be retried, and never blocks the rest of the flow."] : []),
  ];

  return {
    title: titleFrom(a.idea) || "Your project",
    summary: `${a.idea.trim().replace(/[.!?]*$/, ".")} Built for ${audience}.`,
    goals: [
      `Ship a working version of the core flow for ${audience} in about four weeks.`,
      mustHaves.length
        ? `Nail the day-one essentials: ${mustHaves.slice(0, 3).join(", ").toLowerCase()}.`
        : "Nail the single most important action first.",
      "Leave you with clean, documented code your team owns outright.",
    ],
    features,
    stack,
    flows,
    timeline: [
      { week: "Week 1", focus: "Discovery, data model, auth, first working demo" },
      { week: "Week 2", focus: `Core features: ${mustHaves.slice(0, 2).join(", ").toLowerCase() || "the main flow"}` },
      {
        week: "Week 3",
        focus: `Integrations${a.integrations && !has(a.integrations, "nothing", "none", "no") ? ` (${a.integrations.trim()})` : ""}, polish, testing`,
      },
      { week: "Week 4", focus: "Production deploy, docs, handover" },
    ],
  };
}

export function blueprintToMarkdown(b: Blueprint) {
  return [
    `# ${b.title} — draft blueprint`,
    "",
    b.summary,
    "",
    "## Goals",
    ...b.goals.map((g) => `- ${g}`),
    "",
    "## Features",
    ...b.features.map((f) => `- ${f}`),
    "",
    "## Tech stack",
    ...b.stack.map((s) => `- **${s.layer}:** ${s.choice} — ${s.why}`),
    "",
    "## User flows",
    ...b.flows.map((f, i) => `${i + 1}. ${f}`),
    "",
    "## Timeline",
    ...b.timeline.map((t) => `- **${t.week}:** ${t.focus}`),
    "",
    "_Generated in the browser by the portfolio's scoping demo. A real scope comes from a conversation._",
  ].join("\n");
}
