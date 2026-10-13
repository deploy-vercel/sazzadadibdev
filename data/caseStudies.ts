import { projects, type Project } from "./projects";

export type CaseStudyStat = { value: string; unit?: string; label: string; accent?: boolean };

export type CaseStudySection = {
  label: string;
  title: string;
  paragraphs: string[];
  /** Screenshot beside the text. Sections without one render text-only. */
  image?: string;
  alt?: string;
};

export type WorkflowChip = { label: string; tone: "accent" | "muted" | "dot" };

export type CaseStudyWorkflow = {
  eyebrow: string;
  thin: string;
  bold: string;
  steps: { title: string; body: string }[];
  chips: WorkflowChip[];
};

export type CaseStudyCta = {
  thin: string;
  bold: string;
  body: string;
  secondary?: { label: string; href: string };
};

/** Extra content for the bilingual (Bangla / English on one URL) layout. */
export type BilingualExtras = {
  titleBn: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  heroCaption: string;
  brief: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cards: { title: string; body: string }[];
  };
  identity: {
    eyebrow: string;
    title: string;
    body: string;
    swatches: { name: string; hex: string; role: string }[];
    marks: { title: string; body: string }[];
    motto: { label: string; lines: string[]; translation: string };
  };
  problem: {
    eyebrow: string;
    title: string;
    body: string;
    code: { label: string; code: string }[];
    notes: { title: string; body: string }[];
  };
  memorial: { eyebrow: string; title: string; image: string; alt: string; caption: string };
  engineering: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  edges: { eyebrow: string; title: string; paragraphs: string[] };
  next: { eyebrow: string; title: string; body: string };
};

export type CaseStudy = {
  slug: string;
  /** Plain title for metadata and lists. */
  title: string;
  category: string;
  titleThin: string;
  titleBold: string;
  description: string;
  liveUrl?: string;
  codeUrl?: string;
  heroImage: string;
  heroAlt: string;
  stats: CaseStudyStat[];
  /** One-line pitch shown as "The idea". */
  problem: string;
  /** Feature list shown as "What I built". */
  features: string[];
  stack: string[];
  sections: CaseStudySection[];
  workflow?: CaseStudyWorkflow;
  cta: CaseStudyCta;
  variant: "standard" | "bilingual";
  bilingual?: BilingualExtras;
};

const img = (project: string, file: string) => `/images/case-studies/${project}/${file}.webp`;

const cta: CaseStudyCta = {
  thin: "Let's build",
  bold: "something together",
  body: "I'm open to AI engineering roles — particularly around efficient LLM deployment and production AI systems.",
};

type StudyExtras = {
  titleThin: string;
  titleBold: string;
  heroAlt: string;
  stats: CaseStudyStat[];
  /** One screenshot per challenge, in order: [file name, alt text]. Missing entries render text-only. */
  shots: ([string, string] | undefined)[];
};

/** Builds a case study from a project's own data: each challenge becomes a numbered section, its solution the story. */
function fromProject(slug: string, extras: StudyExtras): CaseStudy {
  const p = projects.find((x) => x.slug === slug) as Project;
  return {
    slug,
    title: p.shortName,
    category: p.industry,
    titleThin: extras.titleThin,
    titleBold: extras.titleBold,
    description: p.summary,
    liveUrl: p.liveUrl,
    codeUrl: p.githubUrl,
    heroImage: img(slug, "demo-1"),
    heroAlt: extras.heroAlt,
    stats: extras.stats,
    problem: p.tagline,
    features: p.features,
    stack: p.tags,
    sections: p.challenges.map((challenge, i) => {
      const shot = extras.shots[i];
      return {
        label: "The challenge",
        title: challenge,
        paragraphs: [p.solutions[i]],
        ...(shot ? { image: img(slug, shot[0]), alt: shot[1] } : {}),
      };
    }),
    cta: { ...cta, secondary: { label: "View the code", href: p.githubUrl } },
    variant: "standard",
  };
}

