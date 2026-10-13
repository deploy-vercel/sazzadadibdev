import { site } from "./site";

export type ContactChannel = {
  id: "email" | "linkedin" | "github";
  name: string;
  hint: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Rendered as a QR code when present. */
  qr?: string;
  qrLabel?: string;
  handle?: string;
  copyValue?: string;
  cta: string;
  href: string;
  bestFor: string;
};

export const channels: ContactChannel[] = [
  {
    id: "email",
    name: "Email",
    hint: "Direct",
    eyebrow: "On the record",
    title: "For roles, projects, and details.",
    body: "Best when you have a job description, requirements, or anything you want on the record. Long emails welcome — they usually make the first conversation shorter.",
    copyValue: site.email,
    cta: "Compose email",
    href: `mailto:${site.email}`,
    bestFor: "Roles & projects",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    hint: "Credentials first",
    eyebrow: "The professional route",
    title: "Check the background first.",
    body: "Experience, education, and mutual connections in one place. Scan the code or open the profile — the door is the same either way.",
    qr: site.links.linkedin,
    qrLabel: "LinkedIn QR code — scan to open the profile",
    handle: site.linkedinHandle,
    cta: "View profile",
    href: site.links.linkedin,
    bestFor: "Professional background",
  },
  {
    id: "github",
    name: "GitHub",
    hint: "Code first",
    eyebrow: "Read the code",
    title: "Skip the pitch. Read the code.",
    body: "Every project on this site links to its repository. Browse the code, the commits, and how things are put together.",
    qr: site.links.github,
    qrLabel: "GitHub QR code — scan to open the profile",
    handle: site.githubHandle,
    cta: "Open GitHub",
    href: site.links.github,
    bestFor: "Code & projects",
  },
];

export const contactSteps = [
  {
    when: "Step one",
    title: "I read your message",
    body: "From me, not an autoresponder. If I'm not the right fit for what you need, I'll say so.",
  },
  {
    when: "Step two",
    title: "We talk it through",
    body: "The role or the project, the goals, and the timeline — and whether I'm the right person for it.",
  },
  {
    when: "Step three",
    title: "We get to work",
    body: "A clear plan, regular progress you can see, and code that's documented and tested.",
  },
];

export const contactFacts = ["Based in — Dhaka, Bangladesh", "Open to — AI engineering roles", "Focus — LLM systems & full-stack AI"];
