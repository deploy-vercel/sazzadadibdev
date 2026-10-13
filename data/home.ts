import { site } from "./site";
import { featuredProjects, projects } from "./projects";

export const heroCopy = {
  eyebrowLeft: "Portfolio — 2026",
  eyebrowRight: "Available for opportunities",
  lineOne: "FULL–STACK",
  /** Rendered as its own word before lineTwoA (flex rows collapse literal spaces). */
  lineTwoPre: "AI",
  lineTwoA: "DEVEL",
  lineTwoB: "OPER",
  lead: "Sazzad Hossain Adib — AI Research Engineer at Robot Bulls, building real-time conversational AI systems and full-stack AI applications.",
  cta: "See the work",
};

export const introCopy = {
  hello: "Hey!",
  lead: "I'm Sazzad, an AI Engineer in Dhaka building production LLM systems and full-stack AI applications.",
  body: "At Robot Bulls, I'm building a real-time Talking Head system — letting users hold natural, face-to-face voice conversations with AI. I prioritize scalable, maintainable systems that integrate AI seamlessly.",
  bodyShort:
    "I prioritize scalable, maintainable systems that integrate AI seamlessly — from voice-driven medical assistants to real-time food recognition.",
  stack: "Python · PyTorch · LLMs · RAG · LangChain · TypeScript · Next.js · PostgreSQL",
  cta: "Get in touch",
};

/** Ticker under the hero. `clock` items render live Dhaka time. */
export const heroTicker: { strong: string; soft: string; clock?: boolean }[] = [
  { strong: `${projects.length} projects`, soft: "Code on GitHub" },
  { strong: "Top 1%", soft: "Merit Scholarship, NSU" },
  { strong: "3.83 / 4.00", soft: "CGPA, B.Sc. in CSE" },
  { strong: "Dhaka", soft: `${site.timeZoneLabel}, open to opportunities`, clock: true },
];

const others = projects.length - featuredProjects.length;

export const projectsIntro = {
  eyebrow: "Projects",
  title: "Some things I've built",
  lead: "AI applications and full-stack platforms — from voice-driven medical assistants to food recognition and interview preparation.",
  outroTitle: "Every project, on record",
  outroLead: `These are the ${featuredProjects.length} I lead with. The other ${others} live in the full archive — each with a case study and its code on GitHub.`,
};

export type Principle = {
  area: string;
  title: string;
  body: string;
  tags: string[];
  link?: { label: string; href: string };
};

export const engineering = {
  eyebrow: "Engineering",
  title: "How I think about engineering",
  lead: "Anyone can list a stack. These are the principles behind every build — and the numbers that back them up.",
  principles: [
    {
      area: "AI in production",
      title: "AI has to fit the system, not the other way around.",
      body: "In engineering work, I prioritize scalable, maintainable systems that integrate AI seamlessly. In the AI Doctor Assistant, that meant coordinating voice, LLM, auth, and database services into one cohesive real-time flow — VAPI with OpenRouter AI for sub-second responses and natural turn-taking.",
      tags: ["VAPI", "OpenRouter AI", "Prompt templates", "Real-time voice"],
      link: { label: "See the AI Doctor Assistant", href: "/case-study/ai-doctor-assistant" },
    },
    {
      area: "Accessibility",
      title: "Make AI accessible and efficient.",
      body: "I am particularly passionate about making AI more accessible and efficient — enabling deployment in resource-constrained environments and underserved communities. The Educational Chatbot runs a lightweight SLM with Retrieval-Augmented Generation, offline, on modest hardware.",
      tags: ["Small Language Models", "RAG", "Ollama", "Offline-capable"],
      link: { label: "See the Educational Chatbot", href: "/case-study/educational-chatbot" },
    },
    {
      area: "Data layer",
      title: "Keep the data layer simple and type-safe.",
      body: "TypeScript end to end, with PostgreSQL and Drizzle ORM underneath and JWT or Clerk authentication in front. InterviewBD's three-tier role system — Admin, Moderator, User — sits on exactly that foundation.",
      tags: ["TypeScript", "PostgreSQL", "Drizzle ORM", "JWT Auth", "Role-based access"],
      link: { label: "See InterviewBD", href: "/case-study/interviewbd" },
    },
    {
      area: "Teamwork",
      title: "Plan in sprints. Document. Test.",
      body: "On team projects I follow Agile Scrum — sprint planning and retrospectives keep scope and priorities aligned week to week, while JSDoc documentation and Jest unit and integration tests keep quality consistent across contributors.",
      tags: ["Agile/Scrum", "Jest", "JSDoc", "Git", "Trello"],
      link: { label: "See the Movie Reservation Website", href: "/case-study/movie-reservation" },
    },
  ] satisfies Principle[],
  receiptLabel: "The receipts — measured results",
  scores: [
    { value: "89.76%", label: "Food classification" },
    { value: "99.1%", label: "Patient status prediction" },
    { value: "75%", label: "RAG answer accuracy" },
    { value: "3,800+", label: "Dialect audio samples" },
  ],
  receiptNote: "From project evaluations · details in each case study",
};

export const journey = {
  eyebrow: "The journey",
  title: "How I got here",
  lead: "From a Computer Science classroom in Dhaka to building real-time conversational AI. Here's the short version.",
  items: [
    {
      year: "2021",
      title: "Started Computer Science",
      body: "Began my Bachelor of Science in Computer Science and Engineering at North South University — and started building full-stack and AI projects along the way.",
      meta: "North South University",
    },
    {
      year: "2025",
      title: "Finalist & Graduate",
      body: "Reached the national finals of AI Fication 2025 (Televerse 1.0, CUET) with SHOBDOTORI — 4th in the private online round and 6th overall. In December, completed my B.Sc. with a CGPA of 3.83/4.00 and a Merit Scholarship for ranking in the top 1% of my class.",
      meta: "B.Sc. in CSE · CGPA 3.83/4.00",
    },
    {
      year: "2026",
      title: "AI Research Engineer",
      body: "Joined Robot Bulls in March to build a real-time Talking Head system — a conversational AI with a live, responsive face that lets users hold natural, face-to-face voice conversations with AI.",
      meta: "Robot Bulls · AI Research Engineer",
    },
    {
      year: "Now",
      title: "Building What's Next",
      body: "Actively open to AI engineering opportunities, with a particular interest in real-time conversational AI, efficient model deployment, and real-world applications of large language models.",
      meta: "Open to AI engineering roles",
    },
  ],
};

export const scoperTeaser = {
  eyebrow: "Project scoper · free tool",
  title: "Every project starts as one sentence.",
  body: "Type yours into the scoper and get a draft blueprint back in seconds — goals, features, tech stack, and user flows as a Markdown file you keep, whether or not we end up working together.",
  cta: "Scope your project",
  prompt: "a voice assistant that helps patients describe their symptoms",
  file: "voice-assistant-blueprint.md",
};

export const contactSection = {
  eyebrow: "Contact",
  title: "Got something in mind?",
  titleSoft: "I'd love to hear about it.",
  promises: ["Open to AI engineering roles", "Real-time conversational AI", "Real-world LLM applications"],
  sprintNote: "From first idea to deployed product —",
  qrTitle: "Allergic to forms?",
  qrBody: "Point your camera at either code. LinkedIn opens my profile; GitHub takes you straight to the code.",
  replyNote: site.availability,
  formNote: "Opens your email app with the message already written — just hit send.",
};