export const caseStudies: CaseStudy[] = [
  fromProject("ai-doctor-assistant", {
    titleThin: "AI Doctor",
    titleBold: "Assistant",
    heroAlt: "AI Doctor Assistant landing page",
    stats: [
      { value: "<1", unit: "s", label: "Voice response time" },
      { value: "4", label: "Report sections — symptoms, prescriptions, advice, summary" },
      { value: "SaaS", label: "Dashboards, doctor listings, pricing, health tips" },
      { value: "Live", label: "Deployed on Vercel", accent: true },
    ],
    shots: [
      ["demo-5", "Live voice consultation with an AI specialist"],
      ["demo-4", "Medical consultation form for describing symptoms"],
      ["demo-3", "Medical dashboard with consultations and reports"],
    ],
  }),
  fromProject("deshiplate-ai", {
    titleThin: "DeshiPlate",
    titleBold: "AI",
    heroAlt: "DeshiPlate AI landing page",
    stats: [
      { value: "33", label: "Traditional Bangladeshi dishes" },
      { value: "89.76", unit: "%", label: "Classification accuracy (NextViT)", accent: true },
      { value: "Real-time", label: "Inference from uploaded images" },
    ],
    shots: [
      ["demo-2", "Food image upload with recognition results"],
      ["demo-3", "Nutrition analysis for a recognized dish"],
      ["demo-4", "Profile with daily nutrition progress"],
    ],
  }),
  fromProject("interviewbd", {
    titleThin: "Interview",
    titleBold: "BD",
    heroAlt: "InterviewBD landing page",
    stats: [
      { value: "3", label: "Role tiers — Admin, Moderator, User" },
      { value: "Real-time", label: "Messaging with online status" },
      { value: "JWT", label: "Auth with email verification" },
      { value: "Live", label: "Deployed on Vercel", accent: true },
    ],
    shots: [
      ["demo-3", "Verified contributor profile with badge and activity statistics"],
      ["demo-5", "Real-time messaging"],
      ["demo-6", "Admin dashboard overview"],
    ],
  }),
  fromProject("english-learning-platform", {
    titleThin: "Daily English",
    titleBold: "Vocabulary",
    heroAlt: "Daily English Vocabulary Platform landing page",
    stats: [
      { value: "Daily", label: "AI-generated vocabulary tests" },
      { value: "Gemini", label: "Google Gemini 3.0 Flash" },
      { value: "Cron", label: "Automated daily test generation", accent: true },
    ],
    shots: [],
  }),
  fromProject("shobdotori", {
    titleThin: "SHOBDO",
    titleBold: "TORI",
    heroAlt: "SHOBDOTORI project overview",
    stats: [
      { value: "20", label: "Regional dialects" },
      { value: "3,800", unit: "+", label: "Curated audio samples" },
      { value: "2", label: "Transformer models — Whisper & Wav2Vec2" },
      { value: "6th", label: "Overall, AI Fication 2025 (Televerse 1.0)", accent: true },
    ],
    shots: [
      ["demo-3", "Dataset covering 20 regional dialects of Bangladesh"],
      ["demo-2", "Problem, solution, and model pipeline"],
      ["demo-4", "Performance metrics and training pipeline"],
    ],
  }),
  fromProject("educational-chatbot", {
    titleThin: "Educational",
    titleBold: "Chatbot",
    heroAlt: "Physics ChatBot landing page",
    stats: [
      { value: "75", unit: "%", label: "Accuracy, validated with RAGChecker", accent: true },
      { value: "4,000", label: "Question evaluation dataset" },
      { value: "Offline", label: "Works with limited connectivity" },
    ],
    shots: [
      ["demo-3", "Chat session with grounded physics answers"],
      ["demo-2", "Chat interface"],
    ],
  }),
  fromProject("road-accident-analysis", {
    titleThin: "Road Accident",
    titleBold: "Analysis",
    heroAlt: "Road Accident Analysis System overview: accuracy, ML pipeline, and algorithm comparison",
    stats: [
      { value: "99.1", unit: "%", label: "Patient status accuracy", accent: true },
      { value: "89", unit: "%", label: "Injury type accuracy" },
      { value: "5", label: "Algorithms compared" },
    ],
    shots: [],
  }),
  fromProject("movie-reservation", {
    titleThin: "Movie",
    titleBold: "Reservation",
    heroAlt: "Movie Reservation Website home page",
    stats: [
      { value: "5", label: "Team members" },
      { value: "MVC", label: "RESTful architecture" },
      { value: "Jest", label: "Unit & integration tests" },
      { value: "Scrum", label: "Sprint planning & retrospectives", accent: true },
    ],
    shots: [
      ["demo-2", "Movie browsing with genre filter"],
      ["demo-3", "Movie details with ratings and reviews"],
      ["demo-4", "Seat selection and booking"],
    ],
  }),
  fromProject("viper-travel", {
    titleThin: "Viper",
    titleBold: "Travel",
    heroAlt: "Viper Travels home page with trip search",
    stats: [
      { value: "CRUD", label: "SQL-based data operations" },
      { value: "PHP", label: "Session-based authentication" },
      { value: "Responsive", label: "Mobile and desktop", accent: true },
    ],
    shots: [
      ["demo-5", "Booking details with price information"],
      ["demo-2", "Available bus operators"],
      ["demo-4", "Hotel room options"],
    ],
  }),
];

/** The study served at /case-study. */
export const leadCaseStudy = caseStudies[0];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
