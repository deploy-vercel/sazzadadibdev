import { site } from "./site";
import { projects } from "./projects";

export const aboutSections = [
  { id: "sec-story", label: "The story" },
  { id: "sec-principles", label: "How I work" },
  { id: "sec-receipts", label: "The receipts" },
  { id: "sec-fit", label: "Education & focus" },
  { id: "sec-hello", label: "Say hello" },
] as const;

export const aboutIntro = {
  status: site.availability,
  thin: "Hey, I'm",
  bold: "Sazzad",
  lead: "AI Engineer in Dhaka — building production LLM systems and full-stack AI applications.",
};

export const story = {
  lead: "A doctor's consultation, by voice. A plate of Bangladeshi food, from a photo. Regional Bangla dialects, in standard text.",
  punchBefore: "Different problems,",
  punchAccent: "same goal",
  punchAfter: "— AI that works in the real world.",
  paragraphs: [
    "I am an AI Research Engineer at Robot Bulls. I completed my B.Sc. in Computer Science and Engineering at North South University in December 2025 with a CGPA of 3.83/4.00 and a Merit Scholarship for ranking in the top 1% of my class.",
    "At Robot Bulls, I'm building a real-time Talking Head system — letting users hold natural, face-to-face voice conversations with AI. I am actively open to AI engineering opportunities, with a particular interest in real-time conversational AI, efficient model deployment, and real-world applications of large language models.",
  ],
  stats: [
    { value: String(projects.length), unit: "", label: "Projects on GitHub", accent: false },
    { value: "3.83", unit: "", label: "CGPA, B.Sc. in CSE", accent: false },
    { value: "Top 1", unit: "%", label: "Merit Scholarship", accent: true },
  ],
};

export const principles = [
  {
    title: "Build AI that ships.",
    body: "In engineering work, I prioritize scalable, maintainable systems that integrate AI seamlessly — voice assistants, food recognition, and AI-generated learning content that real people use, not demos that stop at a notebook.",
    tag: "Production AI",
  },
  {
    title: "Make AI accessible and efficient.",
    body: "I am particularly passionate about making AI more accessible and efficient. Lightweight models, Retrieval-Augmented Generation, and offline capability let AI reach resource-constrained environments and underserved communities.",
    tag: "Efficient by design",
  },
  {
    title: "Typed, secure, end to end.",
    body: "TypeScript from the database to the UI, PostgreSQL with Drizzle ORM underneath, and JWT or Clerk authentication in front — so the data layer stays simple, secure, and type-safe.",
    tag: "Typed end to end",
  },
  {
    title: "Plan, document, test.",
    body: "I work in sprints with planning and retrospectives, document code with JSDoc, and back it with Jest unit and integration tests — habits that keep a codebase reliable across contributors. I believe strongly in interdisciplinary collaboration.",
    tag: "Agile · tested",
  },
];

export const toolbelt = [
  "Python",
  "PyTorch",
  "LLMs",
  "RAG",
  "LangChain",
  "HuggingFace Transformers",
  "TypeScript",
  "Next.js",
  "React.js",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Drizzle ORM",
  "Docker",
];

/** Two cards: education on the left (accent), current focus on the right. */
export const fit = {
  lead: "Bachelor of Science in Computer Science and Engineering — North South University, Sep 2021 – Dec 2025.",
  yes: {
    title: "Education",
    items: [
      "North South University, Dhaka, Bangladesh",
      "B.Sc. in Computer Science and Engineering",
      "CGPA 3.83/4.00",
      "Merit Scholarship — top 1% of class",
      "National AI Competition Finalist, AI Fication 2025 (Televerse 1.0, CUET)",
      "Led multiple AI and full-stack development projects",
    ],
  },
  no: {
    title: "Focused on",
    items: [
      "AI engineering roles",
      "Real-time conversational AI",
      "Efficient model deployment",
      "Real-world applications of large language models",
      "AI-integrated web interfaces",
      "Cloud-ready ML pipelines",
    ],
  },
};

export const sayHello = {
  thin: "That's the",
  bold: "Whole story",
  body: "Whether it's a role, a project, or a collaboration proposal — I'd love to hear from you.",
};
